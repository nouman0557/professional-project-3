import { Component, OnInit, TemplateRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service'
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {
  GetDeviceByIdGQL, FilterType, ProductTypes, GetProductsAndSearchGQL, CreateTransactionCustomerAlertGQL, AlertTypeEnum,
  EditExtraItemGQL, AddExtraItemsGQL, GetExtraItemListsGQL, DeleteExtraItemGQL, GetSupplierProductsAndSearchGQL, GetDeviceProductAndServiceGQL
} from 'src/app/generated/graphql';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerGQLService } from 'src/app/services/customer/customerGQL.service';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSaleGQLService } from 'src/app/services/create-sale/create-sale-gql.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-extra-item',
  templateUrl: './extra-item.component.html',
  styleUrls: ['./extra-item.component.css']
})
export class ExtraItemComponent implements OnInit {
  modalRef: BsModalRef;
  deviceSelected = false
  deviceModelName = ''
  transactionKeepingUnit = ''
  customerName = ''
  deviceId = ''
  customerId = ''
  transactionId = ''
  $deviceDetails: any
  productSearchString = 'product_name,sku'
  constructor(
    private getDeviceById: GetDeviceByIdGQL,
    private modalService: BsModalService,
    provide: BsDropdownConfig,
    private _repairRoomService: RepairRoomService,
    private formbulider: FormBuilder,
    private getAllProductsGQL: GetSupplierProductsAndSearchGQL,
    private createTransactionCustomerAlert: CreateTransactionCustomerAlertGQL,
    private addExtraItems: AddExtraItemsGQL,
    private getExtraItemLists: GetExtraItemListsGQL,
    private customerGQLService: CustomerGQLService,
    private editExtraItem: EditExtraItemGQL,
    private deleteExtraItem: DeleteExtraItemGQL,
    private saleCartService: SaleCartService,
    private router: Router,
    private route: ActivatedRoute,
    private getDeviceProductAndService: GetDeviceProductAndServiceGQL,
    private createSaleGQLService: CreateSaleGQLService,
  ) { }

  deviceData = []
  productTypeFiler = 'AllProducts'
  searchProduct = ''//: FormControl = new FormControl();
  fetchAllProducts = true
  allProducts = []
  loadProducts = false
  deviceSelectedForProduct = true
  // prductListingSerchFilter = {
  //   businessLocation: localStorage.getItem('location_id'),
  //   productType: ProductTypes[this.productTypeFiler],
  //   is_product: this.deviceSelectedForProduct,
  //   device_id: this.deviceId==''?null:this.deviceId,
  //   search: this.searchProduct.value == null ? '' : this.searchProduct.value
  // }

  ngOnInit() {
    // this.searchProduct.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
    //   this.getAllProductsNew()
    // })
    this.deviceData = this._repairRoomService.getTempDataForReturnCheckIn()
    if (!this.isObjectEmpty(this.deviceData)) {
      this.openExtraItemSession(this.deviceData)
      this.deviceSelected = true
    }
    this._repairRoomService.setTabTile('', 'Extra Item', '')
    this._repairRoomService.setActiveTab(true, false)
    this.getReasons()
    this.$deviceDetails = this._repairRoomService.deviceDetails$.subscribe((res) => {
      if (!this.isObjectEmpty(res)) {
        this.deviceData = res
        console.log('This Device andCustomer info from Task Detail-->', res)
        this.openExtraItemSession(res)
      } else {
        this.deviceSelected = false
        this.disgardEveryThing()
      }
    });
  }


  getAllProductsNew() {
    // let input = {
    //   businessLocation: localStorage.getItem('location_id'),
    //   productType: this.deviceSelectedForProduct==true? ProductTypes.Service:ProductTypes.Product,
    //   is_product: false,
    //   device_id: this.deviceId,
    //   search: this.searchProduct.value == null ? '' : this.searchProduct.value
    // }
    this.loadProducts = true
    this.getDeviceProductAndService.watch({
      deviceID: this.deviceId,
      location_id: this.locationId,
      is_product: !this.deviceSelectedForProduct
    }).valueChanges.subscribe(
      (res) => {
        this.loadProducts = false
        this.allProducts = res['data'].getDeviceProductAndService
        console.log('all products are', this.allProducts);
      }, (err) => {
        this.loadProducts = false
        console.log('error while fetching products', err);
      }
    )
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  sellLineID = ''
  sellLineServiceModelID = ''
  itemArrayIds = []
  addItem = true
  openExtraItemSession(data) {
    this.deviceSelected = true
    this.deviceModelName = data['deviceModelName'] == null ? "Model N/A" : data['deviceModelName']
    this.transactionKeepingUnit = data['transactionKeepingUnit']
    this.customerName = data['first_name'] + " " + data['last_name']
    this.deviceId = data['deviceId']
    this.customerId = data['customerId']
    this.transactionId = data['transactionId']
    let dev = {}
    dev['_id'] = data['deviceId']
    dev['device_keeping_unit'] = data['device_keeping_unit']
    this._repairRoomService.setDeviceId(dev)
    let cus = {}
    cus['_id'] = data['customerId']
    cus['phone'] = data['phone']
    cus['first_name'] = data['first_name']
    cus['last_name'] = data['last_name']
    this.deviceSelectedForProduct = data['deviceSelectedForProduct']
    this.sellLineID = data['sellLineID']
    this.sellLineServiceModelID = data['sellLineServiceModelID']
    this.itemArrayIds = data['itemArrayIds']
    this.addItem = data['addItem']
    this._repairRoomService.setCustomerId(cus)
    this.disgardEveryThing()
    // this.getExtraItems()
    this.getAllProductsNew()
  }

  disgardEveryThing() {
    this.initializeExtraItemsForm()
    this.searchExtraProduct = ''
    this.extraItemList = false
    this.editExtra = false
    this.index = -1
    this.isExistingItems = false
    this.addExtraSubmitted = false
    this.searchExtraProduct = ''
    this.alertTime = ''
    this.alertAction = ''
  }

  editExtra = false
  index: any
  isExistingItems = false
  openRemoveProductModel(template: TemplateRef<any>, cls, ind, item) {
    this.isExistingItems = item
    this.index = ind
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  closeModel() {
    this.modalService.hide(1);
  }

  goToComponent(componentName) {
    this._repairRoomService.goToComponent(componentName, this.deviceData)
  }

  extraItemList = false
  extraItemsForm: any
  initializeExtraItemsForm() {
    this.extraItemList = false
    this.searchExtraProduct = ''
    this.addExtraSubmitted = false
    this.selectedReason = 'Select Reason'
    this.extraItemsForm = this.formbulider.group({
      deviceID: [this.deviceId, [Validators.required]],
      productID: ['', [Validators.required]],
      supplier_sku: [''],
      supplierId: [''],
      quantity: ['1', [Validators.required]],
      serial_no: ['N/A', [Validators.required]],
      reason: ['N/A', [Validators.required]],
      transactionID: [this.transactionId, [Validators.required]],
      sellLineID: [this.sellLineID],
      sellLineServiceModelID: [this.sellLineServiceModelID],
      isProductAddDevice: [this.deviceSelectedForProduct],
      locationID: [this.locationId, [Validators.required]],
    });
  }

  get faddExtraItem() {
    return this.extraItemsForm.controls;
  }

  addExtraSubmitted = false
  extraItems = []
  searchExtraProduct = ''
  addExtraItem(pro) {
    // if (this.extraItemsForm.invalid) {
    //     this.addExtraSubmitted = true
    //     return
    // }
    this.extraItemsForm.controls['productID'].setValue(pro['_id'])
    if (!this.isObjectEmpty(pro['supplier'])) {
      this.extraItemsForm.controls.supplier_sku.setValue(pro['supplier_sku'])
      this.extraItemsForm.controls['supplierId'].setValue(pro['supplier']._id)
    } else {
      this.extraItemsForm.controls.supplier_sku.setValue(null)
      this.extraItemsForm.controls['supplierId'].setValue(null)
    }
    let input = JSON.parse(JSON.stringify(this.extraItemsForm.value))

    for (let i = 0; i < this.itemArrayIds.length; i++) {
      if (pro['_id'] == this.itemArrayIds[i]) {
        this._repairRoomService.showToaster(['This item already added', 'error'])
        return
      }
    }
    if (!this.addItem) {
      this._repairRoomService.showToaster(['You already added the item', 'error'])
      return
    }
    input['quantity'] = Number(input['quantity'])
    if (this.deviceSelectedForProduct) {
      delete input['sellLineServiceModelID']
      delete input['sellLineID']
    }
    if (input['sellLineServiceModelID'] == null) {
      delete input['sellLineServiceModelID']
    }
    // if(input['quantity']<1){
    //   this._repairRoomService.showToaster(["Quantity must be grater then 0", 'error'])
    //   return
    // }
    console.log('extra item input', input)
    this.extraItemLoader = true
    this.addExtraItems.mutate({
      input: input
    }).subscribe(
      (res) => {
        this.extraItemLoader = false
        console.log('addExtraItems res', res['data'].addExtraItems);
        let returnVal = res['data'].addExtraItems
        let taskDetail = this._repairRoomService.getTaskDeatil()
        let device = taskDetail['Devices'].find(deviceDetail => deviceDetail.device._id == input.deviceID);
        returnVal.Product['serviceProduct'] = returnVal.serviceProduct

        if (this.deviceSelectedForProduct) {
          device.repair_count += 1
          device.deviceItems.push(this._repairRoomService.deviceItemMapper(returnVal))
          console.log("Device update", device)

        } else {
          let deviceItems = device.deviceItems.find(deviceItem => deviceItem._id === input.sellLineID)
          deviceItems.Product.serviceProduct = returnVal.serviceProduct
        }
        if (returnVal) {
          this._repairRoomService.showToaster(['Extra item added successfully', 'success'])
          this.initializeExtraItemsForm()
          this._repairRoomService.isListing = false;
          this.getAllProductsNew()

          //this._repairRoomService.setCheckExtraItem(true)
        }
      }, (err) => {
        this.extraItemLoader = false
        this._repairRoomService.showToaster([err.message, 'error'])
        console.log('addExtraItems err', err);
      })

  }

  getExtraItems() {
    this.extraItemLoader = true
    this.getExtraItemLists.watch({
      deviceID: this.deviceId,
      transactionID: this.transactionId,
      locationID: this.locationId
    }).valueChanges.subscribe(
      (res) => {
        this.extraItemLoader = false
        console.log('getExtraItemLists res', res['data'].getExtraItemLists);
        let returnVal = res['data'].getExtraItemLists
        if (returnVal) {
          this.extraItems = []
          for (let i = 0; i < returnVal.length; i++) {
            let obj = {}
            obj['deviceID'] = this.deviceId
            obj['productID'] = returnVal[i]['Product']._id
            obj['_id'] = returnVal[i]['_id']
            obj['productName'] = returnVal[i]['Product'].product_name
            obj['supplier_sku'] = returnVal[i]['supplier_sku']
            obj['supplierId'] = returnVal[i]['Supplier'] == null ? "" : returnVal[i]['Supplier']._id
            obj['quantity'] = returnVal[i]['quantity']
            obj['serial_no'] = returnVal[i]['serial_number']
            obj['reason'] = returnVal[i]['reason']
            obj['transactionID'] = this.transactionId
            obj['editExtra'] = false
            this.extraItems.push(obj)
          }
        }
      }, (err) => {
        this.extraItemLoader = false
        console.log('getExtraItemLists err', err);
      }
    )
  }

  addExistingExtraItems(pro) {
    // for (let i = 0; i < this.extraItems.length; i++) {
    //     if (this.extraItems[i].productID == pro.ProductID) {
    //       this.extraItems[i].quantity=Number(this.extraItems[i].quantity)+1
    //  this.updateExtraItems(i)
    //       this.extraItemList=false
    //         return
    //     }
    // }
    this.searchExtraProduct = pro['product_name']
    this.extraItemsForm.controls['productID'].setValue(pro['ProductID'])
    if (pro['supplier'] != '') {
      this.extraItemsForm.controls.supplier_sku.setValue(pro['supplier_sku'])
      this.extraItemsForm.controls['supplierId'].setValue(pro['supplier']._id)
    } else {
      this.extraItemsForm.controls.supplier_sku.setValue('')
      this.extraItemsForm.controls['supplierId'].setValue('')
    }
    this.extraItemsForm.controls.quantity.setValue(1)
    this.extraItemList = false
  }

  showExtraItemList(bool) {
    this.extraItemList = bool
  }

  editExtraItems(index) {
    this.initializeExtraItemsForm()
    this.extraItems[index]['editExtra'] = true
  }

  updateExtraItems(index) {
    this.extraItems[index]['quantity'] = Number(this.extraItems[index]['quantity'])
    if (this.extraItems[index]['quantity'] < 1) {
      this._repairRoomService.showToaster(["Quantity must be grater then 0", 'error'])
      return
    }
    this.extraItemLoader = true
    this.extraItems[index]['editExtra'] = false
    //  this.editExtraItem.mutate({
    //  sellLineID:this.extraItems[index]['_id'],
    //  input:{
    //    transactionID:this.transactionId,
    //    deviceID: this.deviceId,
    //    productID: this.extraItems[index]['productID'],
    //    supplier_sku:this.extraItems[index]['supplier_sku'] ,
    //    supplierId:this.extraItems[index]['supplierId'] ,
    //    quantity: this.extraItems[index]['quantity'],
    //    serial_no: this.extraItems[index]['serial_no'],
    //    reason: this.extraItems[index]['reason'],
    //    locationID:this.locationId,
    //  }
    //  }).subscribe(
    //    (res) => {
    //      this.extraItemLoader=false
    //        console.log('editExtraItem res', res['data'].editExtraItem);
    //        if(res['data'].editExtraItem){
    //          this.initializeExtraItemsForm()
    //          this.getExtraItems()
    //          this._repairRoomService.showToaster(['Extra item updated successfully', 'success'])
    //          this._repairRoomService.setCheckExtraItem(true)
    //        }
    //    }, (err) => {
    //      this.extraItemLoader=false
    //      this._repairRoomService.showToaster([err.message, 'error'])
    //        console.log('editExtraItem err', err);
    //    })
  }

  existingProducts = []
  extraItemLoader = false
  locationId = window.localStorage.getItem('location_id')
  getAllProducts() {
    if (this.searchExtraProduct.length < 3 && this.searchExtraProduct != "") {
      return
    }
    this.existingProducts = []
    let obj = {
      locationId: this.locationId,
      search: this.searchExtraProduct
    }
    this.getAllProductsGQL.watch(JSON.parse(JSON.stringify(obj))).valueChanges.subscribe(
      (res) => {
        this.extraItemList = true
        console.log('all products res', res['data'].getSupplierProductsAndSearch);
        this.existingProducts = res['data'].getSupplierProductsAndSearch
      }, (err) => {
        console.log('all products err', err)
      }
    )
  }

  removeProduct() {
    this.modalService.hide(1);
    this.extraItemLoader = true
    this.extraItems[this.index]['editExtra'] = false
    //  this.deleteExtraItem.mutate({
    //    sellLineID:this.extraItems[this.index]['_id'],
    //    deviceID:this.deviceId,
    //    transactionID:this.transactionId
    //   }).subscribe(
    //      (res) => {
    //        this.extraItemLoader=false
    //          console.log('editExtraItem res', res['data'].deleteExtraItem);
    //          if(res['data'].deleteExtraItem){
    //            this.initializeExtraItemsForm()
    //            this.getExtraItems()
    //            this._repairRoomService.showToaster(['Item deleted successfully', 'success'])
    //            this._repairRoomService.setCheckExtraItem(true)
    //          }
    //      }, (err) => {
    //        this.extraItemLoader=false
    //        this._repairRoomService.showToaster([err.message, 'error'])
    //          console.log('editExtraItem err', err);
    //      })
  }

  createTransactionCustomerAlertFun() {
    this.createTransactionCustomerAlert.mutate({
      input: {
        transactionID: this.transactionId,
        alert_timer: this.alertTime,
        alert_title: this.transactionKeepingUnit + '-' + this.customerName + '-' + this.deviceModelName,
        alert_message: this.alertAction,
        alert_type: AlertTypeEnum.CustomerAlert,
        location_id: localStorage.getItem('location_id')
      }
    }).subscribe(
      (res) => {
        console.log(' res', res['data'].createTransactionCustomerAlert);
        if (res['data'].createTransactionCustomerAlert) {
          this._repairRoomService.showToaster(['Alert has been set successfully', 'success'])
          this.alertTime = ''
          this.alertAction = ''
        }
      }, (err) => {
        this._repairRoomService.showToaster([err.message, 'error'])
        this.alertTime = ''
        this.alertAction = ''
        console.log(' err', err);
      })
  }

  alertTime = ''
  alertAction = ''
  customTimeOnly(event): boolean {
    //This is temprary work I am working on customeTime Directive 
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    let string = this.alertTime + event.key
    if (string.length == 2) {
      let number = Number(string)
      if (number > 24) {
        this.alertTime = '00:'
        // this.alertTime = string.slice(0, -1)
        return false
      }
      let output = string + ':'
      this.alertTime = output
      return false
    } else if (string.length == 5) {
      let array = string.split(':')
      let number = Number(array[1])
      if (number > 59) {
        this.alertTime = array[0] + ':' + '00'
        return false
      }
      return true
    } else if (string.length < 5) {
      return true
    }
    return false
  }

  allReasons = []
  getReasons() {
    this.customerGQLService.getReasons('extra_item').subscribe(
      (res) => {
        this.allReasons = res['data'].getReasons
        console.log('allReasons-->', this.allReasons);
      }, (err) => {
        console.log('err while loading reason', err);
      }
    )
  }

  selectedReason = 'Select Reason'
  setResaon(reason) {
    // this.selectedReason=reason
    this.extraItemsForm.controls['reason'].setValue(reason)
  }

  setResaonforAdd(reason, index) {
    this.extraItems[index]['reason'] = reason
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  omitSpeChar(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  hidePopups() {
    this.extraItemList = false
  }
}
