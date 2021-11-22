import { Injectable } from '@angular/core';
import { GenericUtility } from 'src/app/utilties/generic-utility';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _serviceCaller: GenericUtility) { }

  verfyBussinessEmail(email) {
    return this._serviceCaller.getPostCall('business/checkBusinessEmail', email);
  }

  verifyUniqueBusinessName(name) {
    return this._serviceCaller.getPostCall('business/checkBusinessName', name)
  }

  verifyBrandUniqueCode(unicode) {
    return this._serviceCaller.getPostCall('business/checkBusinessUniqueCode', unicode)
  }

  testRegister(data) {
    return this._serviceCaller.getPostCall('register', data)
  }

  registerBusiness(user) {
    return this._serviceCaller.getPostCall('business/register', user)
  }

  getAllCurrencies() {
    return this._serviceCaller.getGetCall('business/allCurrencies','')
  }

  getGeoLocation(lat,long) {
    return this._serviceCaller.getGeoLocationInformation(lat,long)
  }

}
