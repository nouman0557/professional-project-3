import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerGQLService } from "src/app/services/customer/customerGQL.service"
import { CustomerService } from "src/app/services/customer/customer.service"
import { DeleteDeviceGQL, PermanentDeleteDeviceGQL, RestoreDeviceGQL, TransferDeviceGQL, MergeDevicesGQL, CustomerHeaderFilter,
   CustomerFooterFilter, CreateNetTermOfCustomerGQL, GetNetTermsLogsGQL, CustomerNetTermGQL, CashRegistersOfLocationGQL,
    GetCreditLineGQL,GetCustomerNetDetailGQL, CustomerNetTermRecordGQL, CreateNetTermPaymentGQL, AllowedPaymentMethod,
     NetTermPaymentProcessInput,CreateCustomerDocumentGQL,DeleteCustomerDocumentGQL,SendCustomerDocumentByEmailGQL } from 'src/app/generated/graphql';
import { BsModalService, BsModalRef, TabsetComponent } from 'ngx-bootstrap';
import { StockService } from 'src/app/services/stock/stock.service';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AddCustomerDeviceComponent } from '../add-customer-device/add-customer-device.component';
import { DatePipe } from '@angular/common';
import { PayWithCardComponent } from '../../shared-templates/pay-with-card/pay-with-card.component';
import { PrintService } from 'src/app/print/print.service';
import { EnvironmentUrl } from 'src/environments/environment-url';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  navigationSource = 'customer'
  customer: {}
  customerDetail = false
  customerDevices: any
  customerPurchaseHistory: {}
  customerNetTerms: {}
  customerId = ''
  searchDeviceInput = {
    customer_id: this.customerId,
    search: '',
    is_active: true,
    location_id: localStorage.getItem('location_id')
  }
  loading: boolean = false
  deviceLoader: boolean = false
  inCredit = 'Increase'
  chooseReason = 'Choose Reason'
  creditLineName = 'Please select any credit line'
  changeCashDrawer = 'Select cash drawer you used to paid'
  createNote = false
  manageCredit = false
  transferCredit = false
  netTermsPayment = false
  noMethodSelected = true
  boxCredit = false;
  boxCheck = false;
  boxCash = false;
  boxPaypal = false;
  boxNetterm = false;
  boxStorecredit = false;
  boxCoupons = false;
  boxPayinvoice = false;
  statusFilter = 'Repair Status'
  customerStoreCredit = 0
  locationId = window.localStorage.getItem('location_id')
  @ViewChild("adddevice",{static: true}) adddevice: AddCustomerDeviceComponent;
  @ViewChild("payWithCardModal",{static: true}) payWithCardModal: PayWithCardComponent;
  baseUrl = EnvironmentUrl.Images
  constructor(private router: Router,
    private route: ActivatedRoute,
    private customerGQLService: CustomerGQLService,
    private customerService: CustomerService,
    private deleteDevice: DeleteDeviceGQL,
    private permanentDeleteDevice: PermanentDeleteDeviceGQL,
    private restoreDevice: RestoreDeviceGQL,
    private modalService: BsModalService,
    private stockService: StockService,
    private transferDevice: TransferDeviceGQL,
    private mergeDevices: MergeDevicesGQL,
    private saleCartService: SaleCartService,
    private formbulider: FormBuilder,
    private createNetTermOfCustomer : CreateNetTermOfCustomerGQL,
    private getNetTermsLogs : GetNetTermsLogsGQL,
    private getCreditLineGQL: GetCreditLineGQL,
    private cashRegistersOfLocationGQL: CashRegistersOfLocationGQL,
    private datePipe: DatePipe,
    private getCustomerNetDetail : GetCustomerNetDetailGQL,
    private customerNetTermRecord: CustomerNetTermRecordGQL,
    private createNetTermPayment:CreateNetTermPaymentGQL,
    private createCustomerDocument : CreateCustomerDocumentGQL,
    private deleteCustomerDocument: DeleteCustomerDocumentGQL,
    private sendCustomerDocumentByEmail:SendCustomerDocumentByEmailGQL,
    private printservice: PrintService
  ) { }


  ngOnInit() {
    this.customerService.onChangeSection('CUSTOMER DETAILS')
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        this.customerId = params['customerId']
        this.customerDetail=true
        this.getCustomerDetail(params['customerId'])
        this.getStoreCreditLogs(params['customerId'])
      } else if (this.customerService.getSelectedCustomerId() != '' && this.customerService.getSelectedCustomerId() !== undefined) {
        this.getCustomerDetail(this.customerService.getSelectedCustomerId())
      }
    });
    this.getReasons()
  }


  getCustomerDetail(customerId) {
    this.loading = true
    this.customerDocument=[]
    this.getCustomerDevices()
    this.netTermsinitializeFrom()
    this.getCustomersTabDetails()
    this.customerGQLService.getCustomerDetail(customerId, this.locationId).valueChanges.subscribe(
      (res) => {
        this.loading = false
        this.customer = res['data'].getCustomerById
        this.customerStoreCredit = res['data'].getCustomerById.CustomerStoreWiseRecord[0].store_credit.credit_amount
        console.log("Customer Detail-->", this.customer)
      }, (err) => {
        this.loading = false
        this.customerService.showToaster([err.message, 'error'])
      }
    )
  }

  getCustomersTabDetails(){
    this.docLoader=true
    this.allDocCheck=false
    this.customerGQLService.getCustomerOtherDetail(this.customerId).valueChanges.subscribe(
      (res) => {
        this.loading = false
        this.docLoader=false
        console.log("Customer Detail-->", res['data'])
        this.customerNetTerms = res['data'].customerNetTerm
        if(res['data'].getAllCustomerDocuments){
        this.customerDocument=res['data'].getAllCustomerDocuments
        }
      }, (err) => {
        this.loading = false
        this.docLoader=false
        this.customerService.showToaster([err.message, 'error'])
      }
    )
    this.customerGQLService.getPurchaseHistoryByCustomerId(this.customerId,this.locationId).valueChanges.subscribe(
      (res) => {
        this.loading = false
        this.docLoader=false
        console.log("Purchase History Detail-->", res['data'])
        this.customerPurchaseHistory = res['data'].CustomerPurchaseHistory
      }, (err) => {
        this.loading = false
        this.docLoader=false
        this.customerService.showToaster([err.message, 'error'])
      }
    )
  }
  onEditCustomer(customerId) {
    this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:edit/${customerId})`)
  }

  //=============================== Merge Devices ===================================//
  showMergeOption = false
  mergeDevicesDate = []
  deviceSettingsOpen = false
  itemCompareYesCheck = false
  showTransferOption = false;
  transferDeviceId = ''
  openDeviceSettings(list) {
    let count = 0
    this.showMergeOption = false
    this.mergeDevicesDate = []
    this.itemCompareYesCheck = false
    this.showTransferOption = false
    this.transferDeviceId = ''
    this.deviceSettingsOpen = !this.deviceSettingsOpen;
    for (let i = 0; i < list.length; i++) {
      if (list[i]['checked']) {
        count = count + 1
        this.transferDeviceId = list[i]['_id']
        this.mergeDevicesDate.push(list[i])
      }
    }
    if (count == 2) {
      this.showMergeOption = true
    } else {
      this.mergeDevicesDate = []
    }
    if (count == 1) {
      this.showTransferOption = true
    } else {
      this.transferDeviceId = ''
    }
  }

  principalDevice = []
  selectprincipalDevice(item1, item2) {
    this.principalDevice[0] = item1
    this.principalDevice[1] = item2
  }

  openCompareItemModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  mergeDeviceFun() {
    console.log("customer principle--->", this.principalDevice)
    this.deviceSettingsOpen = false
    this.mergeDevices.mutate({
      primaryDeviceID: this.principalDevice[0]._id,
      secondaryDeviceID: this.principalDevice[1]._id
    }).subscribe(
      (res) => {
        this.allDeviceCheck = false
        console.log('Merge Device res-->', res['data'].MergeDevices);
        let returnVal = res['data'].MergeDevices
        if (returnVal) {
          this.customerService.showToaster(['Merge Device Successfully', 'success'])
          this.getCustomerDevices()
        }
      }, (err) => {
        console.log('Merge Device err -->', err);
        this.customerService.showToaster([err.message, 'error'])
      }
    )
  }

  //=============================== End Merge Devices ===================================//

  changeValue(type, val) {
    this[type] = val
  }

  loadStoreCredit() {
    this.initializeCreateStoreCreditForm()
    this.initializeTransferStoreCreditForm()
    this.manageCredit = true
    this.transferCredit = false
    this.customerDetail = false
    this.netTermsPayment = false
    this.createNote = false
  }

  loadStoreTransCredit() {
    this.initializeCreateStoreCreditForm()
    this.initializeTransferStoreCreditForm()
    this.transferCredit = true
    this.customerDetail = false
    this.manageCredit = false
    this.netTermsPayment = false
    this.createNote = false
  }

  changePay(type) {
    this.noMethodSelected = false
    this.boxCredit = false;
    this.boxCheck = false;
    this.boxCash = false;
    this.boxPaypal = false;
    this.boxNetterm = false;
    this.boxStorecredit = false;
    this.boxCoupons = false;
    this.boxPayinvoice = false;
    this[type] = true;
  }

  applyActiveArchivedDevicesFilter(value) {
    this.searchDeviceInput['is_active'] = value
    this.getCustomerDevices()
  }

  getCustomerDevices() {
    this.deviceLoader = true
    this.searchDeviceInput['customer_id'] = this.customerId
    this.customerGQLService.getDevicesByCustomerId(this.searchDeviceInput).valueChanges.subscribe(
      (res) => {
        this.allDeviceCheck = false;
        this.deviceLoader = false
        console.log('Cust Devices Data-->', res)
        this.loading = false
        this.customerDevices = res['data'].getDevicesByCustomer
        // this.addCheckedField(this.customerDevices)
      }, (err) => {
        this.deviceLoader = false
        this.loading = false
        this.customerService.showToaster([err.message, 'error'])
      }
    )
  }

  checkedAllDevices = false
  allDeviceCheck = false
  allDocCheck = false
  checkedAllField(list, event) {
    for (let i = 0; i < list.length; i++) {
      list[i]['checked'] = event.target.checked
    }
  }

  singleItemChecked(list, index, event,allCheck) {
    this[allCheck] = true
    list[index]['checked'] = event.target.checked
    for (let i = 0; i < list.length; i++) {
      if (!list[i]['checked']) {
        this[allCheck] = false
      }
    }
  }

  onAddCustomerDevice(customerId) {
    this.customerId=customerId
    this.adddevice.customerId=customerId
    this.adddevice.deviceUpdateOrAdd='Add'
    this.adddevice.initializeDeviceForm()
  }

  onUpdateCustomerDevice(deviceId) {
    this.adddevice.deviceId=deviceId
    this.adddevice.deviceUpdateOrAdd='Update'
    this.adddevice.customerId=this.customerId
    this.adddevice.getDeviceByIdFun()
  }

  hideSettingList() {
    this.deviceSettingsOpen = false
  }

  archiveDevices() {
    this.deviceLoader = true
    this.deleteDevice.mutate({
      device_id: this.selectedDeviceIds
    }).subscribe(
      (res) => {
        this.deviceLoader = false
        this.deviceSettingsOpen = false
        console.log(' res', res['data'].deleteDevice);
        let returnVal = res['data'].deleteDevice
        if (returnVal) {
          this.customerService.showToaster(['Archived Devices Successfully', 'success'])
          this.getCustomerDevices()
        }
      }, (err) => {
        this.deviceLoader = false
        this.deviceSettingsOpen = false
        console.log(' err', err);
        this.customerService.showToaster([err.message, 'error'])
      }
    )
  }

  permanentDeleteDeviceFun() {
    this.deviceLoader = true
    this.permanentDeleteDevice.mutate({
      device_id: this.selectedDeviceIds
    }).subscribe(
      (res) => {
        this.deviceLoader = false
        console.log('permanentDeleteDevice res', res['data'].permanentDeleteDevice);
        let returnVal = res['data'].permanentDeleteDevice
        if (returnVal) {
          this.customerService.showToaster(['Delete Device(s) Successfully', 'success'])
          this.getCustomerDevices()
        }
      }, (err) => {
        this.deviceLoader = false
        console.log('permanentDeleteDevice err', err);
      }
    )
  }

  restoreDeviceFun() {
    this.deviceLoader = true
    this.restoreDevice.mutate({
      device_id: this.selectedDeviceIds
    }).subscribe(
      (res) => {
        this.deviceLoader = false
        console.log('restoreDevice res', res['data'].restoreDevice);
        let returnVal = res['data'].restoreDevice
        if (returnVal) {
          this.customerService.showToaster(['Active Device(s) Successfully', 'success'])
          this.getCustomerDevices()
        }
      }, (err) => {
        this.deviceLoader = false
        console.log('restoreDevice err', err);
      })
  }

  modalRef: BsModalRef;
  deviceModalFor = ''
  selectedDeviceIds = []
  openDeviceModal(template: TemplateRef<any>, cls, check) {
    this.selectedDeviceIds = []
    this.inputSearchCustomer2['search'] = ''
    this.transferDeviceId
    this.transferCutomerId
    this.searchCustomer = ''
    for (let i = 0; i < this.customerDevices.length; i++) {
      if (this.customerDevices[i]['checked']) {
        this.selectedDeviceIds.push(this.customerDevices[i]['_id'])
      }
    }
    if (this.isObjectEmpty(this.selectedDeviceIds)) {
      this.customerService.showToaster(["Please select device first", 'error'])
      return
    }
    this.deviceModalFor = check
    this.deviceSettingsOpen = false
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  callFunction() {
    if (this.deviceModalFor == 'archive') {
      this.archiveDevices()
    } else if (this.deviceModalFor == 'active') {
      this.restoreDeviceFun()
    } else if (this.deviceModalFor == 'export') {
      this.exportDevice()
    } else {
      this.permanentDeleteDeviceFun()
    }
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  exportDevice() {
    this.stockService.exportDevices(this.selectedDeviceIds).subscribe(
      (res) => {
        var blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        if (navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, 'Devices.csv');
        } else {
          let a = document.createElement('a');
          a.href = url;
          a.download = 'Devices.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        window.URL.revokeObjectURL(url);
        this.customerService.showToaster([this.selectedDeviceIds.length == 1 ? 'Device(s)' + ' exported successfully.' : 'Device(s)' + ' exported successfully.', 'success'])
      }, (err) => {
        console.log('err while exporting Device', err);
      }
    )
  }

  //=========================================== Transfer Device ======================================//
  customerList = []
  searchCustomer = ''
  inputSearchCustomer2 = {
    search: this.searchCustomer,
    location_id: this.locationId,
    limit: 1000000,
    skip: 0,
    is_deleted: false,
    fromDate: "",
    toDate: "",
    is_cloud: false,
    headerFliter: CustomerHeaderFilter.All,
    footerFliter: [CustomerFooterFilter.All]
  }
  showCustomerList = false
  transferCutomerId = ''
  customerSearchForTransferDevice(inputSearchCustomer2, event) {
    if (event.length < 3 && event.length != 0) {
      return
    }
    inputSearchCustomer2['search'] = event
    let data = this.customerGQLService.getAllCustomer(inputSearchCustomer2)
    data.subscribe(
      (res) => {
        if (res) {
          this.allDeviceCheck = false
          this.customerList = res.customers
          this.showCustomerList = true
        }
        console.log('cutomer list-->', this.customerList);
      }, (err) => {
        console.log('cutomer', err);
      }
    )
  }

  transferDeviceFun() {
    this.deviceLoader = true
    this.transferDevice.mutate({
      deviceID: this.transferDeviceId,
      customerID: this.transferCutomerId
    }).subscribe(
      (res) => {
        this.deviceLoader = false
        this.allDeviceCheck=false
        console.log('TransferDevice res', res['data'].TransferDevice);
        let returnVal = res['data'].TransferDevice
        if (returnVal) {
          this.customerService.showToaster(['Transfer Device Successfully', 'success'])
          this.getCustomerDevices()
        }
      }, (err) => {
        this.deviceLoader = false
        this.customerService.showToaster([err, 'error'])
        console.log('TransferDevice err', err);
      })
  }

  onDeviceHistoryIconClick(deviceId) {
    if (this.navigationSource == 'customer') {
      this.saleCartService.setSelectedCustomerId(this.customerId)
      this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:Device-History/${deviceId})`)
    }
  }


  // Store Credit sections start from here by Asad
  storeCreditLogs = []
  getStoreCreditLogs(id) {
    this.customerGQLService.getCustomerStoreCreditLogs(id, 1000, 0).valueChanges.subscribe(
      (res) => {
        this.storeCreditLogs = res['data'].getStoreCreditLogs
        console.log('store credit logs are', this.storeCreditLogs);
      }, (err) => {
        console.log('error while fetching store credit', err);
      }
    )
  }

  reasons = []
  getReasons() {
    this.customerGQLService.getReasons('store_credit').subscribe(
      (res) => {
        this.reasons = res['data'].getReasons
      }, (err) => {
        console.log('err while loading reason', err);
      }
    )
  }

  setFormValue(form, field, value) {
    if (form == 'storeCreditForm' && field == 'reason') {
      this[form].controls[field].setValue(value['reason_name'])
      this.storeCreditForm.controls.reasonName.setValue(value['reason_name'])
      return
    }
    this[form].controls[field].setValue(value)
  }

  storeCreditForm: any
  initializeCreateStoreCreditForm() {
    this.storeCreditForm = this.formbulider.group({
      customerId: [this.customerId, Validators.required],
      amount: [, Validators.required],
      reason: ['', Validators.required],
      reasonName: ['Choose Reason'],
      orderId: ['', Validators.required],
      note: ['', Validators.required],
      date: [new Date(), Validators.required],
      location_id: [localStorage.getItem('location_id')],
    });
  }

  get fStoreCredit() {
    return this.storeCreditForm.controls
  }

  cancelProcess() {
    this.initializeCreateStoreCreditForm()
    this.getCustomerDetail(this.customerId)
    this.storeCreditSubmitted = false
    this.submitTransferCredit = false
    this.manageCredit = false
    this.customerDetail = true
    this.netTermsPayment = false
    this.createNote = false
  } 

  loadProcess(load, cancel) {
    this[load] = true
    this[cancel] = false
  }

  manageCreditLoader = false
  storeCreditSubmitted = false
  createStoreCredit() {
    this.storeCreditSubmitted = true
    this.manageCreditLoader = true
    if (this.storeCreditForm.invalid) {
      this.manageCreditLoader = false
      return
    }
    let obj = this.storeCreditForm.value
    obj['amount'] = Number(obj['amount'])
    delete obj['reasonName']
    this.customerGQLService.createCustomerStoreCredit(obj).subscribe(
      (res) => {
        this.cancelProcess()
        this.getStoreCreditLogs(this.customerId)
        this.getCustomerDetail(this.customerId)
        console.log('store credit successfully added', res['data'].createStoreCredit);
        this.storeCreditLogs.push(res['data'].createStoreCredit)
        this.storeCreditSubmitted = false
        this.manageCreditLoader = false
      }, (err) => {
        this.manageCreditLoader = false
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('error while creating customer store credit', err);
      }
    )
  }

  transferStoreCreditForm: any
  initializeTransferStoreCreditForm() {
    this.transferStoreCreditForm = this.formbulider.group({
      toCustomerId: [, Validators.required],
      fromCustomerId: [this.customerId, Validators.required],
      transferAmount: [, Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      note: ['', Validators.required],
      date: [new Date()],
      location_id: [localStorage.getItem('location_id')],
    });
  }

  get fTransferStoreCredit() {
    return this.transferStoreCreditForm.controls
  }

  showCustomerListForTransferCredit = false
  customerSearch = ''
  customerSearchList = []
  searchCustomerForTransferCredit(event) {
    if (event.length < 1) {
      this.showCustomerListForTransferCredit = false
      return
    }
    let obj = {
      search: event,
      location_id: localStorage.getItem('location_id'),
      is_deleted: false,
      limit: 100,
      skip: 0,
      headerFliter: CustomerHeaderFilter.All,
      footerFliter: [CustomerFooterFilter.All]
    }
    this.customerGQLService.getAllCustomer(JSON.parse(JSON.stringify(obj))).subscribe(
      (res) => {
        console.log('customer search response is', res);
        if (res) {
          this.customerSearchList = res.customers
          const isCurrentCustomer = (element) => element._id == this.customerId;
          let ind = this.customerSearchList.findIndex(isCurrentCustomer);
          if(ind != -1) {
            this.customerSearchList.splice(ind,1)
          }
        }
        this.showCustomerListForTransferCredit = true
      }, (err) => {
        console.log('error while searching customer', err);
      }
    )
  }

  selectCustomer(cust) {
    this.setFormValue('transferStoreCreditForm', 'toCustomerId', cust._id)
    this.customerSearch = cust['first_name'] + ' ' + cust['last_name']
    this.showCustomerListForTransferCredit = false
  }

  submitTransferCredit = false
  transferCreditLoader = false
  sendTransferCredit() {
    this.transferCreditLoader = true
    this.submitTransferCredit = true
    if (this.transferStoreCreditForm.invalid) {
      this.transferCreditLoader = false
      return
    }
    let obj = this.transferStoreCreditForm.value
    obj['transferAmount'] = Number(obj['transferAmount'])
    console.log('form values are', obj);
    this.customerGQLService.sendCustomerStoreCredit(obj).subscribe(
      (res) => {
        this.cancelProcess()
        this.getStoreCreditLogs(this.customerId)
        console.log('store credit successfully added', res['data'].createTransferCredit);
        this.storeCreditLogs.push(res['data'].createTransferCredit)
        this.initializeTransferStoreCreditForm()
        this.customerSearch = ''
        this.submitTransferCredit = false
        this.transferCreditLoader = false
      }, (err) => {
        this.transferCreditLoader = false
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('error while creating customer store credit', err);
      }
    )
  }

  // Store Credit sections end from here by Asad

  showToaster = true
  toasterMsg = 'no msg'
  toasterType = 'error'
  closeToaster() {
    this.showToaster = true
  }
  documentSettingsOpen = false
  openDocumentSettings() {
    this.documentSettingsOpen = !this.documentSettingsOpen;
  }
  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }
  closeModel() {
    this.modalService.hide(1);
  }

  //=========================================================== Start Selected Customer Netterm ===========================//
  // @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  loadNetTerm() {
    this.createNote = true
    this.customerDetail = false
    this.netTermsPayment = false
    this.transferCredit = false
    this.manageCredit = false
  }

  loadNetTermPayment() {
    this.netTermsPayment = true
    this.customerDetail = false
    this.createNote = false
    this.manageCredit = false
    this.transferCredit = false

  }

  cancel(val, val1) {
    this[val] = false
    this[val1] = true
    this.netternPaymentamount = ''
    this.addpaymentAmout()
    // this.staticTabs.tabs[0].active = false;
    // this.staticTabs.tabs[2].active = true;
  }

  netTermsForm: any
  netTermsSubmitted = false
  netTermDataforForm: any
  netTermsLoader=false
  netTermsinitializeFrom() {
    this.netTermsSubmitted = false
    this.inCredit = 'Increase'
    this.cashRegId = ''
    this.paypalTransactionID = ''
    this.creditLineID = ''
    this.creditCardNo = ''
    this.paypalAccount = ''
    this.bankAccNo = ''
    this.checkqueNo = ''
    this.cashReg=''
    this.totalOwenAmount = 0
    this.creditLineName = 'Please select any credit line'
    this.netternPaymentamount = ''
    this.paymentDate = new Date()
    // let myDate1 = this.datePipe.transform(this.paymentDate, 'MM-dd-yyyy');
    // this.paymentDate = myDate1
    this.getAllCashRegisterarOfLocation()
    this.getAllCreditLines()
    this.getNetTermsLogsData()
    this.getNettermDetails()
    this.customerNetTermPaymentLogs()
    this.disgardNetTermsPayments()
    this.netTermsForm = this.formbulider.group({
      customerId: [this.customerId, [Validators.required]],
      is_increase: [true, [Validators.required]],
      credit_amount: ['', [Validators.required]],
      days: ['', [Validators.required]],
      interest_rate: ['', [Validators.required]],
      note: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      location_id: [window.localStorage.getItem('location_id'), [Validators.required]]
    });
  }

  get fNetTermsForm() {
    return this.netTermsForm.controls
  }
  

  customerNetTermsLogs=[]
  netTermSkip = 0
  netTermLimit = 10000
  getNetTermsLogsData() {
    this.netTermsLoader = true
      this.getNetTermsLogs.watch({
      skip: this. netTermSkip,
      customerId: this.customerId,
      locationId: window.localStorage.getItem('location_id')
    }).valueChanges.subscribe(
      (res) => {
        this.netTermsLoader = false
        if(res['data'].getNetTermsLogs){
        this.customerNetTermsLogs = res['data'].getNetTermsLogs
        }
        console.log('get Net Terms Logs res-->', this.customerNetTermsLogs)
      }, (err) => {
        this.netTermsLoader = false
        console.log('get Net Terms Logs res--> err', err);
      }
    )
  }
   
  netTermReturnValue: any
  todayDate = new Date();
  saveNetTermsForm() {
    if (this.inCredit == 'Increase') {
      this.netTermsForm.value.is_increase = true
    } else {
      this.netTermsForm.value.is_increase = false
    }
    if (this.netTermsForm.invalid) {
      this.netTermsSubmitted = true;
      return;
    } else {
      this.netTermsLoader = true
      this.netTermsForm.value.credit_amount = Number(this.netTermsForm.value.credit_amount)
      this.netTermsForm.value.days = Number(this.netTermsForm.value.days)
      this.netTermsForm.value.interest_rate = Number(this.netTermsForm.value.interest_rate)
      let netTermsFormData = JSON.parse(JSON.stringify(this.netTermsForm.value))
      this.createNetTermOfCustomer.mutate({
        customerNetTermInput: netTermsFormData
      }).subscribe(
        (res) => {
          console.log('Add Net Terms res-->', res);
          this.netTermReturnValue = res['data'].createNetTermOfCustomer
          this.customerService.showToaster(['NetTerm Successfully Created', 'success'])
          this.netTermsinitializeFrom()
          this.netTermsLoader = false
        }, (err) => {
          console.log('Add Net Terms err-->', err);
          this.netTermsLoader = false
          this.customerService.showToaster([err.message, 'error'])
        }
      )
    }
  }

  customerNetTermPaymentLogsData=[]
  cashRegId = ''
  paypalTransactionID = ''
  creditLineID = ''
  creditCardNo = ''
  paypalAccount = ''
  bankAccNo = ''
  checkqueNo = ''
  totalPaymentPayed = []
  paymentDate =  new Date();
  paymentProcessing = false
  supplierLoaderPO=false
  customerNetTermPaymentLogs() {
      this.netTermsOrdersLoader = true
      this.customerNetTermRecord.watch({
          customer_id: this.customerId,
          skip: 0,
          limit: 100000,
          location_id: window.localStorage.getItem('location_id')
      }).valueChanges.subscribe(
          (res) => {
            this.totalOwenAmount=0
              let result = res['data'].customerNetTermRecord
              if (result != null) {
                  this.customerNetTermPaymentLogsData = result
                  for (let i = 0; i < this.customerNetTermPaymentLogsData.length; i++) {
                      this.totalOwenAmount = Number(this.customerNetTermPaymentLogsData[i]['amount_owed']) + Number(this.totalOwenAmount)
                      this.customerNetTermPaymentLogsData[i]['balance'] = Number(this.customerNetTermPaymentLogsData[i]['amount_owed'])
                  }
                  this.supplierLoaderPO = false
                  this.netTermsOrdersLoader = false
              }
              console.log('customerNetTermPaymentLogsData', res['data'].customerNetTermRecord);
          }, (err) => {
              this.supplierLoaderPO = false
              this.netTermsOrdersLoader = false
              console.log('customerNetTermPaymentLogsData', err);
          }
      )
  }

  nettermDetails=[]
  netTermsOrdersLoader = false
  totalOwenAmount = 0
  afterPaymentOwen = 0
  getNettermDetails() {
      this.getCustomerNetDetail.watch({
        customerId:this.customerId,
        locationId:this.locationId
      }).valueChanges.subscribe(
          (res) => {
              let result = res['data'].getCustomerNetDetail
              if (result != null) {
                this.nettermDetails =JSON.parse(JSON.stringify(result)) 
              }
              console.log('getCustomerNetDetail', res['data'].getCustomerNetDetail);
          }, (err) => {
              console.log('getCustomerNetDetail', err);
          }
      )

  }

  amountToPayFun(netTermOrder) {
      netTermOrder.balance = netTermOrder.amount_owed
      if (netTermOrder.amount_owed < Number(netTermOrder.amount_pay)) {
          this.showToaster = false
          this.toasterMsg = 'Amount to pay not grater then amount you owed'
          this.toasterType = 'error'
          netTermOrder.amount_pay = 0
          return
      }
      netTermOrder.balance = Number(netTermOrder.balance) - Number(netTermOrder.amount_pay)
      this.calculatePaymentAmount()

  }

  addpaymentAmout() {
      let amount = Number(this.netternPaymentamount)
      for (let i = 0; i < this.customerNetTermPaymentLogsData.length; i++) {
          this.customerNetTermPaymentLogsData[i]['amount_pay'] = 0
      }
      for (let i = 0; i < this.customerNetTermPaymentLogsData.length; i++) {
          if (amount >= Number(this.customerNetTermPaymentLogsData[i]['amount_owed']) && amount > 0) {
              let num = Number(this.customerNetTermPaymentLogsData[i]['amount_owed'])
              amount = amount - num
              this.customerNetTermPaymentLogsData[i]['amount_pay'] = num
              this.customerNetTermPaymentLogsData[i]['balance'] = Number(this.customerNetTermPaymentLogsData[i]['amount_owed']) - Number(this.customerNetTermPaymentLogsData[i]['amount_pay'])
              if (i + 1 == this.customerNetTermPaymentLogsData.length) {
                  let bal = Number(this.netternPaymentamount) - amount
                  let total = bal.toFixed(2)
                  this.netternPaymentamount = total
              }
          } else {
              this.customerNetTermPaymentLogsData[i]['amount_pay'] = amount
              this.customerNetTermPaymentLogsData[i]['balance'] = Number(this.customerNetTermPaymentLogsData[i]['amount_owed']) - Number(this.customerNetTermPaymentLogsData[i]['amount_pay'])
              return
          }
      }
  }

  calculatePaymentAmount() {
      this.netternPaymentamount = ''
      let amount=0
      this.totalOwenAmount=0
      for (let i = 0; i < this.customerNetTermPaymentLogsData.length; i++) {
          amount = Number(this.customerNetTermPaymentLogsData[i]['amount_pay']) + Number(amount)
          this.totalOwenAmount = Number(this.customerNetTermPaymentLogsData[i]['amount_owed']) + Number(this.totalOwenAmount)
          this.customerNetTermPaymentLogsData[i]['balance'] = Number(this.customerNetTermPaymentLogsData[i]['amount_owed']) - Number(this.customerNetTermPaymentLogsData[i]['amount_pay'])
      }
      this.netternPaymentamount = amount.toString()
  }

  netternPaymentOrders = []
  netternPaymentamount =''
  devidePayment = false
  netternPaymentLoader = false
  totalNettermAmount = 0
  stripeDetails=[]
  createNetTermPaymentFun(method) {
    let amount=parseFloat(this.netternPaymentamount.toString())
    if(amount>0.0){
      let meth = String(method)
      let netTermOrderInput = []
      for (let i = 0; i < this.customerNetTermPaymentLogsData.length; i++) {
          if (this.customerNetTermPaymentLogsData[i].amount_pay > 0) {
              let obj = {}
              obj['transactionId'] = this.customerNetTermPaymentLogsData[i].transactionID
              obj['amount'] = parseFloat(this.customerNetTermPaymentLogsData[i].amount_pay)
              //some fields get from customerNetTermPaymentLogsData
              netTermOrderInput.push(obj)
          }
      }
      if(this.isObjectEmpty(netTermOrderInput)){
        this.customerService.showToaster(['Sorry you have no netterm payment order', 'error'])
        return
      }
      let input: NetTermPaymentProcessInput = {
          amount: 0,
          method: AllowedPaymentMethod.Cash,
          BusinessLocation: window.localStorage.getItem('location_id')
      };
      if (meth == 'Cash') {
          input['amount'] = parseFloat(this.netternPaymentamount.toString())
          input['method'] = AllowedPaymentMethod[meth]
          input['orders'] = netTermOrderInput
          input['cashRegisterId'] = this.cashRegId
      } else if (meth == 'Stripe') {
          input['amount'] = parseFloat(this.netternPaymentamount.toString())
          input['method'] = AllowedPaymentMethod[meth]
          input['orders'] = netTermOrderInput
          input['card_number']= this.stripeDetails['card_number']
          input['card_month']= this.stripeDetails['card_month']
          input['card_year']= this.stripeDetails['card_year']
          input['card_security']= this.stripeDetails['card_security']
      } else if (meth == 'Cheque') {
          input['amount'] = parseFloat(this.netternPaymentamount.toString())
          input['method'] = AllowedPaymentMethod[meth]
          input['orders'] = netTermOrderInput
          input['cheque_number'] = this.checkqueNo
          // input['bank_account_number'] = this.bankAccNo
      } else if (meth == 'PaypalTransactionId') {
          input['amount'] = parseFloat(this.netternPaymentamount.toString())
          input['method'] = AllowedPaymentMethod[meth]
          input['orders'] = netTermOrderInput
          input['paypal_transaction_id'] = this.paypalTransactionID
      } else if (meth == 'StoreCredit') {
          input['amount'] = parseFloat(this.netternPaymentamount.toString())
          input['method'] = AllowedPaymentMethod[meth]
          input['Customer'] = this.customerId
          input['orders'] = netTermOrderInput
      } else {
          input['amount'] = parseFloat(this.netternPaymentamount.toString())
          input['method'] = AllowedPaymentMethod[meth]
          input['orders'] = netTermOrderInput
          input['bank_account_number'] = this.bankAccNo
      }
      this.netternPaymentLoader = true
      this.createNetTermPayment.mutate({
          input: input
      }).subscribe(
          (res) => {
              let bool = res['data'].createNetTermPayment
              if (bool) {
                if (meth == 'StoreCredit'){
                  this.customerStoreCredit=Number(this.customerStoreCredit)-Number(this.netternPaymentamount)
                }
                  this.disgardNetTermsPayments()
                  this.netTermsinitializeFrom()
                  this.netternPaymentLoader = false
                  this.customerService.showToaster(['Net Term Payment Done Successfully.', 'success'])
              }
              console.log('create NetTerm Payment Return Val-->', bool);
          }, (err) => {
              console.log('create NetTerm Payment err', err);
              this.netternPaymentLoader = false
              this.customerService.showToaster([err.message, 'error'])
          }
      ) 
     }else{
        this.customerService.showToaster(['Enter valid amount', 'error'])
          return
        }
  }

  disgardNetTermsPayments() {
      this.netternPaymentamount = ''
      this.totalOwenAmount = 0
      this.afterPaymentOwen = 0

  }

  doneCardDetails(data){
    this.stripeDetails=data
   this.createNetTermPaymentFun('Stripe')
  }

  payWithCardModalOpen(){
    let amount=parseFloat(this.netternPaymentamount.toString())
    if(amount>0.0){
      this.payWithCardModal.openModal()  
    }else{
    this.customerService.showToaster(['Enter valid amount', 'error'])
      return
    }
    
  }

  cashReg=''
  selectCashRegisterar(reg) {
      this.changeCashDrawer = reg.name
      this.cashRegId = reg._id
      this.cashReg = reg
  }

  payWithStoreCredit(){
  if (parseFloat(this.netternPaymentamount) > this.customerStoreCredit ) {
    this.customerService.showToaster([ 'Store Credit not enough for payment', 'error'])
    return
  }
  this.createNetTermPaymentFun('StoreCredit')
}
  //=========================================================== End Selected Customer Netterm ===========================//

  cashRegisterars = []
  getAllCashRegisterarOfLocation() {
      this.cashRegistersOfLocationGQL.watch({
          ID: localStorage.getItem('location_id')
      }).valueChanges.subscribe(
          (res) => {
              this.cashRegisterars = res['data'].cashRegistersOfLocation
              console.log('cash registerars', res['data'].cashRegistersOfLocation);
          }, (err) => {
              console.log('err while loading cash registerar', err);
          }
      )
  }

  creditLines = []
  getAllCreditLines() {
      this.getCreditLineGQL.watch().valueChanges.subscribe(
          (res) => {
              this.creditLines = res['data'].getCreditLine
              console.log('credit line', res['data'].getCreditLine);
          }, (err) => {
              console.log('error while loading credit lines', err);
          }
      )
  }

  closeOpenOptions(){
    this.documentSettingsOpen=false
    this.deviceSettingsOpen=false
  }
  //=================================== Start Customer Documents Session ==================================//
  customerDocument=[]
  theDocCheckbox=false
  docLoader=false
  selectedDoc={}
  customerDocumentOpenModal(template: TemplateRef<any>, cls,data){
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    this.selectedDoc=data
  }

  customerDocumentDelete(){
    this.docLoader = true
    this.deleteCustomerDocument.mutate({
      _id: this.selectedDocds
    }).subscribe(
      (res) => {
        this.docLoader = false
        console.log('customerDocumentDelete res', res['data'].deleteCustomerDocument);
        let returnVal = res['data'].deleteCustomerDocument
        if (returnVal) {
          this.customerService.showToaster(['Delete Document(s) Successfully', 'success'])
          this.getCustomersTabDetails()
        }
      }, (err) => {
        this.docLoader = false
        this.customerService.showToaster([err.message, 'error'])
        console.log('customerDocumentDelete err', err);
      }
    )
  }

  createCustomerDocumentFun(event){
      if(event.target.files[0]==null ||event.target.files[0]==undefined ){
        return
      }
    this.docLoader=true
    let docName=event.target.files[0].name.split(".")
    this.createCustomerDocument.mutate({
      file: event.target.files[0],
      input:{
        customer_document_name: docName[0],
        customer_id: this.customerId,
        location_id:this.locationId,
        document_extension: docName[1]
      }},{
        context: {
          useMultipart: true
        }
    }).subscribe(
      (res) => {
        this.docLoader=false
          console.log('Document res--->', res['data'].createCustomerDocument);
           let returnVal  = res['data'].createCustomerDocument
           if(returnVal){
            this.customerService.showToaster(['Document Added Successfully', 'success'])
            this.getCustomersTabDetails()
           }
      }, (err) => {
        this.docLoader=false
        this.customerService.showToaster([err.message, 'error'])
        console.log('Document err--->', err.message);
      }
      )
  }

  customerDocumentShare(document){
    this.docLoader = true
    this.sendCustomerDocumentByEmail.watch({
      customerId:this.customerId,
      documentURL:'upload/'+document.document_file_path,
      file_name:document.customer_document_name+'.'+document.document_extension
    }).valueChanges.subscribe(
      (res) => {
        this.docLoader = false
        console.log('customerDocumentDelete res', res['data'].sendCustomerDocumentByEmail);
        let returnVal = res['data'].sendCustomerDocumentByEmail
        if (returnVal) {
          this.customerService.showToaster(['Email sent Successfully', 'success'])
        }
      }, (err) => {
        this.docLoader = false
        this.customerService.showToaster([err.message, 'error'])
        console.log('customerDocumentDelete err', err);
      }
    )
  }
  
  selectedDocds = []
  openDocModal(template: TemplateRef<any>, cls) {
    this.selectedDocds = []
    for (let i = 0; i < this.customerDocument.length; i++) {
      if (this.customerDocument[i]['checked']) {
        this.selectedDocds.push(this.customerDocument[i]['_id'])
      }
    }
    if (this.isObjectEmpty(this.selectedDocds)) {
      this.customerService.showToaster(["Please select document first", 'error'])
      return
    }
    this.documentSettingsOpen = false
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  downloadDocument(document) {
    this.printservice.downloadFile('upload/'+document['document_file_path'],document['customer_document_name'])
  }

  //=================================== End Customer Documents Session ==================================//

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }
}
