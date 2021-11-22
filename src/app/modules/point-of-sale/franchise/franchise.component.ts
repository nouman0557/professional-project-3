import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { BsDropdownConfig } from "ngx-bootstrap/dropdown";
import { ToasterService } from 'src/app/services/toaster/toaster.service'
import { Papa } from 'ngx-papaparse';
import {
  GetCustomersWithSearchGQL,
  UpdateCustomerGQL,
  // GetAllDevicesGQL,
  VerifyCustomerEmailGQL,
  GetCustomerHistoryGQL,
  ImportCustomerGQL,
  SortType,
  CreateNetTermOfCustomerGQL,
  GetNetTermsLogsGQL,
  CustomerNetTermGQL,
  CreateStoreCreditGQL,
  GetStoreCreditLogsGQL,
  GetReasonsGQL, GetAllDocumentsGQL, ClassificationType,
  CreateTransferCreditGQL, CreateDocumentGQL, ClientStatusType,
  DeleteDocumentGQL,UpdateDocumentGQL, GetDocumentsByClassificationGQL, ClientDocumentStatusGQL,
  ClientDocumentFileUploadGQL,ShareDocumentsGQL,GetStatusGQL,
  CreateStatusGQL,GetStatusByIdGQL,AllowedType,StatusInput, ReasonType
} from "src/app/generated/graphql";
import {
  DeleteCustomerGQL,
  AddCustomerGQL,
  CustomerInput,
} from "src/app/generated/graphql";
import { FormControl } from "@angular/forms";
import { CSVService } from 'src/app/services/csv.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CreateClientGQL, UpdateClientGQL, GetClientGQL, GetAllClientsGQL, DeleteClientGQL, BulkDeleteClientGQL } from "src/app/generated/graphql";

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true }
    }
  ]
})
export class FranchiseComponent implements OnInit {
  itemsPerSlide = 4;
  singleSlideOffset = true;
  cutomerList = true
  paymentList = false
  docListDetail = false
  docList = false
  invoiceList = false
  existingCustomer = true
  newCustomer = false
  facturacionList = true
  facturacionView = false
  facturacionAdd = false
  facturacionEdit = false
  updateCustomer = false
  customerInvoice = false
  customerDoc = false
  cutomerInfo = true
  cutomerInfoDoc = false
  customerDocUpdate = false
  allCustomers = []
  allDevices = []
  createNote = false
  manageCredit = false
  transferCredit = false
  searchC: FormControl = new FormControl();
  loading = false
  hearFrom = 'Email'
  custActions = 'Actions'
  chooseReason = 'Choose Reason'
  inCredit = 'Increase'
  addCustomer: CustomerInput = {
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    can_email: false,
    can_sms: false,
    // can_follow_us: false,
    //marketing_question: this.hearFrom,
    location_id: '',
    Tags: []
  }
  editCustomerData: CustomerInput = {
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    can_email: false,
    can_sms: false,
    // can_follow_us: false,
    //marketing_question: '',
    location_id: '',
  }
  modalRef: BsModalRef;
  customerToDelete = {};
  cumtomerSelected = {};
  addCustomerForm: any;
  submitted = false;
  editCustomerForm: FormGroup;
  applyActiveClass = [];
  custtomerDevice = []
  disable = false
  deviceIssueanditemleftIDs = []
  todayDate = new Date();
  timeNow: any
  col = []
  columnToMap = []
  fileName = ''
  thisStore = true
  cloud = false
  aZOrder = true
  dateOrder = false
  storeName = window.localStorage.getItem('storeName')
  storeType: SortType
  tempCustomer = []
  customerNetTermDetail: any
  customerTags = []
  constructor(
    private createClientGQL: CreateClientGQL,
    private updateClientGQL: UpdateClientGQL,
    private getClientGQL: GetClientGQL,
    private getAllClientsGQL: GetAllClientsGQL,
    private deleteClientGQL: DeleteClientGQL,
    private removeCustomer: DeleteCustomerGQL,
    private seacrhCustomer: GetCustomersWithSearchGQL,
    private addCustomerWithoutDevice: AddCustomerGQL,
    private updateCustomergql: UpdateCustomerGQL,
    private modalService: BsModalService,
    // private getAlldevices: GetAllDevicesGQL,
    private formbulider: FormBuilder,
    private verifyCustomerEmail: VerifyCustomerEmailGQL,
    private toaster: ToasterService,
    private papa: Papa,
    private getCustomerPurchaseHistoryGQL: GetCustomerHistoryGQL,
    private importCustomergql: ImportCustomerGQL,
    private CSVService: CSVService,
    private createNetTermOfCustomer: CreateNetTermOfCustomerGQL,
    private getNetTermsLogs: GetNetTermsLogsGQL,
    private customerNetTerm: CustomerNetTermGQL,
    private createStoreCredit: CreateStoreCreditGQL,
    private getStoreCreditLogs: GetStoreCreditLogsGQL,
    private getReasons: GetReasonsGQL,
    private createTransferCredit: CreateTransferCreditGQL,
    private router: Router,
    private createDocument: CreateDocumentGQL,
    private getAllDocuments: GetAllDocumentsGQL,
    private bulkDeleteClientGQL: BulkDeleteClientGQL,
    private deleteDocument: DeleteDocumentGQL,
    private updateDocument : UpdateDocumentGQL,
    private getDocumentsByClassification: GetDocumentsByClassificationGQL,
    private clientDocumentStatus: ClientDocumentStatusGQL,
    private clientDocumentFileUpload: ClientDocumentFileUploadGQL,
    private shareDocuments: ShareDocumentsGQL,
    private createStatus: CreateStatusGQL,
    private getStatus : GetStatusGQL,
    private getStatusById :GetStatusByIdGQL

  ) {
   
    this.storeType = SortType.Name
  }

  ngOnInit() {
    this.loading = true
    this.getCustomers()
    this.initializeAddCustomerForm()
    this.getAllDocumentsFun()
    this.initializeCreateDocumentForm()
    this.getallStatus()
    this.searchC.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      if (this.searchC.value === '') {
        this.loading = true
        this.getCustomers()
      }
      else {
        let location_id = ''
        if (this.thisStore == true) {
          location_id = localStorage.getItem('location_id')
        }
        if (location_id != '') {
          this.seacrhCustomer.watch({
          }).valueChanges.subscribe(
            (res) => {
              this.allCustomers = JSON.parse(JSON.stringify(res['data'].getCustomersWithSearch))
              for (let i = 0; i < this.allCustomers.length; i++) {
                this.allCustomers[i]['checked'] = false
              }

            }, (err) => {
              console.log('customer search error is ', err);
            }
          )
        } else {
          this.seacrhCustomer.watch({
           
          }).valueChanges.subscribe(
            (res) => {
              this.allCustomers = JSON.parse(JSON.stringify(res['data'].getCustomersWithSearch))
              for (let i = 0; i < this.allCustomers.length; i++) {
                this.allCustomers[i]['checked'] = false
              }

            }, (err) => {
              console.log('customer search error is ', err);
            }
          )
        }
      }
    })
    this.searchCforTransfer.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      this.searchCustomerFroTransferSC()
    })
    this.searchClients.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      this.getAllClientsOfFranchise()
    })
    this.docSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      this.getAllDocumentsFun()
    })
    this.getAllClientsOfFranchise()
    this.initializeAddClientForm()
  }


  /////////////////      ASAD Franchise code start from Here 24/01/20 ///////////////////

  searchClients: FormControl = new FormControl();
  clientSortType = ''

  setClientSortType(type) {
    this.clientSortType = type
    this.getAllClientsOfFranchise()
  }

  setClientsMarketingQuestions(type, field, val) {
    this[type].controls[field].setValue(val)
  }

  getFormValue(type, control) {
    return this[type].controls[control].value
  }

  franchiseClientsList = []
  getAllClientsOfFranchise() {
    let obj = {
      search: this.searchClients.value,
      sortTypeName: this.clientSortType
    }
    obj = this.cleanObject(obj)
    this.getAllClientsGQL.watch({
      input: obj
    }).valueChanges.subscribe(
      (res) => {
        console.log('Franchise clients list is', res['data'].getAllClients);
        this.franchiseClientsList = res['data'].getAllClients
        if (this.franchiseClientsList.length > 0) {
          this.cutomerInfo = true
          this.clientSelected = res['data'].getAllClients[0]
          this.getClientDocumentsFun()
        }
      }, (err) => {
        console.log('Franchise clients list err', err);
      }
    )
  }

  addClientForm: any
  initializeAddClientForm() {
    this.addClientForm = this.formbulider.group({
      email: [, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      first_name: ['', [Validators.required]],
      last_name: [, [Validators.required]],
      address_1: [, [Validators.required]],
      address_2: [, [Validators.required]],
      city: [, [Validators.required]],
      state: [, [Validators.required]],
      zip_code: [, [Validators.required]],
      phone: [, [Validators.required]],
      BusinessLocation: [window.localStorage.getItem('location_id')],
      can_email: [false],
      can_sms: [false],
      status: ['Active', [Validators.required]],
      classification: ['Client', [Validators.required]],
    });
  }

  get fAddClientForm() {
    return this.addClientForm.controls;
  }

  clientSubmitted = false
  addClient() {
    this.clientSubmitted = true
    if (this.addClientForm.invalid) {
      this.toaster.showError('Please fill all the requied fields', '')
      return;
    }
    let obj = this.addClientForm.value
    this.createClientGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        this.getAllClientsOfFranchise()
        console.log('franchise client creates', res['data']);
        this.toaster.showSuccess('Successfully client added', '')
        this.initializeAddClientForm()
        this.newCustomer = false
        this.existingCustomer = true
        this.clientSubmitted = false
      }, (err) => {
        console.log('error while adding franchise client', err);
        this.toaster.showError(err.message, '')
      }
    )
  }

  editClientForm: any
  initializeEditClientForm(data) {
    this.cutomerInfo = false
    this.updateCustomer = true
    this.editClientForm = this.formbulider.group({
      email: [data.email, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      first_name: [data.first_name, [Validators.required]],
      last_name: [data.last_name, [Validators.required]],
      address_1: [data.address_1, [Validators.required]],
      address_2: [data.address_2, [Validators.required]],
      city: [data.city, [Validators.required]],
      state: [data.state, [Validators.required]],
      zip_code: [data.zip_code, [Validators.required]],
      phone: [data.phone, [Validators.required]],
      BusinessLocation: [window.localStorage.getItem('location_id')],
      can_email: [data.can_email],
      can_sms: [data.can_sms],
      status: [data.status, [Validators.required]],
      classification: [data.classification, [Validators.required]],
    });
  }

  get fEditClientForm() {
    return this.editClientForm.controls;
  }

  updateClientSubmitted = false
  updateClient() {
    this.updateClientSubmitted = true
    if (this.editClientForm.invalid) {
      this.toaster.showError('Please fill all the requied fields', '')
      return;
    }
    let obj = this.editClientForm.value
    this.updateClientGQL.mutate({
      _id: this.clientSelected['_id'],
      input: obj
    }).subscribe(
      (res) => {
        if (res['data'].updateClient) {
          this.toaster.showSuccess('Client succesfully updated', '')
          this.getAllClientsOfFranchise()
          this.cutomerInfo = true
          obj['_id'] = this.clientSelected['_id']
          this.clientSelected = JSON.parse(JSON.stringify(obj))
          this.updateCustomer = false
        }
        else {
          this.toaster.showError('Error while updating client', '')
        }
      }, (err) => {
        console.log('ERROR while updating customer', err);
        this.toaster.showError('Error while updating client', '')
      }
    )
  }

  deleteClient(id) {
    this.deleteClientGQL.mutate({
      _id: id
    }).subscribe(
      (res) => {
        if (res['data'].deleteClient) {
          this.getAllClientsOfFranchise()
          this.toaster.showSuccess('Client successfully updated', '')
          this.cutomerInfo = false
          this.clientSelected = {}
        }
        else {
          this.toaster.showError('Error while deleting client', '')
        }
      }, (err) => {
        console.log('Error while deleting client', err);
        this.toaster.showError('Error while deleting client', '')
      }
    )
  }

  clientSelected = {}
  clientInfo(client) {
    this.clientSelected = client
    this.cutomerInfo = true
    this.getClientDocumentsFun()
  }

  contactToExport = []
  allChecked = false
  addContactToExportList(id) {
    if (this.allChecked) {
      this.allChecked = false
      this.contactToExport = []
      for (let i = 0; i < this.franchiseClientsList.length; i++) {
        this.franchiseClientsList[i].is_check = false
      }
      return
    }
    if (id == 'all') {
      this.allChecked = true
      this.contactToExport = this.franchiseClientsList
      for (let i = 0; i < this.franchiseClientsList.length; i++) {
        this.franchiseClientsList[i].is_check = true
      }
      return
    }
    var index = this.franchiseClientsList.map(x => {
      return x._id;
    }).indexOf(id);
    this.franchiseClientsList[index].is_check = true
    this.contactToExport.push(this.franchiseClientsList[index])
  }

  exportClientContacts() {
    if (this.contactToExport.length != 0) {
      this.CSVService.saveAsCSVFile(this.contactToExport, 'ExportContacts');
      this.toaster.showSuccess('Contacts exported', '')
      for (let i = 0; i < this.franchiseClientsList.length; i++) {
        this.franchiseClientsList[i].is_check = false
      }
      this.contactToExport = []
    } else {
      this.toaster.showError('Select Customer', 'Please Select Customer First')
    }
  }

  deleteClientsInBulk() {
    if (this.contactToExport.length == 0) {
      this.toaster.showError('Please select customers first', '')
      return
    }
    let arr = []
    for (let i = 0; i < this.contactToExport.length; i++) {
      arr.push(this.contactToExport[i]._id)
    }
    this.bulkDeleteClientGQL.mutate({
      _id: arr
    }).subscribe(
      (res) => {
        this.contactToExport = []
        this.franchiseClientsList = res['data'].bulkDeleteClient
        this.clientSelected = res['data'].bulkDeleteClient[0]
        for (let i = 0; i < this.franchiseClientsList.length; i++) {
          this.franchiseClientsList[i].is_check = false
        }
        this.contactToExport = []
        arr = []
        this.toaster.showSuccess('Clients successfully removed', '')
      }, (err) => {
        console.log('err whie removing cliennts in bulk', err);
        this.toaster.showError(err.message, '')
      }
    )
  }

  cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  /////////////////      ASAD Franchise code end Here ///////////////////


  changeValue(type, val) {
    this[type] = val
  }
  applyclass(index, cust) {
    this.applyActiveClass = []
    this.applyActiveClass.push(index)
    this.customerToDelete = cust
  }

  emailError = false;
  emailMessage = ''
  verifyCusEmail() {
    if (this.addCustomerForm.controls.email.value === '') {
      this.emailError = true
    }
    else {
      this.verifyCustomerEmail.watch({
        email: this.addCustomerForm.controls.email.value
      }).valueChanges.subscribe(
        (res) => {
          if (res['data'].checkCustomerEmail) {
            this.emailError = false
          }
          else {
            this.emailError = true
            this.emailMessage = 'Email already exists'
          }
        }, (err) => {
          console.log('email ver err', err);
        }
      )
    }
  }

  setMarketingOptions(type, val) {
    this.addCustomer[type] = val
  }

  updateMarketingOptions(type, val) {
    this.editCustomerData[type] = val
  }

  initializeAddCustomerForm() {
    this.addCustomerForm = this.formbulider.group({
      email: [, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      first_name: ['', [Validators.required]],
      last_name: [, [Validators.required]],
      address_1: [, [Validators.required]],
      address_2: [, [Validators.required]],
      city: [, [Validators.required]],
      state: [, [Validators.required]],
      zip_code: [, [Validators.required]],
      phone: [, [Validators.required, Validators.minLength(11)]]
    });
  }

  get fAddCustomerForm() {
    return this.addCustomerForm.controls;
  }

  initializeEditCustomerForm(data) {
    this.editCustomerForm = this.formbulider.group({
      email: [data.email, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      first_name: [data.first_name, [Validators.required]],
      last_name: [data.last_name, [Validators.required]],
      address_1: [data.address_1, [Validators.required]],
      address_2: [data.address_2, [Validators.required]],
      city: [data.city, [Validators.required]],
      state: [data.state, [Validators.required]],
      zip_code: [data.zip_code, [Validators.required]],
      phone: [data.phone, [Validators.required, Validators.minLength(11)]]
    });
  }

  get fEditCustomerForm() {
    return this.editCustomerForm.controls;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  loadSection(val) {
    switch (val) {
      case 'C': {
        this.cutomerList = true
        this.invoiceList = false
        this.paymentList = false
        this.docList = false
        this.customerDoc = false
        this.cutomerInfoDoc = false
        this.customerDocUpdate = false
        this.docListDetail = false
        this.createNote = false
        this.cutomerInfo = false
        this.updateCustomer = false
        this.manageCredit = false
        this.transferCredit = false
        this.cutomerInfo = true
        break;
      }
      case 'P': {
        this.paymentList = true
        this.cutomerList = false
        this.docList = false
        this.customerDoc = false
        this.cutomerInfoDoc = false
        this.customerDocUpdate = false
        this.docListDetail = false
        this.cutomerInfo = false
        this.invoiceList = true
        this.customerInvoice = true
        break;
      }
      case 'D': {
        this.docListDetail = true
        this.docList = true
        this.cutomerInfoDoc = true
        this.customerDoc = false
        this.customerDocUpdate = false
        this.paymentList = false
        this.cutomerList = false
        this.cutomerInfo = false
        this.invoiceList = false
        this.customerInvoice = false
        break;
      }

    }
  }

  getCustomers() {
    this.cutomerInfo = false
    let location_id = ''
    if (this.thisStore == true) {
      location_id = window.localStorage.getItem('location_id')
    }
    if (location_id != '') {
      this.seacrhCustomer.watch({
      
      }).valueChanges.subscribe(
        (res) => {
          this.allCustomers = JSON.parse(JSON.stringify(res['data'].getCustomersWithSearch))
          // this.customerInfo(JSON.parse(JSON.stringify(res['data'].customerSearch[0])))
          // this.cutomerInfo = true
          for (let i = 0; i < this.allCustomers.length; i++) {
            this.allCustomers[i]['checked'] = false
            this.allCustomers[i]['delete'] = false
          }
          if (!this.isObjectEmpty(this.allCustomers)) {
            console.log('all Customers--->', this.allCustomers);
            if (!this.isObjectEmpty(this.tempCustomer)) {
              this.openInfoDiv();
            }
          }
          this.loading = false
        }, (err) => {
          console.log('customer search error is ', err);
          this.loading = false
        }
      )
    } else {
      this.seacrhCustomer.watch({
       
      }).valueChanges.subscribe(
        (res) => {
          this.allCustomers = JSON.parse(JSON.stringify(res['data'].getCustomersWithSearch))
          for (let i = 0; i < this.allCustomers.length; i++) {
            this.allCustomers[i]['checked'] = false
            this.allCustomers[i]['delete'] = false
          }
          if (!this.isObjectEmpty(this.allCustomers)) {
            console.log('all Customers--->', this.allCustomers);
            if (!this.isObjectEmpty(this.tempCustomer)) {
              this.openInfoDiv();
            }
          }
          this.loading = false
        }, (err) => {
          console.log('customer search error is ', err);
          this.loading = false
        }
      )
    }

  }

  addNewCustomer() {
    this.customerTags = []
    this.existingCustomer = false
    this.newCustomer = true
  }

  customerSubmitted = false
  saveCustomer() {
    this.customerSubmitted = true
    if (this.addCustomerForm.invalid && this.emailError) {
      return;
    }
    else {
      let location_id = localStorage.getItem('location_id');
      this.addCustomer['email'] = this.addCustomerForm.controls.email.value
      this.addCustomer['phone'] = this.addCustomerForm.controls.phone.value
      this.addCustomer['first_name'] = this.addCustomerForm.controls.first_name.value
      this.addCustomer['last_name'] = this.addCustomerForm.controls.last_name.value
      this.addCustomer['address_1'] = this.addCustomerForm.controls.address_1.value
      this.addCustomer['address_2'] = this.addCustomerForm.controls.address_2.value
      this.addCustomer['city'] = this.addCustomerForm.controls.city.value
      this.addCustomer['state'] = this.addCustomerForm.controls.state.value
      this.addCustomer['zip_code'] = this.addCustomerForm.controls.zip_code.value
      this.addCustomer['location_id'] = location_id
      for (let i = 0; i < this.customerTags.length; i++) {
        this.allTags.push(this.customerTags[i].name)
      }
      this.addCustomer['Tags'] = this.allTags
      this.addCustomerWithoutDevice.mutate({
        input: this.addCustomer
      }).subscribe(
        (res) => {
          let data = res['data'].createCustomer
          this.allTags = []
          this.customerTags = []
          this.getCustomers();
          this.initializeAddCustomerForm();
          this.customerSubmitted = false
          this.newCustomer = false
          this.existingCustomer = true
          this.custActions = 'Actions'
          this.toaster.showSuccess('Customer Add successfully', 'Customer Add')
        }, (err) => {
          console.log('err in customer adding', err);
          this.allTags = []
          this.toaster.showError('Customer Not Add', 'Customer Not Add Please Try Again')
        }
      )
    }
  }

  infoLoader = false
  customerInfo(customer) {
    this.tempCustomer = customer
    let tags = []
    if (customer['Tags'] != undefined) {
      tags = customer['Tags']
    } else {
      tags = customer['Tag']
    }
    this.infoLoader = true;
    this.editCustomerData = customer
    this.customerNetTermDetail = []
    this.customerNetTermsdata = []
    this.allDevices = []
    this.customerPurchaseHistory = []
    this.customerNetTerms = []
    this.netTermDataforForm = []
    this.storeCreditData = []
    this.userIDForNetTerm = customer._id
    this.userIDForStoreCredit = customer._id
    this.getcustomerNetTerm(customer._id)
    this.getNetTermsLogsData(customer._id)
    this.getAllDevices(customer._id)
    this.getCustomerHistory(customer._id)
    this.getcustomerStoreCredit(customer._id)
    this.getStoreCreditsLogsData(customer._id)
    this.customerTags = tags
    this.netTermDataforForm = customer.net_term
    this.storeCreditData = customer.store_credit
    this.storeCreditData['credit_left'] = this.storeCreditData.credit_amount
    this.existingCustomer = true
    this.cutomerInfo = true
    this.createNote = false
    this.updateCustomer = false
    this.customerInvoice = false
    this.transferCredit = false
    this.manageCredit = false
    this.getClientDocumentsFun()
  }

  customerPurchaseHistory = {}
  customerNetTerms = {}
  getCustomerHistory(customerID) {
    // this.getCustomerPurchaseHistoryGQL.watch({
    //   customerID: customerID
    // }).valueChanges.subscribe(
    //   (res) => {
    //     console.log('customer pur history', res['data'].getCustomerPurchaseHistory);
    //     console.log('customer net history', res['data'].customerNetTerm);
    //     this.customerPurchaseHistory = res['data'].getCustomerPurchaseHistory
    //     this.customerNetTerms = res['data'].customerNetTerm
    //     this.infoLoader = false;
    //   }, (err) => {
    //     console.log('customer history err', err)
    //     this.infoLoader = false;
    //   }
    // )
  }

  locationid = {}
  editCustomer(customer) {
    let location_id = localStorage.getItem('location_id');
    this.existingCustomer = true
    this.cutomerInfo = false
    this.updateCustomer = true
    var index = this.allCustomers.map(x => {
      return x._id;
    }).indexOf(customer);
    this.editCustomerData = this.allCustomers[index]
    this.tempCustomer = this.allCustomers[index]
    this.customerTags = this.editCustomerData['Tag']
    this.locationid['store_name'] = this.editCustomerData.location_id['store_name']
    this.locationid['_id'] = window.localStorage.getItem('location_id')
    this.initializeEditCustomerForm(this.editCustomerData)
    this.editCustomerData['location_id'] = location_id
  }

  cancel(val, val1) {
    this[val] = false
    this[val1] = true
    this.updateCustomer = false;
    this.customerDocUpdate= false;
    this.initializeCreateDocumentForm()
  }

  allTags = []
  updateExistingCustomer() {
    this.allTags = []
    this.customerSubmitted = true
    if (this.editCustomerForm.invalid) {
      return;
    }
    console.log('this.editCustomerData to update', this.editCustomerData);
    let customerToUpdate = JSON.parse(JSON.stringify(this.editCustomerData))
    customerToUpdate['email'] = this.editCustomerForm.controls.email.value
    customerToUpdate['phone'] = this.editCustomerForm.controls.phone.value
    customerToUpdate['first_name'] = this.editCustomerForm.controls.first_name.value
    customerToUpdate['last_name'] = this.editCustomerForm.controls.last_name.value
    customerToUpdate['address_1'] = this.editCustomerForm.controls.address_1.value
    customerToUpdate['address_2'] = this.editCustomerForm.controls.address_2.value
    customerToUpdate['city'] = this.editCustomerForm.controls.city.value
    customerToUpdate['state'] = this.editCustomerForm.controls.state.value
    customerToUpdate['zip_code'] = this.editCustomerForm.controls.zip_code.value
    for (let i = 0; i < this.customerTags.length; i++) {
      this.allTags.push(this.customerTags[i].name)
    }
    customerToUpdate['Tags'] = this.allTags
    delete customerToUpdate['_id']
    delete customerToUpdate['Tag']
    delete customerToUpdate['__typename']
    delete customerToUpdate['checked']
    delete customerToUpdate['delete']
    delete customerToUpdate['net_term']
    delete customerToUpdate['store_credit']
    this.updateCustomergql.mutate({
      customer_id: this.editCustomerData['_id'],
      input: customerToUpdate
    }).subscribe(
      (res) => {
        console.log('customer updated res', res);
        this.getCustomers()
        this.customerTags = []
        this.allTags = []
        this.updateCustomer = false
        this.existingCustomer = true
        this.customerSubmitted = false
        this.toaster.showSuccess('Customer Updated Successfully', 'Customer Updated')
      }, (err) => {
        console.log('err in customer updation', err);
        this.toaster.showError('Customer Cannot Updated', 'Customer not Updated')
        this.allTags = []
      }
    )
  }

  openInfoDiv() {
    var index = this.allCustomers.map(x => {
      return x._id;
    }).indexOf(this.editCustomerData['_id']);
    this.tempCustomer = this.allCustomers[index]
    this.customerInfo(this.tempCustomer)
  }

  selectCustomerId: string
  selectCustomer(selectCustomer) {
    this.cumtomerSelected = selectCustomer
    this.toaster.showSuccess('Customer Selected Successfully', 'Customer Selected')
    this.getCustomerDevices(selectCustomer['_id'])
    this.selectCustomerId = selectCustomer['_id']
  }

  getCustomerDevices(sCusId) {
    // this.getAlldevices.watch({
    //   customer_id: sCusId
    // }).valueChanges.subscribe(
    //   (res) => {
    //     this.custtomerDevice = res['data'].deviceCustomers
    //     console.log('Custtomer Device ------>', this.custtomerDevice)
    //   }, (err) => {
    //     console.log('all devices err', err)
    //   }
    // )
  }

  checkCustomerSelect(template: TemplateRef<any>, cls) {
    if (this.isObjectEmpty(this.cumtomerSelected)) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
    }
    if (this.custtomerDevice.length < 1) {
      this.disable = false
    } else {
      this.disable = true
    }
  }

  deleteSelectedCustomer() {
    this.cumtomerSelected = {}
    this.custtomerDevice = []

  }

  openModal(template: TemplateRef<any>, cls) {
    this.fileName = ''
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
  }

  customerSelected = false
  isCustomerSelected() {
    if (!this.isObjectEmpty(this.customerToDelete)) {
      this.customerSelected = true
    }
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  deleteMultiCustomers() {
    this.custActions = 'Remove Contacts'
    let deleteContactId = []
    let deleteContactdata = []
    for (let i = 0; i < this.allCustomers.length; i++) {
      if (this.allCustomers[i]['checked'] == true) {
        deleteContactId.push(this.allCustomers[i]._id)
        deleteContactdata.push(this.allCustomers[i])
      }
    }
    if (deleteContactId.length != 0) {
      this.removeCustomer.mutate({
        customer_id: deleteContactId,
        username:"",
        password:""
      }).subscribe(
        (res) => {
          if (res['data'].deleteCustomer) {
            this.getCustomers()
            console.log('all customers deleting result ---> ', res);
            console.log('all customers before deleting', this.allCustomers);
            console.log('all customers after deleting', this.allCustomers);
            this.toaster.showSuccess('Customer Deleted', 'Customer Successfully Deleted')
          }
        }, (err) => {
          console.log('remove customer err', err);
          this.toaster.showError('Customer Not Deleted', 'Some thing went wrong while deleting customer')
        }
      )
    } else {
      this.toaster.showError('Select Customer', 'Please Select Customer First')
    }
  }

  deleteCustomer(id) {
    this.removeCustomer.mutate({
      customer_id: id,
      username:"",
      password:""
    }).subscribe(
      (res) => {
        console.log('customer removed res', res);
        if (res['data'].deleteCustomer) {
          this.existingCustomer = true
          console.log('all customers before deleting', this.allCustomers);
          this.getCustomers()
          this.cutomerInfo = false
          console.log('all customers after deleting', this.allCustomers);
          this.toaster.showSuccess('Customer Deleted', 'Customer Successfully Deleted')
        }
      }, (err) => {
        console.log('remove customer err', err);
        this.toaster.showError('Customer Not Deleted', 'Some thing went wrong while deleting customer')
      }
    )
  }

  getAllDevices(customerID) {
    // this.getAlldevices.watch({
    //   customer_id: customerID
    // }).valueChanges.subscribe(
    //   (res) => {
    //     console.log('all devices res', res['data'].deviceCustomers);
    //     this.allDevices = res['data'].deviceCustomers
    //   }, (err) => {
    //     console.log('all devices err', err);
    //   }
    // )

  }

  closeModel() {
    this.mappedColumns = ['First Name', 'Last Name', 'Address 1', 'Address 2',
      'City', 'State', 'ZIP Code', 'Phone Number', 'Email']
    this.modalRef.hide();
    this.customerTags = []
    this.documentFile=null
    this.documentFilename = 'Select Document'
  }

  changeSType() {
    this.cloud = false
    this.thisStore = true
    this.getCustomers()
  }

  changeCType() {
    this.cloud = true
    this.thisStore = false
    this.getCustomers()
  }

  changeAZType() {
    this.storeType = SortType.Name
    this.aZOrder = true
    this.dateOrder = false
    this.getCustomers()
  }
  changeDateType() {
    this.storeType = SortType.Date
    this.dateOrder = true
    this.aZOrder = false
    this.getCustomers()
  }

  //========================================== Strat Import && Export Customer Session ===============================================//

  mappedColumns = ['First Name', 'Last Name', 'Address 1', 'Address 2',
    'City', 'State', 'ZIP Code', 'Phone Number', 'Email']
  dataList = []
  fields = []
  onFileChanged(event) {
    this.fileName = event[0].name
    this.papa.parse(event[0], {
      header: true,
      skipEmptyLines: true,
      complete: (result, file) => {
        console.log(result);
        this.fields = result.meta.fields
        console.log("fields ---->", this.fields);
        this.dataList = result.data;
        this.initializeColumns(result.meta.fields)
      }
    });
  }

  initializeColumns(col) {
    this.columnToMap = []
    for (let i = 0; i < col.length; i++) {
      for (let k = 0; k < this.mappedColumns.length; k++) {
        if (col[i] === this.mappedColumns[k]) {
          this.columnToMap.push({ c_db: col[i], c_csv: this.mappedColumns[k] })
          this.col[i] = this.mappedColumns[k]
        }
      }
      if (this.col[i] == undefined) {
        this.col[i] = 'Select Any'
      }
    }
  }

  skipSlide(index) {
    if (this.fields[index] == 'First Name' || this.fields[index] == 'Last Name' || this.fields[index] == 'Address 1' || this.fields[index] == 'Address 2'
      || this.fields[index] == 'City' || this.fields[index] == 'ZIP Code' || this.fields[index] == 'Phone Number' || this.fields[index] == 'State' || this.fields[index] == 'Email') {
      this.toaster.showError('Field is Must', 'Please Select other one')
      return
    } else {
      console.log('after before', this.fields);
      this.fields.splice(index, 1)
      this.columnToMap.splice(index, 1)
      this.mappedColumns.splice(index, 1)
      this.changeValueOfMapColumns("mappedColumn", this.fields[index], this.fields[index], index)
      console.log('after skip', this.fields);
    }
  }

  changeValueOfMapColumns(type, val, val1, i) {
    this[type] = val
    this.col[i] = val
    this.columnToMap.push({ c_db: val, c_csv: val1 })
    console.log('lsdjsadjasdj', this.columnToMap);
  }

  importCustomerData = []
  custAlreadyEx = 0
  allCustAlredyEx = false
  allCustimport = false
  someCustAlredyEx = false
  insertImportCustomer(importCustData) {
    // console.log("import Cust Data ---->", importCustData);
    // let lenth = importCustData.length
    // this.allCustAlredyEx = false
    // this.allCustimport = false
    // this.someCustAlredyEx = false
    // this.custAlreadyEx = 0
    // this.importCustomergql.mutate({
    //   customerInput: importCustData
    // }).subscribe(
    //   (res) => {
    //     let data = res['data']['importCustomer']
    //     console.log("Import Customer return Value  ---->", data);
    //     // for (let i = 0; i < data.length; i++) {
    //     //   if (data[i]['status'] == true) {
    //     //     this.getCustomers()
    //     //     console.log("all Customers with Import ---->", this.allCustomers);
    //     //   } else {
    //     //     this.custAlreadyEx = Number(this.custAlreadyEx + 1)
    //     //   }
    //     // }
    //     if (lenth == this.custAlreadyEx) {
    //       this.allCustAlredyEx = true
    //     } else if (this.custAlreadyEx == 0) {
    //       this.allCustimport = true
    //       this.getCustomers()
    //       this.toaster.showSuccess('Import Customer successfully', 'Import Customer')
    //     } else {
    //       this.someCustAlredyEx = true
    //       this.getCustomers()
    //       this.toaster.showSuccess('Import Customer successfully', 'Import Customer')
    //     }
    //     this.importCustLoader = false
    //     this.importCustomerData = []
    //     this.mappedColumns = ['First Name', 'Last Name', 'Address 1', 'Address 2',
    //       'City', 'State', 'ZIP Code', 'Phone Number', 'Email']
    //   }, (err) => {
    //     console.log('GQL err', err);
    //     this.importCustLoader = false
    //     this.modalRef.hide()
    //     this.importCustomerData = []
    //     this.mappedColumns = ['First Name', 'Last Name', 'Address 1', 'Address 2',
    //       'City', 'State', 'ZIP Code', 'Phone Number', 'Email']
    //     this.toaster.showError('Customer Not import', 'Please Retry ')
    //   }
    // )
  }

  importCustLoader = true
  doneMapping() {
    this.modalRef.hide()
    this.importCustLoader = true
    for (let i = 0; i < this.dataList.length; i++) {
      let customer0 = {}
      for (let k = 0; k < this.columnToMap.length; k++) {
        customer0[this.columnToMap[k].c_db] = this.dataList[i][this.columnToMap[k].c_csv]
      }
      let customer = {}
      customer['first_name'] = customer0['First Name']
      customer['last_name'] = customer0['Last Name']
      customer['phone'] = customer0['Phone Number']
      customer['email'] = customer0['Email']
      customer['address_1'] = customer0['Address 1']
      customer['address_2'] = customer0['Address 2']
      customer['city'] = customer0['City']
      customer['state'] = customer0['State']
      customer['zip_code'] = customer0['ZIP Code']
      customer['can_email'] = true
      customer['can_sms'] = false
      customer['can_follow_us'] = true
      customer['marketing_question'] = 'Yes'
      customer['location_id'] = window.localStorage.getItem('location_id')
      this.importCustomerData.push(customer);
    }
    this.insertImportCustomer(this.importCustomerData)
  }

  customerCheked(values: any, customer) {
    if (values.target.checked == true) {
      customer.checked = true
    } else {
      customer.checked = false
    }
  }

  allCustomerCheked(values: any) {
    if (values.target.checked == true) {
      for (let i = 0; i < this.allCustomers.length; i++) {
        this.allCustomers[i]['checked'] = true
      }
    } else {
      for (let i = 0; i < this.allCustomers.length; i++) {
        this.allCustomers[i]['checked'] = false
      }
    }
  }

  exportContacts() {
    let exportContact = []
    this.custActions = 'Export Contacts'
    for (let i = 0; i < this.allCustomers.length; i++) {
      let cust = {}
      if (this.allCustomers[i]['checked'] == true) {
        cust['First Name'] = this.allCustomers[i]['first_name']
        cust['Last Name'] = this.allCustomers[i]['last_name']
        cust['Email'] = this.allCustomers[i]['email']
        cust['Phone Number'] = this.allCustomers[i]['phone']
        cust['Address 1'] = this.allCustomers[i]['address_1']
        cust['Address 2'] = this.allCustomers[i]['address_2']
        cust['City'] = this.allCustomers[i]['city']
        cust['State'] = this.allCustomers[i]['state']
        cust['ZIP Code'] = this.allCustomers[i]['zip_code']
        exportContact.push(cust)
      }
    }
    if (exportContact.length != 0) {
      this.CSVService.saveAsCSVFile(exportContact, 'ExportContacts');
    } else {
      this.toaster.showError('Select Customer', 'Please Select Customer First')
    }
  }

  exportSingleContacts(customer) {
    let cust = {}
    let data = []
    cust['First Name'] = customer['first_name']
    cust['Last Name'] = customer['last_name']
    cust['Email'] = customer['email']
    cust['Phone Number'] = customer['phone']
    cust['Address 1'] = customer['address_1']
    cust['Address 2'] = customer['address_2']
    cust['City'] = customer['city']
    cust['State'] = customer['state']
    cust['ZIP Code'] = customer['zip_code']
    data.push(cust)
    this.CSVService.saveAsCSVFile(data, 'ExportContacts');
  }
  //========================================== End Import && Export Customer Session ===============================================//

  //========================================== Strat Manage Customer Net terms =====================================================//

  loadNetTerm() {
    this.cutomerList = true
    this.invoiceList = false
    this.docList = false
    this.docListDetail = false
    this.customerDoc = false
    this.cutomerInfoDoc = false
    this.customerDocUpdate = false
    this.createNote = true
    this.cutomerInfo = false
    this.updateCustomer = false
    this.customerInvoice = false
    this.manageCredit = false;
    this.transferCredit = false
    this.netTermsinitializeFrom()
  }
  loadfacturacionList(){
    this.facturacionList = true
    this.facturacionView = false
    this.facturacionAdd = false
    this.facturacionEdit = false
  }
  loadfacturacionView(){
    this.facturacionList = false
    this.facturacionView = true
    this.facturacionAdd = false
    this.facturacionEdit = false
  }
  loadfacturacionAdd(){
    this.facturacionList = false
    this.facturacionView = false
    this.facturacionAdd = true
    this.facturacionEdit = false
  }
  loadfacturacionEdit(){
    this.facturacionList = false
    this.facturacionView = false
    this.facturacionAdd = false
    this.facturacionEdit = true
  }
  netTermsForm: any
  netTermsSubmitted = false
  userIDForNetTerm = ''
  netTermDataforForm: any
  netTermsinitializeFrom() {
    this.netTermsForm = this.formbulider.group({
      customerId: [this.userIDForNetTerm, [Validators.required]],
      is_increase: [true, [Validators.required]],
      credit_amount: ['', [Validators.required]],
      days: [this.netTermDataforForm.pay_term_number, [Validators.required]],
      interest_rate: [this.netTermDataforForm.interest_rate, [Validators.required]],
      note: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      location_id: [window.localStorage.getItem('location_id'), [Validators.required]]
    });
  }

  get fNetTermsForm() {
    return this.netTermsForm.controls
  }

  netTermReturnValue: any
  netTermsLoader = false
  saveNetTermsForm() {
    this.netTermsLoader = true
    if (this.inCredit == 'Increase') {
      this.netTermsForm.value.is_increase = true
    } else {
      this.netTermsForm.value.is_increase = false
    }
    if (this.netTermsForm.invalid) {
      this.netTermsSubmitted = true;
      this.netTermsLoader = false
      return;
    } else {
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
          this.toaster.showSuccess('Add Net Terms successfully', 'Add Net Term')
          this.getNetTermsLogsData(netTermsFormData.customerId)
          this.netTermDataforForm.pay_term_number = netTermsFormData.days
          this.netTermDataforForm.interest_rate = netTermsFormData.interest_rate
          this.getcustomerNetTerm(netTermsFormData.customerId)
          this.netTermsLoader = false
          this.netTermsinitializeFrom()
          this.getCustomers()
        }, (err) => {
          console.log('Add Net Terms err-->', err);
          if (err == 'Error: GraphQL error: Incorrect password') {
            this.netTermsLoader = false
            this.toaster.showError('Incorrect password', 'Please Enter Correct Password')
          } else {
            this.toaster.showError('Net Terms not updated Please try again', 'Add Net Terms err')
            this.netTermsLoader = false
          }
        }
      )
    }
  }

  customerNetTermsdata: any
  skip = 0
  limit = 1000
  getNetTermsLogsData(customerId) {
    this.getNetTermsLogs.watch({
      limit: 10000,
      skip: 0,
      customerId: customerId,
      locationId: window.localStorage.getItem('location_id')
    }).valueChanges.subscribe(
      (res) => {
        this.customerNetTermsdata = res['data'].getNetTermsLogs
        console.log('get Net Terms Logs res-->', this.customerNetTermsdata)
      }, (err) => {
        console.log('get Net Terms Logs res--> err', err);
      }
    )
  }

  getcustomerNetTerm(customerId) {
    this.customerNetTerm.watch({
      customerId: customerId
    }).valueChanges.subscribe(
      (res) => {
        this.customerNetTermDetail = res['data'].customerNetTerm
        console.log('customer Net Term res-->', this.customerNetTermDetail);
      }, (err) => {
        console.log('customer Net Term err -->', err);
        return err
      }
    )
  }
  //========================================== End Manage Customer Net terms =======================================================//
  //========================================== Strat Manage Customer Store Credit =====================================================//

  loadStoreCredit() {
    this.cutomerList = true
    this.invoiceList = false
    this.docList = false
    this.docListDetail = false
    this.customerDoc = false
    this.cutomerInfoDoc = false
    this.customerDocUpdate = false
    this.createNote = false
    this.cutomerInfo = false
    this.updateCustomer = false
    this.customerInvoice = false
    this.manageCredit = true;
    this.transferCredit = false
    this.StoreCreditsinitializeFrom()
  }

  StoreCreditsForm: any
  StoreCreditsSubmitted = false
  userIDForStoreCredit = ''
  storeCreditData: any
  StoreCreditsinitializeFrom() {
    this.StoreCreditsForm = this.formbulider.group({
      customerId: [this.userIDForStoreCredit, [Validators.required]],
      amount: ['', [Validators.required]],
      reason: [this.chooseReason, [Validators.required]],
      orderId: ['', [Validators.required]],
      note: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      location_id: [window.localStorage.getItem('location_id'), [Validators.required]]
    });
  }

  get fStoreCreditsForm() {
    return this.StoreCreditsForm.controls
  }

  storeCreditReturnValue: any
  storeCreditsLoader = false
  saveStoreCreditsForm() {
    this.storeCreditsLoader = true
    if (this.StoreCreditsForm.invalid) {
      this.StoreCreditsSubmitted = true;
      this.storeCreditsLoader = false
      return;
    } else {
      this.StoreCreditsForm.value.amount = Number(this.StoreCreditsForm.value.amount)
      let storeCreditsFormData = JSON.parse(JSON.stringify(this.StoreCreditsForm.value))
      this.createStoreCredit.mutate({
        customerStoreCreditInput: storeCreditsFormData
      }).subscribe(
        (res) => {
          console.log('Add Store Credit res-->', res);
          this.storeCreditReturnValue = res['data'].createStoreCredit
          this.toaster.showSuccess('Add Store Credit successfully', 'Add Store Credit')
          this.getStoreCreditsLogsData(storeCreditsFormData.customerId)
          this.storeCreditData.credit_amount = Number(this.storeCreditData.credit_amount) + Number(storeCreditsFormData.amount)
          this.storeCreditData.credit_left = this.storeCreditData.credit_amount
          this.storeCreditsLoader = false
          this.StoreCreditsinitializeFrom()
          this.getCustomers()
        }, (err) => {
          console.log('Add Store Credit err-->', err);
          if (err == 'Error: GraphQL error: Incorrect password') {
            this.storeCreditsLoader = false
            this.toaster.showError('Incorrect password', 'Please Enter Correct Password')
          } else {
            this.toaster.showError('Store Credit not updated Please try again', 'Add Store Credit err')
            this.storeCreditsLoader = false
          }
        }
      )
    }
  }
  customerStoreCreditsdata: any
  getStoreCreditsLogsData(customerId) {
    this.getStoreCreditLogs.watch({
      limit: 10000,
      skip: 0,
      customerId: customerId,
      locationId: window.localStorage.getItem('location_id')
    }).valueChanges.subscribe(
      (res) => {
        this.customerStoreCreditsdata = res['data'].getStoreCreditLogs
        console.log('get Store Credit Logs res-->', this.customerStoreCreditsdata)
      }, (err) => {
        console.log('get Store Credit Logs res--> err', err);
      }
    )
  }

  customerStoreCreditReasons = []
  getcustomerStoreCredit(customerId) {
    // this.getReasons.watch({
    //   reason_type: ReasonType.StoreCredit
    // }).valueChanges.subscribe(
    //   (res) => {
    //     this.customerStoreCreditReasons = res['data'].getReasons
    //     this.chooseReason = this.customerStoreCreditReasons[0].reason_name
    //     console.log('customer S C REson res-->', this.customerStoreCreditReasons);
    //   }, (err) => {
    //     console.log('customer  S C REson err -->', err);
    //     return err
    //   }
    // )
  }

  //========================================== End Manage Customer  Store Credit =======================================================//
  //========================================== Start Manage Customer Transfer Store Credit =============================================//

  loadStoreTransCredit() {
    this.cutomerList = true
    this.invoiceList = false
    this.createNote = false
    this.docList = false
    this.customerDoc = false
    this.cutomerInfoDoc = false
    this.customerDocUpdate = false
    this.docListDetail = false
    this.cutomerInfo = false
    this.updateCustomer = false
    this.manageCredit = false;
    this.transferCredit = true
    this.StoreTransCreditsinitializeFrom()
    this.allCustomersFroTransfer = []
    this.customerNameForTransfer = ''
  }
  loadCustomerInvoice() {
    this.cutomerList = false
    this.invoiceList = true
    this.docList = false
    this.docListDetail = false
    this.customerDoc = false
    this.cutomerInfoDoc = false
    this.customerDocUpdate = false
    this.createNote = false
    this.cutomerInfo = false
    this.updateCustomer = false
    this.customerInvoice = true
    this.manageCredit = false
    this.transferCredit = false
  }
  loaddocListDetail() {
    this.cutomerList = false
    this.invoiceList = false
    this.docList = true
    this.docListDetail = true
    this.customerDoc = false
    this.cutomerInfoDoc = true
    this.customerDocUpdate = false
    this.createNote = false
    this.cutomerInfo = false
    this.updateCustomer = false
    this.customerInvoice = false
    this.manageCredit = false
    this.transferCredit = false
  }
  createNewDoc(){
    this.cutomerList = false
    this.invoiceList = false
    this.docList = true
    this.docListDetail = true
    this.customerDoc = true
    this.cutomerInfoDoc = false
    this.customerDocUpdate = false
    this.createNote = false
    this.cutomerInfo = false
    this.updateCustomer = false
    this.customerInvoice = false
    this.manageCredit = false
    this.transferCredit = false
  }
  updateDoc(){
    this.cutomerList = false
    this.invoiceList = false
    this.docList = true
    this.docListDetail = true
    this.customerDoc = false
    this.cutomerInfoDoc = false
    this.customerDocUpdate = true
    this.createNote = false
    this.cutomerInfo = false
    this.updateCustomer = false
    this.customerInvoice = false
    this.manageCredit = false
    this.transferCredit = false
  }
  storeTransCreditsForm: any
  storeTransCreditsSubmitted = false
  userIDForStoreTransCredit = ''
  storeTransCreditData: any
  customerIdForTransfer = ''
  StoreTransCreditsinitializeFrom() {
    this.searchCforTransfer.setValue('')
    this.storeTransCreditsForm = this.formbulider.group({
      toCustomerId: [''],
      fromCustomerId: [this.userIDForStoreCredit, [Validators.required]],
      transferAmount: ['', [Validators.required]],
      note: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      location_id: [window.localStorage.getItem('location_id'), [Validators.required]]

    });
  }

  get fStoreTransCreditsForm() {
    return this.storeTransCreditsForm.controls
  }

  StoreTransCreditReturnValue: any
  StoreTransCreditsLoader = false
  saveStoreTransCreditsForm() {
    if (this.customerIdForTransfer == '') {
      this.toaster.showError('Select Customer', 'Please select customer for transfer')
      return
    }
    this.storeTransCreditsForm.value.toCustomerId = this.customerIdForTransfer
    this.StoreTransCreditsLoader = true
    if (this.storeTransCreditsForm.invalid) {
      this.storeTransCreditsSubmitted = true;
      this.StoreTransCreditsLoader = false
      return;
    } else {
      this.storeTransCreditsForm.value.transferAmount = Number(this.storeTransCreditsForm.value.transferAmount)
      let StoreTransCreditsFormData = JSON.parse(JSON.stringify(this.storeTransCreditsForm.value))
      this.createTransferCredit.mutate({
        customerTransferStoreCreditInput: StoreTransCreditsFormData
      }).subscribe(
        (res) => {
          console.log('Add Store Transfer Credit res-->', res);
          this.StoreTransCreditsLoader = false
          this.StoreTransCreditReturnValue = res['data'].createTransferCredit
          this.toaster.showSuccess('Add Store Transfer Credit successfully', 'Add Store Transfer Credit')
          this.getStoreCreditsLogsData(StoreTransCreditsFormData.fromCustomerId)
          this.storeCreditData.credit_amount = Number(this.storeCreditData.credit_amount) - Number(StoreTransCreditsFormData.transferAmount)
          this.storeCreditData.credit_left = this.storeCreditData.credit_amount
          this.allCustomersFroTransfer = []
          this.StoreTransCreditsinitializeFrom()
          this.customerNameForTransfer = ''
          this.getCustomers()
        }, (err) => {
          console.log('Add Store Transfer Credit err-->', err);
          if (err == 'Error: GraphQL error: Incorrect password') {
            this.StoreTransCreditsLoader = false
            this.toaster.showError('Incorrect password', 'Please Enter Correct Password')
          } else if (err == 'Error: GraphQL error: credit amount is less then to transfer amount') {
            this.StoreTransCreditsLoader = false
            this.toaster.showError('Insufficient Balance', 'Credit amount is less then to transfer amount')
          }
          else {
            this.toaster.showError('Store Transfer Credit not updated Please try again', 'Add Store Transfer Credit err')
            this.StoreTransCreditsLoader = false
          }
        }
      )
    }
  }

  searchCforTransfer: FormControl = new FormControl();
  allCustomersFroTransfer: any
  searchCustomerFroTransferSC() {
    let location_id = localStorage.getItem('location_id')
    this.seacrhCustomer.watch({
     
    }).valueChanges.subscribe(
      (res) => {
        this.allCustomersFroTransfer = JSON.parse(JSON.stringify(res['data'].getCustomersWithSearch))
        console.log('customer search--->', this.allCustomersFroTransfer);
      }, (err) => {
        console.log('customer search for transfer error is ', err);
      }
    )
  }

  customerNameForTransfer = ''
  
  selectCustForTrans(customer) {
    if (customer._id == this.userIDForStoreCredit) {
      this.toaster.showError('Cannot Transfer', 'Please transfer to other')
      return
    }
    this.customerIdForTransfer = customer._id
    this.customerNameForTransfer = customer.first_name
  }

  emptyCustomerName() {
    this.customerNameForTransfer = ''
  }
  //========================================== End Manage Customer Transfer Store Credit =======================================================//

  seeAllOrder() {
    this.router.navigate(['/Pointofsale/Tickets/' + this.editCustomerData['_id']])
  }

  //========================================== Start  Documentation Session - Work From Nouman Saeed =====================================================//

  createDocumentForm: any
  createDocFormSubmitted = false
  createDocumentReturnValue: any
  allDocumentsData: any
  docSearch: FormControl = new FormControl();
  docStatus = ''
  docSortTypeName = 'mostrecent'
  docSelected=[]
  documentLoader=false
  documentUpdateLoader=false
  documentCreateLoader=false
  getAllDocumentsFun() {
    this.documentLoader=true
    this.getAllDocuments.watch({
      input: {
        search: this.docSearch.value==null?"":this.docSearch.value,
        status: this.docStatus,
        sortTypeName: this.docSortTypeName
      }
    }).valueChanges.subscribe(
      (res) => {
        this.documentLoader=false
        console.log('all Documents Data res-->', res);
        this.allDocumentsData = res['data'].getAllDocuments
        this.docSelected=this.allDocumentsData[0]
        this.cancel('customerDocUpdate','cutomerInfoDoc')
      }, (err) => {
        console.log('all Documents Data err-->', err);
        this.documentLoader=false
      }
    )
  }

  createDocumentFun() {
    if (this.createDocumentForm.invalid) {
      this.createDocFormSubmitted = true;
      return;
    }
     if (this.documentFile==null || this.documentFile==undefined) {
      this.toaster.showError('Select Document','Please Select Document to Upload') 
      return;
    } 
     else {
      this.documentCreateLoader=true
      let formInput = JSON.parse(JSON.stringify(this.createDocumentForm.value))
      this.createDocument.mutate({
        file: this.documentFile,
        input: {
          document_name: formInput.document_name,
          status: this.canActiveDoc == true ? ClientStatusType.Active : ClientStatusType.Inactive,
          addressed_to: this.visibilityDoc == true ? ClassificationType.Partner : ClassificationType.Client,
          BusinessLocation: window.localStorage.getItem('location_id'),
        }
      },
      {
        context: {
          useMultipart: true
        }
      }).subscribe(
        (res) => {
          this.documentCreateLoader=false
          console.log('create Document res-->', res);
          this.createDocumentReturnValue = res['data'].createDocument
          this.documentFilename=''
          this.getAllDocumentsFun()
          this.initializeCreateDocumentForm()
          this.toaster.showSuccess('Document Created Successfully', 'Document Created')
        }, (err) => {
          console.log('create Document err--->', err);
          this.documentCreateLoader=false
          this.toaster.showError('Document Not Created. Try Again', 'Document Not Created')
        }
      )
    }
  }

  canActiveDoc=true
  visibilityDoc=true
  initializeCreateDocumentForm() {
    this.documentFile = null
    this.tempDoc = null
    this.canActiveDoc=true
    this.visibilityDoc=true
    this.documentFilename = 'Select Document'
    this.createDocumentForm = this.formbulider.group({
      _id: [''],
      document_name: ['', [Validators.required]],
      file_path: [],
      updated_at: [{value: new Date(this.todayDate), disabled: true }, Validators.required], 

    });
  }

  get fcreateDocumentForm() {
    return this.createDocumentForm.controls
  }

  documentFilename = 'Select Document'
  documentFile: File
  tempDoc:File
  onFileUpload(event) {
     this.documentFilename = 'Select Document'
     let type=''
    if (event.target.files.length !== 0) {
      this.tempDoc = <File>event.target.files[0]
      if(this.tempDoc.type =="" ||this.tempDoc.type==null){
        let toArray =  this.tempDoc.name.split(".");
        type='.'+toArray[1]
      }else{
        type=this.tempDoc.type
      }
      if(type.length>20){
        let toArray =  this.tempDoc.name.split(".");
        type='.'+toArray[1]
      }
      if ( type == 'application/vnd.ms-excel'|| type == 'application/pdf'||  type == '.csv' ||  type == '.docx' ||
           type == '.pptx' || type ==  '.xlsx' || type == '.pdf') {
        this.documentFilename = this.tempDoc.name
        this.documentFile=this.tempDoc
        return
      } else {
        this.toaster.showError('File Not Supported','Try Another File')
        delete event[0]
      }

    }
   
    console.log('document File is --->', this.documentFile);
  }

  updateDocumentFun(){
    this.updateDoc()
    this.createDocumentForm.controls['_id'].setValue(this.docSelected['_id'])
    this.createDocumentForm.controls['document_name'].setValue(this.docSelected['document_name'])
    this.createDocumentForm.controls['file_path'].setValue(this.docSelected['file_path'])
    this.createDocumentForm.controls['file_path'].setValue(this.docSelected['file_path'])
    this.createDocumentForm.controls['updated_at'].setValue(new Date(this.docSelected['updated_at']))
     if(this.docSelected['status']=='Inactive')
    {
      this.canActiveDoc=false
    }else{
      this.canActiveDoc=true
    }
    if(this.docSelected['addressed_to']=='Partner')
    {
      this.visibilityDoc=true
    }else{
      this.visibilityDoc=false
    }
  }
  
  docUpdate(){
    if (this.createDocumentForm.invalid) {
      this.createDocFormSubmitted = true;
      return;
    }
     if (this.documentFile==null || this.documentFile==undefined) {
      this.toaster.showError('Select Document','Please Select Document to Upload') 
      return;
    } 
     else {
      this.documentCreateLoader=true
      let formInput = JSON.parse(JSON.stringify(this.createDocumentForm.value))
      this.updateDocument.mutate({
        _id:this.docSelected['_id'],
        file: this.documentFile,
        input: {
          document_name: formInput.document_name,
          status: this.canActiveDoc == true ? ClientStatusType.Active : ClientStatusType.Inactive,
          addressed_to: this.visibilityDoc == true ? ClassificationType.Partner : ClassificationType.Client,
          BusinessLocation: window.localStorage.getItem('location_id'),
        }
      },
      {
        context: {
          useMultipart: true
        }
      }).subscribe(
        (res) => {
          this.documentCreateLoader=false
          console.log('Update Document res-->', res);
          this.createDocumentReturnValue = res['data'].updateDocument
          this.getAllDocumentsFun()
          this.initializeCreateDocumentForm()
          this.toaster.showSuccess('Document Updated Successfully', 'Document Updated')
          this.cancel('customerDocUpdate','cutomerInfoDoc')
        }, (err) => {
          console.log('Update Document err--->', err);
          this.documentCreateLoader=false
          this.toaster.showError('Document Not Updated. Try Again', 'Document Not Updated')
        }
      )
    }

  }

  removeDocument(){
    this.modalRef.hide()
    this.deleteDocument.mutate({
      _id:this.docSelected['_id']
    }).subscribe(
      (res) => {
          console.log('Document Delete ', res);
          this.toaster.showSuccess('Document Delete Successfully', 'Document Delete')
          this.getAllDocumentsFun()
        }, (err) => {
        console.log('Document Delete Error err', err);
      }
  )
  }

  downloadDocument(docUrl){
    const url= 'http://3.227.161.233:5001/upload'+docUrl;
    window.location.href=url
    // var a = document.createElement('a')
    // a.href = url;
    // a.download = "Document" + new Date().getTime()
    // a.click();
    // window.URL.revokeObjectURL(url);
    // a.remove();
  }

  mostrecent=true
  alphabetically=false
  changeDocAZType1(tax){
    this.docSortTypeName=tax
    this.mostrecent = false
    this.alphabetically = true
    this.getAllDocumentsFun()
  }

  changeDocAZType2(tax){
    this.docSortTypeName=tax
    this.mostrecent = true
    this.alphabetically = false
    this.getAllDocumentsFun()
  }

  documentSelect(document){
    this.docSelected=document
  }

  updateDocOptions(type, val) {
    this[type] = val
  }

  //========================================== End Documentation Session - Work From Nouman Saeed =======================================================//

  //------------------------------------------Start Documentation Tab Session ---------------------------------//

  docUploadLoader=false
  updatedDocumentFile(){
    this.docUploadLoader=true
    if(!this.isObjectEmpty(this.documentFile)){
      this.toaster.showError('Select Document','Please Select Document to Upload')
      this.docUploadLoader=false
      return
    }
    this.clientDocumentFileUpload.mutate({
      client_id:  this.clientSelected['_id'],
      document_id:  this.modelDocument['document_id'],
      file: this.documentFile,
    },
    {
      context: {
        useMultipart: true
      }
    }).subscribe(
      (res) => {
        this.docUploadLoader=false
        console.log('Update Document res-->', res);
        // this.createDocumentReturnValue = res['data'].clientDocumentFileUpload
        this.getClientDocumentsFun()
        this.toaster.showSuccess('Document Updated Successfully', 'Document Updated')
        this.modalRef.hide()
        this.documentFile=null
        this.documentFilename = 'Select Document'
      }, (err) => {
        console.log('Update Document err--->', err);
        this.docUploadLoader=false
        this.toaster.showError('Document Not Updated. Try Again', 'Document Not Updated')
      }
    )
  }

  shareDocumentwithEmail=false
  shareDocumentwithSms=false
  shareDocumentwithWhatsapp=false
  shareDocumentsFun(){
    if(this.shareDocumentwithEmail==true || this.shareDocumentwithSms==true ||this.shareDocumentwithWhatsapp==true ){
    this.shareDocuments.watch({
     input:{
      can_email: this.shareDocumentwithEmail,
      can_sms: this.shareDocumentwithSms,
      can_whatsApp: this.shareDocumentwithWhatsapp,
      clientId: this.clientSelected['_id'],
      documentId: this.modelDocument['document_id'],
     }
      }).valueChanges.subscribe(
          (res) => {
            this.modalRef.hide()
              console.log('share Documents res', res['data'].shareDocuments);
              this.toaster.showSuccess('Document share successfully', 'Document Share')
              this.changeStatus("Sent","green")
              this.shareDocumentwithEmail=false
              this.shareDocumentwithSms=false
              this.shareDocumentwithWhatsapp=false
          }, (err) => {
              console.log('share Documents err', err);
              this.toaster.showError('Documnet not share. try again.', 'Something went worng')
          }
      )
       
    }else{
          this.toaster.showError('Please select any option.', 'Select First')
        }
  }

  clientDocumentLoader=false
  clientDocumentsData=[]
  getClientDocumentsFun() {
    this.clientDocumentLoader=true
    this.getDocumentsByClassification.watch({
        //search: this.docSearch.value==null?"":this.docSearch.value,
        client_id:this.clientSelected['_id'],
        classification: this.clientSelected['classification']=="Client"? ClassificationType.Client:ClassificationType.Partner
    }).valueChanges.subscribe(
      (res) => {
        this.clientDocumentLoader=false
        console.log('all clientDocumentLoader Data res-->', res);
        this.clientDocumentsData = res['data'].getDocumentsByClassification
        this.cancel('clientDocumentLoader','cutomerInfoDoc')
      }, (err) => {
        console.log('all clientDocumentLoader Data err-->', err);
        this.clientDocumentLoader=false
      }
    )
  }

  newStatusText=""
  newStatusColor='green'
  changeStatus(value,color){
    let statusInput:any
    let obj={}
    obj['status_name']=value
    obj['businessLocation']=window.localStorage.getItem('location_id')
    obj['status_background_color']=color
    obj['status_font_color']=color
    obj['status_type']=AllowedType.Document,
    statusInput=obj
    this.clientDocumentStatus.mutate({
      client_id: this.clientSelected['_id'],
      document_id: this.modelDocument['document_id'],
      input:statusInput
    }).subscribe(
      (res) => {
          console.log('clientDocumentStatus res', res);
          let returnVal = res['data'].clientDocumentStatus
          if(returnVal){
          this.modelDocument['document_status']['status_name']=value
          this.modelDocument['document_status']['status_background_color']=color
          this.toaster.showSuccess('Status Updated Successfully', 'Status Updated')
        }else{
          this.toaster.showError('Status Not Updated Please Try Again','Status Not Update')
        }
      }, (err) => {
          console.log('clientDocumentStatus err', err);
      }
  )
    this.modalRef.hide()
  }

  createNewStatusColor(color){
    this.newStatusColor=color
  }

  statusLoader=false
  createNewStatus(){
    this.statusLoader=true
    if(this.newStatusText==""){
      this.toaster.showError('Please Enter Status Name First','Status Name')
      this.statusLoader=false
      return
    }
    let statusInput:any
    let obj={}
    obj['status_name']=this.newStatusText
    obj['businessLocation']=window.localStorage.getItem('location_id')
    obj['status_background_color']=this.newStatusColor
    obj['status_font_color']=this.newStatusColor
    obj['status_type']=AllowedType.Document,
    statusInput=obj
    this.createStatus.mutate({
      input:statusInput
    }).subscribe(
      (res) => {
        this.statusLoader=false
          console.log('createStatus res', res);
          let returnVal = res['data'].createStatus
          this.newStatusText=""
          this.newStatusColor='green'
          this.beforeClick = true
          this.afterClick = false
          this.getallStatus()
      }, (err) => {
        this.beforeClick = true
        this.afterClick = false
        this.statusLoader=false
        this.toaster.showError('Something went wrong. Try again','')
          console.log('createStatus err', err);
      }
  )
  } 

  allStatusData=[]
  getallStatus(){
    this.getStatus.watch({
      businessLocation: window.localStorage.getItem('location_id'),
      status_type: AllowedType.Document
  }).valueChanges.subscribe(
      (res) => {
          console.log('allStatusData res', res);
          this.allStatusData = res['data'].getStatus
      }, (err) => {
          console.log('allStatusData err', err);
      }
  )
  }

  beforeClick = true
  afterClick = false
  loadaddLabel(){
    this.beforeClick = false
    this.afterClick = true
  }

  loaddoneLabel(){
    this.beforeClick = true
    this.afterClick = false
  }

  modelDocument=[]
  model_Document(template: TemplateRef<any>, cls,document) {
    this.modelDocument=document
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

   //------------------------------------------End Documentation Tab Session ---------------------------------//

  model_remove(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }
}
