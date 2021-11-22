import { Injectable } from '@angular/core';
import { GenericUtility } from 'src/app/utilties/generic-utility';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import {
  GetAllSupplierRestockGQL, SupplierChangeBuybackGQL, GetBrandWiseDevicesGQL,
  CreateBuyBackOrderGQL, CreateSystemDeviceGQL, GetPurchaseOrderbyIdGQL,
  PoDeleteGQL, PoSupplierOrderNumberGQL, BuybackCancelGQL, AddShippingDetailGQL,
  PoStatusUpdateGQL, UpdateSystemDeviceGQL, DeleteSystemDeviceGQL, BuybackReceivingGQL
} from 'src/app/generated/graphql'
import { EnvironmentUrl } from 'src/environments/environment-url';
import { PrintService } from 'src/app/print/print.service';
@Injectable({
  providedIn: 'root'
})

export class StockService {

  //Buyback
  private supplierOrderNumberSource = new BehaviorSubject('');
  orderNumber$ = this.supplierOrderNumberSource.asObservable()
  private trackingNumberSource = new BehaviorSubject('');
  trackingNumber$ = this.trackingNumberSource.asObservable()

  constructor(private getAllSupplierRestock: GetAllSupplierRestockGQL,
    private getBrandWisedevice: GetBrandWiseDevicesGQL,
    private supplierChangeBuyback: SupplierChangeBuybackGQL,
    private createBuyBackOrder: CreateBuyBackOrderGQL,
    private createSystemDevice: CreateSystemDeviceGQL,
    private getPurchaseOrderById: GetPurchaseOrderbyIdGQL,
    private poDelete: PoDeleteGQL,
    private supplierOrderNumber: PoSupplierOrderNumberGQL,
    private buybackCanel: BuybackCancelGQL,
    private shippingDetail: AddShippingDetailGQL,
    private statusUpdate: PoStatusUpdateGQL,
    private updateSystemDevice: UpdateSystemDeviceGQL,
    private deleteSystemDevice: DeleteSystemDeviceGQL,
    private buybackReceiving: BuybackReceivingGQL,
    private genericUtility: GenericUtility,
    private printService: PrintService,
    private datePipe: DatePipe) { }


  changeSupplierOrderNumber(orderNumber: string) {
    this.supplierOrderNumberSource.next(orderNumber)
  }
  changeTrackingNumber(trackingNumber: string) {
    this.trackingNumberSource.next(trackingNumber)
  }


  updateBrandSystemDevice(_id, systemDevice) {
    return this.updateSystemDevice.mutate({
      ID: _id,
      input: systemDevice
    })
  }
  deleteBrandSystemDevice(_id) {
    return this.deleteSystemDevice.mutate({ ID: _id })
  }

  getAllSupplier(search) {
    return this.getAllSupplierRestock.watch({
      search: search == null ? "" : search,
      location_id: window.localStorage.getItem('location_id')
    })
  }
  getBrandDevices(search) {
    return this.getBrandWisedevice.watch({
      search: search,
      location_id: window.localStorage.getItem('location_id')
    })
  }
  changesupplierBuyBackStatus(_id, isBuyBack) {
    return this.supplierChangeBuyback.mutate({
      id: _id,
      input: isBuyBack
    })
  }

  receiveBuyback(id, data) {
    return this.buybackReceiving.mutate({
      orderID: id,
      input: data
    })
  }

  addUpdateBuyBackOrder(Id, createBuyBackInputObject) {
    if (Id != null) {
      return this.createBuyBackOrder.mutate({
        transactionId: Id,
        input: createBuyBackInputObject
      })
    } else {
      return this.createBuyBackOrder.mutate({
        input: createBuyBackInputObject
      })
    }
  }
  addeSystemDevice(device) {
    return this.createSystemDevice.mutate({
      input: device
    })
  }
  getOrderByID(id) {
    return this.getPurchaseOrderById.watch({
      orderID: id
    })
  }
  deleteOrder(orderId) {
    return this.poDelete.mutate({
      orderID: orderId
    })
  }
  addSupplierOrderNumber(orderId, orderNumber) {
    return this.supplierOrderNumber.mutate({
      orderID: orderId,
      order_number: orderNumber

    })
  }
  cancelBuyback(orderId, userName, password) {
    return this.buybackCanel.mutate({
      orderID: orderId,
      username: userName,
      password: password
    })
  }
  addShippingDetail(orderId, companyName, trackNumber, estimatedDate) {
    return this.shippingDetail.mutate({
      orderID: orderId,
      company_name: companyName,
      tracking_number: trackNumber,
      estimated_days: estimatedDate
    })
  }

  updateOrderStatus(orderId, status) {
    return this.statusUpdate.mutate({
      orderID: orderId,
      status_type: status
    })
  }
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  exportProduct(data) {
    return this.genericUtility.getFileFromPost('api/productcsv', { productids: data })
  }

  exportCustomer(data) {
    return this.genericUtility.getFileFromPost('api/customerExport', { customer_ids: data })
  }

  exportDevices(data) {
    return this.genericUtility.getFileFromPost('api/deviceExport', { device_ids: data })
  }

  printDocument(idsArray) {
    const invoiceIds = ['101', '102'];
    idsArray = invoiceIds // to be replaced
    this.printService
      .printDocument('invoice', invoiceIds);
  }

  printAndExportOrders(orderList: any[], isExport, fileType) {

    let fileName = ""
    let url = 'api/pdf'

    var date = new Date();

    console.log(this.datePipe.transform(date, "MMMM-dd-yyyy")); //output : 2018-02-13

    let purchase = orderList.filter(
      order => { return order.transaction_type == 'purchase' })

    let rma = orderList.filter(
      order => { return order.transaction_type == 'rma' })

    let buyBack = orderList.filter(
      order => { return order.transaction_type == 'buyback' })

    if (purchase.length > 0) {
      let OrderIds = []
      for (var val of purchase) {
        OrderIds.push(val['_id'])
      }
      if (purchase.length == 1) {
        fileName = purchase[0].transaction_keeping_unit.substr(1) + '_' + this.datePipe.transform(date, "MMMM-dd-yyyy") + '_' + Math.floor(100000 + Math.random() * 900000)
      } else {
        fileName = 'PO_' + this.datePipe.transform(date, "MMMM-dd-yyyy") + '_' + Math.floor(100000 + Math.random() * 900000)
      }
      this.printService.printAndExportOrders(url, { orderId: OrderIds, fileType: fileType, is_export: isExport, orderType: 'po' }, isExport, fileName)
    }

    if (rma.length > 0) {
      let OrderIds = []
      for (var val of rma) {
        OrderIds.push(val['_id'])
      }
      if (rma.length == 1) {

        fileName = rma[0].transaction_keeping_unit.substr(1) + '_' + this.datePipe.transform(date, "MMMM-dd-yyyy") + '_' + Math.floor(100000 + Math.random() * 900000)
      } else {
        fileName = 'RMA_' + this.datePipe.transform(date, "MMMM-dd-yyyy") + '_' + Math.floor(100000 + Math.random() * 900000)
      }
      this.printService.printAndExportOrders(url, { orderId: OrderIds, fileType: fileType, is_export: isExport, orderType: 'rma' }, isExport, fileName)
    }

    if (buyBack.length > 0) {
      let OrderIds = []
      for (var val of buyBack) {
        OrderIds.push(val['_id'])
      }
      if (buyBack.length == 1) {
        fileName = buyBack[0].transaction_keeping_unit.substr(1) + '_' + this.datePipe.transform(date, "MMMM-dd-yyyy") + '_' + Math.floor(100000 + Math.random() * 900000)
      } else {
        fileName = 'BB_' + this.datePipe.transform(date, "MMMM-dd-yyyy") + '_' + Math.floor(100000 + Math.random() * 900000)
      }
      this.printService.printAndExportOrders(url, { orderId: OrderIds, fileType: fileType, is_export: isExport, orderType: 'buyback' }, isExport, fileName)
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }





}


