import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GetCustomersWithSearchGQL, SortType, CustomerHeaderFilter, CustomerFooterFilter, DeleteCustomerGQL, LinkCustomerToStoreGQL, UnLinkCustomerToStoreGQL, RestoreCustomerGQL, MergeCustomerGQL, PermanentDeleteCustomerGQL, ImportCustomerGQL } from "src/app/generated/graphql"
import { CustomerGQLService } from "src/app/services/customer/customerGQL.service"
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ActivationStart, RouterOutlet } from '@angular/router';
import { CustomerService } from "src/app/services/customer/customer.service"
import { Observable } from 'rxjs';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service'
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { StockService } from 'src/app/services/stock/stock.service';
import { ImportItemsComponent } from '../../shared-templates/import-items/import-items.component';
import { YesNoComponent } from '../../shared-templates/yes-no/yes-no.component';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.css']
})
export class CustomerListingComponent implements OnInit, OnDestroy {


  searchCustomer: FormControl = new FormControl()
  customerList: any
  totalCustomers = 0
  isShowCloudCustomer: boolean = false
  arrivalsFilters: String = 'Today'
  refreshCustomerList$: any
  isCustomerLayout: boolean = true;
  modalName = 'Customers'

  loading: boolean = false
  toDate = new Date();
  fromDate = new Date();
  limit: number = 10000
  skip: number = 0
  locationId = localStorage.getItem('location_id')
  // customerFooterFilter = [CustomerFooterFilter.All]
  navigationSource: any
  customerFooterFilter = {
    All: '',
    OverDues: '',
    WithDevice: '',
    WithoutDevice: '',
    HaveStoreCredit: '',
    HaveNetTerm: '',
    MostRecent: ''
  }

  inputSearchCustomer = {
    search: this.searchCustomer.value || '',
    location_id: this.locationId,
    limit: this.limit,
    skip: this.skip,
    is_deleted: false,
    fromDate: "",
    toDate: "",
    is_cloud: false,
    headerFliter: CustomerHeaderFilter.All,
    footerFliter: [CustomerFooterFilter.All]
  }
  @ViewChild("importModal", { static: true }) importModal: ImportItemsComponent;
  @ViewChild('open_removeCustomerFromCart', { static: true }) open_removeCustomerFromCart: any;
  @ViewChild("yesNoModal", { static: true }) yesNoModal: YesNoComponent;

  ItemToImport = 'Customer(s)'
  customersMappedColumns =
    ['First Name', 'Last Name', 'Phone number', 'Email',
      'Address 1', 'Address 2', 'City', 'State', 'Zip Code']
  nonSkipAbleFieldsIndex = ['First Name', 'Last Name', 'Phone number', 'Email',
    'Address 1', 'Address 2', 'City', 'State', 'Zip Code']
  sampleCsvPath = 'ImportCustomers.csv'

  constructor(private customerGQLService: CustomerGQLService,
    private seacrhCustomer: GetCustomersWithSearchGQL,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private outlet: RouterOutlet,
    private saleCartService: SaleCartService,
    private createSaleService: CreateSaleService,
    private modalService: BsModalService,
    private removeCustomer: DeleteCustomerGQL,
    private stockService: StockService,
    private linkCustomerToStore: LinkCustomerToStoreGQL,
    private unLinkCustomerToStore: UnLinkCustomerToStoreGQL,
    private restoreCustomer: RestoreCustomerGQL,
    private mergeCustomer: MergeCustomerGQL,
    private permanentDeleteCustomer: PermanentDeleteCustomerGQL,
    private importCustomer: ImportCustomerGQL,
    private getAllCustomers: GetCustomersWithSearchGQL,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    this.refreshCustomerList$.unsubscribe()
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.navigationSource = data.navigationSource;
      this.UIChangesOnNavigationSource(this.navigationSource)
    })

    if (this.navigationSource == 'createSale') {
      this.createSaleService.setSectionTiles('', '', 'Customer List', '')
      this.createSaleService.setActiveSection(false, true, false)
    }

    this.refreshCustomerList$ = this.customerService.customerList$.subscribe((res) => {
      this.getCustomers(this.inputSearchCustomer)
    });
    this.searchCustomer.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      this.inputSearchCustomer['search'] = this.searchCustomer.value
      this.getCustomers(this.inputSearchCustomer)
    })
  }

  UIChangesOnNavigationSource(navigationSource = this.navigationSource) {

    if (navigationSource == 'customer') {
      this.isCustomerLayout = true
    } else if (navigationSource == 'createSale') {
      this.isCustomerLayout = false
    }
  }

  customerloader = false
  getCustomers(inputSearchCustomer) {
    this.hideSettingList()
    this.theCheckbox = false
    this.customerloader = true
    this.customerList = []
    this.getAllCustomers.watch({
      input: inputSearchCustomer
    }).valueChanges.subscribe(
      (res) => {
        console.log(' res', res['data'].getCustomersWithSearch);
        let returnVal = res['data'].getCustomersWithSearch
        this.customerloader = false
        if (returnVal) {
          this.customerList = returnVal
        }
        console.log('cutomer list-->', this.customerList);
      }, (err) => {
        this.customerService.showToaster([err.message, 'error'])
        console.log('getAllCustomers err', err);
        this.customerloader = false
      })
  }

  crossSearchIcon() {
    this.searchCustomer.reset()
    this.inputSearchCustomer['search'] = ''
    this.getCustomers(this.inputSearchCustomer)
  }

  onCustomerInfoClick(customerId) {
    if (this.navigationSource == 'createSale') {
      this.customerService.setSelectedCustomerId(customerId)
      this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${customerId})`)
    }
  }

  selectedCustomerID=''
  onCustomerListClick(customerId) {
    this.customerService.setSelectedCustomerId(customerId)
    if (this.navigationSource == 'customer') {
      this.selectedCustomerID=customerId
      this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${customerId})`)
    }
  }
  saleCartCustomerId: null
  onCustomerListDoubleClick(customerId) {
    if (this.navigationSource == 'createSale') {
      this.saleCartCustomerId = customerId
      let customer = this.saleCartService.getCustomer()
      if (customer == null || (customer && customer._id == customerId) || this.saleCartService.getSaleCart().length == 0) {
        this.saleCartService.setSelectedCustomerId(customerId)
        this.createSaleService.setSectionTiles('', '', 'Device List', '')
        this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${customerId})`)
      } else {
        this.openModal(this.open_removeCustomerFromCart, 'custModal wd300')
      }
    }
  }
  onDiscardOrder() {
    this.saleCartService.onRefreshScreen()
    this.saleCartService.setSelectedCustomerId(this.saleCartCustomerId)
    this.createSaleService.setSectionTiles('', '', 'Device List', '')
    this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${this.saleCartCustomerId})`)
  }

  onEditCustomer(customerId) {
    if (this.navigationSource == 'createSale')
      this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:EditCustomer/${customerId})`)
  }

  onAddCustomer() {
    if (this.navigationSource == 'customer') {
      this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:Add)`)
    } else if (this.navigationSource == 'createSale') {
      this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:AddCustomer)`)
    }
  }

  showCloudCustomer(isShowCloudCustomer) {
    this.isShowCloudCustomer = isShowCloudCustomer
    this.resetCustomerFilter()
    if (isShowCloudCustomer) {
      this.inputSearchCustomer['is_cloud'] = true
    } else {
      this.inputSearchCustomer.is_cloud = false
    }
    this.getCustomers(this.inputSearchCustomer)
  }

  orderThisMonthFilter() {
    this.inputSearchCustomer
    this.getCustomers(this.inputSearchCustomer)

  }

  customerSettingsOpen = false;
  showMergeOption = false
  mergeCustomerDate = []
  itemCompareYesCheck = false
  openCustomerSettings(list) {
    let count = 0
    this.showMergeOption = false
    this.mergeCustomerDate = []
    this.itemCompareYesCheck = false
    this.customerSettingsOpen = !this.customerSettingsOpen;
    for (let i = 0; i < list.length; i++) {
      if (list[i]['checked']) {
        count = count + 1
        this.mergeCustomerDate.push(list[i])
      }
    }
    if (count == 2) {
      this.showMergeOption = true
    } else {
      this.mergeCustomerDate = []
    }
  }

  changeValue(type, val) {
    this[type] = val
  }

  theCheckbox = false;
  checkedAllField(list, event) {
    for (let i = 0; i < list.length; i++) {
      list[i]['checked'] = event.target.checked
    }
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

  //Cutomers Filter work
  applyActiveArchivedCustomerFilter(value) {
    this.inputSearchCustomer['is_deleted'] = value
    this.getCustomers(this.inputSearchCustomer)
  }

  applyCustomerheaderFliter() {
    if (this.inputSearchCustomer['headerFliter'] != 'one_month') {
      this.inputSearchCustomer['headerFliter'] = CustomerHeaderFilter.OneMonth
    } else {
      this.inputSearchCustomer['headerFliter'] = CustomerHeaderFilter.All
    }
    this.getCustomers(this.inputSearchCustomer)
  }

  todayDate = new Date();
  applyCustomerheaderDateRangeFliter() {
    this.inputSearchCustomer['fromDate'] = this.fromDate == null ? "" : this.fromDate.toString()
    this.inputSearchCustomer['toDate'] = this.toDate == null ? "" : this.toDate.toString()
    this.inputSearchCustomer['headerFliter'] = CustomerHeaderFilter.DateRange
    this.getCustomers(this.inputSearchCustomer)
    this.modalRef.hide()
  }

  applyCustomerFotterFliter(value) {
    switch (value) {
      case 'overDues':
        if (this.customerFooterFilter.OverDues != '') {
          this.customerFooterFilter.OverDues = ''
        } else {
          this.customerFooterFilter.OverDues = 'overDues'
        }
        break;
      case 'with_device':
        if (this.customerFooterFilter.WithDevice != '') {
          this.customerFooterFilter.WithDevice = ''
        } else {
          this.customerFooterFilter.WithDevice = 'with_device'
        }
        break;
      case 'without_device':
        if (this.customerFooterFilter.WithoutDevice != '') {
          this.customerFooterFilter.WithoutDevice = ''
        } else {
          this.customerFooterFilter.WithoutDevice = 'without_device'
        }
        break;
      case 'have_store_credit':
        if (this.customerFooterFilter.HaveStoreCredit != '') {
          this.customerFooterFilter.HaveStoreCredit = ''
        } else {
          this.customerFooterFilter.HaveStoreCredit = 'have_store_credit'
        }
        break;
      case 'have_net_term':
        if (this.customerFooterFilter.HaveNetTerm != '') {
          this.customerFooterFilter.HaveNetTerm = ''
        } else {
          this.customerFooterFilter.HaveNetTerm = 'have_net_term'
        }
        break;
      case 'most_recent':
        if (this.customerFooterFilter.MostRecent != '') {
          this.customerFooterFilter.MostRecent = ''
        } else {
          this.customerFooterFilter.MostRecent = 'most_recent'
        }
        break
      default:
        this.customerFooterFilter.All = 'all'
    }
    let filter = []
    this.customerFooterFilter.OverDues == '' ? "" : filter.push(CustomerFooterFilter.OverDues)
    this.customerFooterFilter.WithDevice == '' ? "" : filter.push(CustomerFooterFilter.WithDevice)
    this.customerFooterFilter.WithoutDevice == '' ? "" : filter.push(CustomerFooterFilter.WithoutDevice)
    this.customerFooterFilter.HaveStoreCredit == '' ? "" : filter.push(CustomerFooterFilter.HaveStoreCredit)
    this.customerFooterFilter.HaveNetTerm == '' ? "" : filter.push(CustomerFooterFilter.HaveNetTerm)
    this.customerFooterFilter.MostRecent == '' ? "" : filter.push(CustomerFooterFilter.MostRecent)
    if (this.isObjectEmpty(filter)) {
      filter.push(CustomerFooterFilter.All)
    }
    this.inputSearchCustomer['footerFliter'] = filter
    this.getCustomers(this.inputSearchCustomer)
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  resetCustomerFilter() {
    this.searchCustomer.reset()
    this.inputSearchCustomer = {
      search: '',
      location_id: this.locationId,
      limit: this.limit,
      skip: this.skip,
      is_deleted: false,
      fromDate: "",
      toDate: "",
      is_cloud: false,
      headerFliter: CustomerHeaderFilter.All,
      footerFliter: [CustomerFooterFilter.All]
    }
    this.customerFooterFilter = {
      All: '',
      OverDues: '',
      WithDevice: '',
      WithoutDevice: '',
      HaveStoreCredit: '',
      HaveNetTerm: '',
      MostRecent: ''
    }
    this.getCustomers(this.inputSearchCustomer)
  }

  hideSettingList() {
    this.customerSettingsOpen = false
  }

  archiveCustomer() {
    this.removeCustomer.mutate({
      customer_id: this.selectedCustomerIds,
      username: '',
      password: ''
    }).subscribe(
      (res) => {
        this.customerSettingsOpen = false
        console.log(' res', res['data'].deleteCustomer);
        let returnVal = res['data'].deleteCustomer
        if (returnVal) {
          if (this.navigationSource == 'createSale') {
            this.createSaleService.showToaster(['Archived Customer Successfully', 'success'])
          } else {
            this.customerService.showToaster(['Archived Customer Successfully', 'success'])
          }
          this.getCustomers(this.inputSearchCustomer)
        }
      }, (err) => {
        this.customerSettingsOpen = false
        console.log(' err', err);
        if (this.navigationSource == 'createSale') {
          this.createSaleService.showToaster([err.message, 'error'])
        } else {
          this.customerService.showToaster([err.message, 'error'])
        }
      }
    )
  }

  activeCustomer() {
    this.restoreCustomer.mutate({
      customer_id: this.selectedCustomerIds,
    }).subscribe(
      (res) => {
        this.customerSettingsOpen = false
        console.log(' res', res['data'].restoreCustomer);
        let returnVal = res['data'].restoreCustomer
        if (returnVal) {
          if (this.navigationSource == 'createSale') {
            this.createSaleService.showToaster(['Active Customer Successfully', 'success'])
          } else {
            this.customerService.showToaster(['Active Customer Successfully', 'success'])
          }

          this.getCustomers(this.inputSearchCustomer)
        }
      }, (err) => {
        this.customerSettingsOpen = false
        console.log(' err', err);
        if (this.navigationSource == 'createSale') {
          this.createSaleService.showToaster([err.message, 'error'])
        } else {
          this.customerService.showToaster([err.message, 'error'])
        }
      }
    )
  }

  customerModalFor = ''
  selectedCustomerIds = []
  downloadCustomerId = ''
  openCustomerModal(iconName, headerText, yesButtonText) {
    this.customerModalFor = iconName
    this.selectedCustomerIds = []
    if (iconName == 'download') {
      this.yesNoModal.iconName = iconName
      this.yesNoModal.headerText = headerText
      this.yesNoModal.yesButtonText = yesButtonText
      this.yesNoModal.openModal()
      return
    }
    // if (this.customerModalFor == 'archive') {
    //   this.customerModalText = 'archive customer(s)'
    // } else if (this.customerModalFor == 'active') {
    //   this.customerModalText = 'active customer(s)'
    // } else if (this.customerModalFor == 'download') {
    //   this.customerModalText = 'download this customer to your store?'
    //   // this.modalRef = this.modalS ervice.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    //   return
    // } else {
    //   this.inValidPass = false
    //   this.inValidEmail = false
    //   this.customerModalText = 'delete customer permanently'
    // }
    for (let i = 0; i < this.customerList.customers.length; i++) {
      if (this.customerList.customers[i]['checked']) {
        this.selectedCustomerIds.push(this.customerList.customers[i]['_id'])
      }
    }
    if (this.isObjectEmpty(this.selectedCustomerIds)) {
      this.customerSettingsOpen = false
      if (this.navigationSource == 'createSale') {
        this.createSaleService.showToaster(['Please select customer first', 'error'])
      } else {
        this.customerService.showToaster(['Please select customer first', 'error'])
      }
      return
    }
    this.yesNoModal.iconName = iconName
    this.yesNoModal.headerText = headerText
    this.yesNoModal.yesButtonText = yesButtonText
    this.yesNoModal.openModal()
    // this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  callFunction(value) {
    this.customerSettingsOpen = false
    if (value) {
      if (this.customerModalFor == 'archive') {
        this.archiveCustomer()
      } else if (this.customerModalFor == 'used') {
        this.activeCustomer()
      } else if (this.customerModalFor == 'download') {
        this.linkCustomerToStoreFun()
      } else {
        this.permanentDeleteCustomerFun()
      }
    }
  }

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  openDeleteCustModal(template: TemplateRef<any>, cls, check) {
    for (let i = 0; i < this.customerList.customers.length; i++) {
      if (this.customerList.customers[i]['checked']) {
        this.selectedCustomerIds.push(this.customerList.customers[i]['_id'])
      }
    }
    if (this.isObjectEmpty(this.selectedCustomerIds)) {
      this.customerSettingsOpen = false
      if (this.navigationSource == 'createSale') {
        this.createSaleService.showToaster(['Please select customer first', 'error'])
      } else {
        this.customerService.showToaster(['Please select customer first', 'error'])
      }
      return
    }
    this.nonDeletedCustomers = []
    this.deletedCustomers = []
    this.inValidPass = false
    this.inValidEmail = false
    this.userPwd = ''
    this.userEmail = ''
    this.customerModalFor = check
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  closeModel() {
    this.modalRef.hide();
  }
  openCompareItemModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  linkCustomerToStoreFun() {
    this.linkCustomerToStore.mutate({
      customerID: this.downloadCustomerId,
      location_id: this.locationId
    }).subscribe(
      (res) => {
        console.log(' res', res['data'].linkCustomerToStore);
        let returnVal = res['data'].linkCustomerToStore
        if (returnVal) {
          // var index = this.customerList.customers.map(x => {
          //   return x._id;
          // }).indexOf(this.downloadCustomerId);
          // if(index!=-1){
          //   this.customerList.customers[index]['is_linked']=true
          // }
          this.searchCustomer.reset()
          this.inputSearchCustomer = {
            search: '',
            location_id: this.locationId,
            limit: this.limit,
            skip: this.skip,
            is_deleted: false,
            fromDate: "",
            toDate: "",
            is_cloud: true,
            headerFliter: CustomerHeaderFilter.All,
            footerFliter: [CustomerFooterFilter.All]
          }
          this.getCustomers(this.inputSearchCustomer)
          if (this.navigationSource == 'createSale') {
            this.createSaleService.showToaster(['Customer download successfully', 'success'])
          } else {
            this.customerService.showToaster(['Customer download successfully', 'success'])
          }
        }
      }, (err) => {
        console.log(' err', err);
        if (this.navigationSource == 'createSale') {
          this.createSaleService.showToaster([err.message, 'error'])
        } else {
          this.customerService.showToaster([err.message, 'error'])
        }
      }
    )
  }

  principalCustomer = []
  selectPrincipalCustomer(item1, item2) {
    this.principalCustomer[0] = item1
    this.principalCustomer[1] = item2
  }

  mergeCustomerFun() {
    console.log("customer principle--->", this.principalCustomer)
    this.customerSettingsOpen = false
    this.mergeCustomer.mutate({
      primaryCustomerID: this.principalCustomer[0]._id,
      secondaryCustomerID: this.principalCustomer[1]._id
    }).subscribe(
      (res) => {
        this.theCheckbox = false
        console.log('Merge Customer res-->', res['data'].MergeCustomer);
        let returnVal = res['data'].MergeCustomer
        if (returnVal) {
          if (this.navigationSource == 'createSale') {
            this.createSaleService.showToaster(['Merge Customer Successfully', 'success'])
          } else {
            this.customerService.showToaster(['Merge Customer Successfully', 'success'])
          }
          this.getCustomers(this.inputSearchCustomer)
        }
      }, (err) => {
        if (this.navigationSource == 'createSale') {
          this.createSaleService.showToaster([err.message, 'error'])
        } else {
          this.customerService.showToaster([err.message, 'error'])
        }
        console.log('Merge Customer err -->', err);
      }
    )
  }

  exportCustomer() {
    let exportCustomer = []
    for (let i = 0; i < this.customerList.customers.length; i++) {
      if (this.customerList.customers[i]['checked'] == true) {
        exportCustomer.push(this.customerList.customers[i]['_id'])
      }
    }
    if (exportCustomer.length != 0) {
      this.stockService.exportCustomer(exportCustomer).subscribe(
        (res) => {
          this.customerSettingsOpen = false
          var blob = new Blob([res], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, 'Customer.csv');
          } else {
            let a = document.createElement('a');
            a.href = url;
            a.download = 'Customer.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          window.URL.revokeObjectURL(url);
          if (this.navigationSource == 'createSale') {
            this.createSaleService.showToaster([exportCustomer.length == 1 ? 'Customer' + ' exported successfully.' : 'Customer' + ' exported successfully.', 'success'])
          } else {
            this.customerService.showToaster([exportCustomer.length == 1 ? 'Customer' + ' exported successfully.' : 'Customer' + ' exported successfully.', 'success'])
          }
        }, (err) => {
          console.log('err while exporting Customer', err);
        }
      )
    } else {
      this.customerSettingsOpen = false
      if (this.navigationSource == 'createSale') {
        this.createSaleService.showToaster(['Please select customer first', 'error'])
      } else {
        this.customerService.showToaster(['Please select customer first', 'error'])
      }
    }
  }

  //============================== Customer Delete Permanent ============================//
  deleteCustomerSubmitted = false
  userEmail = ''
  userPwd = ''
  userMsg = ''
  showToaster = true
  toasterMsg = ''
  toasterType = ''
  deletedCustomers = []
  nonDeletedCustomers = []

  closeToaster() {
    this.showToaster = true
  }

  permanentDeleteCustomerFun() {
    if (!this.stockService.validateEmail(this.userEmail)) {
      this.showToaster = false
      this.toasterMsg = 'Your email is invalid. Please enter correct email'
      this.toasterType = 'error'
      this.inValidEmail = true
      return
    }
    this.permanentDeleteCustomer.mutate({
      location_id: this.locationId,
      customer_id: this.selectedCustomerIds,
      username: this.userEmail,
      password: this.userPwd
    }).subscribe(
      (res) => {
        this.modalRef.hide()
        this.userEmail = ''
        this.userPwd = ''
        this.selectedCustomerIds = []
        this.customerSettingsOpen = false
        console.log('permanentDeleteCustomer res', res['data'].permanentDeleteCustomer);
        let returnVal = res['data'].permanentDeleteCustomer
        if (returnVal) {
          this.nonDeletedCustomers = returnVal.notDeletedCustomers
          this.deletedCustomers = returnVal.deletedCustomers
          if (!this.isObjectEmpty(this.deletedCustomers)) {
            if (this.navigationSource == 'createSale') {
              this.createSaleService.showToaster([this.deletedCustomers.length + ' Customer(s) Deleted Successfully', 'success'])
            } else {
              this.customerService.showToaster([this.deletedCustomers.length + ' Customer(s) Deleted Successfully', 'success'])
            }
            this.getCustomers(this.inputSearchCustomer)
          } else {
            if (this.navigationSource == 'createSale') {
              this.createSaleService.showToaster(['Customer(s) not deleted due to some records', 'error'])
            } else {
              this.customerService.showToaster(['Customer(s) not deleted due to some records', 'error'])
            }
          }
        }
      }, (err) => {
        this.customerSettingsOpen = false
        console.log('permanentDeleteCustomer err', err);
        this.showToaster = false
        this.toasterMsg = err.message
        if (err.message == "GraphQL error: User not found") {
          this.toasterType = 'error'
          this.toasterMsg = "User not found"
          this.inValidPass = true
          this.inValidEmail = true
        }
        if (err.message == "GraphQL error: Incorrect password") {
          this.toasterType = 'error'
          this.toasterMsg = "Incorrect password"
          this.inValidPass = true
        }
        //  if (this.navigationSource == 'createSale'){
        //   this.createSaleService.showToaster([err.message, 'error'])
        // }else{
        // this.customerService.showToaster([err.message, 'error'])
        // }
      }
    )
  }

  inValidEmail = false
  inValidPass = false
  hideError() {
    this.inValidEmail = false
    this.inValidPass = false
  }

  importCustomerData = []
  importCustomers(data) {
    this.importCustomerData = []
    for (let i = 0; i < data[0].length; i++) {
      let customer = {}
      for (let k = 0; k < data[1].length; k++) {
        customer[data[1][k]['c_db']] = data[0][i][data[1][k]['c_csv']]
      }
      let cust = {}
      cust['email'] = customer['Email'] == undefined ? "" : customer['Email']
      cust['first_name'] = customer['First Name'] == undefined ? "" : customer['First Name']
      cust['last_name'] = customer['Last Name'] == undefined ? "" : customer['Last Name']
      cust['phone'] = customer['Phone number'] == undefined ? "" : customer['Phone number']
      cust['address_1'] = customer['Address 1'] == undefined ? "" : customer['Address 1']
      cust['address_2'] = customer['Address 2'] == undefined ? "" : customer['Address 2']
      cust['city'] = customer['City'] == undefined ? "" : customer['City']
      cust['state'] = customer['State'] == undefined ? "" : customer['State']
      cust['zip_code'] = customer['Zip Code'] == undefined ? "" : customer['Zip Code']
      cust['location_id'] = window.localStorage.getItem('location_id')
      this.importCustomerData.push(cust);
    }
    console.log('importCustomerData ---Final-->', this.importCustomerData)
    this.addImportedCustomers(this.importCustomerData)
  }

  addImportedCustomers(data) {
    this.importCustomer.mutate({
      input: data
    }).subscribe(
      (res) => {
        console.log('importCustomer res', res['data'].importCustomer);
        let returnVal = res['data'].importCustomer
        if (returnVal) {
          let message = ''
          if (this.isObjectEmpty(returnVal.newlyAddedCustomers)) {
            if (this.isObjectEmpty(returnVal.InvalidDataCustomers)) {

              if (this.navigationSource == 'createSale') {
                this.createSaleService.showToaster(['Customer(s) Not imported due to already exist', 'error'])
              } else {
                this.customerService.showToaster(['Customer(s) Not imported due to already exist', 'error'])
              }
            } else {
              if (this.isObjectEmpty(returnVal.alreadyExistCustomers)) {
                if (this.navigationSource == 'createSale') {
                  this.createSaleService.showToaster(['Customer(s) Not imported due to Invalid data', 'error'])
                } else {
                  this.customerService.showToaster(['Customer(s) Not imported due to Invalid data', 'error'])
                }
              } else {
                message = "Customer(s) Not imported. Due to " + returnVal.alreadyExistCustomers.length + " Customer(s) already exist and" + returnVal.InvalidDataCustomers.length + " Customer(s) data invalid."
                if (this.navigationSource == 'createSale') {
                  this.createSaleService.showToaster([message, 'error'])
                } else {
                  this.customerService.showToaster([message, 'error'])
                }
              }
            }
          } else {
            if (this.isObjectEmpty(returnVal.InvalidDataCustomers) && this.isObjectEmpty(returnVal.alreadyExistCustomers)) {
              if (this.navigationSource == 'createSale') {
                this.createSaleService.showToaster(['Customer(s) has been imported', 'success'])
              } else {
                this.customerService.showToaster(['Customer(s) has been imported', 'success'])
              }
            }
            message = returnVal.newlyAddedCustomers.length + " Customer(s) has been imported. Other Customer(s) not imported due to invalid data or already exist."
            if (this.navigationSource == 'createSale') {
              this.createSaleService.showToaster([message, 'success'])
            } else {
              this.customerService.showToaster([message, 'success'])
            }
            this.resetCustomerFilter()
          }
        }
      }, (err) => {
        console.log('importCustomer err', err);
        if (this.navigationSource == 'createSale') {
          this.createSaleService.showToaster([err.message, 'error'])
        } else {
          this.customerService.showToaster([err.message, 'error'])
        }
      }
    )
  }

}
