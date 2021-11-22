import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pwd = ''
  localcookie : any
  error = false
  constructor(private router:Router) { }

  ngOnInit() {
    if (window.localStorage.getItem('User') !== null) {
      let str = window.localStorage.getItem('User')
      str = CryptoJS.AES.decrypt(str, 'luna').toString(CryptoJS.enc.Utf8);
      if (str === 'TechbaR@786') {
        this.router.navigate(['Index']);
      }
    }
  }

  verify() {
    console.log('pwd is ',this.pwd);
    if (this.pwd == 'TechbaR@786') {
      // console.log('Successfully Logedin')
      this.localcookie = CryptoJS.AES.encrypt('TechbaR@786','luna');
      window.localStorage.setItem('User', this.localcookie);
      this.router.navigate(['Index']);
    }
    else {
      this.error = true
    }
  }
}
