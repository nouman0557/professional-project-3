import { Component, OnInit, EventEmitter, Output, TemplateRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StockService } from 'src/app/services/stock/stock.service';
import { AllowedTransactionType, AllowedTransactionStatus, AllowedOrdertStatus, PoStatusName } from 'src/app/generated/graphql'
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { parseDate } from 'ngx-bootstrap';

@Component({
  selector: 'app-buyback-program',
  templateUrl: './buyback-program.component.html',
  styleUrls: ['./buyback-program.component.css']
})


export class BuybackProgramComponent implements OnInit {

  supplierRestockData = []
  searchSupplierFormControl: FormControl = new FormControl()
  searchSupplier: string = ''
  searchBrandDevices: string
  supplierRestockLoader = false
  brandDevices = []
  selectedSupplier = {}
  showSupplierScreen = true
  showFormScreen = false
  addBuybackdeviceBtn = true
  addBuybackdeviceField = false
  modalRef: BsModalRef;
  estimatedPayout: number = 0;
  orderDate: Date = null
  orderDateError: boolean = false
  deviceFlag: boolean = false
  newDeviceName: string = null
  newDevicePrice: 0
  newDeviceQuantity: number = 0;
  orderDetail = {}
  supplierCompanyName: string = ''
  noSupplierOnSearch: boolean = false
  preventSingleClick: boolean = false
  timer: any;
  delay: Number;
  selectedDevice = {}
  selectedBrand = []
  indexOfSelectedItem: number = -1
  isEditDevice: boolean = false
  isStatusDraft: boolean = false
  toogleList: boolean = false
  addDeviceInputError: boolean = false
  searchString: string = "supplier_company, supplier_keeping_unit, supplier_company_phone, supplier_email, website"


  @Output() onCancelOrderProcess: EventEmitter<any> = new EventEmitter();
  @Input() orderId
  @Input() supplierList
  @Output() onShowToaster: EventEmitter<any> = new EventEmitter();


  constructor(
    private stockService: StockService,
    private modalService: BsModalService) {

  }


  ngOnInit() {

    if (this.orderId == '') {
      this.supplierList.length > 0 ? this.supplierRestockData = this.supplierList : this.getAllSupplier();
      this.displayLayoutChange('showSupplierScreen')
    } else {
      this.isStatusDraft = true
      this.displayLayoutChange('showFormScreen')
    }

    this.searchSupplierFormControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      this.getAllSupplier()
    })

    // this.searchBrandDevicesFormControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
    //   this.getBrandDevices()
    // })
  }

  getAllSupplier() {

    this.supplierRestockLoader = true
    this.stockService.getAllSupplier(this.searchSupplierFormControl.value)
      .valueChanges.subscribe(
        (res) => {
          this.supplierRestockLoader = false
          console.log(' res', res['data'].getAllSupplierRestock);
          this.noSupplierOnSearch = false;
          this.supplierRestockData = res['data'].getAllSupplierRestock

          if (this.searchSupplierFormControl.value !== '' && this.searchSupplierFormControl.value !== null && this.isObjectEmpty(this.supplierRestockData)) {
            this.noSupplierOnSearch = true;
          }
        }, (err) => {
          this.supplierRestockLoader = false
          console.log(' err', err.graphQLErrors[0].message);
        }
      )
  }

  getOrderById(id) {
    this.supplierRestockLoader = true
    this.stockService.getOrderByID(id)
      .valueChanges.subscribe(
        (res) => {
          this.orderDetail = res['data'].getPurchaseOrderbyID
          this.supplierRestockLoader = false
          this.populateOrderData()

        }, (err) => {
          console.log('err is ', err);
          this.supplierRestockLoader = false
        }
      )
  }

  populateOrderData() {
    let transcationObject = {}

    for (var val of this.brandDevices) {
      for (var device of val.system_devices) {
        for (var transcation of this.orderDetail['TransactionBuyBackLine']) {
          if (device._id == transcation['System_Device']['_id']) {
            device.quantity = transcation['quantity']
            break;
          }
        }
      }
    }
    this.supplierCompanyName = this.orderDetail['Supplier']['supplier_company']
    this.orderDate = parseDate(this.orderDetail['transaction_date'])
    this.estimatedPayout = this.orderDetail['order_estimate_amount']
  }

  getBrandDevices() {
    this.supplierRestockLoader = true;
    this.stockService.getBrandDevices('')
      .valueChanges.subscribe(
        (res) => {
          this.supplierRestockLoader = false
          console.log('Brand Wise Devices', res['data'].getBrandWiseDevices)

          this.brandDevices = res['data'].getBrandWiseDevices
          for (var val of this.brandDevices) {
            val.isShow = true;
            for (var device of val.system_devices) {
              if (device.quantity == undefined) {
                device.quantity = 0
              }
            }
          }

          this.supplierRestockLoader = false
          this.orderId == '' ? '' : this.getOrderById(this.orderId)
        }, (err) => {
          this.supplierRestockLoader = false
        }
      )
  }

  displayLayoutChange(displayLayoutName) {

    if (displayLayoutName == 'showSupplierScreen') {
      this.showFormScreen = false;
      this.showSupplierScreen = true;
      this.orderDate = new Date();
    }
    if (displayLayoutName == 'showFormScreen') {
      this.supplierCompanyName = this.selectedSupplier ? this.selectedSupplier['supplier_company'] : this.orderDetail['Supplier']['supplier_company']
      this.showFormScreen = true;
      this.showSupplierScreen = false;
      this.estimatedPayout = 0;
      this.getBrandDevices();
    }
    if (displayLayoutName == 'showAddNewDevice') {
      this.addBuybackdeviceField = true
      this.addBuybackdeviceBtn = false
    }
    if (displayLayoutName == 'hideAddNewDevice') {
      this.addBuybackdeviceField = false
      this.addBuybackdeviceBtn = true
    }

  }

  estimatedPriceCalculation(device, opration) {

    if (isNaN(device.quantity)) {
      device.quantity = 0
      return
    }

    if (opration == 'add') {
      device.quantity = Number(device.quantity) + 1
    } else if (opration == 'subtract' && device.quantity > 0) {
      device.quantity = Number(device.quantity) - 1
    }

    this.estimatedPayout = 0;
    for (var brand of this.brandDevices) {
      for (var device of brand['system_devices']) {
        this.estimatedPayout = Number(this.estimatedPayout) + Number(device['product_price']) * Number(device['quantity'])
      }
    }

  }
  toNumber(input){
    return Number(input)
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  isSupplierSelectedDblClick(supplier) {

    this.selectedSupplier = supplier
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    if (this.selectedSupplier['is_buyback']) {
      this.displayLayoutChange('showFormScreen')
      this.supplierCompanyName = this.selectedSupplier['supplier_company']
    } else {
      this.showToaster('This supplier not accept buyback', 'error')
    }
  }

  isSupplierSelected() {

    if (this.isObjectEmpty(this.selectedSupplier)) {

      this.showToaster('Please Select Supplier', 'error')
      return
    } else if (!this.selectedSupplier['is_buyback']) {

      this.showToaster('This supplier not accept buyback', 'error')
      return

    } else {
      this.displayLayoutChange('showFormScreen')
      this.supplierCompanyName = this.selectedSupplier['supplier_company']
    }
  }

  changeSupplierIsBuyBack(supplier, isBuyBack) {

    if (supplier['is_buyback'] == isBuyBack) {

      this.showToaster(isBuyBack ? supplier.supplier_company + ' is already active for the buyback program' : supplier.supplier_company + ' is already inactive for the buyback program', 'warning')
      return
    }

    this.stockService.changesupplierBuyBackStatus(supplier['_id'], isBuyBack)
      .subscribe(
        (res) => {

          if (isBuyBack) {
            this.showToaster(supplier.supplier_company + ' supplier successfully activated for the buyback program', 'success')
          } else {
            this.showToaster(supplier.supplier_company + ' supplier successfully inactivated for the buyback program', 'success')
          }

          supplier.is_buyback = isBuyBack
          supplier = this.supplierRestockData
          this.supplierRestockData = null

          setTimeout(() => { this.supplierRestockData = supplier });

        }, (err) => {
          this.showToaster('Something went wrong, Please try again.', 'error')
        })
  }

  addSystemDevice(brand) {

    if (this.newDeviceName && this.newDevicePrice) {
      this.supplierRestockLoader = true
      let device = {};


      device['product_name'] = this.newDeviceName
      device['product_price'] = parseFloat(this.newDevicePrice)
      device['product_brand'] = brand['_id']
      device['is_system_created'] = false

      this.stockService.addeSystemDevice(device)
        .subscribe(
          (res) => {
            this.supplierRestockLoader = false

            device['_id'] = res.data.createSystemDevice._id
            this.newDeviceQuantity
            device['quantity'] = this.newDeviceQuantity ? this.newDeviceQuantity : 0
            brand.system_devices.unshift(device)
            brand.isShow = false
            setTimeout(() => {
              brand.isShow = true
            })
            this.estimatedPriceCalculation(device, '')
            this.displayLayoutChange('hideAddNewDevice')

            this.showToaster('Device added successfully', 'success')

            this.newDeviceName = ''
            this.newDevicePrice = 0
            this.newDeviceQuantity = 0

          }, (err) => {
            this.showToaster(err.message, 'error')
            this.supplierRestockLoader = false
          }
        )
    } else {
      this.addDeviceInputError = true
      this.showToaster('Please fill the fields', 'error')
    }
  }

  createBuyBackObject(orderStatus) {

    let buyBack = {};
    buyBack['transaction_type'] = AllowedTransactionType.Buyback;
    buyBack['transaction_status'] = orderStatus == 'draft' ? AllowedTransactionStatus.Draft : AllowedTransactionStatus.Order;
    buyBack['order_status'] = orderStatus == 'draft' ? AllowedOrdertStatus.Draft : AllowedOrdertStatus.Ordered;
    buyBack['transaction_date'] = this.orderDate
    buyBack['sub_total_amount'] = this.estimatedPayout
    buyBack['total_amount'] = this.estimatedPayout
    buyBack['order_estimate_amount'] = this.estimatedPayout
    buyBack['Supplier'] = !this.isObjectEmpty(this.selectedSupplier) ? this.selectedSupplier['_id'] : this.orderDetail['Supplier']['_id']
    buyBack['BusinessLocation'] = window.localStorage.getItem('location_id')

    buyBack['Tax'] = null
    buyBack['tax_amount'] = 0
    buyBack['tax_value'] = 0
    buyBack['is_tax_percentage'] = false
    buyBack['discount_amount'] = 0
    buyBack['discount_value'] = 0
    buyBack['is_discount_percentage'] = false
    buyBack['ShippingType'] = null
    buyBack['shipping_amount'] = 0

    buyBack['TransactionBuyBackLines'] = []

    for (var val of this.brandDevices) {
      for (var device of val.system_devices) {
        if (device.quantity > 0) {
          this.deviceFlag = true;
          let obj = {}
          obj['Supplier'] = !this.isObjectEmpty(this.selectedSupplier) ? this.selectedSupplier['_id'] : this.orderDetail['Supplier']['_id']
          obj['System_Device'] = device._id
          obj['device_price'] = device.product_price
          obj['quantity'] = device.quantity
          obj['sub_total'] = device.product_price * device.quantity
          obj['Tax'] = null
          obj['is_tax_percentage'] = false
          obj['tax_amount'] = 0
          obj['is_discount_percentage'] = false
          obj['discount_amount'] = 0
          obj['discount_value'] = 0
          obj['total_amount'] = device.product_price * device.quantity
          buyBack['TransactionBuyBackLines'].push(obj)
        }
      }
    }
    return buyBack
  }


  listRefresh(brand) {
    brand['isShow'] = false
    setTimeout(() => {
      brand['isShow'] = true
    })
  }

  deleteSystemDevice() {
    let selectedDeviceCopy = {}
    if (!this.isObjectEmpty(this.selectedDevice)) {
      selectedDeviceCopy = this.selectedDevice

      if (this.indexOfSelectedItem !== -1) {
        this.selectedBrand['system_devices'].splice(this.indexOfSelectedItem, 1);
        this.listRefresh(this.selectedBrand)
      }
      this.closeModel()

      this.stockService.deleteBrandSystemDevice(this.selectedDevice['_id'])
        .subscribe(
          (response) => {
            console.log(response['data']['deleteSystemDevice'])
            if (response['data']['deleteSystemDevice'] == true) {
              this.showToaster('Device deleted successfully', 'success')
            } else {
              this.selectedBrand['system_devices'].splice(this.indexOfSelectedItem, 0, selectedDeviceCopy);
              this.listRefresh(this.selectedBrand)
              this.showToaster('Ops! Something went wrong', 'error')
            }

          }, (error) => {
            this.showToaster('Ops! Something went wrong', 'error')
            this.selectedBrand['system_devices'].splice(this.indexOfSelectedItem, 0, selectedDeviceCopy);
            this.closeModel()
            console.log(error)
          }
        )
    }
  }

  editSystemDevice(device) {

    if (!device.product_name || !device.product_price) {
      this.showToaster('Input Field required', 'error')
      return
    }

    device['isEdit'] = false
    device.product_brand = this.selectedBrand['_id']
    let deviceObj = {
      product_name: device.product_name,
      product_price: parseFloat(device.product_price),
      product_brand: this.selectedBrand['_id'],
      is_system_created: false
    }
    this.stockService.updateBrandSystemDevice(device['_id'], deviceObj)
      .subscribe(
        (res) => {
          this.showToaster('Device updated successfully', 'success')
          this.estimatedPriceCalculation(device, '')
        }, (err) => {
          this.showToaster(err.message, 'error')
          device.isEdit = true
        }
      )
  }

  saveBuyBack(status) {
    if (this.orderDate == null) {
      this.orderDateError = true
      return
    }

    let buyback = this.createBuyBackObject(status)
    let transactionId = this.orderId == '' ? '' : this.orderId
    if (this.deviceFlag) {
      this.supplierRestockLoader = true
      this.stockService.addUpdateBuyBackOrder(transactionId, buyback)
        .subscribe(
          (res) => {
            this.showToaster('Buyback added successfully', 'success')
            this.supplierRestockLoader = false
            if (status == 'draft') {
              this.cancelOrderProcess('orderStatusActive', 'selectRType')
            }
            else {
              this.cancelOrderProcess('relaodBuyBackComponent', res['data'].createBuyBackOrder._id)
            }

          }, (err) => {
            this.supplierRestockLoader = false
            this.showToaster('OPS! Something went wrong', 'error')
            console.log('error', err);
          }
        )
    } else {
      this.showToaster('Add devices to buyback', 'error')
    }
  }

  public trackByFunction(index: number, item) {
    return item['_id'];
  }

  showToaster(message, status) {
    this.onShowToaster.emit([message, status])
  }
  selectSupplier(supplier) {
    this.preventSingleClick = false;
    const delay = 200;
    this.timer = setTimeout(() => {
      if (!this.preventSingleClick) {
        //Navigate on single click
        this.selectedSupplier = supplier;
      }
    }, delay);


  }
  cancelOrderProcess(show, hide) {
    this.onCancelOrderProcess.emit([show, hide])
  }
  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }
  closeModel() {
    this.modalRef.hide();
  }
  // tayyab's Additon
  isScrollable = false
  downcart() {
    this.isScrollable = !this.isScrollable
  }


}
