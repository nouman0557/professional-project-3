import { Injectable } from '@angular/core';
import { GenericUtility } from 'src/app/utilties/generic-utility';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _serviceCaller: GenericUtility) { }

  checkBusinessName(name) {
    return this._serviceCaller.getGetCall('auth/checkBusiness/' + name,'')
  }

  loginEmpolyee(emp) {
    return this._serviceCaller.getPostCall('auth/login', emp)
  }

  getStores() {
    return this._serviceCaller.getGetCall('business/getLocationsOfUser','')
  }

  getLocationWithDrawer(id) {
    return this._serviceCaller.getPostCall('business/getDrawers', id)
  }

  checkAuthorizeCashDrawer(obj) {
    return this._serviceCaller.getPostCall('business/accessCashDrawer', obj)
  }
  
  clockIn(user){
    return this._serviceCaller.getPostCall('business/UserClockIn', user)
  }
}
