import { Injectable } from '@angular/core';
import { GenericUtility } from 'src/app/utilties/generic-utility';
import { CustomerNetTermGQL, CashRegistersOfLocationGQL } from 'src/app/generated/graphql';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private fotterdata = new Subject<any>();
  fotterdata$ = this.fotterdata.asObservable();

  private headerData = new Subject<any>();
  headerData$ = this.headerData.asObservable();

  constructor(
    private _serviceCaller: GenericUtility,
    private customerNetTerm: CustomerNetTermGQL,
    private cashRegistersOfLocationGQL: CashRegistersOfLocationGQL,

  ) { }

  uploadImage(model_id, model_name, field_name, image) {
    let formData: FormData = new FormData();
    formData.append('model_id', model_id);
    formData.append('model_name', model_name);
    formData.append('field_name', field_name);
    formData.append('image', image, image.name);

    return this._serviceCaller.getPostCall('business/uploadImageForModel', formData)
  }

  public getcustomerNetTerm(customerId): any {
    let data: any
    this.customerNetTerm.watch({
      customerId: customerId
    }).valueChanges.subscribe(
      (res) => {
        console.log('filter by supplier res', res);
        data = res['data'].customerNetTerm
        return data
      }, (err) => {
        console.log('filter by supplier and Order err', err);
        return err
      }
    )
  }

  getAllCashRegisterarOfLocation() {
    return this.cashRegistersOfLocationGQL.watch({
      ID: localStorage.getItem('location_id')
    })
  }

  setFotterItem(valueArray: any) {
    this.fotterdata.next(valueArray);
  }

  setHeaderItem(valueArray: any) {
    this.headerData.next(valueArray);
  }

  userProfilePopup=false
  setUserProfilePopupValue(value){
    this.userProfilePopup=value
  }

  notificationPopup=false
  setNotificationPopupValue(value){
    this.notificationPopup=value
  }

  getUserProfilePopupValue(){
    return this.userProfilePopup
  }

  getNotificationPopupValue(){
    return this.notificationPopup
  }
}
