import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {
  GetOrdersAndSearchGQL, FilterStatus, InputTicketsFilter, Ticketfooterfilter, ReasonType
  // GetCartOrderDataGQL
} from 'src/app/generated/graphql';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { FormControl } from '@angular/forms';
import { Orders } from "../../Globals/order";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketsGQLService } from 'src/app/services/order and invoice/ticketsGQLService';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { CustomerGQLService } from 'src/app/services/customer/customerGQL.service';
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service';
import { PrintService } from 'src/app/print/print.service';
import { DownloadFileComponent } from '../shared-templates/download-file/download-file.component';
import { RepairRoomGQLService } from 'src/app/services/repair-room/repair-room-gql.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TicketsComponent implements OnInit {
  modalRef: BsModalRef;
  listOfAllOrders = []
  searchText = ''
  searchOrderData = []
  limit: number = 100
  skip: number = 0;
  searchOrder: FormControl = new FormControl();
  loadOrderInvoice = false;
  isCustomerSpecific = false
  customerId = ''
  orderId = ''
  existingOrders = true
  viewInvoice = false
  statusFilter = 'Repair Status'
  ticketFilters: InputTicketsFilter = null
  repairStatuses = []
  documentPath = EnvironmentUrl.Images
  selectedTicket = {}
  selectTransactionPayment = {}
  @ViewChild("downloadFileModal", { static: true }) downloadFileModal: DownloadFileComponent;
  constructor(
    private modalService: BsModalService,
    private toaster: ToasterService,
    private order: Orders,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private getOrdersAndSearchGQL: GetOrdersAndSearchGQL,
    private ticketsGQLService: TicketsGQLService,
    private customerGQLService: CustomerGQLService,
    private repairRoomService: RepairRoomService,
    private printService: PrintService,
    private repairRoomGQLService: RepairRoomGQLService,
    private _repairRoom: RepairRoomService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('paramameters are', params.id);
      if (params.id != undefined) {
        this.orderId = params.id
        this.getTicketDetailByID(this.orderId)
        this.viewInvoice = true
        this.existingOrders = false
        return
      }
    })
    this.getRepairStatus()
    this.ticketFilters = this.ticketsGQLService.getFilters()
    this.searchOrder.setValue(this.ticketFilters['search'])
    this.getAllTickets(false)
    this.searchOrder.valueChanges.subscribe(val => {
      this.updateFilters('search', this.searchOrder.value)
    })
    // this.listOfAllOrders = this.order.getOrderAndInvoices()
    // this.searchOrders()
  }

  getRepairStatus() {
    this.ticketsGQLService.getReparStatus().subscribe(
      (res) => {
        console.log('rep status are', res['data'].repairRoomStatus);
        this.repairStatuses = res['data'].repairRoomStatus
        this.repairStatuses.forEach(element => {
          switch (element.status_name) {
            case 'Working on it':
              element.class_name = 'workingCheck'
              element.class_name_detail = "workingOnitBox"
              break
            case 'Stuck':
              element.class_name = 'stuckCheck'
              element.class_name_detail = "stuckBox"
              break;
            case 'Done':
              element.class_name = 'doneCheck'
              element.class_name_detail = "doneBox"
              break
            case 'Not started':
              element.class_name = 'notStartedCheck'
              element.class_name_detail = "notStartedBox"
              break
            case 'Reopen':
              element.class_name = 'reOpenCheck'
              element.class_name_detail = "reOpenBox"
              break
          }
        });
      }, (err) => {
        console.log('rep status err', err);
      }
    )
  }

  repairStatusFilters = []
  setRepairFilters(event, status) {
    if (event.target.checked) {
      this.repairStatusFilters.push(status.status_background_color)
    }
    else {
      for (let i = 0; i < this.repairStatusFilters.length; i++) {
        if (this.repairStatusFilters[i] == status.status_background_color) {
          this.repairStatusFilters.splice(i, 1)
          return
        }
      }
    }
  }

  applyRepairFilters() {
    this.ticketFilters = this.ticketsGQLService.updateFilter('repairStatus', this.repairStatusFilters)
    this.getAllTickets(false)
  }

  returnSelectedRepairFilters(status) {
    let found = this.repairStatusFilters.find(element => element == status.status_background_color);
    return found == undefined ? false : true
  }

  allTickets = []
  loadTickets = false
  toDate = null
  fromDate = null
  ticketCount = 0
  getAllTickets(scroll) {
    this.loadTickets = true
    if (!scroll) {
      this.ticketsGQLService.updateFilter('limit', 100)
      this.ticketFilters = this.ticketsGQLService.updateFilter('skip', 0)
    }
    this.ticketsGQLService.getAllTickets(JSON.parse(JSON.stringify(this.ticketFilters))).valueChanges.subscribe(
      (res) => {
        this.loadTickets = false
        this.ticketCount = res['data'].getTicketswithfilter.count
        if (scroll) {
          this.allTickets = this.allTickets.concat(res['data'].getTicketswithfilter.transaction);
          console.log('tickets are', this.allTickets);
          return
        }
        this.allTickets = res['data'].getTicketswithfilter.transaction
        console.log('tickets are', this.allTickets);
      }, (err) => {
        this.loadTickets = false
        console.log('err while loading tickets', err);
      }
    )
  }

  updateFilters(type, val) {
    this.ticketFilters = this.ticketsGQLService.updateFilter(type, val)
    this.getAllTickets(false)
  }

  sortBalance(filter) {
    if (this.ticketFilters['balance_sorting'] == filter) {
      this.ticketFilters = this.ticketsGQLService.updateFilter('balance_sorting', 'none')
      this.getAllTickets(false)
      return
    }
    this.ticketFilters = this.ticketsGQLService.updateFilter('balance_sorting', filter)
    this.getAllTickets(false)
  }

  applyDateRange() {
    this.ticketsGQLService.updateFilter('start_date', this.fromDate)
    this.ticketFilters = this.ticketsGQLService.updateFilter('end_date', this.toDate)
    this.ticketFilters = this.ticketsGQLService.updateFilter('dateFilter', 'dateRange')
    this.modalRef.hide()
    this.getAllTickets(false)
  }

  clearAllFilters() {
    this.ticketFilters = this.ticketsGQLService.clearAllFilters()
    this.searchOrder.setValue(this.ticketFilters['search'])
    this.repairStatusFilters = []
    this.ticketFilters = this.ticketsGQLService.updateFilter('repairStatus', [])
    this.fromDate = null
    this.toDate = null
    this.getAllTickets(false)
  }

  showInvoiceDetail(ticket) {
    console.log('ticket is', ticket);
    this.router.navigate(['/Pointofsale/Tickets/' + ticket._id])
  }

  showOrderInCart(ticket) {
    this.router.navigate(['/Pointofsale/CreateSale/Order/' + ticket._id])
  }

  loadTicketListing() {
    this.router.navigate(['/Pointofsale/Tickets/'])
  }

  ticketDetail: any = null
  loadTicketDetail = false
  topHeaders = []
  getTicketDetailByID(id) {
    this.loadTicketDetail = true
    this.ticketsGQLService.getTicketDetailByID(id).valueChanges.subscribe(
      (res) => {
        this.loadTicketDetail = false
        this.ticketDetail = res['data'].getTicketDetailById
        this.topHeaders = res['data'].getTicketDetailById.filter_type
        console.log('ticket detail is', this.ticketDetail);
      }, (err) => {
        this.loadTicketDetail = false
        console.log('err while loading ticket detail', err);
      }
    )
  }

  getInvoiceHeader(str) {
    if (str == 'partial' && this.ticketDetail != null) {
      if (this.ticketDetail['transaction_payment_status'] == 'partial') {
        return true
      }
    }
    return this.topHeaders.includes(str);
  }

  printInVoice(bool) {
    let obj = {
      orderIDs: [this.ticketDetail['_id']],
      fileType: 'pdf',
      is_detail: bool
    }
    this.printService.getAndPrintDocument('api/order/download/', obj)
    // this.closeModel()
  }

  downloadInvoices(type) {
    let orderIDs = []
    if (this.viewInvoice) {
      orderIDs.push(this.ticketDetail['_id'])
    }
    else {
      this.allTickets.forEach(element => {
        if (element['checked']) {
          orderIDs.push(element['_id'])
        }
      });
    }
    let obj = {
      orderIDs: orderIDs,
      fileType: type == 'csv' ? 'csv' : 'pdf',
      is_detail: true
    }
    if (type == 'csv') {
      if (orderIDs.length > 1) {
        this.printService.downloadZip('api/order/download/', obj, 'tickets')
        this.modalRef.hide()
        return
      }
      this.printService.downloadCSV('api/order/download/', obj, 'tickets')
    }
    else {
      if (orderIDs.length > 1) {
        this.printService.downloadZip('api/order/download/', obj, 'tickets')
        this.modalRef.hide()
        return
      }
      this.printService.downloadPDF('api/order/download/', obj, 'tickets')
    }
    this.modalRef.hide()
  }

  recordMorePayment() {
    this.router.navigate(['/Pointofsale/Checkout/' + this.ticketDetail['_id']])
  }

  gotoCustomers(id) {
    this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${id})`)
  }

  goToCheckOut(ticket) {

    this.router.navigateByUrl(`Pointofsale/Checkout/${ticket._id})`)
  }

  gotoRepairRoom(id) {
    this.repairRoomService.isListing = false
    this.repairRoomService.setTaskId(id)
    this.router.navigateByUrl(`Pointofsale/RepairRoom`)
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

  isTicketChecked() {
    const ticket = this.allTickets.filter(tic => tic.checked);
    if (ticket.length > 0) {
      return true
    }
    return false
  }

  getCheckedTicketById(id) {
    const ticket = this.allTickets.filter(tic => tic._id == id && tic.checked);
    if (ticket.length > 0) {
      return true
    }
    return false
  }

  tasksReopen = []
  tasksReopenTransaction
  getTaskDetail(id) {
    this.repairRoomGQLService.getRepairRoomTaskDetail(localStorage.getItem('location_id'), id).subscribe(
      (res) => {
        this.tasksReopenTransaction = res.data.repairRoomInvoiceDetail.Transaction
        this.tasksReopen = res['data'].repairRoomInvoiceDetail.Devices
        console.log('task reope', this.tasksReopen)
      }, (err) => {
        console.log('err while loading tasks', err);
      }
    )
  }

  openDeviceAllTasks(event, dev) {
    let service = []
    dev['deviceItems'].forEach(element => {
      service.push({ _id: element._id })
    });
    const index = this.servicesToReOpen.findIndex(x => x.device == dev['_id']);
    if (event.target.checked) {
      if (index == -1) {
        this.servicesToReOpen.push({
          deviceID: dev.device['_id'],
          services: service
        })
        console.log('services are', this.servicesToReOpen);
        return
      }
      this.servicesToReOpen[index]['services'] = service
      console.log('services are', this.servicesToReOpen);
      return
    }
    this.servicesToReOpen.splice(index, 1)
    console.log('services are', this.servicesToReOpen);
  }

  taskDeviceReOpen() {
    this.ticketsGQLService.taskDeviceReOpen(this.tasksReopenTransaction['_id'], localStorage.getItem('location_id'), this.servicesToReOpen,)
      .subscribe((res) => {
        this.showToasterMessage('Ticket repoened', 'success')
        this.servicesToReOpen = []
        this.getAllTickets(false)
      }, (err) => {
        this.showToasterMessage(err.message, 'error')
        this.servicesToReOpen = []
      })
  }

  checkOutTicket(transactionID, location_id = localStorage.getItem('location_id')) {
    this.ticketsGQLService.checkOutTicket(transactionID, location_id).subscribe(
      (res) => {
        this.showToasterMessage('Ticket check out', 'success')
        this.getAllTickets(false)
      }, (err) => {
        this.showToasterMessage(err.message, 'error')
      }
    )
  }

  showToasterMessage(message, type) {
    this.toasterMsg = message
    this.toasterType = type
    this.showToaster = false
  }

  openDeviceTask(event, dev, id) {
    let service = []
    const index = this.servicesToReOpen.findIndex(x => x.device == dev);
    if (event.target.checked) {
      if (index == -1) {
        service.push({ _id: id })
        this.servicesToReOpen.push({
          deviceID: dev,
          services: service
        })
        console.log('services are', this.servicesToReOpen);
        return
      }
      this.servicesToReOpen[index]['services'].push({ _id: id })
      console.log('services are', this.servicesToReOpen);
      return
    }
    this.servicesToReOpen.splice(index, 1)
    console.log('services are', this.servicesToReOpen);
  }

  servicesToReOpen = []
  reOpenService(dev, id) {
    this.servicesToReOpen.push(id)
  }

  checkServiceInList(dev, id) {
    const index = this.servicesToReOpen.findIndex(x => x.deviceID == dev);
    if (index != -1) {
      const serviceIndex = this.servicesToReOpen[index]['services'].findIndex(s => s._id == id);
      return serviceIndex == -1 ? false : true
    }
  }

  addTaxDocument(event) {
    this.document = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(this.document);
    reader.onload = (event: any) => {
      this.document = event.target.result;
    }
    console.log('document is', this.document);
  }

  state = ''
  taxId = ''
  document: any = null
  refundSalesTaxSubmitted = false
  refundSalesTax() {
    if (this.state == '' || this.taxId == '' || this.document == null) {
      this.refundSalesTaxSubmitted = true
      return
    }
    let obj = {
      customerId: this.ticketDetail['Customer']['_id'],
      orderId: this.ticketDetail['_id'],
      location_id: localStorage.getItem('location_id'),
      file: this.document,
      state: this.state,
      tax_certificate_id: this.taxId
    }
    this.ticketsGQLService.refundSalesTax(obj).subscribe(
      (res) => {
        this.ticketDetail['tax_refund'] = res['data'].createTaxRefund.tax_refund
        this.ticketDetail['is_tax_refund'] = res['data'].createTaxRefund.is_tax_refund
        this.ticketDetail['is_apply_sale_tax'] = false
        this.ticketDetail['sub_total_amount'] = res['data'].createTaxRefund.sub_total_amount
        this.ticketDetail['total_amount'] = res['data'].createTaxRefund.total_amount
        this.ticketDetail['filter_type'] = res['data'].createTaxRefund.filter_type
        this.topHeaders = res['data'].createTaxRefund.filter_type
        this.ticketDetail['TicketLogs'] = res['data'].createTaxRefund.TicketLogs
        this.ticketDetail['remaining_amount'] = res['data'].createTaxRefund.remaining_amount
        this.modalRef.hide()
      }, (err) => {
        this.showPopUpToaster = false
        this.toasterType = 'error'
        this.toasterMsg = err.graphQLErrors[0].message
        console.log('err while refunding sales tax', err);
      }
    )
  }

  downloadDocument() {
    if (!this.ticketDetail['is_tax_refund']) {
      this.showToaster = false
      this.toasterMsg = 'Document not attaced.'
      this.toasterType = 'error'
      return
    }
    window.open(this.documentPath + this.ticketDetail['tax_refund']['document_path'], 'Download Document')
  }

  sendEmail() {
    this.ticketsGQLService.sendEmail(this.ticketDetail['_id']).valueChanges.subscribe(
      (res) => {
        if (res['data'].emailTicket) {
          this.showToaster = false
          this.toasterMsg = 'Email sent successfully.'
          this.toasterType = 'success'
        }
      }, (err) => {
        this.showToaster = false
        this.toasterType = 'error'
        this.toasterMsg = err.graphQLErrors[0].message
        console.log('err while sending email', err);
      }
    )
  }

  refundReasons = []
  refundAmountReasons = []
  getReasons() {
    this.customerGQLService.getReasons(ReasonType.RefundByAmount).subscribe(
      (res) => {
        this.refundAmountReasons = res['data'].getReasons
      }, (err) => {
        console.log('err while loading reasons', err);
      }
    )
    this.customerGQLService.getReasons(ReasonType.RefundByItem).subscribe(
      (res) => {
        this.refundReasons = res['data'].getReasons
      }, (err) => {
        console.log('err while loading reasons', err);
      }
    )
  }

  refundMethod = false
  refundByItem = true
  refundByAmount = false
  openRefund() {
    this.sellLines = JSON.parse(JSON.stringify(this.ticketDetail['TransactionSellLine']))
    console.log('selll lines', this.sellLines);
    for (let i = 0; i < this.sellLines.length; i++) {
      if (this.sellLines[i]['Device'] != null) {
        for (let j = 0; j < this.sellLines[i]['products'].length; j++) {
          this.sellLines[i]['products'][j]['total_amount'] = 0
          this.sellLines[i]['products'][j]['return_quantity'] = 0
        }
      }
      else {
        this.sellLines[i]['return_quantity'] = 0
        this.sellLines[i]['total_amount'] = 0
      }
    }
    this.refundMethod = true
    this.getReasons()
  }

  sellLines = []
  openRefundType(open, close) {
    this[open] = true
    this[close] = false
  }

  refundAmountReason = 'Please select any reason'
  setRefundAmountReason(reason) {
    this.refundAmountReason = reason
  }

  refundType() {
    if (this.refundByAmount) {
      this.refundAmount()
      return
    }
    this.refundItem()
  }

  amountToRefund = ''
  refundAmountSubmitted = false
  refundAmountNote = ''
  refundAmount() {
    if (this.amountToRefund == '' || this.refundAmountReason == 'Please select any reason') {
      this.refundAmountSubmitted = true
      return
    }
    this.refundAmountSubmitted = false
    let obj = {
      transactionID: this.ticketDetail['_id'],
      reason: this.refundAmountReason,
      note: this.refundAmountNote,
      amount: Number(this.amountToRefund),
      location_id: localStorage.getItem('location_id')
    }
    this.ticketsGQLService.refundByAmount(obj).subscribe(
      (res) => {
        this.ticketDetail['tax_refund'] = res['data'].InvoiceRefundByAmount.tax_refund
        this.ticketDetail['is_tax_refund'] = res['data'].InvoiceRefundByAmount.is_tax_refund
        this.ticketDetail['is_apply_sale_tax'] = false
        this.ticketDetail['sub_total_amount'] = res['data'].InvoiceRefundByAmount.sub_total_amount
        this.ticketDetail['total_amount'] = res['data'].InvoiceRefundByAmount.total_amount
        this.ticketDetail['filter_type'] = res['data'].InvoiceRefundByAmount.filter_type
        this.topHeaders = res['data'].InvoiceRefundByAmount.filter_type
        this.ticketDetail['TicketLogs'] = res['data'].InvoiceRefundByAmount.TicketLogs
        this.ticketDetail['remaining_amount'] = res['data'].InvoiceRefundByAmount.remaining_amount
        this.amountToRefund = ''
        this.refundAmountSubmitted = false
        this.refundAmountNote = ''
        this.refundAmountReason = 'Please select any reason'
        this.closeRefund()
      }, (err) => {
        this.showToaster = false
        this.toasterType = 'error'
        this.toasterMsg = err.graphQLErrors[0].message
        console.log('err while refunding amount', err);
      }
    )
  }

  increaseReturnQtyItem(index, itemIndex, isDev) {
    if (isDev) {
      if (this.sellLines[index]['products'][itemIndex]['return_quantity'] < this.sellLines[index]['products'][itemIndex]['quantity']) {
        this.sellLines[index]['products'][itemIndex]['return_quantity'] = this.sellLines[index]['products'][itemIndex]['return_quantity'] + 1
        this.sellLines[index]['products'][itemIndex]['total_amount'] = this.sellLines[index]['products'][itemIndex]['return_quantity'] * this.sellLines[index]['products'][itemIndex]['product_sale_price']
      }
      return
    }
    if (this.sellLines[index]['return_quantity'] < this.sellLines[index]['quantity']) {
      this.sellLines[index]['return_quantity'] = this.sellLines[index]['return_quantity'] + 1
      this.sellLines[index]['total_amount'] = this.sellLines[index]['return_quantity'] * this.sellLines[index]['product_sale_price']
    }
  }

  decreaseReturnQtyItem(index, itemIndex, isDev) {
    if (isDev) {
      if (this.sellLines[index]['products'][itemIndex]['return_quantity'] > 0) {
        this.sellLines[index]['products'][itemIndex]['return_quantity'] = this.sellLines[index]['products'][itemIndex]['return_quantity'] - 1
        this.sellLines[index]['products'][itemIndex]['total_amount'] = this.sellLines[index]['products'][itemIndex]['return_quantity'] * this.sellLines[index]['products'][itemIndex]['product_sale_price']
      }
      return
    }
    if (this.sellLines[index]['return_quantity'] > 0) {
      this.sellLines[index]['return_quantity'] = this.sellLines[index]['return_quantity'] - 1
      this.sellLines[index]['total_amount'] = this.sellLines[index]['return_quantity'] * this.sellLines[index]['product_sale_price']
    }
  }

  selectReason(index, itemIndex, isDev, reason) {
    if (isDev) {
      this.sellLines[index]['products'][itemIndex]['reason'] = reason
      return
    }
    this.sellLines[index]['reason'] = reason
  }

  backToStock(index, itemIndex, isDev) {
    if (isDev) {
      if (this.sellLines[index]['products'][itemIndex]['back_to_stock'] > this.sellLines[index]['products'][itemIndex]['return_quantity']) {
        this.sellLines[index]['products'][itemIndex]['back_to_stock'] = this.sellLines[index]['products'][itemIndex]['return_quantity']
      }
      return
    }
    if (this.sellLines[index]['back_to_stock'] > this.sellLines[index]['return_quantity']) {
      this.sellLines[index]['back_to_stock'] = this.sellLines[index]['return_quantity']
    }
  }

  refundItemSubmitted = false
  refundItem() {
    this.refundItemSubmitted = true
    console.log('sell lines ===>>>>>>>>>>', this.sellLines);
    let refundItems = []
    for (let i = 0; i < this.sellLines.length; i++) {
      if (this.sellLines[i].is_device) {
        for (let j = 0; j < this.sellLines[i]['products'].length; j++) {
          if (this.sellLines[i]['products'][j]['reason'] == null && this.sellLines[i]['products'][j]['return_quantity'] > 0) {
            this.showToaster = false
            this.toasterMsg = 'Reason is required.'
            this.toasterType = 'error'
            return
          }
          if (this.sellLines[i]['products'][j]['return_quantity'] > 0) {
            let obj = {
              TransactionSellID: this.sellLines[i]['products'][j]['_id'],
              Product: this.sellLines[i]['products'][j]['Product']['_id'],
              sku_number: this.sellLines[i]['products'][j]['supplier_sku'],
              unit_price: this.sellLines[i]['products'][j]['product_sale_price'],
              return_qty: Number(this.sellLines[i]['products'][j]['return_quantity']),
              return_reason: this.sellLines[i]['products'][j]['reason'],
              stock_qty: Number(this.sellLines[i]['products'][j]['back_to_stock']),
              total: Number(this.sellLines[i]['products'][j]['total_amount'])
            }
            refundItems.push(obj)
          }
        }
      }
      else if (!this.sellLines[i].is_device && this.sellLines[i].sell_line_product_type != 'giftCard') {
        if (this.sellLines[i]['reason'] == null && this.sellLines[i]['return_quantity'] > 0) {
          this.showToaster = false
          this.toasterMsg = 'Reason is required.'
          this.toasterType = 'error'
          return
        }
        if (this.sellLines[i]['return_quantity'] > 0) {
          let obj = {
            TransactionSellID: this.sellLines[i]['_id'],
            Product: this.sellLines[i]['product_type'] == 'custom' ? this.sellLines[i]['customProduct']['_id'] : this.sellLines[i]['Product']['_id'],
            sku_number: this.sellLines[i]['supplier_sku'],
            unit_price: this.sellLines[i]['product_sale_price'],
            return_qty: this.sellLines[i]['return_quantity'],
            return_reason: this.sellLines[i]['reason'],
            stock_qty: Number(this.sellLines[i]['back_to_stock']),
            total: this.sellLines[i]['total_amount']
          }
          refundItems.push(obj)
        }
      }
    }
    console.log('refund items are', refundItems);
    this.ticketsGQLService.refundByItems(this.ticketDetail['_id'], refundItems).subscribe(
      (res) => {
        console.log('items refunded', res['data'].InvoiceRefundByItems);
        this.ticketDetail['tax_refund'] = res['data'].InvoiceRefundByItems.tax_refund
        this.ticketDetail['is_tax_refund'] = res['data'].InvoiceRefundByItems.is_tax_refund
        this.ticketDetail['is_apply_sale_tax'] = false
        this.ticketDetail['sub_total_amount'] = res['data'].InvoiceRefundByItems.sub_total_amount
        this.ticketDetail['total_amount'] = res['data'].InvoiceRefundByItems.total_amount
        this.ticketDetail['filter_type'] = res['data'].InvoiceRefundByItems.filter_type
        this.topHeaders = res['data'].InvoiceRefundByItems.filter_type
        this.ticketDetail['TicketLogs'] = res['data'].InvoiceRefundByItems.TicketLogs
        this.ticketDetail['remaining_amount'] = res['data'].InvoiceRefundByItems.remaining_amount
        this.ticketDetail['TransactionSellLine'] = res['data'].InvoiceRefundByItems.TransactionSellLine
        this.getTicketDetailByID(this.ticketDetail['_id'])
        this.closeRefund()
      }, (err) => {
        this.showToaster = false
        this.toasterType = 'error'
        this.toasterMsg = err.graphQLErrors[0].message
        console.log('err while refunding items', err);
      }
    )
  }

  closeRefund() {
    this.refundMethod = false
  }

  showToaster = true
  toasterMsg = 'something went wrong'
  toasterType = 'error'
  closeToaster() {
    this.showToaster = true
  }

  showPopUpToaster = true
  closePopUpToaster() {
    this.showPopUpToaster = true
  }

  invoiceFilter: FilterStatus = FilterStatus.All
  changeValue(val) {
    this.invoiceFilter = JSON.parse(JSON.stringify(FilterStatus[val]))
    this.skip = 0
    this.isScrolling = false
    this.searchOrders()
  }

  searchOrders() {
    let obj = {
      search: this.searchOrder.value,
      filterType: this.invoiceFilter,
      limit: this.limit,
      skip: this.skip,
      CustomerID: this.customerId == '' ? null : this.customerId
    }
    obj = this.cleanObject(obj)
    this.getOrdersAndSearchGQL.watch({
      input: obj
    }).valueChanges.subscribe(
      (response) => {
        this.loadOrderInvoice = false
        if (this.isScrolling) {
          console.log('customer search response is', response['data'].getOrdersAndSearch);
          if (this.listOfAllOrders.length == 0) {
            this.listOfAllOrders = JSON.parse(JSON.stringify(response['data'].getOrdersAndSearch))
          }
          else {
            this.listOfAllOrders = this.listOfAllOrders.concat(response['data'].getOrdersAndSearch)
          }
        }
        else {
          this.listOfAllOrders = response['data'].getOrdersAndSearch
        }
      },
      (err) => {
        this.loadOrderInvoice = false
        console.log('Error from GQL', err)
      }
    )
  }

  getCustomerSpecificData(id) {
    // searchOrder
    let obj = {
      CustomerID: this.customerId
    }
    this.getOrdersAndSearchGQL.watch({
      input: obj
    }).valueChanges.subscribe(
      (res) => {
        this.listOfAllOrders = res['data'].getOrdersAndSearch
        console.log('customer specific data is', res);
        this.loadOrderInvoice = false
      }, (err) => {
        this.loadOrderInvoice = false
        console.log('customer specific data err', err);
      }
    )
  }

  viewOrder(order) {
    this.router.navigate(['/Pointofsale/CreateSale/' + order['transaction_status'] + '/' + order._id])
  }

  passInvoice(id) {
    this.router.navigate(['/Pointofsale/CreateSale/' + 'invoice' + '/' + id])
  }

  isScrolling = false
  onScroll() {
    console.log('scroll');
    this.ticketFilters = this.ticketsGQLService.updateFilter('skip', this.ticketFilters['limit'])
    this.ticketFilters = this.ticketsGQLService.updateFilter('limit', this.ticketFilters['limit'] + 100)
    this.getAllTickets(true)
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj
  }

  customerDetail: any
  subTotal: any
  grandTotal: any
  fullInvoice: any
  cumtomerSelected: any
  note = ''
  option = true
  fullOrderDiscount = 0
  fullOrderDis = 0
  discountMethodCheck = ''
  chargesTaxes = 0
  taxChecked = false
  loadInvoice(id) {
    this.haveDiscount = false
    // this.getOrderByIdGQL.watch({
    //   orderID: id
    // }).valueChanges.subscribe(
    //   (res) => {
    //     console.log('resp of view order', res['data'].getCartOrderData);
    //     this.convertToSale(res['data'].getCartOrderData.TransactionSellLine)
    //     this.customerDetail = res['data'].getCartOrderData.Customer
    //     this.cumtomerSelected = res['data'].getCartOrderData.Customer
    //     this.subTotal = Number(res['data'].getCartOrderData.total_amount)
    //     // this.grandTotal = Number(res['data'].getCartOrderData.final_total)
    //     this.note = res['data'].getCartOrderData.staff_note
    //     this.option = res['data'].getCartOrderData.is_private
    //     this.fullOrderDiscount= Number(res['data'].getCartOrderData.discount_value)
    //     this.fullOrderDis=Number(res['data'].getCartOrderData.discount_amount)
    //     this.discountMethodCheck =res['data'].getCartOrderData.discount_type        
    //       if(this.fullOrderDiscount==0){
    //         this.fullOrderDiscount=undefined
    //       }
    //      this.fullInvoice = res['data'].getCartOrderData
    //      this.fullInvoice['_id'] = id
    //     // this.convertToSale(res['data'].getCartOrderData.TransactionSellLine)
    //     // this.getDiscountDetail()
    //     // this.customerDetail = res['data'].getCartOrderData.Customer
    //     // this.subTotal = res['data'].getCartOrderData.final_total
    //     // this.grandTotal = res['data'].getCartOrderData.final_total
    //     this.existingOrders = false
    //     this.viewInvoice = true
    //   }, (err) => {
    //     console.log('err while loading invoice',err);
    //   }
    // )
  }

  haveDiscount = false
  discountAmount = 0
  discountCode = ''
  getDiscountDetail() {
    for (let i = 0; i < this.fullInvoice.TransactionPayment.length; i++) {
      if (this.fullInvoice.TransactionPayment[i].method == 'discount_card') {
        this.haveDiscount = true
        this.discountAmount = this.fullInvoice.TransactionPayment[i].coupon_meta['coupon_amount']
        this.discountCode = this.fullInvoice.TransactionPayment[i].coupon_meta['coupon_code']
      }
    }
  }

  currentOrder = []
  convertToSale(obj) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].is_product) {
        this.currentOrder.push(this.makeOrderFormate(obj[i]));
      }
      else if (!obj[i].is_product) {
        for (let j = 0; j < obj[i].products.length; j++) {
          this.currentOrder.push(this.makeOrderFormate(obj[i].products[j]))
        }
      }
      console.log('Current order is', this.currentOrder);
    }
  }

  makeOrderFormate(products) {
    let product = JSON.parse(JSON.stringify(products))
    let order = {}
    order['_id'] = product['Product']._id
    order['product_name'] = product['Product'].product_name
    order['description'] = product['Product'].description
    order['sku'] = product['Product'].sku
    order['dis_percentage'] = product['discount_value']
    order['dis_price'] = product['discount_amount']
    order['serialnumber'] = product['serial_number']
    order['total'] = product['total_amount']
    order['selectedQuantity'] = product['quantity']
    order['default_sell_price'] = Number(product['product_price'])
    order['new_default_sell_price'] = Number(product['product_final_price'])
    return order
  }
  // convertToSale(obj) {
  //   this.currentOrder = []
  //   console.log('obj is', obj);
  //   for (let i = 0; i < obj.length; i++) {
  //     obj[i].Product['ProductStockPrice'][0]['default_sell_price'] = obj[i]['total_amount']
  //     obj[i].Product['selectedQuantity'] = obj[i]['quantity']
  //     obj[i].Product['product_final_price'] = obj[i]['product_final_price']
  //     obj[i].Product['total_amount'] = obj[i]['total_amount']
  //     obj[i].Product['item_dis'] = obj[i]['dis_price']
  //     obj[i].Product['dis_price'] = (obj[i]['dis_price'] * 100) / obj[i]['total_amount']
  //     obj[i].Product['device'] = []
  //     obj[i].Product['checkIn'] = []
  //     obj[i].Product['ProductStockPrice'][0]['itemTaxe'] = obj[i]['tax_amount']
  //     obj[i].Product['selectedDevicesInfo'] = []
  //     obj[i].Product['dis_percentage'] = (obj[i]['discount_amount'] * 100) / obj[i]['total_amount'];
  //     obj[i].Product['ProductStockPrice'][0]['new_default_sell_price'] = 0;
  //     this.currentOrder.push(obj[i]['Product'])
  //     console.log('current order is', this.currentOrder);
  //   }
  // }

  cancel(val, val1) {
    this[val] = false
    this[val1] = true
  }

  openInvoice() {
    this.viewInvoice = true
    this.existingOrders = false
  }

  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  openTicketReOpenModal(template: TemplateRef<any>, cls, id) {
    this.getTaskDetail(id)
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }


  closeModel() {
    this.modalService.hide(1);
    // this.servicesToReOpen = []
  }

  selectRefundReason = "Select Reason"
  changeReasonValue(type, val) {
    this[type] = val
  }
  // private value:any = {};
  // public selected(value:any):void {
  //   console.log('Selected value is: ', value);
  // }

  // public removed(value:any):void {
  //   console.log('Removed value is: ', value);
  // }

  // public typed(value:any):void {
  //   console.log('New search input: ', value);
  // }

  // public refreshValue(value:any):void {
  //   this.value = value;
  // }

  noOpenAccordianOnInput(e) {
    e.stopPropagation();
  }

  verifyChequeSubmitted: boolean = false
  isEmailValid: true
  userEmail: ''
  userPwd: ''

  onVerifyCheque(transactionId, paymentID, userEmail, userPwd, location_id = localStorage.getItem('location_id')) {
    if (userEmail == '' || userPwd == '') {
      this.verifyChequeSubmitted = true
      setTimeout(() => {
        this.verifyChequeSubmitted = false
      }, 3000)
      return
    }
    this.ticketsGQLService.chequePaymentVerify(transactionId, location_id, paymentID, userEmail, userPwd)
      .subscribe(
        (res) => {
          this.showToasterMessage('Paymet status updated', 'success')
          this.closeModel()
          this.getTicketDetailByID(this.orderId)
        }, (err) => {
          this.showToasterMessage(err.message, 'error')
        }
      )
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
