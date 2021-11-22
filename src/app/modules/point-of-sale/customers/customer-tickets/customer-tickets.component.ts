import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TicketsGQLService } from 'src/app/services/order and invoice/ticketsGQLService';
import { InputTicketsFilter ,Ticketfooterfilter,TicketSorting,QuickFilter,Datefilter ,IsbalanceSorting } from 'src/app/generated/graphql';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { DownloadFileComponent } from '../../shared-templates/download-file/download-file.component';
import { PrintService } from 'src/app/print/print.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service';
@Component({
  selector: 'app-customer-tickets',
  templateUrl: './customer-tickets.component.html',
  styleUrls: ['./customer-tickets.component.css']
})
export class CustomerTicketsComponent implements OnInit {

  constructor(
    private ticketsGQLService: TicketsGQLService,
    private router: Router,
    private printService: PrintService,
    private customerService: CustomerService,
    private repairRoomService: RepairRoomService,
  ) { }
  
  @ViewChild("downloadFileModal", { static: true }) downloadFileModal: DownloadFileComponent ;
  searchOrder: FormControl = new FormControl();

  ngOnInit() {
    this.clearAllFilters()
    this.getRepairStatus()
    this.getAllTickets(false)
    this.searchOrder.valueChanges.subscribe(val => {
      this.updateFilters('search', this.searchOrder.value)
    })
    
  }
  @Input() customerId: any;
  allTickets = []
  loadTickets = false
  toDate = null
  modalRef: BsModalRef;
  fromDate = null
  ticketCount = 0
  statusFilter = 'Repair Status'
  ticketFilters: InputTicketsFilter = null
  repairStatuses = []
  getAllTickets(scroll) {
    this.loadTickets = true
    if (!scroll) {
      this.ticketFilters['limit']=100
      this.ticketFilters['skip']=0
    }
    this.ticketsGQLService.getCustomerTickets(JSON.parse(JSON.stringify(this.ticketFilters))).valueChanges.subscribe(
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

  isObjectEmpty(Obj) {
    for (var key in Obj) {
        if (Obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  clearAllFilters() {
    this.ticketFilters = {
        ticketfooterfilter: Ticketfooterfilter.All,
        location_id: localStorage.getItem('location_id'),
        customer_id:this.customerId,
        search: '',
        limit: 100,
        skip: 0,
        sorting_by: TicketSorting.CreatedAt,
        dateFilter: Datefilter.All,
        repairStatus: [],
        quickFilter: QuickFilter.All,
        start_date: null,
        end_date: null,
        balance_sorting : IsbalanceSorting.None,
        is_checkout:false
    }
    
    this.repairStatusFilters = []
    this.fromDate = null
    this.toDate = null
    this.searchOrder.setValue('')
    this.getAllTickets(false)
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
      this.repairStatusFilters.push(status.status_name)
    }
    else {
      for (let i = 0; i < this.repairStatusFilters.length; i++) {
        if (this.repairStatusFilters[i] == status.status_name) {
          this.repairStatusFilters.splice(i, 1)
          return
        }
      }
    }
  }

  applyRepairFilters() {
    this.ticketFilters['repairStatus'] =this.repairStatusFilters
    this.getAllTickets(false)
  }

  returnSelectedRepairFilters(status) {
    let found = this.repairStatusFilters.find(element => element == status.status_name);
    return found == undefined ? false : true
  }

  
  updateFilters(type, val) {
    this.ticketFilters[type] = val
    this.getAllTickets(false)
  }

  sortBalance(filter) {
    if (this.ticketFilters['balance_sorting'] == filter) {
      this.ticketFilters['balance_sorting'] = IsbalanceSorting.None 
      this.getAllTickets(false)
      return
    }
    this.ticketFilters['balance_sorting'] = filter=="desc"? IsbalanceSorting.Desc : IsbalanceSorting.Asc 
    this.getAllTickets(false)
  }

  applyDateRange() {
    this.ticketsGQLService.updateFilter('start_date', this.fromDate)
    this.ticketFilters['start_date'] =  this.toDate
    this.ticketFilters['end_date'] = 'dateRange'
    this.modalRef.hide()
    this.getAllTickets(false)
  }

  showInvoiceDetail(ticket) {
    console.log('ticket is', ticket);
    this.router.navigate(['/Pointofsale/Tickets/' + ticket._id])
  }
  
  showOrderInCart(ticket) {
    this.router.navigate(['/Pointofsale/CreateSale/Order/' + ticket._id])
  }

  isScrolling = false
  onScroll() {
    console.log('scroll');
    this.ticketFilters['skip'] =this.ticketFilters['limit'] 
    this.ticketFilters['limit'] =this.ticketFilters['limit'] + 100
    this.getAllTickets(true)
  }

  openDownloadModal(){
    let orderIDs = []
    this.allTickets.forEach(element => {
      if (element['checked']) {
        orderIDs.push(element['_id'])
      }
    });
    if(this.isObjectEmpty(orderIDs)){
    this.customerService.showToaster(['Please select atleast one record.', 'error'])
      return  
    }
    this.downloadFileModal.openModal()
  }

  theTicketCheckbox = false;
  checkedAllField(list, event) {
    for (let i = 0; i < list.length; i++) {
      list[i]['checked'] = event.target.checked
    }
  }

  singleItemChecked(list, index, event) {
    this.theTicketCheckbox = true
    list[index]['checked'] = event.target.checked
    for (let i = 0; i < list.length; i++) {
      if (!list[i]['checked']) {
        this.theTicketCheckbox = false
      }
    }
  }

  downloadInvoices(type) {
    let orderIDs = []
      this.allTickets.forEach(element => {
        if (element['checked']) {
          orderIDs.push(element['_id'])
        }
      });
    let obj = {
      orderIDs: orderIDs,
      fileType: type == 'csv' ? 'csv' : 'pdf',
      is_detail: true
    }
    this.loadTickets=true
    if (type == 'csv') {
      if (orderIDs.length > 1) {
        this.printService.downloadZip('api/order/download/', obj, 'tickets')
        this.loadTickets=false
        return
      }
      this.printService.downloadCSV('api/order/download/', obj, 'tickets')
    }
    else {
      if (orderIDs.length > 1) {
        this.printService.downloadZip('api/order/download/', obj, 'tickets')
        this.loadTickets=false
        return
      }
      this.printService.downloadPDF('api/order/download/', obj, 'tickets')
      this.loadTickets=false
    }
  }

  gotoRepairRoom(id) {
    this.repairRoomService.isListing = false
    this.repairRoomService.setTaskId(id)
    this.router.navigateByUrl(`Pointofsale/RepairRoom`)
  }
}
