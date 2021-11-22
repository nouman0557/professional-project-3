import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { StockService } from 'src/app/services/stock/stock.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { AllowedTransactionStatus, AllowedOrdertStatus, PoStatusName } from 'src/app/generated/graphql';
@Component({
  selector: 'order-statues',
  templateUrl: './order-statues.component.html',
  styleUrls: ['./order-statues.component.css']
})
export class OrderStatuesComponent implements OnInit, OnDestroy {

  @Input() orderId: string;
  @Output() onCancelOrderProcess: EventEmitter<any> = new EventEmitter();
  @Output() onShowToaster: EventEmitter<any> = new EventEmitter();
  @Output() onShowStoreCredit: EventEmitter<any> = new EventEmitter();
  showLoader = false
  orderDetail: {}

  modalRef: BsModalRef
  addTrackingForm: FormGroup
  orderStatusText: string = ''
  supplierOrderNumber: string = ''
  trakingNo: boolean
  trackingNumberEdit: boolean
  userAuthorizationView: boolean = false
  userEmail: string = ''
  userPwd: string = ''
  showCompleteButton: boolean = false
  addTrackingSubmitted: boolean = false
  addTrackingLoader = false
  onTransitShipingNumLoader = false
  userWhoCancelBuyback: string
  authorizedBy: string
  cancelDate: Date
  orderTrackingNumber: string
  totalItems: number = 0
  orderNumbersubscription
  trackingNumberSubscription
  cancelBuybackSubmitted : boolean = false
  showMarkAsDeliveredButton : boolean = false
  hideToster = true
  toasterType = ''
  toasterMsg = ''

  userNotValid = false
  userMsg = ''

  constructor(private stockService: StockService,
    private modalService: BsModalService,
    private formbulider: FormBuilder) { }

  ngOnInit() {
    this.getOrderById(this.orderId)
    this.orderNumbersubscription = this.stockService.orderNumber$.subscribe(orderNumber => this.supplierOrderNumber = orderNumber)
    this.trackingNumberSubscription = this.stockService.trackingNumber$.subscribe(trackingNumber => this.orderTrackingNumber = trackingNumber)
  }

  ngOnDestroy() {
    this.stockService.changeTrackingNumber('')
    this.stockService.changeSupplierOrderNumber('')
    this.orderNumbersubscription.unsubscribe()
    this.trackingNumberSubscription.unsubscribe()
  }

  getOrderById(id) {
    this.showLoader = true
    this.stockService.getOrderByID(id)
      .valueChanges.subscribe(
        (res) => {
          this.orderDetail = res['data'].getPurchaseOrderbyID
          console.log('Data ny')
          this.UIChangesOnStatus()
          this.showLoader = false
          console.log('order detail is', this.orderDetail);
        }, (err) => {
          console.log('err is ', err);
          this.showLoader = false
        }
      )
  }
  deleteOrder() {
    this.stockService.deleteOrder(this.orderId)
      .subscribe(
        (res) => {
          if (res['data'].PODelete) {
            this.showToaster('Order deleted successfully', 'success')
            this.modalRef.hide()
            this.cancelOrderProcess('poStatus', 'orderStatusActive')
          }
        }, (err) => {
          this.showToaster(err.graphQLErrors[0].message, 'error')
        }
      )
  }

  UIChangesOnStatus() {
    if (this.orderDetail['transaction_type'] == 'buyback') {

      this.calculateNumberOfItems();
      this.supplierOrderNumber = this.orderDetail['supplier_order_number'] ? this.orderDetail['supplier_order_number'] : ''

      if (this.orderDetail['dynamic_status']['status_name'] == 'Draft') {
        this.orderStatusText = "This buyback is a draft order"
      } else if (this.orderDetail['dynamic_status']['status_name'] == 'Submitted') {
        this.orderStatusText = 'This buyback was submitted'
        this.stockService.changeTrackingNumber('')
        this.stockService.changeSupplierOrderNumber('')
        this.trackingNumberEdit = false
      } else if (this.orderDetail['dynamic_status']['status_name'] == 'Canceled') {
        this.orderStatusText = 'The buyback was canceled'
        this.userWhoCancelBuyback = this.orderDetail['cancel_by']['first_name'] + this.orderDetail['cancel_by']['last_name']
        this.authorizedBy = this.orderDetail['cancel_by']['first_name'] + this.orderDetail['cancel_by']['last_name']
        this.cancelDate = this.orderDetail['cancel_at']
      } else if (this.orderDetail['dynamic_status']['status_name'] == 'Delivered') {
        this.showCompleteButton = true
        this.orderStatusText = "This buyback was delivered"
      } else if (this.orderDetail['dynamic_status']['status_name'] == 'On Transit') {
        this.trackingNumberEdit = false
        this.showMarkAsDeliveredButton = true
        this.orderStatusText = "This buyback is on transit"
        this.addTrackingForm = this.formbulider.group({
          orderID: [this.orderDetail['_id'], Validators.required],
          company_name: ['', Validators.required],
          tracking_number: ['', Validators.required],
          estimated_days: ['', Validators.required],
        });
      } else if (this.orderDetail['dynamic_status']['status_name'] == 'Completed') {
        this.orderStatusText = 'This buyback is completed'
      }

    }
  }
  calculateNumberOfItems() {
    for (var transcation of this.orderDetail['TransactionBuyBackLine']) {
      this.totalItems = this.totalItems + transcation['quantity']
    }

  }
  setDynamicClasses(status) {
    if (this.orderDetail && this.orderDetail['dynamic_status_list'] != null) {
      for (let i = 0; i < this.orderDetail['dynamic_status_list'].length; i++) {
        if (status == this.orderDetail['dynamic_status_list'][i]['status_name'] && this.orderDetail['dynamic_status']['status_name'] == status) {
          return false
        }
        if (status == this.orderDetail['dynamic_status_list'][i]['status_name']) {
          return true
        }
      }
      return null
    }
  }

  initTrackingNumberForm() {
    console.log('current order detail', this.orderDetail);
    this.trakingNo = true
    this.trackingNumberEdit = true

    this.initializeAddTrackingFrom(this.orderDetail['_id'])

    this.orderDetail['dynamic_status_list'].push({
      status_background_color: "#fcaa3d",
      status_font_color: "#fff",
      status_icon: null,
      status_name: "On Transit"
    })

    this.orderDetail['dynamic_status']['status_name'] = 'On Transit'
  }

  initializeAddTrackingFrom(orderID) {
    this.addTrackingSubmitted = false
    this.addTrackingForm = this.formbulider.group({
      orderID: [orderID, Validators.required],
      company_name: ['', Validators.required],
      tracking_number: ['', Validators.required],
      estimated_days: [new Date(), Validators.required],
    });
    if (this.trakingNo) {
      var index = this.orderDetail['dynamic_status_list'].map(x => {
        return x.status_name;
      }).indexOf('On Transit');
      if (index == -1) {
        return
      }
      this.orderDetail['dynamic_status_list'].splice(index, 1)
      this.orderDetail['dynamic_status']['status_name'] = 'Submitted'
      this.trakingNo = true
      return
    }
    this.trackingNumberEdit = false
  }
  initializeUpdateTrackingFrom(order) {
    this.addTrackingForm = this.formbulider.group({
      orderID: [order['_id'], Validators.required],
      company_name: [order['shipping_company_name'], Validators.required],
      tracking_number: [order['shipping_tracking_no'], Validators.required],
      estimated_days: [new Date(order['shipping_estimated_days']), Validators.required],
    });
    this.trackingNumberEdit = true
  }

  addSupplierOrderNumber(order) {
    if (this.supplierOrderNumber !== '') {
      this.stockService.addSupplierOrderNumber(order['_id'], this.supplierOrderNumber)
        .subscribe(
          (res) => {
            let returnVal = res['data'].POSupplierOrderNumber
            this.supplierOrderNumber = returnVal['supplier_order_number']
            if (returnVal != null) {
              // this.toaster.showSuccess('Supplier’s order number added successfully.', 'Order Number')
              this.showToaster('Supplier’s order number added successfully.', 'success')
              this.stockService.changeSupplierOrderNumber(this.supplierOrderNumber)
            } else {
              // this.toaster.showError('Something Went Wrong.', 'Try Again')

              this.showToaster('Something went wrong, Please try again.', 'error')
            }
          }, (err) => {

            let message = err.graphQLErrors[0].message
            // this.toaster.showError('Something Went Wrong.', 'Try Again')
            this.showToaster('Something went wrong, Please try again.', 'error')

          }
        )
    }
  }
 
  cancelOrder() {
   
    if (this.userEmail !== '' && this.userPwd !== '' && this.stockService.validateEmail(this.userEmail)) {
      this.stockService.cancelBuyback(this.orderId, this.userEmail, this.userPwd)
        .subscribe(
          (res) => {
            this.closeModel()
            this.showToaster('Buyback canceled', 'success')
            this.cancelOrderProcess('poStatus', 'orderStatusCompleted')
          },
          (err) => {

            if (err.graphQLErrors[0].message == "User is not valid") {
              this.userMsg = 'User is not valid'
              
              this.userNotValid = true
              setTimeout (()=> {
                this.userNotValid = false
              }, 2000)
            }
            this.hideToster = false
            this.toasterMsg = err.graphQLErrors[0].message
            this.toasterType = 'error'
            // this.showToaster(err.graphQLErrors[0].message, 'error')
          }
        )
    }else{
      this.cancelBuybackSubmitted = true
      setTimeout (()=> {
        this.cancelBuybackSubmitted = false
      }, 3000)
    }
  }
  closeToaster(){
    this.hideToster = true
  }

  addTrackingNumber(isEdit) {
    if (this.addTrackingForm.invalid) {
      this.addTrackingSubmitted = true;
      return;
    }
    else {
      if (isEdit == 'Edit') {
        this.onTransitShipingNumLoader = true
      }
      this.addTrackingSubmitted = false
      let addTrackingFormData = JSON.parse(JSON.stringify(this.addTrackingForm.value))

      this.stockService.addShippingDetail(
        this.orderDetail['_id'],
        addTrackingFormData.company_name,
        addTrackingFormData.tracking_number,
        addTrackingFormData.estimated_days)
        .subscribe(
          (res) => {
            this.orderDetail['dynamic_status'] = res['data'].AddShippingDetail['dynamic_status']
            this.orderDetail['dynamic_status_list'] = res['data'].AddShippingDetail['dynamic_status_list']
            this.orderDetail['shipping_tracking_no'] = res['data'].AddShippingDetail['shipping_tracking_no']
            this.orderDetail['shipping_company_name'] = res['data'].AddShippingDetail['shipping_company_name']
            this.orderDetail['shipping_estimated_days'] = res['data'].AddShippingDetail['shipping_estimated_days']

            if (this.trakingNo) {
              // this.toaster.showSuccess('Add Tracking Number Successfully', 'Tracking Number')
              this.showToaster('Add Tracking Number Successfully', 'success')
              this.trakingNo = false
            }
            if (isEdit == 'Edit') {
              this.initializeAddTrackingFrom('')
              this.trackingNumberEdit = false
              this.showToaster('Updated Tracking Number Successfully', 'success')
            }
            this.stockService.changeTrackingNumber(res['data'].AddShippingDetail['shipping_tracking_no'])
            this.onTransitShipingNumLoader = false
            this.showMarkAsDeliveredButton = true

          }, (err) => {
            this.addTrackingLoader = false
            this.onTransitShipingNumLoader = false
            this.showToaster('Something went wrong, Please try again.', 'error')
            let message = err.graphQLErrors[0].message
           }
        )
    }

  }

  updateStatus(value) {
    let status = PoStatusName.Delivered
    if (value == 'Canceled') {
      status = PoStatusName.Canceled
    }
    this.stockService.updateOrderStatus(this.orderDetail['_id'], status)
      .subscribe(
        (res) => {
          if (value == 'Canceled') {
            this.modalRef.hide()
          }
          this.getOrderById(this.orderDetail['_id'])
          this.showToaster('Buyback status updated successfully', 'success')
          this.cancelOrderProcess('relaodBuyBackComponent', this.orderDetail['_id'])


        }, (err) => {
          this.showToaster('OPS! Something went wrong', 'error')
        }
      )
  }


  updateBuyBack(buybackObject) {

    this.showLoader = true
    this.stockService.addUpdateBuyBackOrder(buybackObject['_id'], buybackObject)
      .subscribe(
        (res) => {
          this.showToaster('Buyback update successfully', 'success')
          this.showLoader = false
        }, (err) => {
          this.showToaster('OPS! Something went wrong', 'error')
          this.showLoader = false;
          console.log('error', err);
        }
      )

  }

  onCheckStoreCredit() {
    let supplierid = this.orderDetail['Supplier']['_id']
    this.onShowStoreCredit.emit(supplierid)
  }


  downloadPO(type) {
    this.stockService.printAndExportOrders([this.orderDetail], true, type)
    this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }
  closeModel() {
    this.modalRef.hide();
  }
  cancelOrderProcess(show, hide) {
    this.onCancelOrderProcess.emit([show, hide])
  }
  showToaster(message, status) {
    this.onShowToaster.emit([message, status])
  }

}
