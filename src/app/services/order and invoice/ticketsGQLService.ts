import { Injectable } from '@angular/core';
import {
    GetTicketswithfilterGQL, Ticketfooterfilter,
    TicketSorting, Datefilter, QuickFilter, GetTicketDetailByIdGQL,
    RepairRoomStatusGQL, CreateTaxRefundGQL, EmailTicketGQL, InvoiceRefundByAmountGQL,
    InvoiceRefundByItemsGQL, IsbalanceSorting, TaskDeviceReOpenGQL, CheckOutTicketGQL, ChequePaymentVerifyGQL
} from 'src/app/generated/graphql';
import { GenericUtility } from 'src/app/utilties/generic-utility';

@Injectable({
    providedIn: 'root'
})
export class TicketsGQLService {
    inputTicketsFilter = {
        ticketfooterfilter: Ticketfooterfilter.All,
        location_id: localStorage.getItem('location_id'),
        search: '',
        limit: 100,
        skip: 0,
        sorting_by: TicketSorting.CreatedAt,
        dateFilter: Datefilter.All,
        repairStatus: [],
        quickFilter: QuickFilter.All,
        start_date: null,
        end_date: null,
        balance_sorting: IsbalanceSorting.None,
        is_checkout: false
    }

    constructor(
        private getTicketswithfilterGQL: GetTicketswithfilterGQL,
        private getTicketDetailByIdGQL: GetTicketDetailByIdGQL,
        private genericUtility: GenericUtility,
        private repairRoomStatusGQL: RepairRoomStatusGQL,
        private createTaxRefundGQL: CreateTaxRefundGQL,
        private emailTicketGQL: EmailTicketGQL,
        private invoiceRefundByAmountGQL: InvoiceRefundByAmountGQL,
        private invoiceRefundByItemsGQL: InvoiceRefundByItemsGQL,
        private taskDeviceReOpenGQL: TaskDeviceReOpenGQL,
        private checkOutTicketGQL: CheckOutTicketGQL,
        private chequePaymentVerifyGQL: ChequePaymentVerifyGQL
    ) { }

    getAllTickets(obj = this.inputTicketsFilter) {
        return this.getTicketswithfilterGQL.watch({
            input: obj
        })
    }
    taskDeviceReOpen(transactionID, location_id, inputDevice) {
        return this.taskDeviceReOpenGQL.mutate({
            transactionID: transactionID,
            location_id: location_id,
            inputDevice: inputDevice
        })
    }


    getFilters() {
        return this.inputTicketsFilter
    }

    updateFilter(type, val) {
        this.inputTicketsFilter[type] = val
        return this.inputTicketsFilter
    }

    clearAllFilters() {
        this.inputTicketsFilter = {
            ticketfooterfilter: Ticketfooterfilter.All,
            location_id: localStorage.getItem('location_id'),
            search: '',
            limit: 100,
            skip: 0,
            sorting_by: TicketSorting.CreatedAt,
            dateFilter: Datefilter.All,
            repairStatus: [],
            quickFilter: QuickFilter.All,
            start_date: null,
            end_date: null,
            balance_sorting: IsbalanceSorting.None,
            is_checkout: false
        }
        return this.inputTicketsFilter
    }

    getTicketDetailByID(id) {
        return this.getTicketDetailByIdGQL.watch({
            businessLocation: localStorage.getItem('location_id'),
            orderID: id
        })
    }
    checkOutTicket(transactionID, location_id){
        return this.checkOutTicketGQL.mutate({
            transactionID: transactionID,
            location_id: location_id
        })
    }

    downloadInvoice(data) {
        return this.genericUtility.getFileFromPost('api/productcsv', { productids: data })
    }

    getReparStatus(): any {
        return this.repairRoomStatusGQL.watch().valueChanges
    }

    refundSalesTax(obj) {
        return this.createTaxRefundGQL.mutate({
            input: obj
        },
            {
                context: {
                    useMultipart: true
                }
            })
    }

    refundByAmount(obj) {
        return this.invoiceRefundByAmountGQL.mutate({
            input: obj
        })
    }

    refundByItems(id, items) {
        return this.invoiceRefundByItemsGQL.mutate({
            location_id: localStorage.getItem('location_id'),
            transactionID: id,
            transactionReturnItems: items
        })
    }

    sendEmail(id) {
        return this.emailTicketGQL.watch({
            businessLocation: localStorage.getItem('location_id'),
            orderID: id
        })
    }

    getCustomerTickets(inputTicketsFilter) {
        return this.getTicketswithfilterGQL.watch({
            input: inputTicketsFilter
        })
    }

    chequePaymentVerify(transactionID,location_id,paymentID,userEmail,userPassword){
        return this.chequePaymentVerifyGQL.mutate({
            input: {transactionID,location_id,paymentID,userEmail,userPassword}
        })
    }
}