import { Injectable } from '@angular/core';
import {
  GetCustomersWithSearchGQL, GetCustomerByIdGQL,
  GetDevicesByCustomerGQL,
  AddCustomerGQL, CustomerHeaderFilter, 
  CustomerFooterFilter, GetCustomerDetailGQL, 
  UpdateCustomerGQL, GetStoreCreditLogsGQL, 
  GetReasonsGQL, CreateStoreCreditGQL, 
  CreateTransferCreditGQL, GetDeviceByIdGQL,
  UpdateCustomerPhoneNumberGQL,
  CustomerPurchaseHistoryGQL, CreateSystemBrandGQL, GetAllBrandWiseModelsGQL, GetAllBrandsGQL,
  UpdateSystemBrandGQL, CreateSystemDeviceGQL, GetAllDeviceModelByBrandGQL
} from "src/app/generated/graphql"

import { Observable, of } from 'rxjs';
import { map, startWith, tap, catchError, skip } from 'rxjs/operators'
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGQLService {

  inputSearchCustomer = {
    search: "",
    location_id: localStorage.getItem('location_id'),
    limit: 10,
    skip: 0,
    fromDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    toDate: new Date(),
    headerFliter: CustomerHeaderFilter.All,
    footerFliter: [CustomerFooterFilter.All]
  }

  constructor(private getAllCustomers: GetCustomersWithSearchGQL,
    private customerById: GetCustomerByIdGQL,
    private getAlldevices: GetDevicesByCustomerGQL,
    private getCustomerPurchaseHistory: CustomerPurchaseHistoryGQL,
    private addNewCustomer: AddCustomerGQL,
    private customerDetail: GetCustomerDetailGQL,
    private editCustomer: UpdateCustomerGQL,
    private customerService: CustomerService,
    private getStoreCreditLogsGQL: GetStoreCreditLogsGQL,
    private getReasonsGQL: GetReasonsGQL,
    private createStoreCreditGQL: CreateStoreCreditGQL,
    private createTransferCreditGQL: CreateTransferCreditGQL,
    private getDeviceByIdGQL: GetDeviceByIdGQL,
    private updateCustomerPhoneNumberGQL: UpdateCustomerPhoneNumberGQL,
    private createSystemBrandGQL: CreateSystemBrandGQL,
    private getAllBrandsGQL: GetAllBrandsGQL,
    private getAllBrandWiseModelsGQL:GetAllBrandWiseModelsGQL,
    private getAllDeviceModelByBrandGQL: GetAllDeviceModelByBrandGQL,
    private createSystemDeviceGQL: CreateSystemDeviceGQL) { }


  getAllCustomer(inputSearchCustomer = this.inputSearchCustomer): Observable<any> {

    return this.getAllCustomers.watch({
      input: inputSearchCustomer
    }).valueChanges.pipe(
      // tap(result => isLoading = result.loading),
      map(({ data }) => data.getCustomersWithSearch),
      startWith(null),
      catchError((error: any) => {
        this.customerService.showToaster([error.message, 'error'])
        return of([]);
      }))
  }

  getCustomerById(customerId, locationId) {
    return this.customerById.watch({
      customerID: customerId,
      location_id: locationId
    })
  }

  getDevicesByCustomerId(input) {
    return this.getAlldevices.watch({
      input: input
    })
  }

  getPurchaseHistoryByCustomerId(customerId,locationId) {
    return this.getCustomerPurchaseHistory.watch({
      customerID: customerId,
      location_id: locationId
    })
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  addCustomer(customer) {
    return this.addNewCustomer.mutate({
      input: customer
    })
  }
  updateCustomer(customerId, customer) {
    return this.editCustomer.mutate({
      customer_id: customerId,
      input: customer
    })
  }

  getCustomerDetail(customerId, locationId) {
    return this.customerById.watch({
      customerID: customerId,
      location_id: locationId
    })
  }

  getCustomerOtherDetail(customerId) {
    return this.customerDetail.watch({
      customerID: customerId
    })
  }

  getCustomerStoreCreditLogs(id, limit, skip) {
    return this.getStoreCreditLogsGQL.watch({
      customerId: id,
      limit: limit,
      locationId: localStorage.getItem('location_id'),
      skip: skip
    })
  }

  getReasons(type) {
    return this.getReasonsGQL.watch({
      reason_type: type
    }).valueChanges
  }

  createCustomerStoreCredit(input) {
    return this.createStoreCreditGQL.mutate({
      customerStoreCreditInput: input
    })
  }

  sendCustomerStoreCredit(input) {
    return this.createTransferCreditGQL.mutate({
      customerTransferStoreCreditInput: input
    })
  }
  updateCustomerPhoneNumber(customer_id, phone , location_id = localStorage.getItem('location_id')){
    return this.updateCustomerPhoneNumberGQL.mutate ({
      customer_id: customer_id, 
      phone: phone,
      location_id: location_id})
  }

  getDeviceById(_id) {
    return this.getDeviceByIdGQL.watch({
      device_id: _id
    })
  }

  getAllBrandWiseModels(brand_id){
     return this.getAllBrandWiseModelsGQL.watch({brand_id: brand_id})
  }

  getAllDeviceModelByBrand(brandId){
    return this.getAllDeviceModelByBrandGQL.watch({id: brandId})
  }

  getAllBrands(){
    return this.getAllBrandsGQL.watch()
  }
  
  createSystemBrand(systemBrandInput){
    return this.createSystemBrandGQL.mutate({
      input: systemBrandInput
    })
  }

  createSystemDevice(systemDeviceInput){
    return this.createSystemDeviceGQL.mutate({
      input: systemDeviceInput
    })
  }

  
}
