import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service'
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { CreateSaleGQLService } from 'src/app/services/create-sale/create-sale-gql.service'
import { CustomerGQLService } from "src/app/services/customer/customerGQL.service"
import { Router, ActivatedRoute } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';
@Component({
  selector: 'app-sale-cart',
  templateUrl: './sale-cart.component.html',
  styleUrls: ['./sale-cart.component.css']
})


export class SaleCartComponent implements OnInit {
  loading: Boolean = false
  Check: boolean = false
  businessSaleTax: any = 0
  isQuoteSave = false
  orderId = ''

  createSaleInput = {}
  @ViewChild('open_removeCustomerFromCart', { static: true }) open_removeCustomerFromCart: any;

  constructor(
    private saleCartService: SaleCartService,
    private createSaleService: CreateSaleService,
    private customerGQLService: CustomerGQLService,
    private router: Router,
    private createSaleGQLService: CreateSaleGQLService,
    private cdr: ChangeDetectorRef,
    private printService: PrintService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.saleCartService.getSaleTaxsByBusinessLocation()
    this.route.params.subscribe(params => {
      if (params['orderId']) {
        this.orderId = params['orderId']
        this.getOrderById(this.orderId)
        this.isQuoteSave = true
      }
    });

    this.createSaleInput = this.saleCartService.getCreateSaleInput()
    if (this.createSaleInput['_id'] !== null) {
      this.isQuoteSave = true
    }
  }
  ngAfterViewInit() {
    this.saleCartService.$loadingScreen.subscribe(isShowLoading => this.loading = isShowLoading)
    this.saleCartService.$refreshScreen.subscribe(() => {
      this.onDiscardOrder()
    })
  }

  getOrderById(id, location_id = localStorage.getItem('location_id')) {
    this.saleCartService.showLoadingScreen(true)
    this.createSaleGQLService.getOrderById(id, location_id)
      .subscribe((res) => {
        this.saleCartService.createSaleInputFrontEndMapper(res.data.getCartData)
        this.createSaleInput = this.saleCartService.getCreateSaleInput()
        this.saleCartService.showLoadingScreen(false)
        this.cdr.detectChanges()
        this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${this.saleCartService.getSelectedCustomerId()})`)
      }, (err) => {
        this.saleCartService.showLoadingScreen(false)
        this.createSaleService.showToaster([err.message, 'error'])
      })
  }

  isScrollable = false
  downcart() {
    this.isScrollable = true;
  }

  upcart() {
    this.isScrollable = false;
  }

  changeSaveB = false
  changeSaveButton() {
    this.changeSaveB = !this.changeSaveB
  }

  onCustomerInfoClick(customerId) {
    this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${customerId})`)
  }

  onDiscardOrder() {
    this.router.navigateByUrl(`Pointofsale/CreateSale/Order`)
    this.saleCartService.onDiscardOrder();
    this.createSaleInput = this.saleCartService.getCreateSaleInput()
    this.isQuoteSave = false
    this.changeSaveB = false
    this.cdr.detectChanges()
  }
  onRemoveAllProduct() {
    this.saleCartService.initCreateSaleInput();
    this.createSaleInput = this.saleCartService.getCreateSaleInput()
    this.cdr.detectChanges()
  }

  checkoutOrder() {
    this.router.navigateByUrl(`Pointofsale/Checkout/Order`)
  }

  onCalculateSubTotal() {
    this.saleCartService.onCalculateSubTotal()
  }

  onDiscountChange() {
    this.saleCartService.onCalculateDiscount()
  }

  onApplySaleTaxAmountChange() {
    this.saleCartService.onCalculateSaleTax()
    this.onCalculateTotalAmount()
  }

  onCalculateTotalAmount() {
    this.saleCartService.onCalculateTotalAmount()
  }

  onRemoveItemFromCart(product_id) {
    this.saleCartService.removeItemFromCart(product_id)
  }

  onSaveOrder(transactionStatus) {
    this.createSaleInput['transaction_status'] = transactionStatus
    if (this.saleCartService.isValidateCreateSaleInput()) {
      this.saleCartService.showLoadingScreen(true)
      this.createSaleGQLService.onCreateSale(this.createSaleInput['_id'], this.saleCartService.createSaleInputBackendMapper())
        .subscribe((res) => {
          let message = 'Order created successfully'
          this.saleCartService.showLoadingScreen(false)
          this.createSaleInput['_id'] = res.data.createSale._id
          if (transactionStatus != 'quote') {
            this.saleCartService.onDiscardOrder();
            this.createSaleInput = this.saleCartService.getCreateSaleInput()
            this.cdr.detectChanges()
            this.router.navigateByUrl(`Pointofsale/Checkout/${res.data.createSale._id}`)
          } else {
            message = 'Quote created successfully'
            this.isQuoteSave = true
          }
          this.createSaleService.showToaster([message, 'success'])
        }, (err) => {
          this.saleCartService.showLoadingScreen(false)
          this.createSaleService.showToaster([err.message, 'error'])
          console.log("Create Sale error", err)
        })
    }
  }
  OnPrintInvoice() {
    let obj = {
      orderIDs: [this.createSaleInput['_id']],
      fileType: 'pdf',
      is_detail: false
    }
    this.printService.getAndPrintDocument('api/order/download/', obj)
  }
  onSendEmail() {
    this.createSaleGQLService.sendEmailOnOrder(this.createSaleInput['_id'], localStorage.getItem('location_id'))
      .subscribe((res) => {
        if (res.data.emailTicket)
          this.createSaleService.showToaster(['Email Send', 'success'])
        else if(res.errors)
          this.createSaleService.showToaster(['Email Send Error', 'error'])
      }, (err) => {
        this.createSaleService.showToaster([err.message, 'error'])
      })
  }

  editContactField = false
  editContactNumber() {
    this.editContactField = true
  }

  saveContactNumber() {
    this.editContactField = false
    this.customerGQLService.updateCustomerPhoneNumber(this.saleCartService.customer['_id'], this.saleCartService.customer['phone'])
      .subscribe((res) => {
        this.createSaleService.showToaster(["Customer contanct number updated", "success"])
      })
  }

}
