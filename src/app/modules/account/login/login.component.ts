import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  CheckBusinessGQL,
  UsersWithRespectToBusinessesGQL, UserLoginByVerificationGQL,
  UserBusinessLocationsGQL, User, GetUserByEmailGQL,
  LoginGQL, LoginWithEmailGQL, VerifyforgetBusinessUrlGQL, ForgetEmailWithPhoneGQL, VerifyforgetEmailWithPhoneGQL,
  CashRegistersOfLocationGQL, ForgetBusinessUrlGQL, AllowMethodPhoneVerify, UserForgetPasswordGQL, VerifyuserForgetPasswordGQL, UserPasswordResetGQL, OpenAndCloseCashRegisterGQL
} from 'src/app/generated/graphql';
import * as CryptoJS from 'crypto-js';
import { ToasterService } from 'src/app/services/toaster/toaster.service'
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { EnvironmentUrl } from 'src/environments/environment-url';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class LoginComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Pakistan, CountryISO.Mexico];
  defaultCountry = CountryISO['UnitedStates']

  busAddress = true
  welcome = false
  err = false
  isClockedIn = false
  isUserSelected = false
  storeStatus = false
  addressNotFound = false
  accSelection = false
  accPasswordSelection = false
  recoveryLinkSection = false
  recoveryURLSection = false
  recoveryCodeSection = false
  recoveryURLInputSection = false
  recoveryURLVCSection = false
  recoveryEmailInputSection = false
  recoveryEmailVCSection = false
  showBusiness = false
  showStore = false
  selectCashier = false
  splashScreenOpening = false
  splashScreenClosing = false
  showUser = false
  recoveryPasswordSection = false
  recoveryPLinkSection = false
  businessName = ''
  errorMessage = ''
  loginDetails = []
  userName = ''
  userEmail = ''
  userInfo: User
  password = ''
  allowdStores = []
  drawers = []
  slectedStoreName = ''
  checkBusines: any;
  loginData: any;
  businessID: string;
  loginText = 'login'
  changeStore = 'Change Store'
  modalRef: BsModalRef;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // baseUrl = 'http://3.227.161.233:5001/upload/'
  baseUrl = EnvironmentUrl.Images
  startTimer = false
  loginFocus = true
  constructor(
    private checkBusiness: CheckBusinessGQL,
    private UsersWithRespectToBusinesses: UsersWithRespectToBusinessesGQL,
    private UserBusinessLocations: UserBusinessLocationsGQL,
    private CashRegistersOfLocation: CashRegistersOfLocationGQL,
    private _LoginGQL: LoginGQL,
    private router: Router,
    private modalService: BsModalService,
    private forgetBusinessUrlGQL: ForgetBusinessUrlGQL,
    private toaster: ToasterService,
    private userForgetPasswordGQL: UserForgetPasswordGQL,
    private verifyEmailOtpGQL: VerifyuserForgetPasswordGQL,
    private updateUserPasswordGQL: UserPasswordResetGQL,
    private getUserByEmailGQL: GetUserByEmailGQL,
    private loginWithEmailGQL: LoginWithEmailGQL,
    private verifyforgetBusinessUrlGQL: VerifyforgetBusinessUrlGQL,
    private forgetEmailWithPhoneGQL: ForgetEmailWithPhoneGQL,
    private verifyforgetEmailWithPhoneGQL: VerifyforgetEmailWithPhoneGQL,
    private userLoginByVerification: UserLoginByVerificationGQL,
    private openAndCloseCashRegister: OpenAndCloseCashRegisterGQL

  ) { }

  backButton = false
  async ngOnInit() {
    if(localStorage.getItem('token') != null) {
      this.router.navigate(['/Pointofsale/Home'])
      return
    }
    let dom = window.location.host.split('.')
    if (dom[0] == 'lunadev' || dom[0] == 'techbar') {
      this.backButton = true
    }
    let str = window.localStorage.getItem('country')
    let email = window.localStorage.getItem('fetch')
    if (str != null) {
      str = CryptoJS.AES.decrypt(str, 'luna').toString(CryptoJS.enc.Utf8);
    }
    if (email != null) {
      this.loginFocus = false
      email = JSON.parse(CryptoJS.AES.decrypt(email, 'luna').toString(CryptoJS.enc.Utf8));
      this.userToFetch = email
      this.splashScreenClosing = true
      let v = await this.loadsplashScreenOpening(2000)
      this.splashScreenClosing = false
      this.getUserDetail(false)
    }
    this.defaultCountry = CountryISO[str]
    let bId = window.localStorage.getItem('BusinessId')
    if (bId != null) {
      this.businessName = window.localStorage.getItem('businessName')
      // this.getUserDetails(bId, true);
      this.busAddress = false
      this.accPasswordSelection = true
      this.welcome = false
      this.accSelection = false
    }
  }

  setUserInfo() {
    let uId = window.localStorage.getItem('userId')
    if (uId == null || uId == undefined) {
      if (this.loginDetails.length > 0 && this.loginDetails.length <= 1) {
        window.localStorage.setItem('userId', this.loginDetails[0].id)
        this.businessID = this.loginDetails[0].id
        this.userName = this.loginDetails[0].first_name + ' ' + this.loginDetails[0].last_name
        this.userInfo = this.loginDetails[0]
        this.userEmail = this.loginDetails[0].email
        this.accPasswordSelection = true
      }
      else {
        this.accPasswordSelection = false
        this.accSelection = true
      }
      return
    }
    for (let i = 0; i < this.loginDetails.length; i++) {
      if (this.loginDetails[i]['id'] == uId) {
        this.userName = this.loginDetails[i].first_name + ' ' + this.loginDetails[i].last_name
        this.userInfo = this.loginDetails[i]
        this.businessID = this.loginDetails[i].id
        this.userEmail = this.loginDetails[0].email
      }
    }
    this.accPasswordSelection = true
  }

  loadSections(val) {
    switch (val) {
      case "W": {
        if (this.businessName == '' || this.businessName == ' ') {
          this.err = true
        }
        else {
          this.checkBusiness.watch({
            business: this.businessName
          }
          ).valueChanges.subscribe((response) => {
            this.checkBusines = response['data']['checkBusiness'];
            if (this.checkBusines != null) {
              this.businessName = this.checkBusines.business_system_name;
              // window.location.assign('https://newurl.com')
              this.getUserDetails(this.checkBusines._id, false);
              localStorage.setItem('BusinessId', this.checkBusines._id);
              localStorage.setItem('businessName', this.businessName);
              localStorage.setItem('dateFormate', this.checkBusines.date_format);
              this.busAddress = false
              this.welcome = true
              this.err = false
            }
            else {
              this.busAddress = false
              this.addressNotFound = true
            }
          },
            (err) => {
              this.busAddress = false
              this.addressNotFound = true
            }
          )
        }
        break;
      }
      case "S": {
        this.welcome = false
        this.accPasswordSelection = true
        this.userInfo = null
        break;
      }
      case "L": {
        this.accSelection = false
        this.accPasswordSelection = true
        break;
      }
      case "R": {
        this.accPasswordSelection = false
        this.recoveryLinkSection = true
        break;
      }
      case "C": {
        this.modalService.hide(1)
        this.recoveryLinkSection = false
        this.recoveryCodeSection = true
        break;
      }
      case "RP": {
        this.accPasswordSelection = true
        this.recoveryCodeSection = false
        break;
      }
      case "U": {
        this.recoveryURLSection = true
        this.busAddress = false
        break;
      }
      case "V": {
        this.modalService.hide(1)
        this.recoveryURLSection = false
        this.busAddress = true
        break;
      }
      case "VR": {
        this.recoveryURLSection = false
        this.recoveryURLInputSection = true
        break;
      }
      case "VC": {
        this.recoveryURLInputSection = false
        this.recoveryURLVCSection = true
        break;
      }
      case "VCS": {
        this.recoveryURLVCSection = false
        this.showBusiness = true
        break;
      }
      case "SB": {
        this.showBusiness = false
        this.welcome = true
        break;
      }
      case "RE": {
        this.accPasswordSelection = false
        this.recoveryEmailInputSection = true
        break;
      }
      case "EVC": {
        this.recoveryEmailInputSection = false
        this.recoveryEmailVCSection = true
        break;
      }
      case "EVCS": {
        this.recoveryEmailVCSection = false
        this.showUser = true
        break;
      }
      case "RPP": {
        this.accPasswordSelection = false
        this.recoveryPLinkSection = true
        break;
      }
      case "ESS": {
        this.recoveryPLinkSection = false
        this.recoveryPasswordSection = true
        break;
      }
      case "PVCS": {
        this.recoveryPasswordSection = false
        this.recoveryCodeSection = true
        break;
      }
    }
  }

  tryAgain() {
    this.addressNotFound = false
    this.busAddress = true
  }

  UrlOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
      || charCode == 126 || charCode == 95 || charCode == 46 || charCode == 45) {
      return true;
    }
    return false;
  }

  selectUser(user) {
    console.log('user is', user);
    this.userInfo = user
    this.userToFetch = user.email
    this.userName = user.first_name + ' ' + user.last_name
    this.userInfo = user
    this.userEmail = user.email
    this.businessID = user.id
    localStorage.setItem('userId', user.id);
    this.showUser = false
    this.isEmailVerified = true
    this.accPasswordSelection = true
  }

  LoginAttemp = false
  twoWayAuthentication = false
  Login() {
    if (this.LoginAttemp == true) {
      return
    }
    localStorage.removeItem('StartModel');
    localStorage.removeItem('token')
    if (this.password === '' || this.password === ' ' || this.userToFetch === ' ' || this.userToFetch === '') {
      this.err = true
      this.errorMessage = 'Please fill all fields'
    }
    else {
      this.loginText = 'login ...'
      this.loginWithEmailGQL.mutate({
        email: this.userInfo['email'],
        password: this.password,
        businessId: localStorage.getItem('BusinessId')
      }).subscribe(({ data }) => {
        this.loginData = data['loginWithEmail'];
        if (this.loginData != null) {
          let isAuthenticated = localStorage.getItem('userLogin')
          if (isAuthenticated == null || isAuthenticated == undefined) {
            this.twoWayAuthentication = true
            this.accPasswordSelection = false
            this.forgetUserPassword('Sms')
            return
          }
          else {
            let loginAttempt = JSON.parse(CryptoJS.AES.decrypt(isAuthenticated, 'luna').toString(CryptoJS.enc.Utf8));
            if (!loginAttempt) {
              this.twoWayAuthentication = true
              this.accPasswordSelection = false
              this.forgetUserPassword('Sms')
              return
            }
          }
          localStorage.setItem('token', this.loginData.token);
          let email = CryptoJS.AES.encrypt(JSON.stringify(this.userToFetch), 'luna');
          localStorage.setItem('fetch', email)
          this.loginText = 'login'
          this.isUserSelected = true
          this.getStores()
        }
        else {
          this.err = true
          this.errorMessage = 'Password is incorrect'
          this.loginText = 'login'
        }
      }, (error) => {
        let message = error.graphQLErrors[0].message
        let code = error.graphQLErrors[0].code
        if (code == "block_User") {
          this.errorMessage = 'Too many attempts, Try again in'
          this.err = false
          this.loginText == 'login ...'
          this.startCountdown(message)
        }else if(code=="redirect_forget_password"){
          this.recoveryPLinkSectionText='Forgot Your Password?'
          this.recoveryPLinkSection = true
          this.accPasswordSelection = false
          this.counter = 0
          this.tempMint = 0
          this.minutes = "00"
          this.seconds = "00"
          this.loginText = 'login'
          this.LoginAttemp = false
        }
        else if (code == "user_verification") {
          this.recoveryPLinkSection = true
          this.accPasswordSelection = false
          this.recoveryPLinkSectionText = 'Authenticate yourself first'
          this.counter = 0
          this.tempMint = 0
          this.minutes = "00"
          this.seconds = "00"
          this.loginText = 'login'
          this.LoginAttemp = false
        }
        else {
          this.errorMessage = 'Password is incorrect'
          this.err = true
          this.loginText = 'login'
        }
        console.log('there was an error sending the query', error);
      });

    }
  }

  recoveryPLinkSectionText='Forgot Your Password?'
  userLoginByVerificationFun(){
    this.userLoginByVerification.mutate({
      code: this.OTPCode,
      email: this.userInfo['email'],
      method: JSON.parse(JSON.stringify(this.method)),
      businessId: window.localStorage.getItem('BusinessId')
    }).subscribe(
      (res) => {
        let returnData = res['data'].userLoginByVerification
        if (res['data'].userLoginByVerification == null) {
          this.passwordOTPCodeError = true
          // this.toaster.showError('Please enter valid OTP code', '')
          return
        }
        console.log('OTP  ver res', res['data'].userLoginByVerification);
        if (!res['data'].userLoginByVerification) {
          // this.toaster.showError('Please enter valid OTP code', '')
          this.passwordOTPCodeError = true
          return
        }
        else {
          this.passwordOTPCodeError = false
          clearInterval(this.resendTimer)
          this.resetCount = '30'
          this.startTimer = false
          localStorage.setItem('token', returnData.token);
          let email = CryptoJS.AES.encrypt(JSON.stringify(returnData.user['email']), 'luna');
          localStorage.setItem('fetch', email)
          localStorage.setItem('userLogin', CryptoJS.AES.encrypt(JSON.stringify(true), 'luna'))
          this.loginText = 'login'
          this.twoWayAuthentication = false
          this.recoveryPasswordSection = false
          this.isUserSelected = true
          this.getStores()
          return
        }
      }, (err) => {
        this.passwordOTPCodeError = true
        // this.toaster.showError('Please enter valid OTP code', '')
        console.log('OTP  ver err', err);
      }
    )
  }

  counter = 0
  hours = 0
  tempMint = 0
  minutes = "00"
  seconds = "00"
  startCountdown(sec) {
    this.counter = Number(sec);
    var interval = setInterval(() => {
      this.hours = Math.floor(this.counter / (60 * 60));
      this.tempMint = Math.floor((this.counter - (this.hours * 60 * 60)));
      let minutes = Math.floor(this.tempMint / 60);
      let seconds = Math.floor(this.tempMint - (minutes * 60));
      this.minutes = String(minutes < 10 ? '0' + minutes : minutes)
      this.seconds = String(seconds < 10 ? '0' + seconds : seconds)
      if (this.counter === Number(sec)) {
        this.LoginAttemp = true
      }
      this.counter--;
      if (this.counter < 0) {
        this.counter = 0
        this.tempMint = 0
        this.minutes = "00"
        this.seconds = "00"
        this.loginText = 'login'
        this.LoginAttemp = false
        clearInterval(interval);
      };
    }, 1000);
  };

  errMessageHide() {
    this.err = false
  }

  allowdStoresLoader = false
  showSelectedUser=false
  getStores() {
    this.allowdStoresLoader = true
    this.UserBusinessLocations.watch({
    }
    ).valueChanges.subscribe((response) => {
      if (response != null) {
        this.allowdStoresLoader = false
        this.allowdStores = response['data']['userBusinessLocations'];
        if (this.allowdStores.length == 1) {
          this.getLocationWithDrawer(this.allowdStores[0])
        } else {
          this.showSelectedUser=true
          this.accPasswordSelection = false
          this.showStore = true
        }
        console.log('allowd Stores login--------->', this.allowdStores)
      }
    },
      (err) => {
        console.log('Error from GQL', err)
        this.allowdStoresLoader = false
      }
    )
  }

  localcookie: any
  notAuthorized = false
  slectedStoreLogo=''
  getLocationWithDrawer(store) {
    this.localcookie = CryptoJS.AES.encrypt(JSON.stringify(store), 'luna');
    window.localStorage.setItem('store', this.localcookie);
    localStorage.setItem('location_id', store._id);
    localStorage.setItem('storeName', store.store_name);
    localStorage.setItem('storeID', store.location_keeping_unit);
    this.slectedStoreName = store.store_name;
    this.slectedStoreLogo= store.logo;
    this.CashRegistersOfLocation.watch({
      ID: store._id
    }
    ).valueChanges.subscribe((response) => {
      if (response != null) {
        this.storeStatus = true
        this.drawers = response['data']['cashRegistersOfLocation'];
        if (this.drawers.length == 1) {
          this.checkRegisterar(this.drawers[0])
        } else {
          this.showStore = false
          this.selectCashier = true
        }

        console.log('final drawers are', this.drawers);
      }
    },
      (err) => {
        console.log('Error from GQL', err)
      }
    )

  }

  authorized = false
  async checkRegisterar(dr) {
    this.splashScreenOpening = true
    // if (dr.status != 'open') {
      localStorage.setItem('RegisterId', dr._id);
      this.openCashRegister(dr._id)
      this.selectCashier = false;
      let v = await this.loadsplashScreenOpening(6000)
      console.log('clockin resp', dr.status);
      this.router.navigateByUrl('/Pointofsale');
    // }else{
    //   this.toaster.showError('Cash Register Already Open.', '')
    // }
  }

  async loadsplashScreenOpening(time) {
    await new Promise(resolve => setTimeout(resolve, time));
  }

openCashRegister(id){
 this.openAndCloseCashRegister.mutate({
   openCashRegisterId :id,
   locationId: window.localStorage.getItem('location_id'),
   //closeCashRegister  :window.localStorage.getItem('RegisterId')
     }).subscribe(
      (res) => {
       let returnVal  = res['data'].openAndCloseCashRegister
       console.log('openCashRegister returnVal', returnVal);
        }, (err) => {
       let message=err.graphQLErrors[0].message
         console.log('openCashRegister err', message);
   }
  )
  }

  clockIn() {
    let loc_id = window.localStorage.getItem('location_id')
    // this._service.clockIn({ location_id: loc_id, }).subscribe(
    //   (res) => {
    //     console.log('clock in res', res);
    //     if (res['status']) {
    //       this.router.navigateByUrl('/Pointofsale');
    //     }

    //   }, (err) => {

    //   }
    // )
  }

  requestAccess() {

  }

  getUserDetails(id, val) {
    this.UsersWithRespectToBusinesses.watch({
      ID: id
    }).valueChanges.subscribe((response) => {
      if (response != null) {
        this.loginDetails = []
        this.loginDetails = response['data']['usersWithRespectToBusinesses'];
        console.log('loginDetails -->', this.loginDetails, 'and id ', this.businessID)
        if (val == true) {
          this.setUserInfo()
        }
      }
    },
      (err) => {
        console.log('Error from GQL', err)
      }
    )
  }

  backToLastSection() {
    this.emailOTPCodeError = false
    this.passwordOTPCodeError = false
    this.urlErrorMessage = ''
    this.urlError = false
    this.urlOTPCodeError = false
    this.resetVariables()
    if (this.busAddress == true) {
      this.router.navigate(['/Index']);
    }
    else if (this.welcome == true) {
      window.localStorage.removeItem('BusinessId')
      this.welcome = false;
      this.busAddress = true;
      this.loginDetails = [];
      this.businessName = '';
    }
    else if (this.accSelection == true) {
      this.welcome = true;
      this.accSelection = false;
    }
    else if (this.accPasswordSelection == true) {
      this.accPasswordSelection = false;
      this.welcome = true;
      this.err = false
      this.loginData = [];
      this.password = '';
    }
    else if (this.showStore == true) {
      this.showStore = false;
      this.accPasswordSelection = true;
      this.password = '';
      this.isUserSelected = false;
      this.storeStatus = false;
    }
    else if (this.selectCashier == true) {
      this.selectCashier = false;
      this.showStore = true;
      this.drawers = [];
      this.storeStatus=false
    }
    else if (this.recoveryLinkSection == true) {
      this.recoveryLinkSection = false;
      this.accPasswordSelection = true;
    }
    // else if (this.recoveryCodeSection == true) {
    //   this.recoveryLinkSection = true;
    //   this.recoveryCodeSection = false;
    // }
    else if (this.recoveryURLSection == true) {
      this.busAddress = true;
      this.recoveryURLSection = false;
      this.resetVariables()
    }
    else if (this.recoveryURLInputSection == true) {
      this.recoveryURLSection = true;
      this.recoveryURLInputSection = false;
    }
    else if (this.recoveryURLVCSection == true) {
      this.recoveryURLInputSection = true;
      this.recoveryURLVCSection = false;
    }
    else if (this.recoveryEmailInputSection == true) {
      this.accPasswordSelection = true;
      this.recoveryEmailInputSection = false;
    }
    else if (this.recoveryEmailVCSection == true) {
      this.recoveryEmailInputSection = true;
      this.recoveryEmailVCSection = false;
    }
    else if (this.recoveryPLinkSection == true) {
      this.accPasswordSelection = true;
      this.recoveryPLinkSection = false;
    }
    else if (this.recoveryPasswordSection == true) {
      this.recoveryPLinkSection = true;
      this.recoveryPasswordSection = false;
    }
    else if (this.recoveryCodeSection == true) {
      this.recoveryPasswordSection = true;
      this.recoveryCodeSection = false;
    }
    else if (this.twoWayAuthentication) {
      this.twoWayAuthentication = false
      this.accPasswordSelection = true
      this.passwordOTPCodeError = false
    }
    else {
      this.addressNotFound = false;
      this.businessName = "";
      this.busAddress = true;
    }
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  changeValue(type, val) {
    this[type] = val
  }

  async signOutUser() {
    this.splashScreenClosing = true
    let v = await this.loadsplashScreenOpening(2000)
    this.splashScreenClosing = false
    localStorage.removeItem('location_id');
    localStorage.removeItem('user_id')
    localStorage.removeItem('User_Id');
    localStorage.removeItem('token');
    localStorage.removeItem('dateFormate')
    // this.userInfo = null
    this.password = ''
    // this.userToFetch = ''
    // this.password = ''
    this.showStore = false
    this.isUserSelected = false
    this.selectCashier = false
    this.accPasswordSelection = true
  }

  closeModel() {
    this.modalService.hide(1)
    this.urlEmail = ''
  }

  title = 'email address'
  recoverURL(val, method) {
    this.title = val
    this.recoveryURLSection = false
    this.recoveryURLInputSection = true
    this.method = method
  }

  openModel(template: TemplateRef<any>, cls, method) {
    this.method = method
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  openPasswordModel(template: TemplateRef<any>, cls, method) {
    this.method = method
    // this.forgetUserPassword()
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  urlEmail = ''
  urlNumber: any
  method = ''
  urlError = false
  urlErrorMessage = ''
  sendURL() {
    this.emailOTPCodeError = false
    this.passwordOTPCodeError = false
    console.log('url number is', this.urlNumber);
    if (this.method == 'Sms' || this.method == 'Call') {
      if (this.urlNumber == null || this.urlNumber == undefined) {
        // this.toaster.showError('Please enter number', '')
        this.urlError = true
        this.urlErrorMessage = 'Please enter number'
        return
      }
    }
    if (this.method == 'Email') {
      if (this.urlEmail == '' || !this.emailPattern.test(this.urlEmail)) {
        // this.toaster.showError('Plase enter valid email', '')
        this.urlError = true
        this.urlErrorMessage = 'Please enter valid email'
        return
      }
    }
    let obj = {
      email: this.method == 'Email' ? this.urlEmail : null,
      phone: this.method != 'Email' ? this.urlNumber['internationalNumber'].replace(/\s/g, '') : null,
      method: AllowMethodPhoneVerify[this.method]
    }
    obj = this.cleanObject(obj)
    this.forgetBusinessUrlGQL.watch({
      input: obj
    }).valueChanges.subscribe(res => {
      console.log('resp of send url is', res);
      if (res['data'].forgetBusinessUrl) {
        this.urlError = false
        this.urlErrorMessage = ''
        this.resetCount = '30'
        this.startTimerForResending()
        this.startTimer = true
        this.recoveryURLInputSection = false
        this.recoveryURLVCSection = true
      }
      else {
        // this.toaster.showError(res['errors'][0].message, '')
        this.urlError = true
        this.urlErrorMessage = res['errors'][0].message
      }
      // this.recoveryURLSection = false
      // this.busAddress = true
    }, (errors) => {
      // this.toaster.showError('Something went wrong', '')
      this.urlError = true
      this.urlErrorMessage = 'Business does not found'
      console.log('err of send url is', errors);
    }
    )
  }

  allBusinesses = []
  OTPCode = ''
  urlOTPCodeError = false
  verifyBusinessURL() {
    if (this.OTPCode.length < 6) {
      // this.toaster.showError('Please enter valid OTP code ', '')
      this.urlOTPCodeError = true
      return
    }
    let obj = {
      email: this.method == 'Email' ? this.urlEmail : null,
      phone: this.method != 'Email' ? this.urlNumber['internationalNumber'].replace(/\s/g, '') : null,
      code: this.OTPCode,
      method: AllowMethodPhoneVerify[this.method]
    }
    obj = this.cleanObject(obj)
    this.verifyforgetBusinessUrlGQL.mutate({ input: obj }).subscribe(
      (res) => {
        console.log('response of verifu business url', res['data'].verifyforgetBusinessUrl);
        if (res['data'].verifyforgetBusinessUrl !== null) {
          this.urlOTPCodeError = false
          clearInterval(this.resendTimer)
          this.resetCount = '30'
          this.OTPCode = ''
          this.startTimer = false
          this.urlEmail = ''
          this.urlNumber = null
          if (res['data'].verifyforgetBusinessUrl.length == 1) {
            this.getUserDetails(res['data'].verifyforgetBusinessUrl[0]._id, false);
            localStorage.setItem('BusinessId', res['data'].verifyforgetBusinessUrl[0]._id);
            localStorage.setItem('dateFormate', res['data'].verifyforgetBusinessUrl[0].date_format);
            localStorage.setItem('businessName', res['data'].verifyforgetBusinessUrl[0].business_system_name);
            this.businessName = res['data'].verifyforgetBusinessUrl[0].business_system_name
            this.accPasswordSelection = true
            this.recoveryURLVCSection = false
            return
          }
          this.allBusinesses = res['data'].verifyforgetBusinessUrl
          this.recoveryURLVCSection = false
          this.showBusiness = true
        }
        else {
          this.urlOTPCodeError = true
          // this.toaster.showError('Invalid OTP code', '')
          return
        }
      }, (err) => {
        this.urlOTPCodeError = true
        // this.toaster.showError('Invalid OTP code', '')
        console.log('error on verifying business url', err);
      }
    )
  }

  chooseBusiness(business) {
    this.getUserDetails(business._id, false);
    localStorage.setItem('BusinessId', business._id);
    localStorage.setItem('businessName', business.business_system_name);
    localStorage.setItem('dateFormate', business.date_format);
    this.accPasswordSelection = true
    this.showBusiness = false
  }

  loadForgetUserPassword() {
    this.recoveryPLinkSectionText='Forgot Your Password?'
    this.recoveryPLinkSection = true
    this.accPasswordSelection = false
  }

  chooseMethod = ''
  errorSendingPasswordOTP = false
  errorSendingPasswordMessage = ''
  forgetUserPassword(method1) {
    this.emailOTPCodeError = false
    this.errorSendingPasswordOTP = false
    this.passwordOTPCodeError = false
    if (this.userInfo == null) {
      // this.toaster.showError('Please select valid user', '')
      this.errorSendingPasswordOTP = true
      this.errorSendingPasswordMessage = 'Please select fetch user first'
      return
    }
    this.chooseMethod = method1
    this.method = AllowMethodPhoneVerify[method1]
    // let verMethod = JSON.parse(method)
    this.userForgetPasswordGQL.mutate({
      email: this.userInfo['email'],
      method: JSON.parse(JSON.stringify(this.method))
    }).subscribe(
      (res) => {
        if (res['data'].userForgetPassword) {
          this.resetCount = '30'
          this.startTimerForResending()
          this.startTimer = true
          this.toaster.showSuccess('OTP code has been successfully sent', '')
          if (this.twoWayAuthentication) {
            return
          }
          this.recoveryPasswordSection = true
          this.recoveryPLinkSection = false
          return
        }
      }, (err) => {
        // this.toaster.showErrorMessageWithTime(err.graphQLErrors[0].message, '', 10000)\
        this.errorSendingPasswordOTP = true
        this.errorSendingPasswordMessage = err.graphQLErrors[0].message
      }
    )
  }

  passwordOTPCodeError = false
  verifyCode() {
    if (this.OTPCode.length < 6) {
      // this.toaster.showError('Please enter valid OTP code ', '')
      this.passwordOTPCodeError = true
      return
    }
    if (this.recoveryPLinkSectionText == 'Authenticate yourself first') {
      this.userLoginByVerificationFun()
      return
    }
    this.verifyEmailOtpGQL.mutate({
      code: this.OTPCode,
      email: this.userInfo['email'],
      method: JSON.parse(JSON.stringify(this.method))
    }).subscribe(
      (res) => {
        if (res['data'].VerifyuserForgetPassword == null) {
          this.passwordOTPCodeError = true
          // this.toaster.showError('Please enter valid OTP code', '')
          return
        }
        console.log('OTP  ver res', res['data'].VerifyuserForgetPassword);
        if (!res['data'].VerifyuserForgetPassword) {
          // this.toaster.showError('Please enter valid OTP code', '')
          this.passwordOTPCodeError = true
          return
        }
        else {
          this.passwordOTPCodeError = false
          clearInterval(this.resendTimer)
          this.resetCount = '30'
          this.startTimer = false
          if (this.twoWayAuthentication) {
            localStorage.setItem('token', this.loginData.token);
            let email = CryptoJS.AES.encrypt(JSON.stringify(this.userToFetch), 'luna');
            localStorage.setItem('fetch', email)
            localStorage.setItem('userLogin', CryptoJS.AES.encrypt(JSON.stringify(true), 'luna'))
            this.loginText = 'login'
            this.twoWayAuthentication = false
            this.isUserSelected = true
            this.getStores()
            return
          }
          this.recoveryCodeSection = true
          this.recoveryPasswordSection = false
          // this.modalService.hide(1)
        }
      }, (err) => {
        this.passwordOTPCodeError = true
        // this.toaster.showError('Please enter valid OTP code', '')
        console.log('OTP  ver err', err);
      }
    )
  }

  newPassword = ''
  confirmPassword = ''
  passwordSubmitted = false
  updatePassword() {
    this.passwordSubmitted = false
    if (this.newPassword == '') {
      this.passwordSubmitted = true
      // this.toaster.showError('Please enter password', '')
      return
    }
    else if (this.newPassword.length < 6) {
      this.passwordSubmitted = true
      // this.toaster.showError('Password must be at least 6 characters', '')
      return
    }
    else if (this.confirmPassword == '') {
      this.passwordSubmitted = true
      this.toaster.showError('Please enter password', '')
      return
    }
    else if (this.confirmPassword != this.newPassword) {
      this.passwordSubmitted = true
      // this.toaster.showError('Password do not match', '')
      return
    }
    let obj = {
      confirmPassword: this.confirmPassword,
      password: this.newPassword,
      code: this.OTPCode,
      email: this.userInfo['email']
    }
    this.updateUserPasswordGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        if (res['data'].userPasswordReset) {
          this.recoveryCodeSection = false
          this.accPasswordSelection = true
          this.toaster.showSuccess('Password updated successfully', '')
          this.OTPCode = ''
          this.resetVariables()
          // this.modalRef.hide()
        }
      }, (err) => {
        // this.toaster.showError('something went wrong', '')
      }
    )
  }

  forgetEmailPhone: any
  userFotrgetEmailError = false
  userFotrgetEmailMessage = ''
  userForgetEmail() {
    this.emailOTPCodeError = false
    this.passwordOTPCodeError = false
    if (this.forgetEmailPhone == null) {
      this.userFotrgetEmailMessage = 'Enter your registered number'
      this.userFotrgetEmailError = true
      return
    }
    this.forgetEmailWithPhoneGQL.watch({
      businessName: localStorage.getItem('businessName'),
      phoneNumber: this.forgetEmailPhone['internationalNumber'].replace(/\s/g, '')
    }).valueChanges.subscribe(
      (res) => {
        console.log('forget email', res['data'].forgetEmailWithPhone);
        if (res['data'].forgetEmailWithPhone !== null) {
          this.recoveryEmailInputSection = false
          this.resetCount = '30'
          this.startTimerForResending()
          this.startTimer = true
          this.toaster.showSuccess('OTP code has been successfully sent', '')
          this.recoveryEmailVCSection = true
          this.userFotrgetEmailError = false
          return
        }

        // this.toaster.showError(res['errors'][0].message, '')
        this.userFotrgetEmailMessage = res['errors'][0].message
        this.userFotrgetEmailError = true
      }, (err) => {
        console.log('forget email err', err);
        this.userFotrgetEmailError = true
        // this.toaster.showError('Phone number dose not exist', '')
      }
    )
  }

  emailOTPCodeError = false
  verifyUserEmailOTPCode() {
    // this.emailOTP = this.emailOTP1 + this.emailOTP2 + this.emailOTP3 + this.emailOTP4 + this.emailOTP5 + this.emailOTP6
    if (this.OTPCode.length < 6) {
      this.toaster.showError('Please enter valid OTP code ', '')
      this.emailOTPCodeError = true
      return
    }
    this.verifyforgetEmailWithPhoneGQL.mutate({
      businessName: localStorage.getItem('businessName'),
      code: this.OTPCode,
      phoneNumber: this.forgetEmailPhone['internationalNumber'].replace(/\s/g, '')
    }).subscribe(
      (res) => {
        if (res['data'].VerifyforgetEmailWithPhone == null) {
          this.emailOTPCodeError = true
          // this.toaster.showError('Invalid OTP Code', '')
          return
        }
        this.emailOTPCodeError = false
        clearInterval(this.resendTimer)
        this.resetCount = '30'
        this.OTPCode = ''
        this.startTimer = false
        console.log('resp of verify email', res['data'].VerifyforgetEmailWithPhone);
        this.loginDetails = res['data'].VerifyforgetEmailWithPhone
        if (this.loginDetails.length == 1) {
          this.recoveryEmailVCSection = false
          this.accPasswordSelection = true
          this.userToFetch = res['data'].VerifyforgetEmailWithPhone[0].email
          this.isEmailVerified = true
          this.userInfo = this.loginDetails[0]
          this.resetVariables()
          return
        }
        this.recoveryEmailVCSection = false
        this.showUser = true
        this.resetVariables()
      }, (err) => {
        console.log('err of verify email', err);
        this.emailOTPCodeError = true
        // this.toaster.showError('Invalid OTP Code', '')
      }
    )
  }

  handleKeyboardEvent(event) {
    if (event.charCode == 13) {
      if (this.welcome) {
        this.welcome = false
        this.accPasswordSelection = true
        this.userInfo = null
      }
    }
  }

  userToFetch = ''
  isEmailVerified = false
  userNotFound = false
  userNotFoundMessage = ''
  getUserDetail(bool) {
    if (this.userToFetch == '') {
      this.userInfo = null
      this.isEmailVerified = false
      return
    }
    if (!this.emailPattern.test(this.userToFetch)) {
      this.userNotFound = true
      this.userNotFoundMessage = 'Invalid email'
      if (bool) {
        // this.toaster.showError('Please enter valid email to fetch user detail', '')
        this.userInfo = null
        this.isEmailVerified = false
        return
      }
      this.userInfo = null
      this.isEmailVerified = false
      return
    }
    if (localStorage.getItem('BusinessId') == null || localStorage.getItem('BusinessId') == undefined) {
      this.userToFetch = ''
      this.userInfo = null
      return
    }
    this.getUserByEmailGQL.watch(
      {
        email: this.userToFetch,
        businessId: localStorage.getItem('BusinessId')
      }).valueChanges.subscribe(
        (res) => {
          if (res['data'].getUserByEmail == null) {
            // this.toaster.showError('User does not exist', '')
            this.userNotFound = true
            this.userNotFoundMessage = 'User does not exist'
            this.isEmailVerified = false
            this.userInfo = null
            return
          }
          this.isEmailVerified = true
          this.userNotFound = false
          console.log('response of user by email is', res['data'].getUserByEmail);
          this.userInfo = res['data'].getUserByEmail
        }, (err) => {
          this.isEmailVerified = false
          this.userNotFound = true
          this.userNotFoundMessage = 'User does not exist'
          // this.toaster.showError('User does not exist', '')
          console.log('error of user by email is', err);
          this.userInfo = null
        }
      )
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '70px',
      'height': '110px'
    }
  };

  onOtpChange(otp) {
    this.OTPCode = otp;
  }

  cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj
  }

  resetVariables() {
    this.OTPCode = ''
    this.forgetEmailPhone = null
    this.urlEmail = ''
    this.urlNumber = null
    this.newPassword = ''
    this.confirmPassword = ''
    this.passwordSubmitted = false
    this.userFotrgetEmailError = false
  }

  resendTimer: any
  resetCount = '30'
  startTimerForResending() {
    clearInterval(this.resendTimer);
    this.resendTimer = setInterval(() => {
      if (Number(this.resetCount) < 10) {
        this.resetCount = '0' + this.resetCount
      }
      if (Number(this.resetCount) <= 0) {
        this.startTimer = false
        clearInterval(this.resendTimer);
        this.resetCount = '30'
        return
      }
      this.resetCount = (Number(this.resetCount) - 1).toString()
    }, 1000);
  }

  togglePassword(event, span) {
    if (event.type === 'password') {
      event.type = 'text';
      span.target.className = 'fa fa-fw fa-eye-slash field-icon';
    } else {
      event.type = 'password';
      span.target.className = 'fa fa-fw fa-eye field-icon';
    }
  }
}