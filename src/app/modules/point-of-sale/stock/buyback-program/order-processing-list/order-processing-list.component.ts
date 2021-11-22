import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { StockService } from 'src/app/services/stock/stock.service';
import { AllowedTransactionType, AllowedTransactionStatus, AllowedOrdertStatus } from 'src/app/generated/graphql';

@Component({
  selector: 'order-processing-list',
  templateUrl: './order-processing-list.component.html',
  styleUrls: ['./order-processing-list.component.css']
})
export class OrderProcessingListComponent implements OnInit, OnDestroy {

  @Input() orderId: string;
  @Output() onCancelOrderProcess: EventEmitter<any> = new EventEmitter();
  @Output() onShowToaster: EventEmitter<any> = new EventEmitter();
  showLoader = false
  orderDetail: {}

  isRMA: boolean = false
  isBuyback: boolean = false
  isPurchaseOrder: boolean = false
  isReciveAllItem: boolean = false

  showCompleteButton: boolean = false

  orderDate: Date
  actualPayout: number = 0

  transcationLine = []

  hideToster = true
  toasterMsg = ''
  toasterType = ''

  searchBuyback: string = ''
  supplierCompanyNameText = ''
  trackingNumberText: string = ''
  supplierOrderNumber: string = ''

  orderNumbersubscription
  trackingNumberSubscription
  showOrderReviceTextField = false
  orderStatus: string


  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.getOrderById(this.orderId)
    this.orderNumbersubscription = this.stockService.orderNumber$.subscribe(orderNumber => this.supplierOrderNumber = orderNumber)
    this.trackingNumberSubscription = this.stockService.trackingNumber$.subscribe(trackingNumber => this.trackingNumberText = trackingNumber)

  }
  ngOnDestroy() {
    this.orderNumbersubscription.unsubscribe()
    this.trackingNumberSubscription.unsubscribe()
  }

  isScrollable = false
  downcart() {
    this.isScrollable = !this.isScrollable
  }

  UIChangesOnStatus() {
    this.supplierOrderNumber = this.orderDetail['supplier_order_number'] ? this.orderDetail['supplier_order_number'] : ''

    if (this.orderDetail['transaction_type'] == 'buyback') {
      if (this.orderDetail['shipping_tracking_no']) {
        this.trackingNumberText = this.orderDetail['shipping_tracking_no']
      }
      if (this.orderDetail['dynamic_status']['status_name'] == "Delivered") {
        this.showCompleteButton = true
        this.showOrderReviceTextField = true
      }
      if (this.orderDetail['dynamic_status']['status_name'] == "Completed") {
        this.orderStatus = 'Completed'
        this.actualPayout = this.orderDetail['total_amount']
      }
    }
  }
  reciveAllItems() {
    this.actualPayout = 0;
    this.isReciveAllItem = true
    for (var transcation of this.orderDetail['TransactionBuyBackLine']) {
      transcation['received_qty'] = transcation['quantity']
      transcation['approve_qty'] = transcation['quantity']
      this.actualPayout = this.actualPayout + transcation['approve_qty'] * transcation['device_price']
    }
  }

  manageOrderProcessing(product) {


    if (isNaN(product.received_qty) || product.received_qty == '') {
      product.received_qty = 0
    }
    if (isNaN(product.approve_qty) || product.approve_qty == '') {
      product.approve_qty = 0
    }
    if (isNaN(product.device_price || product.approve_qty == '')) {
      product.device_price = 0
    }

    product.quantity = parseFloat(product.quantity)
    product.device_price = parseFloat(product.device_price)
    product.approve_qty = parseFloat(product.approve_qty)
    product.received_qty = parseFloat(product.received_qty)

    if (product.received_qty > product.quantity) {
      this.showToaster("Item received can't be greater then item sent", 'error')
      product.received_qty = product.quantity
      return
    }
    if (product.approve_qty > product.received_qty) {
      product.approve_qty = product.received_qty
      this.showToaster("Item approved can't be greater then item received", 'error')
      return
    }
    if (product.approve_qty > product.quantity) {
      product.approve_qty = product.received_qty
      this.showToaster("Item approved can't be greater then item sent", 'error')
      return
    }
    this.isReciveAllItem = false

    this.actualPayout = 0
    for (var transcation of this.orderDetail['TransactionBuyBackLine']) {
      this.actualPayout = this.actualPayout + transcation['approve_qty'] * transcation['device_price']
    }

  }
  onChangeDevicePrice(device, action) {
    if (action == 'onclick') {
      this.orderDetail['order_estimate_amount'] = this.orderDetail['order_estimate_amount'] - device['quantity'] * device['device_price']
    } else {
      this.orderDetail['order_estimate_amount'] = this.orderDetail['order_estimate_amount'] + device['quantity'] * device['device_price']
    }
  }

  createBuyBackObject() {

    let buybackObj = {}

    buybackObj['transaction_type'] = AllowedTransactionType.Buyback
    buybackObj['transaction_status'] = AllowedTransactionStatus.Order
    buybackObj['order_status'] = AllowedOrdertStatus.Ordered
    buybackObj['dynamic_status'] = 'Completed'
    buybackObj['transaction_date'] = this.orderDetail['transaction_date']
    buybackObj['sub_total_amount'] = this.orderDetail['order_estimate_amount']
    buybackObj['Tax'] = null
    buybackObj['tax_amount'] = 0
    buybackObj['tax_value'] = 0
    buybackObj['is_tax_percentage'] = false
    buybackObj['discount_amount'] = 0
    buybackObj['discount_value'] = 0
    buybackObj['is_discount_percentage'] = false
    buybackObj['ShippingType'] = null
    buybackObj['shipping_amount'] = 0

    buybackObj['total_amount'] = this.actualPayout
    buybackObj['order_estimate_amount'] = this.orderDetail['order_estimate_amount']
    buybackObj['Supplier'] = this.orderDetail['Supplier']['_id']
    buybackObj['BusinessLocation'] = localStorage.getItem('location_id')

    buybackObj['TransactionBuyBackLines'] = []

    for (var transcation of this.orderDetail['TransactionBuyBackLine']) {
      let obj = {}
      obj['System_Device'] = transcation['System_Device']['_id']
      obj['Supplier'] = this.orderDetail['Supplier']['_id']
      obj['quantity'] = parseFloat(transcation['quantity'])
      obj['received_qty'] = parseFloat(transcation['received_qty'])
      obj['approve_qty'] = parseFloat(transcation['approve_qty'])
      obj['device_price'] = parseFloat(transcation['device_price'])
      obj['sub_total'] = obj['approve_qty'] * obj['device_price']
      obj['total_amount'] = obj['approve_qty'] * obj['device_price']
      obj['Tax'] = null
      obj['is_tax_percentage'] = false
      obj['tax_amount'] = 0
      obj['tax_value'] = 0

      obj['discount_amount'] = 0
      obj['discount_value'] = 0
      obj['is_discount_percentage'] = false
      buybackObj['TransactionBuyBackLines'].push(obj)
    }
    return buybackObj

  }




  onOrderComplete() {

    let buyBackObjToSave = this.createBuyBackObject()

    if (this.actualPayout > 0) {
      this.showLoader = true
      this.stockService.receiveBuyback(this.orderDetail['_id'], buyBackObjToSave)
        .subscribe(
          (res) => {
            this.showLoader = false
            this.showToaster('Buyback recieved suceessfully', 'success')
            this.cancelOrderProcess('poStatus', 'orderStatusCompleted')
          }, (error) => {
            this.showLoader = false
            this.showToaster('Ops! Something went wrong', 'error')

          }
        )
    } else {
      this.showToaster('Add Item to buyback', 'error')
    }
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getOrderById(id) {
    this.showLoader = true
    this.stockService.getOrderByID(id)
      .valueChanges.subscribe(
        (res) => {
          this.orderDetail = res['data'].getPurchaseOrderbyID
          this.orderDate = this.orderDetail['transaction_date']
          //this.processPurchaseLine()
          this.supplierCompanyNameText = this.orderDetail['Supplier']['supplier_company']
          this.showLoader = false

          console.log('order detail is', this.orderDetail);
          this.UIChangesOnStatus()
        }, (err) => {
          console.log('err is ', err);
          this.showLoader = false
        }
      )
  }

  cancelOrderProcess(show, hide) {
    this.onCancelOrderProcess.emit([show, hide])
  }
  closeToaster() {
    this.hideToster = true
  }
  showToaster(message, status) {
    this.onShowToaster.emit([message, status])
  }
}
