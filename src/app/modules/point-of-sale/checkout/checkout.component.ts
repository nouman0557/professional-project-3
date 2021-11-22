import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateSaleGQLService } from 'src/app/services/create-sale/create-sale-gql.service';
import { CommonService } from 'src/app/services/common/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';
import { AllowedPaymentMethod } from 'src/app/generated/graphql';
import * as braintree from 'braintree-web';
import { Location } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  showToaster = true
  toasterMsg = 'no msg'
  toasterType = 'error'
  years = []
  months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  cashRegisterars = []
  boxCredit = true;
  boxCheck = false;
  boxCash = false;
  boxNetterm = false;
  boxStorecredit = false;
  boxCoupons = false;
  boxPaypal = false;
  boxPayinvoice = false;
  cashReg = ''
  changeCashDrawer = 'Please select cash register'
  cashRegId = ''
  orderId = ''
  loadOrder = false
  emailPattern = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  paymentLoader = false

  constructor(
    private createSaleGQL: CreateSaleGQLService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private modalService: BsModalService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    let date = new Date()
    let year = Number(date.getFullYear().toString().substr(-2))
    for (let i = 0; i < 7; i++) {
      this.years.push((year + i).toString())
    }
    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderId = params.order
      this.getOrderByID(this.orderId)
      console.log('paramameters are', params.order);
    })
    this.getAllCashRegisterars()
  }

  currendOrder = {}
  sellLines = []
  paymentLines = []
  totalAmount = 0
  subTotalAmount = 0
  priorAmount = 0
  remainingAmount = 0
  customerNetTermDetail = []
  getOrderByID(id) {
    this.loadOrder = true
    this.createSaleGQL.getCheckoutOrderById(id).valueChanges.subscribe(
      (res) => {
        this.loadOrder = false
        this.currendOrder = res['data'].getCheckOutOrder
        this.totalAmount = res['data'].getCheckOutOrder.total_amount
        this.subTotalAmount = res['data'].getCheckOutOrder.sub_total_amount
        this.priorAmount = res['data'].getCheckOutOrder.total_amount - res['data'].getCheckOutOrder.remaining_amount
        this.sellLines = res['data'].getCheckOutOrder.TransactionSellLine
        this.paymentLines = res['data'].getCheckOutOrder.TransactionPayment
        this.remainingAmount = res['data'].getCheckOutOrder.remaining_amount
        this.customerNetTermDetail = res['data'].getCheckOutOrder.Customer.CustomerStoreWiseRecord
        console.log('order loaded sucessfully', res['data'].getCheckOutOrder);
      }, (err) => {
        this.loadOrder = false
        console.log('error while loadin error', err);
      }
    )
  }

  getAllCashRegisterars() {
    this.commonService.getAllCashRegisterarOfLocation().valueChanges.subscribe(
      (res) => {
        this.cashRegisterars = res['data'].cashRegistersOfLocation
        console.log('cash registerars', res['data'].cashRegistersOfLocation);
      }, (err) => {
        console.log('err while loading cash registerar', err);
      }
    )
  }

  selectCashRegisterar(reg) {
    this.changeCashDrawer = reg.name
    this.cashRegId = reg._id
    this.cashReg = reg
  }

  ccNumber = ''
  ccName = ''
  ccMonth = ''
  ccYear = ''
  ccCCV = ''
  CCardFlip = false
  flipCard() {
    this.CCardFlip = !this.CCardFlip
  }

  cardType = 'Card Type'
  checkCardType() {
    if (this.ccNumber.length >= 3) {
      creditCardType(this.ccNumber).filter((card) => {
        this.cardType = card.niceType
      });
    }
  }

  sNumber = false
  sName = false
  sDate = false
  sNumberAdd() {
    this.sNumber = !this.sNumber
  }

  sNameAdd() {
    this.sName = !this.sName
  }

  sDateAdd() {
    this.sDate = !this.sDate
  }

  changeExpire(type, val) {
    this[type] = val
  }

  changePay(type) {
    if (type == 'boxCash') {
      this.cashInput = ''
      this.cashChange = 0
    }
    this.boxCredit = false;
    this.boxCheck = false;
    this.boxCash = false;
    this.boxNetterm = false;
    this.boxStorecredit = false;
    this.boxCoupons = false;
    this.boxPaypal = false;
    this.boxPayinvoice = false;
    this[type] = true;
  }

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm ' + cls,
      backdrop: 'static', keyboard: false
    })
  }

  openCreditCardModal(template: TemplateRef<any>, cls) {
    if (this.creditCardInput == '' || Number(this.creditCardInput) <= 0) {
      this.showToaster = false
      this.toasterMsg = 'Please enter amount.'
      this.toasterType = 'error'
      return
    }
    if (Number(this.creditCardInput) > this.remainingAmount) {
      this.showToaster = false
      this.toasterMsg = 'Amount enter is greater than balance.'
      this.toasterType = 'error'
      return
    }
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm ' + cls,
      backdrop: 'static', keyboard: false
    })
  }

  closeModel() {
    this.modalRef.hide()
  }

  closeCheckout(bool) {
    if (bool) {
      this.closeModel()
      // this.router.navigate(['/Pointofsale/CreateSale/Order'])
    } else {
      // this.router.navigate(['/Pointofsale/CreateSale/Order/' + this.orderId])
    }
    if(this.priorAmount <= 0) {
      this.router.navigate(['/Pointofsale/CreateSale/Order/' + this.orderId])
      return
    }
    this.location.back()
  }

  closeToaster() {
    this.showToaster = true
  }

  payLater() {
    this.createSaleGQL.payLater(this.currendOrder['_id']).subscribe(
      (res) => {
        if (res['data'].payLaterInvoice) {
          this.router.navigate(['/Pointofsale/CreateSale/Order'])
        }
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
      }
    )
  }

  pay(template: TemplateRef<any>, cls) {
    if (this.boxCash) {
      this.payByCash(template, cls)
    }
    else if (this.boxCredit) {
      this.payByCard(template, cls)
    }
    else if (this.boxCheck) {
      this.payByChecque(template, cls)
    }
    else if (this.boxPaypal) {
      // this.payByPaypal(template, cls)
    }
    else if (this.boxPayinvoice) {
      // this.payByPaypalInvoice(template, cls)
    }
    else if (this.boxNetterm) {
      // this.paypaNetTerm(template, cls)
    }
    else if (this.boxStorecredit) {
      // this.paypaStoreCredit(template, cls)
    }
  }

  // Recording payments functions start from here

  // Pay by credit card with stripe or brainteee starts from here
  selectMonth = ''
  selectYear = ''
  creditCardInput = ''
  payByCard(template: TemplateRef<any>, cls) {
    if (this.ccNumber == '' || this.selectMonth == '' || this.selectYear == '' || this.ccCCV == '') {
      return
    }
    this.modalRef.hide()
    this.paymentLoader = true
    let date = new Date()
    let month = date.getMonth() + 1
    let year = Number(date.getFullYear().toString().substr(-2))
    if (Number(this.selectYear) <= year) {
      if (Number(this.selectMonth) < month) {
        this.paymentLoader = false
        this.showToaster = false
        this.toasterMsg = 'Please use valid credit card.'
        this.toasterType = 'error'
        this.creditCardInput = ''
        this.ccNumber = ''
        this.selectMonth = ''
        this.selectYear = ''
        this.ccCCV = ''
        return
      }
    }
    this.modalRef.hide()
    this.payByStripe(template, cls)
    // this.payByBraintTree(template,cls)
  }

  payByStripe(template: TemplateRef<any>, cls) {
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.creditCardInput),
      card_number: this.ccNumber,
      card_month: this.selectMonth,
      card_year: this.selectYear,
      card_security: this.ccCCV,
      method: AllowedPaymentMethod.Stripe,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + parseFloat(this.creditCardInput)
        this.remainingAmount = this.remainingAmount - parseFloat(this.creditCardInput)
        this.creditCardInput = ''
        this.ccNumber = ''
        this.selectMonth = ''
        this.selectYear = ''
        this.ccCCV = ''
        this.paymentLoader = false
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
        // this.showToaster = false
        // this.toasterMsg = 'Payment sucessfully recorded'
        // this.toasterType = 'success'
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
        // err.graphQLErrors[0].message
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )
  }

  nanceToken = ''
  getToken() {
    return new Promise(resolve => {
      this.createSaleGQL.getBrainTreeToken().subscribe(
        (res) => {
          console.log('res of getBrainTreeTokenGQL', res['data']);
          let token = res['data'].getBrainTreeToken.token
          if (token == null || token == undefined) {
            // this.toaster.showError('Invalid credit card information', '')
            // this.loadingCreditCard = false
            resolve(null)
          }
          braintree.client.create({
            authorization: token
          }, (error, client) => {
            if (error) {
              // this.loadingCreditCard = false
              return
            }
            client.request({
              endpoint: 'payment_methods/credit_cards',
              method: 'post',
              data: {
                creditCard: {
                  number: this.ccNumber,
                  expirationDate: this.ccMonth + '/' + this.ccYear,
                }
              }
            }, (err, response) => {
              console.log('Respnse of brain tree ', response)
              if (response == null) {
                // this.toaster.showError('Invalid credit card information', '')
                // this.loadingCreditCard = false
                resolve(null)
              }
              if (err) {
                // this.toaster.showError('Invalid credit card information', '')
                // this.loadingCreditCard = false
                resolve(null)
              }
              resolve(response.creditCards[0].nonce)
            });
          });
        }, (tokenErr) => {
          // this.loadingCreditCard = false
          // this.toaster.showError('Please check your internet connection', 'Internet Error')
          console.log('getBrainTreeTokenGQL err ', tokenErr);
          resolve(null)
        }
      )
    })
  }

  async payByBraintTree(template: TemplateRef<any>, cls) {
    if (this.ccNumber == '' || this.ccName == '' || this.ccMonth == '' || this.ccYear == '' || this.ccCCV == '') {
      // this.toaster.showError('Invalid Credit Card Details', '')
      // this.loadingCreditCard = false
      return
    }
    let token = await this.getToken()
    if (token == null) {
      // this.loadingCreditCard = false
      // this.toaster.showError('Invalid credit card information', '')
      return
    }
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.creditCardInput),
      nanceToken: token,
      method: AllowedPaymentMethod.Card,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
        // if (parseFloat(this.grandTotal) <= 0) {
        //   this.openModal(template, cls)
        // }
      }, (err) => {
        console.log('err while paying with stripe', err);
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )
  }

  // Pay by credit card with stripe or brainteee end here

  // Pay by cash starts from here

  verifyCash() {
    this.cashChange = Number(this.cashInput) - this.remainingAmount
  }

  changeReturnChnageMethod(bool) {
    this.returnChange = bool
  }

  cashInput = ''
  cashChange = 0
  returnChange = true
  payByCash(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.cashInput == '' || parseFloat(this.cashInput) <= 0) {
      this.paymentLoader = false
      this.showToaster = false
      this.toasterMsg = 'Please enter amount.'
      this.toasterType = 'error'
      return
    }
    // if (Number(this.cashInput) > this.remainingAmount) {
    //   this.paymentLoader = false
    //   this.showToaster = false
    //   this.toasterMsg = 'Amount enter is greater than balance.'
    //   this.toasterType = 'error'
    //   return
    // }
    // this.loadingCreditCard = true
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.cashInput),
      cashRegisterId: this.cashRegId,
      method: AllowedPaymentMethod.Cash,
      is_extra_amount: this.cashChange > 0 ? true : false,
      is_add_storeCredit: !this.returnChange,
      return_amount: Number(this.cashChange),
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + parseFloat(this.cashInput)
        this.remainingAmount = this.remainingAmount - parseFloat(this.cashInput)
        this.cashInput = ''
        this.paymentLoader = false
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
        // this.showToaster = false
        // this.toasterMsg = 'Payment sucessfully recorded'
        // this.toasterType = 'success'
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
        // err.graphQLErrors[0].message
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )
  }
  // Pay by cash ends here

  // Pay by checque starts from here

  checqueInput = ''
  checqueNo = ''
  payByChecque(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.checqueInput == '' || parseFloat(this.checqueInput) <= 0) {
      this.showToaster = false
      this.toasterMsg = 'Please enter amount.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    if (parseFloat(this.checqueInput) > 0) {
      if (this.checqueNo == '') {
        this.showToaster = false
        this.toasterMsg = 'Please enter check number.'
        this.toasterType = 'error'
        this.paymentLoader = false
        return
      }
    }
    if (Number(this.checqueInput) > this.remainingAmount) {
      this.paymentLoader = false
      this.showToaster = false
      this.toasterMsg = 'Amount enter is greater than balance.'
      this.toasterType = 'error'
      return
    }
    // this.loadingCreditCard = true
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.checqueInput),
      method: AllowedPaymentMethod.Cheque,
      cheque_number: this.checqueNo,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + parseFloat(this.checqueInput)
        this.remainingAmount = this.remainingAmount - parseFloat(this.checqueInput)
        this.checqueInput = ''
        this.checqueNo = ''
        this.paymentLoader = false
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
        // if (parseFloat(this.grandTotal) <= 0) {
        //   this.openModal(template, cls)
        // }
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )
  }
  // Pay by checque starts from here

  // Pay by Paypal TransactionID starts from here
  paypalTransactionInput = ''
  paypalTransactionID = ''
  payByPaypalTransactioID(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.paypalTransactionInput == '' || parseFloat(this.paypalTransactionInput) <= 0) {
      this.showToaster = false
      this.toasterMsg = 'Please enter amount.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    else if (this.paypalTransactionID == '') {
      // this.toaster.showError('Please enter transaction ID', '')
      this.showToaster = false
      this.toasterMsg = 'Please enter transaction ID.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    if (Number(this.paypalTransactionInput) > this.remainingAmount) {
      this.paymentLoader = false
      this.showToaster = false
      this.toasterMsg = 'Amount enter is greater than balance.'
      this.toasterType = 'error'
      return
    }
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.paypalTransactionInput),
      method: AllowedPaymentMethod.PaypalTransactionId,
      paypal_transaction_id: this.paypalTransactionID,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + parseFloat(this.paypalTransactionInput)
        this.remainingAmount = this.remainingAmount - parseFloat(this.paypalTransactionInput)
        this.paypalTransactionInput = ''
        this.paypalTransactionID = ''
        this.paymentLoader = false
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
        // if (parseFloat(this.grandTotal) <= 0) {
        //   this.openModal(template, cls)
        // }
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )

  }
  // Pay by Paypal TransactionID ends from here

  // Pay by Net Term starts from here

  netTermInput = ''
  payByNetTerms(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.netTermInput == '' || parseFloat(this.netTermInput) <= 0) {
      this.showToaster = false
      this.toasterMsg = 'Please enter amount.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    if (Number(this.netTermInput) > (this.customerNetTermDetail[0]['net_term']['credit_limit'] - this.customerNetTermDetail[0]['net_term']['used_credit'])) {
      this.showToaster = false
      this.toasterMsg = 'Available net terms not enough for payment.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    if (Number(this.netTermInput) > this.remainingAmount) {
      this.paymentLoader = false
      this.showToaster = false
      this.toasterMsg = 'Amount enter is greater than balance.'
      this.toasterType = 'error'
      return
    }
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.netTermInput),
      method: AllowedPaymentMethod.NetTerm,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.customerNetTermDetail[0]['net_term']['used_credit'] = Number(this.customerNetTermDetail[0]['net_term']['used_credit']) + Number(this.netTermInput)
        this.priorAmount = this.priorAmount + parseFloat(this.netTermInput)
        this.remainingAmount = this.remainingAmount - parseFloat(this.netTermInput)
        this.netTermInput = ''
        this.paymentLoader = false
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
        // if (parseFloat(this.grandTotal) <= 0) {
        //   this.openModal(template, cls)
        // }
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )

  }
  // Pay by Net Term ends from here

  // Pay by Store Credit starts from here

  storeCreditInput = ''
  payByStoreCredit(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.storeCreditInput == '' || parseFloat(this.storeCreditInput) <= 0) {
      this.showToaster = false
      this.toasterMsg = 'Please enter amount.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    if (parseFloat(this.storeCreditInput) > this.customerNetTermDetail[0]['store_credit']['credit_amount']) {
      this.showToaster = false
      this.toasterMsg = 'Store Credit not enough for payment.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    if (Number(this.storeCreditInput) > this.remainingAmount) {
      this.paymentLoader = false
      this.showToaster = false
      this.toasterMsg = 'Amount enter is greater than balance.'
      this.toasterType = 'error'
      return
    }
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.storeCreditInput),
      method: AllowedPaymentMethod.StoreCredit,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + parseFloat(this.storeCreditInput)
        this.remainingAmount = this.remainingAmount - parseFloat(this.storeCreditInput)
        this.customerNetTermDetail[0]['store_credit']['credit_amount'] = Number(this.customerNetTermDetail[0]['store_credit']['credit_amount']) - Number(this.storeCreditInput)
        this.storeCreditInput = ''
        this.paymentLoader = false
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
        // if (parseFloat(this.grandTotal) <= 0) {
        //   this.openModal(template, cls)
        // }
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )
  }

  // Pay by Store Credit ends from here

  // Pay by Paypal Invoice starts from here

  paypalCashInput = ''
  paypalEmail = ''
  payByPaypalInvoice(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.paypalCashInput == '' || this.paypalEmail == '') {
      this.showToaster = false
      this.toasterMsg = 'Please enter amount.'
      this.toasterType = 'error'
      this.paymentLoader = false
      // this.toaster.showError('Please enter data', '')
      // this.loadingCreditCard = false
      return
    }
    else if (!this.emailPattern.test(this.paypalEmail)) {
      this.showToaster = false
      this.toasterMsg = 'Please enter valid email.'
      this.toasterType = 'error'
      this.paymentLoader = false
      // this.loadingCreditCard = false
      // this.toaster.showError('Invalid email', '')
      return
    }
    if (Number(this.paypalCashInput) > this.remainingAmount) {
      this.paymentLoader = false
      this.showToaster = false
      this.toasterMsg = 'Amount enter is greater than balance.'
      this.toasterType = 'error'
      return
    }
    let obj = {
      transactionId: this.orderId,
      amount: parseFloat(this.paypalCashInput),
      email: this.paypalEmail,
      method: AllowedPaymentMethod.PaypalInvoice,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + parseFloat(this.paypalCashInput)
        this.remainingAmount = this.remainingAmount - parseFloat(this.paypalCashInput)
        this.paypalCashInput = ''
        this.paypalEmail = ''
        this.paymentLoader = false
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
        // this.grandTotal = this.grandTotal - parseFloat(this.creditCardInput)
        // this.loadingCreditCard = false
        // this.toaster.showSuccess('Payment recorded with Credit Card', '')
        // if (parseFloat(this.grandTotal) <= 0) {
        //   this.openModal(template, cls)
        // }
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
        //   this.loadingCreditCard = false
        //   this.toaster.showError(err['message'].substr(15, 47), '')
      }
    )
  }
  // Pay by Paypal Invoice starts from here

  // Pay by discount start from here

  discountDetails = {}
  isDiscountApplied = false
  discountCoupon = ''
  discountBalance = 0
  applyDiscount(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.discountCoupon == '') {
      this.showToaster = false
      this.toasterMsg = 'Please enter discount code.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    this.createSaleGQL.validateDiscountCode(this.discountCoupon, this.currendOrder['Customer']['_id']).valueChanges.subscribe(
      (res) => {
        console.log('discount code res', res['data'].validateDiscountByCode);
        this.modalRef.hide()
        if (!res['data'].validateDiscountByCode.is_eligible) {
          this.showToaster = false
          this.toasterMsg = res['data'].validateDiscountByCode.message
          this.toasterType = 'error'
          this.paymentLoader = false
          return
        }

        //this.discountDetails = res['data'].validateDiscountByCode.discount
        if (this.discountDetails['is_percentage']) {
          this.discountBalance = (this.discountDetails['discount_amount'] * this.totalAmount) / 100
          // this.remainingAmount = this.grandTotal - this.discountBalance
        }
        else {
          this.discountBalance = this.discountDetails['discount_amount']
          // this.remainingAmount = this.grandTotal - this.discountDetails['discount_amount']
        }
        this.payByDiscount(template, cls)
        this.modalService.hide(1)
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        this.paymentLoader = false
        console.log('discount code err', err);
        // this.toaster.showError(err['message'].substr(15), '')
      }
    )
  }

  payByDiscount(template: TemplateRef<any>, cls) {
    let obj = {
      transactionId: this.orderId,
      amount: Number(this.discountBalance),
      discount_card_code: this.discountDetails['code'],
      method: AllowedPaymentMethod.DiscountCard,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + Number(this.discountBalance)
        this.remainingAmount = this.remainingAmount - Number(this.discountBalance)
        this.paymentLoader = false
        this.discountBalance = 0
        this.discountDetails = null
        this.discountCoupon = ''
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          this.getOrderByID(this.currendOrder['_id'])
          return
        }
        this.getOrderByID(this.currendOrder['_id'])
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
      }
    )
  }

  // Pay by discount ends here

  // Pay by gift card starts from here

  giftCardNumber = ''
  giftCardDetail: any
  validateGiftCard(template: TemplateRef<any>, cls) {
    this.paymentLoader = true
    if (this.giftCardNumber == '') {
      this.showToaster = false
      this.toasterMsg = 'Please enter discount code.'
      this.toasterType = 'error'
      this.paymentLoader = false
      return
    }
    this.createSaleGQL.validateGiftCoupon(this.giftCardNumber).valueChanges.subscribe(
      (res) => {
        console.log('gift card res', res);
        if (res['data'].GetGiftCardBycardNo.is_used) {
          this.showToaster = false
          this.toasterMsg = 'Gift card already used.'
          this.toasterType = 'error'
          this.paymentLoader = false
          return
        }
        else {
          this.giftCardDetail = res['data'].GetGiftCardBycardNo
          this.payByGiftCard(template, cls)
        }
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        this.paymentLoader = false
        console.log('Error while paying with gift card', err);
      }
    )
  }

  payByGiftCard(template: TemplateRef<any>, cls) {
    let obj = {
      transactionId: this.orderId,
      amount: this.giftCardDetail['amount'],
      method: AllowedPaymentMethod.GiftCard,
      gift_card_no: this.giftCardNumber,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createSaleGQL.createPayment(obj).subscribe(
      (res) => {
        this.paymentLines = res['data'].createPaymentProcess
        this.priorAmount = this.priorAmount + this.giftCardDetail['amount']
        this.remainingAmount = this.remainingAmount - this.giftCardDetail['amount']
        this.paymentLoader = false
        this.giftCardNumber = ''
        this.giftCardDetail = null
        if (this.totalAmount - this.priorAmount > 0) {
          this.openModal(template, cls)
          return
        }
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
      }, (err) => {
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
        console.log('err while paying with stripe', err);
        this.paymentLoader = false
      }
    )
  }

  // Pay by gift card ends here

  // Recording payments functions ends here 

}
