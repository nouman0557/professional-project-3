import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckBusinessGQL } from './generated/graphql';
import * as CryptoJS from 'crypto-js';
import { RegisterService } from './services/account/register.service';
import {PrintService} from './print/print.service'
import { CommonService } from './services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'luna';

  constructor(private router: Router,
    private checkBusiness: CheckBusinessGQL,
    private registerService: RegisterService,
    private printService: PrintService,
    private commonService: CommonService
  ) {
    // please uncomment below line for production build
    //window.console.log=function(){};
    this.getGeoLocation()
    this.loadBusiness()
  }
  

  loadBusiness() {
    let dom = window.location.host.split('.')
    if (dom[0] == 'lunadev' || dom[0] == 'techbar') {
      // localStorage.removeItem('Photo')
      // localStorage.removeItem('storeName')
      // localStorage.removeItem('BusinessId')
      // localStorage.removeItem('storeID')
      // localStorage.removeItem('userId')
      // localStorage.removeItem('fetch')
      // localStorage.removeItem('store')
      // localStorage.removeItem('location_id')
      // localStorage.removeItem('User')
      // localStorage.removeItem('User_Id')
      // localStorage.removeItem('token')
      // localStorage.removeItem('country')
    }
    let url = ''
    for (let i = 0; i < dom.length; i++) {
      if (dom[i] != 'lunadev' || dom[i] != 'com:8080' || dom[i] != 'com' || dom[i] != 'techbar' || dom[i] != 'stg') {
        url = url + dom[i]
      }
    }
    if(url == '') {
      return
    }
    this.checkBusiness.watch({
      business: dom[0]
    }).valueChanges.subscribe((response) => {
      if (response['data'].checkBusiness != null) {
        let localcookie = CryptoJS.AES.encrypt('TechbaR@786', 'luna');
        window.localStorage.setItem('User', localcookie);
        window.localStorage.setItem('BusinessId', response['data'].checkBusiness._id)
        window.localStorage.setItem('businessName', response['data'].checkBusiness.business_system_name)
        this.router.navigate(['/Login'])
      } else {
        // this.location.replaceState('lunadev.techbar.com');
      }
    }, (err) => {
      // this.location.replaceState('lunadev.techbar.com');
      console.log('err', err);
    })
  }

  getGeoLocation() {
    let str = window.localStorage.getItem('country')
    if (str == '' || str == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.registerService.getGeoLocation(position.coords.latitude, position.coords.longitude).subscribe(
            (res) => {
              if(res['results'].length == 0) {
                return
              }
              console.log('geo location res', res['results'][0]['address_components']);
              let com = res['results'][0]['address_components']
              for (let i = 0; i < com.length; i++) {
                for (let j = 0; j < com[i].types.length; j++) {
                  if (com[i].types[j] == 'country') {
                    let localcookie = CryptoJS.AES.encrypt(com[i].long_name, 'luna');
                    window.localStorage.setItem('country', localcookie)
                    // let str = window.localStorage.getItem('country')
                    str = CryptoJS.AES.decrypt(localcookie, 'luna').toString(CryptoJS.enc.Utf8);
                  }
                }
              }
            }, (err) => {
              console.log('geo location err', err);
            }
          )
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }

  hideAllPopups(){
    this.commonService.setUserProfilePopupValue(false)
    this.commonService.setNotificationPopupValue(false)
  }
}
