import { Injectable } from '@angular/core';
import { GenericUtility } from 'src/app/utilties/generic-utility';

@Injectable({
  providedIn: 'root'
})
export class CreateSaleServiceOld {

  constructor(private _serviceCaller: GenericUtility) { }

  addNewCustomer(obj) {
    return this._serviceCaller.getPostCall('customer/createCustomer', obj)
  }

  searchCustomer(customer){
    return this._serviceCaller.getPostCall('customer/searchCustomer', customer)
  }

  getCutomerByID(id) {
    return this._serviceCaller.getGetCall('customer/getCustomerById/' + id,'')
  }

  updateCustomer(customerId, data) {
    return this._serviceCaller.putCall('customer/updateCustomer/' + customerId, data)
  }

  deleteCustomer(customerId){
    return this._serviceCaller.deleteCall('customer/deleteCustomer/' + customerId,'')
  }

  getAllProducts(){
    let loc_id = window.localStorage.getItem('location_id')
    let loc = {
      location_id:loc_id,
      limit:100,
      skip:0
    }
    return this._serviceCaller.getPostCall('product/getProductServiceList',loc)
  }

  createCustomProduct(product){
    return this._serviceCaller.getPostCall('customProduct/createCustomProduct', product)
  }

  getAllProductTags(){
    return this._serviceCaller.getGetCall('product/getProductTags','')
  }

  addNewDevice(device){
    return this._serviceCaller.getPostCall('device/createDevice', device)
  }

  getAllDevices(configs){
    return this._serviceCaller.getPostCall('device/getDevices', configs)
  }

  deleteDevice(deviceId){
    return this._serviceCaller.deleteCall('device/deleteDevice/' + deviceId, '')
  }

  searchByProductTag(tag,limit,skip){
    let loc_id = window.localStorage.getItem('location_id')
    let product = {
      location_id:loc_id,
      limit:limit,
      skip:skip,
      tags:tag
    }
    return this._serviceCaller.getPostCall('product/searchProductByTags', product)
  }

   searchByProductName(search,limit,skip){
    let loc_id = window.localStorage.getItem('location_id')
    let product = {
      location_id:loc_id,
      limit:limit,
      skip:skip,
      tags:search
    }
    return this._serviceCaller.getPostCall('product/searchProductByName', product)
  }
  
  getCustomerWithLocationID(obj) {
    return this._serviceCaller.getPostCall('customer/getCustomerViaLocation', obj)
  }
  
}
