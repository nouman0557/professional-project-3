import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CustomerGQLService } from 'src/app/services/customer/customerGQL.service'
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {
  RestoreDeviceGQL, PermanentDeleteDeviceGQL, DeleteDeviceGQL, CustomerHeaderFilter,
  CustomerFooterFilter, TransferDeviceGQL, MergeDevicesGQL, InputProductType, ImportDevicesGQL
} from 'src/app/generated/graphql';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddCustomerDeviceComponent } from '../../customers/add-customer-device/add-customer-device.component';
import { ImportItemsComponent } from '../../shared-templates/import-items/import-items.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  searchDeviceInput = {
    customer_id: '',
    search: '',
    is_active: true,
    location_id: localStorage.getItem('location_id')
  }
  searchDevice = ''
  deviceSearchString = 'device_keeping_unit,device_color,imei_ssn,brand_model_name'
  customerId: String = ''
  loading: boolean = false
  customerDevices = []
  device = []
  searchCustomer = ''
  //: FormControl = new FormControl()
  @ViewChild("adddevice",{static: true}) adddevice: AddCustomerDeviceComponent;
  @ViewChild("importModal",{static: true}) importModal: ImportItemsComponent;
  ItemToImport='Device(s)'
  deviceMappedColumns=['Brand And Model',	'Color','IMEI/SN']
  nonSkipAbleFieldsIndex=['Brand And Model',	'Color','IMEI/SN']
  sampleCsvPath='ImportDevices.csv'

  constructor(private customerGQLService: CustomerGQLService,
    private createSaleService: CreateSaleService,
    private saleCartService: SaleCartService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private deleteDevice: DeleteDeviceGQL,
    private permanentDeleteDevice: PermanentDeleteDeviceGQL,
    private restoreDevice: RestoreDeviceGQL,
    private modalService: BsModalService,
    private stockService: StockService,
    private transferDevice: TransferDeviceGQL,
    private mergeDevices: MergeDevicesGQL,
    private importDevice: ImportDevicesGQL
  ) { }

  ngOnInit() {
    this.createSaleService.setSectionTiles('', '', 'Device List', '')
    this.createSaleService.setActiveSection(false, true, false)

    this.route.params.subscribe(params => {
      if (params['customerId']) {
        this.customerId = params['customerId']
        this.saleCartService.setSelectedCustomerId(this.customerId)
        this.getCustomerDevices(params['customerId'])
      } else if (this.saleCartService.getSelectedCustomerId() != '' && this.saleCartService.getSelectedCustomerId() !== undefined) {
        this.getCustomerDevices(this.saleCartService.getSelectedCustomerId())
      }
    });
    // this.searchCustomer.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
    //   this.customerSearchForTransferDevice(this.inputSearchCustomer)
    // });
  }

  getCustomerDevices(id) {
    this.deviceLoader = true
    this.theCheckbox=false
    this.searchDeviceInput['customer_id'] = id
    this.customerGQLService.getDevicesByCustomerId(this.searchDeviceInput).valueChanges.subscribe(
      (res) => {
        this.deviceLoader = false
        console.log('Cust Devices Data-->', res)
        this.loading = false
        this.customerDevices = res['data'].getDevicesByCustomer
        //this work for searching bcz searching pipe works on column data not nested filed
        // for (let i = 0; i < this.customerDevices.length; i++) {
        //   this.customerDevices[i]['brand_model_name'] = this.customerDevices[i].deviceBrand.brand_name
        // }
      }, (err) => {
        this.deviceLoader = false
        this.loading = false
        this.createSaleService.showToaster([err.message, 'error'])
      }
    )
  }

  resetDeviceFilter(){
    this.searchDevice=''
    this.searchDeviceInput = {
      customer_id: '',
      search: '',
      is_active: true,
      location_id: localStorage.getItem('location_id')
    }
    this.getCustomerDevices(this.customerId)
  }

  onBackButtonCLick() {
    //this.saleCartService.setSelectedCustomerId('')
    this.createSaleService.setSectionTiles('', '', 'CUSTOMER LIST', '')
    this.router.navigateByUrl('Pointofsale/CreateSale/Order')
  }

  deviceUpdateOrAdd='Add'
  onAddCustomerDevice(customerId) {
    this.customerId=customerId
    this.adddevice.customerId=customerId
    this.adddevice.deviceUpdateOrAdd='Add'
    this.adddevice.initializeDeviceForm()
  }

  deviceId=''
  onUpdateCustomerDevice(deviceId) {
    this.adddevice.deviceId=deviceId
    this.adddevice.deviceUpdateOrAdd='Update'
    this.adddevice.customerId=this.customerId
    this.adddevice.getDeviceByIdFun()
  }

  checkedAllDevices = false
  theCheckbox = false;
  checkedAllField(list, event) {
    for (let i = 0; i < list.length; i++) {
      list[i]['checked'] = event
    }
    this.theCheckbox = event
    this.SelectAllDropDevices = false
  }

  singleItemChecked(list, index, event) {
    this.theCheckbox = true
    list[index]['checked'] = event.target.checked
    for (let i = 0; i < list.length; i++) {
      if (!list[i]['checked']) {
        this.theCheckbox = false
      }
    }
  }

  //=============================== Merge Devices ===================================//
  showMergeOption = false
  mergeDevicesDate = []
  deviceSettingsOpen = false
  itemCompareYesCheck = false
  showTransferOption = false;
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
        this.theCheckbox = false
        console.log('Merge Device res-->', res['data'].MergeDevices);
        let returnVal = res['data'].MergeDevices
        if (returnVal) {
          this.createSaleService.showToaster(['Merge Device Successfully', 'success'])
          this.getCustomerDevices(this.customerId)
        }
      }, (err) => {
        console.log('Merge Device err -->', err);
        this.createSaleService.showToaster([err.message, 'error'])
      }
    )
  }

  //=============================== End Merge Devices ===================================//
  hideSettingList() {
    this.deviceSettingsOpen = false
    this.SelectAllDropDevices = false
  }

  deviceLoader = false
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
          this.createSaleService.showToaster(['Archived Devices Successfully', 'success'])
          this.getCustomerDevices(this.customerId)
        }
      }, (err) => {
        this.deviceLoader = false
        this.deviceSettingsOpen = false
        console.log(' err', err);
        this.createSaleService.showToaster([err.message, 'error'])
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
          this.createSaleService.showToaster(['Delete Device(s) Successfully', 'success'])
          this.getCustomerDevices(this.customerId)
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
          this.deviceSettingsOpen=false
          this.theCheckbox=false
          this.createSaleService.showToaster(['Active Device(s) Successfully', 'success'])
          this.getCustomerDevices(this.customerId)
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
    this.printLabelProduct = []
    this.inputSearchCustomer['search'] = ''
    this.transferDeviceId
    this.transferCutomerId
    this.searchCustomer = ''
    for (let i = 0; i < this.customerDevices.length; i++) {
      if (this.customerDevices[i]['checked']) {
        this.selectedDeviceIds.push(this.customerDevices[i]['_id'])
        if (check == 'print') {
          this.customerDevices[i]['quantity'] = 1
          this.printLabelProduct.push(this.customerDevices[i])
        }
      }
    }
    if (this.isObjectEmpty(this.selectedDeviceIds)) {
      this.createSaleService.showToaster(["Please select device first", 'error'])
      return
    }
    this.deviceModalFor = check
    this.deviceSettingsOpen = false
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  openPrintLabelFun(template: TemplateRef<any>, cls,device){
    this.printLabelProduct=[]
    device['quantity'] = 1
    this.printLabelProduct.push(device)
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false })
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

  applyActiveArchivedDevicesFilter(value) {
    this.searchDeviceInput['is_active'] = value
    this.getCustomerDevices(this.customerId)
  }

  SelectAllDropDevices = false
  openSelectAllDevices() {
    this.SelectAllDropDevices = !this.SelectAllDropDevices;
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  onDeviceSelect(device) {
    device.isOpen = true;
    device.is_device = true
    device['DeviceCheckIn'] = ''
    device.product_type = InputProductType.Product
    device['deviceProducts'] = []
    
    this.saleCartService.addItemToCart(device)
    this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:ProductList/${device._id})`)
  }
  //======================================== Start Print Label  ==============================================================//

  printLabelProduct = []
  printLabelPluse(index) {
    this.printLabelProduct[index]['quantity'] = Number(this.printLabelProduct[index]['quantity']) + 1
  }

  printLabelMiuns(index) {
    if (this.printLabelProduct[index]['quantity'] == 1) {
      return
    }
    this.printLabelProduct[index]['quantity'] = Number(this.printLabelProduct[index]['quantity']) - 1
  }

  printLabelQuantityInput(index) {
    this.printLabelProduct[index]['printLabelQuantityInput'] = true
  }

  donePrintLabelQuantity(index, val) {
    if (val == '') {
      this.printLabelProduct[index]['printLabelQuantityInput'] = false
      return
    }
    let value = Number(val)
    this.printLabelProduct[index]['quantity'] = value
    this.printLabelProduct[index]['printLabelQuantityInput'] = false
  }

  closePrintLabelPopup() {
    this.modalRef.hide();
  }

  ifPrintInput = true
  ifPrintPreview = false
  openPrintPreview() {
    this.ifPrintInput = false
    this.ifPrintPreview = true
  }

  backPrintPreview() {
    this.ifPrintPreview = false
    this.ifPrintInput = true
  }

  counter(i: number) {
    return new Array(i);
  }

  doneprint() {
    this.ifPrintInput = true
    this.ifPrintPreview = false
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
        this.createSaleService.showToaster([this.selectedDeviceIds.length == 1 ? 'Device(s)' + ' exported successfully.' : 'Device(s)' + ' exported successfully.', 'success'])
      }, (err) => {
        console.log('err while exporting Device', err);
      }
    )
  }

  //=========================================== Transfer Device ======================================//
  locationId = localStorage.getItem('location_id')
  customerList = []
  inputSearchCustomer = {
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
  transferDeviceId = ''
  customerSearchForTransferDevice(inputSearchCustomer, event) {
    if (event.length < 3 && event.length != 0) {
      return
    }
    inputSearchCustomer['search'] = event
    let data = this.customerGQLService.getAllCustomer(inputSearchCustomer)
    data.subscribe(
      (res) => {
        if (res) {
          this.theCheckbox = false
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
        console.log('TransferDevice res', res['data'].TransferDevice);
        let returnVal = res['data'].TransferDevice
        if (returnVal) {
          this.createSaleService.showToaster(['Transfer Device Successfully', 'success'])
          this.getCustomerDevices(this.customerId)
        }
      }, (err) => {
        this.deviceLoader = false
        this.createSaleService.showToaster([err, 'error'])
        console.log('TransferDevice err', err);
      })
  }

  onDeviceHistoryIconClick(deviceId) {
    this.saleCartService.setSelectedCustomerId(this.customerId)
    this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:Device-History/${deviceId})`)

  }
  importDevicesData=[]
  importDevices(data){
   this.importDevicesData=[]
   for (let i = 0; i < data[0].length; i++) {
       let device = {}
       for (let k = 0; k < data[1].length; k++) {
           device[data[1][k]['c_db']] = data[0][i][data[1][k]['c_csv']]
       }
       let dev = {}
       dev['brand_model_name'] = device['Brand And Model'] == undefined ? "" : device['Brand And Model']
       dev['device_color'] = device['Color'] == undefined ? "" : device['Color']
       dev['imei_ssn'] = device['IMEI/SN'] == undefined ? "" : device['IMEI/SN']
       dev['location_id'] = window.localStorage.getItem('location_id')
       this.importDevicesData.push(dev);
   }
   console.log('importDevicesData ---Final-->', this.importDevicesData)
   this.addImportedDevices(this.importDevicesData)
   }
 
  addImportedDevices(data){
   this.importDevice.mutate({
     customer_id:this.customerId.toString(),
     input:data
   }).subscribe(
     (res) => {
         console.log('importDevices res', res['data'].importDevices);
          let returnVal  = res['data'].importDevices
          if(returnVal){
           let message=''
            if(this.isObjectEmpty(returnVal.newlyAddedDevices)){
             if(this.isObjectEmpty(returnVal.InvalidDataDevices)){
               this.createSaleService.showToaster(['Device(s) Not imported due to already exist', 'error'])
             }else{
               if(this.isObjectEmpty(returnVal.alreadyExistDevices)){
                 this.createSaleService.showToaster(['Device(s) Not imported due to Invalid data', 'error'])
               }else{
                 message="Device(s) Not imported. Due to "+returnVal.alreadyExistDevices.length+" Device(s) already exist and"+returnVal.InvalidDataDevices.length+" Device(s) data invalid."
               this.createSaleService.showToaster([message, 'error'])
               }
             }
            }else{
             if(this.isObjectEmpty(returnVal.InvalidDataDevices)&& this.isObjectEmpty(returnVal.alreadyExistDevices)){
               this.createSaleService.showToaster(['Your Device(s) has been imported.', 'success'])
             }
              message=returnVal.newlyAddedDevices.length+" Device(s) has been imported. Other Device(s) not imported due to invalid data or already exist."
              this.createSaleService.showToaster([message, 'success'])
              this.resetDeviceFilter()
             }
          }
     }, (err) => {
         console.log('importDevices err', err);
         this.createSaleService.showToaster([err.message, 'error'])
     })
   }

}
