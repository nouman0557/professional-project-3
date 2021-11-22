import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  SearchSupplierGQL, CreateSupplierManageCreditGQL, GetReasonsGQL, GetSupplierTransferCreditlogsGQL,
  SupplierByIdGQL,
  GetAllBusinessStoreAdminGQL,CreateTransferStoreCreditGQL
} from 'src/app/generated/graphql';

@Injectable({
  providedIn: 'root'
})

export class SupplierService {


  constructor(
    private searcingAndListingSupplier: SearchSupplierGQL,
    private createSupplierManageCredit: CreateSupplierManageCreditGQL,
    private getSystemReasons: GetReasonsGQL,
    private getSupplierTransferCreditlogs: GetSupplierTransferCreditlogsGQL,
    private supplierById: SupplierByIdGQL,
    private getAllBusinessStoreAdmin: GetAllBusinessStoreAdminGQL,
    private createTransferStoreCredit: CreateTransferStoreCreditGQL) { }



  searcingAndListingSuppliers(input: any) {
    return this.searcingAndListingSupplier.watch({
      search: input.search,
      location_id: input.location_id,
      active: input.active,
      is_verify_supplier: input.is_verify_supplier,
      unlink_product: input.unlink_product,
      limit: input.limit,
      skip: input.skip
    })
  }

  addSupplierManageCredit(storeCreditInput) {
    return this.createSupplierManageCredit.mutate({
      input: storeCreditInput
    })
  }
  addTransferStoreCredit(transferCreditInput){
    return this.createTransferStoreCredit.mutate({
      input: transferCreditInput
    })
  }
  
  getReasons() {
    return this.getSystemReasons.watch()
  }
  supplierTransferCreditlogs(supplierId, locationId, limit, skip) {
    return this.getSupplierTransferCreditlogs.watch({
      supplierId: supplierId,
      locationId: locationId,
      limit: limit,
      skip: skip
    })
  }
  getSupplierById(supplierId, businessLocationId) {
    return this.supplierById.watch({
      id: supplierId,
      location_id: businessLocationId
    })
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  getSupplierStores(){
    return this.getAllBusinessStoreAdmin.watch({
      business_id: window.localStorage.getItem('BusinessId'),
      filter: 'all'
    })
  }



}


