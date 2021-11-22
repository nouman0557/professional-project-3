import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {
  check: any;
  constructor(private http: HttpClient) { }

  verfiedUser() {
    if (window.localStorage.getItem('User') !== null) {
      let str = window.localStorage.getItem('User')
      str = CryptoJS.AES.decrypt(str, 'luna').toString(CryptoJS.enc.Utf8);
      // console.log('After Decryption', str);
      if (str === 'TechbaR@786') {
        this.check = true;
      }
      else {
        this.check = false;
      }
      return this.check
    }
    return false;
  }

  lunaVerifyUser() {
    if (window.localStorage.getItem('token') !== null && window.localStorage.getItem('location_id') !== null) {
      return true
    }
    return false
  }
}
