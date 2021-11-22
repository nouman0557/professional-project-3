import { Injectable } from '@angular/core';
import {
  GetProductsbyDevicewithSearchGQL, CreatePaymentProcessGQL, GetBrainTreeTokenGQL, GetCheckOutOrderGQL, ValidateDiscountByCodeGQL, GetGiftCardBycardNoGQL, DeviceIssuesGQL, GetPreviousDeviceCheckInGQL,
  CreateDeviceCheckInsGQL, UploadFileWithoutfolderIdGQL, GetCartDataGQL, DeleteFileGQL, CreateDeviceIssuesGQL, PayLaterInvoiceGQL,
  GetDeviceProductAndServiceGQL,
  DeviceIssuesDocument
} from 'src/app/generated/graphql';
import { GetTaxsByLocationGQL, TaxTypeEnum, CreateSaleGQL, EmailTicketGQL, GetdeviceCheckInGQL, GetTaxByLocationIdGQL } from 'src/app/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class CreateSaleGQLService {

  constructor(
    private getProductsbyDevicewithSearchGQL: GetProductsbyDevicewithSearchGQL,
    private createPaymentProcessGQL: CreatePaymentProcessGQL,
    private getBrainTreeTokenGQL: GetBrainTreeTokenGQL,
    private getCheckOutOrderGQL: GetCheckOutOrderGQL,
    private getTaxsByLocation: GetTaxsByLocationGQL,
    private createSaleGQL: CreateSaleGQL,
    private validateDiscountByCodeGQL: ValidateDiscountByCodeGQL,
    private getGiftCardBycardNoGQL: GetGiftCardBycardNoGQL,
    private deviceIssuesGQL: DeviceIssuesGQL,
    private getPreviousDeviceCheckInGQL: GetPreviousDeviceCheckInGQL,
    private createDeviceCheckInsGQL: CreateDeviceCheckInsGQL,
    private uploadFileWithoutfolderIdGQL: UploadFileWithoutfolderIdGQL,
    private emailTicketGQL: EmailTicketGQL,
    private getCartDataGQL: GetCartDataGQL,
    private getdeviceCheckInGQL: GetdeviceCheckInGQL,
    private deleteFileGQL: DeleteFileGQL,
    private createDeviceIssuesGQL: CreateDeviceIssuesGQL,
    private getTaxByLocationIdGQL: GetTaxByLocationIdGQL,
    private payLaterInvoiceGQL: PayLaterInvoiceGQL,
    private getDeviceProductAndServiceGQL: GetDeviceProductAndServiceGQL
  ) { }

  getAllProductsWithFilters(obj) {
    return this.getProductsbyDevicewithSearchGQL.watch({
      input: obj
    })
  }

  getCheckoutOrderById(id) {
    return this.getCheckOutOrderGQL.watch({
      businessLocation: localStorage.getItem('location_id'),
      orderID: id
    })
  }

  getOrderById(id, location_id) {
    return this.getCartDataGQL.watch({
      businessLocation: location_id,
      orderID: id
    }).valueChanges
  }

  createPayment(obj) {
    return this.createPaymentProcessGQL.mutate({
      input: obj
    })
  }

  getBrainTreeToken() {
    return this.getBrainTreeTokenGQL.watch().valueChanges
  }
  //not used for sale tax
  getSaleTaxsByBusinessLocation(businessLocation = localStorage.getItem('location_id')) {
    return this.getTaxsByLocation.watch({
      location_id: businessLocation,
      taxType: TaxTypeEnum.SaleTax
    })
  }
  //used for sale tax
  getSaleTaxByBusinessLocation(location_id) {
    return this.getTaxByLocationIdGQL.watch({
      businessLocationId: location_id
    })
  }

  onCreateSale(orderId, createSaleInput) {
    return this.createSaleGQL.mutate({
      orderID: orderId,
      input: createSaleInput
    })

  }

  validateDiscountCode(code, id) {
    return this.validateDiscountByCodeGQL.watch({
      code: code,
      customerId: id
    })
  }

  validateGiftCoupon(giftNo) {
    return this.getGiftCardBycardNoGQL.watch({
      card_no: giftNo,
      BusinessLocation: window.localStorage.getItem('location_id')
    })
  }

  getDeviceCheckInByID(id) {
    return this.getdeviceCheckInGQL.watch({
      id: id
    })
  }

  createDeviceIssues(obj) {
    return this.createDeviceIssuesGQL.mutate({
      input: obj
    })
  }

  getDeviceIssues(type) {
    return this.deviceIssuesGQL.watch({
      issueType: type
    })
  }

  getPreviousCheckIns(id, date) {
    return this.getPreviousDeviceCheckInGQL.watch({
      checkINDate: date,
      customerID: id
    })
  }

  createDeviceCheckIn(id, data, img) {
    return this.createDeviceCheckInsGQL.mutate({
      device_id: id,
      input: data,
      file: img
    },
      {
        context: {
          useMultipart: true
        }
      })
  }

  uploadCheckinDeviceImages(obj, files) {
    return this.uploadFileWithoutfolderIdGQL.mutate({
      input: obj,
      file: files
    },
      {
        context: {
          useMultipart: true
        }
      })
  }

  removeFile(id) {
    return this.deleteFileGQL.mutate({
      file_id: id
    })
  }

  sendEmailOnOrder(orderID, businessLocation) {
    return this.emailTicketGQL.watch({
      orderID: orderID,
      businessLocation: businessLocation
    }).valueChanges
  }

  payLater(id) {
    return this.payLaterInvoiceGQL.mutate({
      location_id: localStorage.getItem('location_id'),
      transactionID: id
    })
  }

  getDeviceProductAndService(deviceID,is_product,location_id){
    return this.getDeviceProductAndServiceGQL.watch({
      deviceID:deviceID,
      is_product:is_product,
      location_id:location_id
    })
  }
}
