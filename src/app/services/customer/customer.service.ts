import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Customer, CustomerHeaderFilter, CustomerFooterFilter } from 'src/app/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerList: Customer[] = []
  selectedCustomerIdFromList =''
  inputSearchCustomer = {
    search: '',
    location_id: localStorage.getItem,
    limit: 100,
    skip: 0,
    fromDate: '',
    toDate: '',
    headerFliter: CustomerHeaderFilter.All,
    footerFliter: [CustomerFooterFilter.All]
  }

  // Observable string sources
  private showToasterSource = new Subject<any>();
  // Observable string streams
  onShowToasted$ = this.showToasterSource.asObservable();

  private sectionTitleTextSource = new BehaviorSubject('CUSTOMER DETAILS')
  sectionTitleText$ = this.sectionTitleTextSource.asObservable()

  private customerListingRefresh = new BehaviorSubject(this.inputSearchCustomer)
  customerList$ = this.customerListingRefresh.asObservable()

  constructor() { }

  setSelectedCustomerId(selectCustomer){
    this.selectedCustomerIdFromList = selectCustomer
  }
  getSelectedCustomerId(): String{
    return this.selectedCustomerIdFromList
  }

  setCustomerList(customerList) {
    this.customerList = customerList
  }
  getCustomerList(): any[] {
    return this.customerList
  }
  
  // Service message commands
  showToaster(valueArray: any) {
    this.showToasterSource.next(valueArray);
  }

  onChangeSection(titleText) {
    this.sectionTitleTextSource.next(titleText)
  }
  
  onCustomerListinRefresh(inputSearchCustomer = this.inputSearchCustomer){
    this.customerListingRefresh.next(inputSearchCustomer)
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }



}
