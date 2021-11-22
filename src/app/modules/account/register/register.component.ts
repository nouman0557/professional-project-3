import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { BusinesInput, GetCountriesGQL } from '../../../generated/graphql'
import { AllCureenciesGQL } from '../../../generated/graphql'
import { CheckUserEmailGQL } from '../../../generated/graphql'
import { CheckBusinessSystemNameGQL } from '../../../generated/graphql'
import { CheckBusinessUniqueCodeGQL } from '../../../generated/graphql'
import { CreateBusinessGQL, GetCityStateTaxGQL } from '../../../generated/graphql'
import {
  UploadFileGQL, CreateEmailOtpGQL, VerifyEmailOtpGQL, EmailOtpInput, EmailVerifyOtpInput,
  CreateOtpGQL, PhoneOtpInput, VerifyOtpGQL, PhoneVerifyOtpInput, CheckStoreNickNameGQL, AllowStoreType, AllowMethodPhoneVerify
} from '../../../generated/graphql'
import { Store } from '../../../generated/graphql'
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ToasterService } from 'src/app/services/toaster/toaster.service'
import { MustMatch } from './_helper/must-match.validator';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import * as CryptoJS from 'crypto-js';
import { RegisterService } from '../../../services/account/register.service'
declare function profilePicture(op1, op2, op3): any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]

})
export class RegisterComponent implements OnInit {
  location: Location;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Pakistan, CountryISO.Mexico];
  ein_ssn = 'EIN'
  store_type = 'Individual Store'
  fy_end_month = 'Last day of December'
  accounting_method = 'accrual'
  selectCurrency = ''
  modalRef: BsModalRef;
  main: boolean;
  personalInfo: any;
  businessInfo: any;
  loading = false;
  section1 = false;
  section2 = false;
  section3 = false;
  section4 = false;
  acMethod = 'accrual'
  error = false;
  allCurrencies = [];
  numberOfStores = []
  einText = ''
  confirm_p = ''
  finalStores = [];
  OTPCode = ''
  verifiedEmail = ''
  verifiedSMS = ''
  emailText = 'Verify'
  phoneText = 'Verify'
  logo: File
  fileName = ''
  imgLink: any
  imgData: any
  emailPattern = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  count = ['Pak', 'USA', 'Mexixo']
  constructor(
    private getAllCurrencies: AllCureenciesGQL,
    private verifyEmail: CheckUserEmailGQL,
    private registerBusiness: CreateBusinessGQL,
    private verifyBusinessName: CheckBusinessSystemNameGQL,
    private verifyUniqueCode: CheckBusinessUniqueCodeGQL,
    private uploadLogo: UploadFileGQL,
    private modalService: BsModalService,
    private formbulider: FormBuilder,
    private createEmailOtpGQL: CreateEmailOtpGQL,
    private verifyEmailOtpGQL: VerifyEmailOtpGQL,
    private createOtpGQL: CreateOtpGQL,
    private verifyOtpGQL: VerifyOtpGQL,
    private toaster: ToasterService,
    private getCountriesGQL: GetCountriesGQL,
    private router: Router,
    private getCityStateTaxGQL: GetCityStateTaxGQL,
    private checkStoreNickNameGQL: CheckStoreNickNameGQL,
    private registerService: RegisterService
  ) {
    this.section1 = true
  }

  defaultCountry = CountryISO['UnitedStates']
  ngOnInit() {
    let str = window.localStorage.getItem('country')
    if (str == '' || str == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.registerService.getGeoLocation(position.coords.latitude, position.coords.longitude).subscribe(
            (res) => {
              console.log('geo location res', res['results'][0]['address_components']);
              let com = res['results'][0]['address_components']
              for (let i = 0; i < com.length; i++) {
                for (let j = 0; j < com[i].types.length; j++) {
                  if (com[i].types[j] == 'country') {
                    let localcookie = CryptoJS.AES.encrypt(com[i].long_name, 'luna');
                    window.localStorage.setItem('country', localcookie)
                    // let str = window.localStorage.getItem('country')
                    str = CryptoJS.AES.decrypt(localcookie, 'luna').toString(CryptoJS.enc.Utf8);
                    this.defaultCountry = CountryISO[str]
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
        this.toaster.showInfo('Geo Location is not supported by your browser', '')
      }
    }
    else {
      str = CryptoJS.AES.decrypt(str, 'luna').toString(CryptoJS.enc.Utf8);
      this.defaultCountry = CountryISO[str]
    }
    // console.log(window);
    // let abc = window['intlTelInputGlobals']['instances']
    // let te = window['intlTelInputGlobals']['instances']
    // console.log('iti is',abc);
    // console.log('iti is',te);
    this.initializePersonalInfoForm()
    this.initializeBusinessInfoForm()
    this.getAllCountrie()
    this.addStore()
  }

  getFormValue(type, control) {
    return this[type].controls[control].value
  }

  initializePersonalInfoForm() {
    this.personalInfo = this.formbulider.group({
      first_name: ['', [Validators.required]],
      last_name: [, [Validators.required]],
      email: [, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: [, [Validators.required]],
      password: [, [Validators.required, Validators.minLength(6)]],
      confirm_password: [, [Validators.required]],
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  get fPersonalInfoForm() {
    return this.personalInfo.controls;
  }

  initializeBusinessInfoForm() {
    this.businessInfo = this.formbulider.group({
      business_system_name: ['', [Validators.required]],
      unique_code: [''],
      number_of_stores: [, [Validators.required, Validators.minLength(1)]],
      Country: [, [Validators.required]],
      store_type: ['Franchise']
    });
  }

  get fBusinessInfoForm() {
    return this.businessInfo.controls;
  }

  submittedPersonalInfo = false
  verifyPersonalInfo() {
    this.verifySameEmail()
    this.verifySameNumber()
    this.submittedPersonalInfo = true
    if (this.personalInfo.invalid || !this.emailCodeVerified || !this.smsCodeVerified) {
      if (this.personalInfo.invalid) {
        this.toaster.showError('Please fill the required fields', 'Registration Error')
        return;
      }
      else if (!this.emailCodeVerified) {
        this.toaster.showError('Please verify the email', 'Registration Error')
        return;
      }
      else if (!this.smsCodeVerified) {
        this.toaster.showError('Please verify the number', 'Registration Error')
        return;
      }
    }
    if (this.verifiedEmail !== this.personalInfo.controls.email.value) {
      this.emailCodeVerified = false
      this.emailText = 'Verify'
      this.toaster.showError('Please verify the email', 'Registration Error');
      return;
    }
    else if (this.verifiedSMS !== this.personalInfo.controls.phone.value['internationalNumber']) {
      this.phoneText = 'Verify'
      this.smsCodeVerified = false
      this.toaster.showError('Please verify the number', 'Registration Error');
      return;
    }
    console.log('form', this.personalInfo.value)
    this.NextSection('section3')
  }

  selectCountry(id,i) {
    const found = this.allCountries.find(element => element._id == id);
    this.finalStores[i]['identificationTypeList'] = found['identification_types']
    if (this.finalStores[i]['identificationTypeList'].length > 0) {
      this.finalStores[i].identification_type = this.finalStores[i]['identificationTypeList'][0]
    }
  }

  submittedBusinessInfo = false
  verifyBusinessInfo() {
    // this.submittedBusinessInfo = true
    // if (this.businessInfo.invalid || !this.businessLegalName || (!this.isUniqueBrandCode && this.getFormValue('businessInfo','unique_code') != '')) {
    //   return;
    // }
    // console.log('form', this.businessInfo.value)
    this.NextSection('section4')
  }

  thirdSectionError = false
  emailErrors = []
  verifySectionThreeData() {
    console.log('store data is', this.finalStores);
    this.thirdSectionError = false
    if (this.business_system_name == '') {
      this.toaster.showError('URL is required', '')
      this.thirdSectionError = true
      return
    }
    if (!this.businessLegalName && this.business_system_name != '') {
      this.toaster.showError('Business URL already exist', '')
      return
    }
    for (let i = 0; i < this.finalStores.length; i++) {
      for (let j = i + 1; j < this.finalStores.length; j++) {
        if (this.finalStores[i].store_nick_name == this.finalStores[j].store_nick_name) {
          this.toaster.showError('Multiple stres have same nick name ', 'Store nick name error')
          return
        }
      }
    }
    for (let i = 0; i < this.finalStores.length; i++) {
      console.log('currently verifying data of store' + i, this.finalStores[i]);
      if (this.finalStores[i].address_1 == '' || this.finalStores[i].city
        == '' || this.finalStores[i].state == '' || this.finalStores[i].zip_code == '' || this.finalStores[i].sales_tax == ''
        || this.finalStores[i].store_email == '' || this.finalStores[i].store_phone == '' ||
        this.finalStores[i].store_name == '' || this.finalStores[i].store_legal_name == '' || this.finalStores[i].identification_number == ''
        || this.finalStores[i].store_nick_name == '' || !this.finalStores[i].isEmailVerified || !this.finalStores[i].isNumberVerified
        || !this.finalStores[i].isStoreNickUnique
      ) {
        this.toaster.showError('Store' + ' ' + (Number(i) + 1) + ' has an error', '')
        this.thirdSectionError = true
        return
      }
    }
    console.log('3rd err', this.thirdSectionError);
    if (!this.thirdSectionError) {
      this.NextSection('section4')
    }
  }

  getStores() {
    return this.finalStores.length - 1
  }
  // isCalledFirstTime = true
  // tempStore = 0
  // initializeNumberOfStores() {
  //   if (this.isCalledFirstTime) {
  //     this.isCalledFirstTime = false
  //     this.tempStore = this.businessInfo.controls.store_type.value === 'Individual Store' ? 1 : Number(this.businessInfo.controls.number_of_stores.value)
  //     this.businessInfo.controls.number_of_stores.setValue(this.businessInfo.controls.store_type.value === 'Individual Store' ? '1' : this.businessInfo.controls.number_of_stores.value)
  //     this.addStore(this.tempStore)
  //   }
  //   else {
  //     let updatedStore = this.businessInfo.controls.store_type.value === 'Individual Store' ? 1 : Number(this.businessInfo.controls.number_of_stores.value)
  //     // updatedStore = Math.abs(this.tempStore - updatedStore)
  //     this.businessInfo.controls.number_of_stores.setValue(this.businessInfo.controls.store_type.value === 'Individual Store' ? '1' : this.businessInfo.controls.number_of_stores.value)
  //     this.addStore(updatedStore)
  //   }
  //   this.verifyBusinessInfo()
  //   console.log('number of stores are', this.finalStores);
  // }

  handleAddressChange(event, index) {
    console.log('event is', event);
    this.finalStores[index]['store_nick_name'] = ''
    this.finalStores[index]['sales_tax'] = ''
    this.finalStores[index]['address_1'] = ''
    this.finalStores[index]['address_2'] = ''
    this.finalStores[index]['city'] = ''
    this.finalStores[index]['state'] = ''
    this.finalStores[index]['Country'] = null
    this.finalStores[index]['country'] = 'Please select your country'
    this.finalStores[index].store_name = event.name
    this.finalStores[index].store_phone = event.international_phone_number.replace(/\s/g, '')
    this.verifyStoreNumber(index)
    let adresses = event.address_components
    let obj = {}
    for (let i = 0; i < adresses.length; i++) {
      for (let j = 0; j < adresses[i].types.length; j++) {
        if (adresses[i].types[j] == 'postal_code') {
          obj['zipCode'] = adresses[i]['long_name']
          // this.finalStores[index].zip_code = adresses[i]['long_name']
        }
        else if(adresses[i].types[j] == 'subpremise') {
          this.finalStores[index]['address_2'] = adresses[i].long_name
        }
        else if (adresses[i].types[j] == 'administrative_area_level_1') {
          obj['State'] = adresses[i]['long_name']
          // this.finalStores[index].state = adresses[i]['long_name']
        }
        else if (adresses[i].types[j] == 'locality') {
          obj['City'] = adresses[i]['long_name']
          // this.finalStores[index].city = adresses[i]['long_name']
        }
        else if (adresses[i].types[j] == 'country') {
          obj['Country'] = adresses[i]['long_name']
          // this.finalStores[index]['country'] = adresses[i]['long_name']
          this.finalStores[index]['shortCode'] = adresses[i]['long_name']
        }
        else if (adresses[i].types[j] == 'route') {
          this.finalStores[index]['store_nick_name'] = event.name + ' ' + '- ' + adresses[i]['long_name']
          this.finalStores[index].address_1 = this.finalStores[index].address_1 + ' ' + adresses[i]['long_name']
          this.verifyStoreNickName(index)
        }
        else if (adresses[i].types[j] == 'premise' || adresses[i].types[j] == 'street_number') {
          this.finalStores[index].address_1 = ''
          this.finalStores[index].address_1 = adresses[i]['long_name']
        }
      }
      if (this.finalStores[index].address_1 == '') {
        let add = event.vicinity.split(',')
        for (let k = 0; k < add.length - 1; k++) {
          this.finalStores[index].address_1 = this.finalStores[index].address_1 + ' ' + add[k]
        }
      }
      if (this.finalStores[index]['store_nick_name'] == '') {
        this.finalStores[index]['store_nick_name'] = event.name//.replace(/\s/g, '');
      }
    }
    obj['latitude'] = ''
    obj['longitude'] = ''
    obj['placeID'] = event.place_id
    obj['gAddress'] = this.finalStores[index].address_1

    this.getDetail(index, obj)
    console.log('current store data is', this.finalStores[index]);
  }

  makeNewData(index, data) {
    let obj = {}
    obj['zipCode'] = data['zip_code']
    obj['State'] = data['state']
    obj['City'] = data['city']
    obj['Country'] = data['shortCode']
    obj['latitude'] = ''
    obj['longitude'] = ''
    obj['placeID'] = ""
    obj['gAddress'] = data['address_1']
    this.getDetail(index, obj)
  }

  verifyCurrentStore(index) {
    this.verifyStoreNickName(index)
    this.thirdSectionError = false
    for (let i = 0; i < this.finalStores.length; i++) {
      for (let j = i + 1; j < this.finalStores.length; j++) {
        if (this.finalStores[i].store_nick_name == this.finalStores[j].store_nick_name) {
          this.toaster.showError('Multiple stres have same nick name ', 'Store nick name error')
          this.thirdSectionError = true
          return
        }
      }
    }
    if (this.finalStores[index].address_1 == '' || this.finalStores[index].city
      == '' || this.finalStores[index].state == '' || this.finalStores[index].zip_code == '' || 
      this.finalStores[index].sales_tax == ''
      || this.finalStores[index].store_email == '' || this.finalStores[index].store_phone == '' ||
      this.finalStores[index].store_name == '' || this.finalStores[index].store_legal_name == '' || 
      this.finalStores[index].identification_number == ''
      || this.finalStores[index].store_nick_name == '' || !this.finalStores[index].isEmailVerified || 
      !this.finalStores[index].isNumberVerified
      || !this.finalStores[index].isStoreNickUnique
    ) {
      this.toaster.showError('please fill all the required fields', '')
      this.thirdSectionError = true
      return
    }
    this.setStoresLegalName(index)
    this.addStore()
  }

  addStore() {
    let currentStore =
    {
      store_name: '',
      isStoreNickUnique: false,
      store_nick_name: '',
      store_legal_name: '',
      store_type: AllowStoreType.IndependentRepairStore,
      Country: null,
      country: 'Please select your country',
      identification_number: '',
      identification_type: '',
      identificationTypeList: [],
      isEmailVerified: false,
      emailText: 'verify',
      verifiedEmail: '',
      store_email: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      sales_tax: '',
      isNumberVerified: false,
      verifiedNumber: '',
      numberText: 'Verify',
      store_phone: '',
      zip_code: '',
      type: 'sms',
      prevStores: false,
      smsOtpOptions: false,
      shortCode: 'UnitedStates',
    }
    this.finalStores.push(currentStore)
  }

  exportData(index) {
    this.finalStores[index]['export'] = true
    this.finalStores[index].address_1 = this.finalStores[index - 1].address_1
    this.finalStores[index].address_2 = this.finalStores[index - 1].address_2
    this.finalStores[index].city = this.finalStores[index - 1].city
    this.finalStores[index].ein_ssn = this.finalStores[index - 1].ein_ssn
    this.finalStores[index].email = this.finalStores[index - 1].email
    this.finalStores[index].phone = this.finalStores[index - 1].phone
    this.finalStores[index].sales_tax = this.finalStores[index - 1].sales_tax
    this.finalStores[index].state = this.finalStores[index - 1].state
    this.finalStores[index].store_legal_name = this.finalStores[index - 1].store_legal_name
    this.finalStores[index].store_name = this.finalStores[index - 1].store_name
    this.finalStores[index].zip_code = this.finalStores[index - 1].zip_code
    this.finalStores[index].logo = this.finalStores[index - 1].logo
    this.finalStores[index]['fileName'] = this.finalStores[index - 1]['fileName']
    console.log('final stores', this.finalStores);
  }

  resetDate(index) {
    this.finalStores[index]['export'] = false
    this.finalStores[index].address_1 = ''
    this.finalStores[index].address_2 = this.finalStores[index - 1].address_2
    this.finalStores[index].city = ''
    this.finalStores[index].ein_ssn = ''
    this.finalStores[index].email = ''
    this.finalStores[index].phone = ''
    this.finalStores[index].sales_tax = ''
    this.finalStores[index].state = ''
    this.finalStores[index].store_legal_name = ''
    this.finalStores[index].store_name = ''
    this.finalStores[index].zip_code = ''
    this.finalStores[index].logo = ''
    this.finalStores[index]['fileName'] = ''
    console.log('final stores', this.finalStores);
  }

  identificationTypeList = []
  getDetail(index, detailObject) {
    this.identificationTypeList = []
    this.getCityStateTaxGQL.watch({
      input: detailObject
    }).valueChanges.subscribe(
      (res) => {
        if (res['data'].getCityStateTax == null) {
          this.finalStores[index].sales_tax = ''
          this.finalStores[index].state = ''
          this.finalStores[index].city = ''
          this.finalStores[index].country = 'Please select your country'
          this.finalStores[index].Country = null
          this.finalStores[index]['identificationTypeList'] = []
          return
        }
        console.log('res of zip code is', res['data'].getCityStateTax);
        this.finalStores[index]['Country'] = res['data'].getCityStateTax.Country._id
        this.finalStores[index]['country'] = res['data'].getCityStateTax.Country.name
        this.finalStores[index]['identificationTypeList'] = res['data'].getCityStateTax.Country.identification_types
        if (this.finalStores[index]['identificationTypeList'].length > 0) {
          this.finalStores[index].identification_type = this.finalStores[index]['identificationTypeList'][0]
        }
        this.finalStores[index].sales_tax = (res['data'].getCityStateTax.tax.total).toFixed(2).toString()
        this.finalStores[index].state = res['data'].getCityStateTax.State.state_name
        this.finalStores[index].city = res['data'].getCityStateTax.City.city_name
        this.finalStores[index].zip_code = res['data'].getCityStateTax.zipCode
      }, (err) => {
        console.log('err of zip code is', err);
      }
    )
  }

  verifyStoreNickName(index) {
    this.checkStoreNickNameGQL.watch({
      store_nick_name: this.finalStores[index].store_nick_name
    }).valueChanges.subscribe(
      (res) => {
        if (!res['data'].checkStoreNickName) {
          this.finalStores[index]['isStoreNickUnique'] = true
        }
        else {
          this.finalStores[index]['isStoreNickUnique'] = false
        }
      }, (err) => {
        this.finalStores[index]['isStoreNickUnique'] = false
      }
    )
  }

  sendOTPCode() {
    let obj: EmailOtpInput = {
      email: this.personalInfo.controls.email.value
    }
    this.createEmailOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        console.log('OTP res', res['data'].createEmailOTP);
        this.toaster.showSuccess('Email Verification code sent', 'Email Verification')
      }, (err) => {
        console.log('OTP err', err);
        this.toaster.showError('Error on code seding', 'Email Verification')
      }
    )
  }

  otpEmailValid = true
  emailCodeVerified = false
  verifyCode() {
    let obj: EmailVerifyOtpInput = {
      email: this.personalInfo.controls.email.value,
      otp_code: this.OTPCode
    }
    this.verifyEmailOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        if (res['data'].verifyEmailOTP == null) {
          this.otpEmailValid = false
          this.emailCodeVerified = false
          this.OTPCode = ''
          return
        }
        console.log('OTP  ver res', res['data'].verifyEmailOTP.verified);
        if (!res['data'].verifyEmailOTP.verified) {
          this.otpEmailValid = false
          this.emailCodeVerified = false
          this.OTPCode = ''
        }
        else {
          this.otpEmailValid = true
          this.emailCodeVerified = true
          this.verifiedEmail = this.personalInfo.controls.email.value
          this.emailText = 'Verified'
          this.modalService.hide(1)
          this.OTPCode = ''
        }
      }, (err) => {
        console.log('OTP  ver err', err);
        this.otpEmailValid = false
        this.emailCodeVerified = false
        this.OTPCode = ''
      }
    )
  }

  sendSMSOTPCode(template: TemplateRef<any>, cls) {
    // console.log('SMS 1',this.personalInfo.value);
    // if (this.personalInfo.controls.phone.value != null) {
    //   this.personalInfo.controls.phone.setValue(this.personalInfo.controls.phone.value['internationalNumber'])
    // }
    // if (this.personalInfo.controls.phone['internationalNumber'] != null) {
    //   this.personalInfo.controls.phone.setValue(this.personalInfo.controls.phone.value['internationalNumber'])
    // }
    // console.log('SMS 2',this.personalInfo.value);
    if(this.personalInfo.controls.phone.value == null) {
      this.toaster.showError('Please enter valid number','')
      return
    }
    let obj: PhoneOtpInput = {
      phone: this.personalInfo.controls.phone.value['internationalNumber'],
      method: AllowMethodPhoneVerify.Sms
    }
    this.createOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        console.log('sms otp res', res);
        this.toaster.showSuccess('Code sent', 'Number Verification')
        this.openModal(template, cls, '')
      }, (err) => {
        console.log('sms otp err', err);
        this.toaster.showError('Error on code seding', 'Number Verification')
      }
    )
  }

  somethingChanged(event) {
    console.log(event.target.value);
    this.personalInfo.controls.phone.setValue(event.value)
  }

  otpSMSValid = true
  smsCodeVerified = false
  verifySMSOTP() {
    // if (this.personalInfo.controls.phone.value != null) {
    //   this.personalInfo.controls.phone.setValue(this.personalInfo.controls.phone.value['internationalNumber'])
    // }
    let obj: PhoneVerifyOtpInput = {
      phone: this.personalInfo.controls.phone.value['internationalNumber'],
      otp_code: this.OTPCode
    }
    this.verifyOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        console.log('res of ver phone', res);
        if (!res['data'].verifyOTP) {
          this.otpSMSValid = false
          this.smsCodeVerified = false
          this.OTPCode = ''
        }
        else {
          this.phoneText = 'Verified'
          this.verifiedSMS = this.personalInfo.controls.phone.value['internationalNumber']
          this.modalService.hide(1)
          this.smsCodeVerified = true
          this.otpSMSValid = true
          this.OTPCode = ''
        }
      }, (err) => {
        console.log('err of ver phone', err);
        this.otpSMSValid = false
        this.OTPCode = ''
      }
    )
  }

  verifySameEmail() {
    if (this.verifiedEmail === this.personalInfo.controls.email.value && this.verifiedEmail !== '') {
      this.otpEmailValid = true
      this.emailCodeVerified = true
      this.emailVerified = true
      this.emailText = 'Verified'
      return
    }
    this.emailCodeVerified = false
    this.emailText = 'Verify'
    return false
  }

  verifySameNumber() {
    console.log(this.personalInfo.value);
    // if (this.personalInfo.controls.phone.value != null) {
    //   this.personalInfo.controls.phone.setValue(this.personalInfo.controls.phone.value['internationalNumber'])
    // }
    // console.log(this.personalInfo.value);
    // if (this.personalInfo.controls.phone.value == null) {
    //   return
    // }
    if (this.personalInfo.controls.phone.value == null) {
      return
    }
    if (this.verifiedSMS === this.personalInfo.controls.phone.value['internationalNumber']) {
      this.smsCodeVerified = true
      this.phoneText = 'Verified'
      this.otpSMSValid = true
      return true
    }
    this.smsCodeVerified = false
    this.phoneText = 'Verify'
    return false
  }

  changeValue(type, field, val) {
    this[type].controls[field].setValue(val)
  }

  changeEIN_SSN(index, val) {
    this.finalStores[index]['identification_type'] = val
    this.finalStores[index].identification_number = ''
  }

  changeStoreType(index, val) {
    this.finalStores[index]['store_type'] = AllowStoreType[val]
  }

  countrySelected = false
  country = 'Select Any'
  shortCode = ''
  selectedCountryId = ''
  changeCountry(coun, id) {
    this.businessInfo.controls.Country.setValue(id)
    this.country = coun.name
    this.shortCode = coun.short_name
    this.countrySelected = true
  }

  changeEndMonth(mon) {
    this.fy_end_month = mon
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  businessName(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || charCode == 45 || charCode == 95 || charCode == 46) {
      return true;
    }
    return false;
  }

  emailVerified = false
  businessLegalName = true;
  isUniqueBrandCode = true
  message = ''
  businessMessage = ''
  uniqueCodeMessagee = ''
  verify(type, template: TemplateRef<any>, cls) {
    console.log('verifying ', type, '............');
    if (type === 'email') {
      let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let isEmail = reg.test(this.personalInfo.controls.email.value);
      if (isEmail) {
        this.verifyEmail.watch({
          email: this.personalInfo.controls.email.value
        }).valueChanges.subscribe((response) => {
          console.log('email ver res is', response);
          if (!response['data'].checkUserEmail) {
            this.error = false
            this.emailVerified = true
            this.sendOTPCode()
            this.modalRef = this.modalService.show(template, {
              class: 'modal-sm ' + cls,
              backdrop: 'static', keyboard: false
            });
          }
          else {
            this.error = true
            this.message = 'Email already exists'
            this.emailVerified = false
          }
        }, (error) => {
          console.log('there was an error sending the query', error);
          this.error = true
          this.message = 'Email already exists'
          this.emailVerified = false
        });
      }
      else {
        this.error = true
        this.emailVerified = false
        this.message = 'Invalid Email Address'
        return false
      }
    }
  }

  business_system_name = ''
  verifyBusinessURLAndCode(type) {
    if (type === 'businessName') {
      if (this.business_system_name !== '') {
        this.verifyBusinessName.watch({
          name: this.business_system_name
        }).valueChanges.subscribe((response) => {
          console.log('business ver res is', response);
          if (response['data']['checkBusinessSystemName'] === null) {
            this.error = false
            this.businessLegalName = true
            this.businessMessage = ''
          }
          else {
            this.error = true
            this.businessLegalName = false
            this.businessMessage = 'Legal Business Name already exists'
            this.toaster.showError('Legal Business Name already exists', 'Business URL')
          }
        }, (error) => {
          this.toaster.showError('Business URL already exist', 'Business URL')
          console.log('there was an error sending the query in business name ver', error);
          this.error = true
          this.businessLegalName = false
          this.businessMessage = 'Legal Business Name already exists'
        });
      }
      else {
        this.error = false
        this.businessLegalName = true
      }
    }
    else if (type === 'brandCode') {
      console.log('unique code', this.businessInfo.controls.unique_code.value);
      if (this.businessInfo.controls.unique_code.value == '') {
        this.isUniqueBrandCode = false
        this.uniqueCodeMessagee = 'Brand Unique Code already exists'
        this.error = true
        return
      }
      this.verifyUniqueCode.watch({
        code: this.businessInfo.controls.unique_code.value
      }).valueChanges.subscribe((response) => {
        console.log('unique code ver res is', response);
        if (response['data']['checkBusinessUniqueCode'] === null) {
          this.error = false
          this.isUniqueBrandCode = true
        }
        else {
          this.error = true
          this.uniqueCodeMessagee = 'Brand Unique Code already exists'
          this.isUniqueBrandCode = false
          this.toaster.showError('Business Code already exist', 'Business Code')
        }
      }, (error) => {
        this.toaster.showError('Business Code already exist', 'Business Code')
        console.log('there was an error sending the query in unique code ver', error);
        this.isUniqueBrandCode = false
        this.uniqueCodeMessagee = 'Brand Unique Code already exists'
        this.error = true
      });
    }
  }

  setACCMethod(met) {
    this.accounting_method = met
  }

  phoneError = false
  hasError(event) {
    if (!event) {
      this.personalInfo.controls.phone.setValue()
      this.phoneError = true
    }
    else {
      this.phoneError = false
    }
  }

  hasErrorOnStore(event, index) {
    if (!event) {
      this.finalStores[index].phone = ''
    }
  }

  getNumberOnStore(obj, index) {
    this.finalStores[index].phone = obj
  }

  getNumber(obj) {
    this.personalInfo.controls.phone.value = obj
    console.log('get number', obj);
  }

  logoError = false
  onFileChanged(event) {
    if (event.target.files.length !== 0) {
      this.imgData = <File>event.target.files[0]
      if (this.imgData.type === 'image/png' || this.imgData.type === 'image/jpg' || this.imgData.type === 'image/jpeg') {
        let reader = new FileReader()
        reader.readAsDataURL(this.imgData)
        reader.onload = (event) => {
          this.img.removeImage()
          this.photo = ''
          this.img = profilePicture('.profile', reader.result, '')
        }
      }
    }
  }

  loadSection(val) {
    if (val === 'register') {
      this.main = false
      this.section1 = true
    }
  }

  NextSection(section) {
    if (section === 'section2') {
      this.section2 = true
      this.section1 = false
    }
    else if (section === 'section3') {
      for (let i = 0; i < this.finalStores.length; i++) {
        console.log(this.personalInfo.value);
        if (this.finalStores[i].store_phone != null) {
          this.finalStores[i].store_phone = this.finalStores[i].store_phone['internationalNumber']
        }
      }
      this.section3 = true
      this.section1 = false
      this.section2 = false
    }
    else if (section === 'section4') {
      this.section4 = true
      this.section3 = false
      this.section2 = false
    }
  }

  PreviousSection(prevSec) {
    if (prevSec === 'section1') {
      this.section1 = true
      this.section2 = false
    }
    else if (prevSec === 'section2') {
      console.log(this.personalInfo.value);
      if (this.personalInfo.controls.phone.value != null) {
        this.personalInfo.controls.phone.setValue(this.personalInfo.controls.phone.value['internationalNumber'])
      }
      console.log(this.personalInfo.value);
      this.section1 = true
      this.section2 = false
      this.section3 = false

    }
    else if (prevSec === 'section3') {
      for (let i = 0; i < this.finalStores.length; i++) {
        console.log(this.personalInfo.value);
        if (this.finalStores[i].store_phone != null) {
          this.finalStores[i].store_phone = this.finalStores[i].store_phone['internationalNumber']
        }
      }
      this.section3 = true
      this.section4 = false
    }
  }

  openModal(template: TemplateRef<any>, cls, type) {
    if (type == 'email') {
      this.verify('email', template, cls)
    }
    else if (this.personalInfo.controls.phone.value != '') {
      this.modalRef = this.modalService.show(template, {
        class: 'modal-sm ' + cls,
        backdrop: 'static', keyboard: false
      });
    }
  }

  openEmailModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm ' + cls,
      backdrop: 'static', keyboard: false
    });
  }

  closeModel() {
    this.otpEmailValid = true
    this.otpSMSValid = true
    this.OTPCode = ''
    this.storewiseEmailOTPError = false
    this.storewiseNumberOTPError = false
    this.storeSMSOTP = ''
    this.storeEmailOTP = ''
    this.modalRef.hide();
  }

  userCreated = false
  submit() {
    let allLocations = JSON.parse(JSON.stringify(this.finalStores))
    for (let i = 0; i < allLocations.length; i++) {
      let num = ''
      if (allLocations[i]['store_phone'] != null) {
        num = allLocations[i]['store_phone']['internationalNumber']
      }
      delete allLocations[i]['identificationTypeList']
      delete allLocations[i]['store_phone']
      delete allLocations[i]['fileName']
      delete allLocations[i]['export']
      delete allLocations[i]['country']
      delete allLocations[i]['emailText']
      delete allLocations[i]['isEmailVerified']
      delete allLocations[i]['isNumberVerified']
      delete allLocations[i]['isStoreNickUnique']
      delete allLocations[i]['numberText']
      delete allLocations[i]['prevStores']
      delete allLocations[i]['type']
      delete allLocations[i]['verifiedEmail']
      delete allLocations[i]['verifiedNumber']
      delete allLocations[i]['smsOtpOptions']
      delete allLocations[i]['shortCode']
      allLocations[i].sales_tax = parseFloat(allLocations[i].sales_tax)
      allLocations[i]['store_phone'] = num
    }
    var merged: BusinesInput = this.personalInfo.value;
    console.log('merge is', merged);
    let num = merged['phone']['internationalNumber']
    delete merged['phone']
    merged['phone'] = num
    merged['fy_end_month'] = this.fy_end_month
    merged['stores'] = allLocations
    merged['logo'] = this.photo
    merged['accounting_method'] = this.accounting_method
    merged['business_system_name'] = this.business_system_name
    merged = this.cleanObject(merged)
    console.log('final merge is', merged);
    this.loading = true
    this.registerBusiness.mutate({
      business: merged
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.section4 = false
      this.userCreated = true
      this.loading = false
      this.finalStores = []
      this.toaster.showSuccess('Business registered sucessfully', 'Business register')
    }, (error) => {
      this.loading = false
      console.log('there was an error sending the query', error);
      this.toaster.showError('Something went wrong', 'Business Registration Error')
    });
  }

  allCountries: any
  getAllCountrie() {
    this.getCountriesGQL.watch().valueChanges.subscribe(
      (res) => {
        this.allCountries = res['data'].countries
        console.log('All countries-->', this.allCountries);
      }, (err) => {
        console.log('err in countries');
      }
    )
  }

  backToLastSection() {
    this.router.navigate(['/Index']);
  }

  cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  img: any
  async model_ProfilePhoto(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm ' + cls,
      backdrop: 'static', keyboard: false
    });
    if (this.photo != '') {
      // let image = await this.convertToImage(this.photo,'logo.jpeg','image/jpeg')
      // var img = new Image();
      // img.src = this.photo;
      // var canvas = document.createElement('canvas');
      // canvas.width = 351;
      // canvas.height = 351;
      // var ctx = canvas.getContext('2d');
      // ctx.drawImage(img, 0, 0, 350, 350);
      // this.img = canvas.toDataURL();
      // console.log('image is', this.img);
      this.img = profilePicture('.profile', this.photo, '')
      return
    }
    this.img = profilePicture('.profile', '', '')
    console.log('log is', this.img);

  }

  photo = ''
  savePhoto() {
    if (this.img.getAsDataURL() === 'data:image/png;base64,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') {
      this.toaster.showError('Please select image', '')
      return
    }
    this.photo = this.img.getAsDataURL()
    this.modalService.hide(1)
  }

  deleteImage() {
    this.img.removeImage()
    this.photo = ''
  }

  convertToImage(url, name, type) {
    return new Promise(
      (resolve) => {
        var image = (fetch(url)
          .then(function (res) { return res.arrayBuffer(); })
          .then(function (buf) { return new File([buf], name, { type: type }); })
        );
        resolve(image)
      }
    )
  }

  currentIndex: any
  sendStorewiseEmailOTPCode(template: TemplateRef<any>, cls, index) {
    if (!this.emailPattern.test(this.finalStores[index].store_email)) {
      this.toaster.showError('Please enter valid email', '')
      return
    }
    this.currentIndex = index
    let obj: EmailOtpInput = {
      email: this.finalStores[index].store_email
    }
    this.createEmailOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        console.log('OTP res', res['data'].createEmailOTP);
        this.openModal(template, cls, '')
        this.toaster.showSuccess('Email Verification code sent', 'Email Verification')
      }, (err) => {
        console.log('OTP err', err);
        this.toaster.showError('Error on code seding', 'Email Verification')
      }
    )
  }

  storewiseEmailOTPError = false
  storeEmailOTP = ''
  verifyStorewiseEmailOTPCode() {
    let obj: EmailVerifyOtpInput = {
      email: this.finalStores[this.currentIndex].store_email,
      otp_code: this.storeEmailOTP
    }
    this.verifyEmailOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        if (res['data'].verifyEmailOTP == null) {
          this.storewiseEmailOTPError = true
          return
        }
        console.log('OTP  ver res', res['data'].verifyEmailOTP.verified);
        if (!res['data'].verifyEmailOTP.verified) {
          this.storewiseEmailOTPError = true
        }
        else {
          this.storewiseEmailOTPError = false
          this.storeEmailOTP = ''
          this.finalStores[this.currentIndex]['verifiedEmail'] = this.finalStores[this.currentIndex].store_email
          this.finalStores[this.currentIndex]['isEmailVerified'] = true
          this.finalStores[this.currentIndex]['emailText'] = 'Verified'
          console.log('stores are', this.finalStores);
          this.modalService.hide(1)
        }
      }, (err) => {
        console.log('OTP  ver err', err);
        this.storewiseEmailOTPError = true
      }
    )
  }

  sendStorewiseSMSOTPCode(template: TemplateRef<any>, cls, index) {
    if (this.finalStores[index].store_phone == '') {
      this.toaster.showError('Please enter phone', '')
      return
    }
    this.currentIndex = index
    let obj: PhoneOtpInput = {
      phone: this.finalStores[index].store_phone['internationalNumber'],
      method: this.finalStores[index]['type']
    }
    this.createOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        console.log('sms otp res', res);
        this.toaster.showSuccess('Code sent', 'Number Verification')
        this.openModal(template, cls, '')
      }, (err) => {
        console.log('sms otp err', err);
        this.toaster.showError('Error on code seding', 'Number Verification')
      }
    )
  }

  storewiseNumberOTPError = false
  storeSMSOTP = ''
  verifyStorewiseSMSOTP() {
    let obj: PhoneVerifyOtpInput = {
      phone: this.finalStores[this.currentIndex].store_phone['internationalNumber'],
      otp_code: this.storeSMSOTP
    }
    this.verifyOtpGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        console.log('res of ver phone', res);
        if (!res['data'].verifyOTP) {
          this.storewiseNumberOTPError = true
        }
        else {
          this.phoneText = 'Verified'
          this.storeSMSOTP = ''
          this.finalStores[this.currentIndex]['verifiedNumber'] = this.finalStores[this.currentIndex].store_phone['internationalNumber']
          this.finalStores[this.currentIndex]['isNumberVerified'] = true
          this.finalStores[this.currentIndex]['numberText'] = 'Verified'
          this.storewiseNumberOTPError = false
          this.finalStores[this.currentIndex].smsOtpOptions = false
          this.modalService.hide(1)
        }
      }, (err) => {
        console.log('err of ver phone', err);
        this.storewiseNumberOTPError = true
      }
    )
  }

  showSMSOTPOptions(index) {
    if (this.finalStores[index].store_phone == '') {
      return
    }
    this.finalStores[index].smsOtpOptions = true
  }

  updateVerMethod(i, val) {
    this.finalStores[i].type = AllowMethodPhoneVerify[val]
  }

  verifyStoreEmail(index) {
    if (this.finalStores[index].store_email === this.finalStores[index].verifiedEmail && this.finalStores[index].verifiedEmail !== '') {
      this.finalStores[index].isEmailVerified = true
      this.finalStores[index].emailText = 'Verified'
      return
    }
    this.finalStores[index].isEmailVerified = false
    this.finalStores[index].emailText = 'Verify'
  }

  verifyStoreNumber(index) {
    if (this.finalStores[index].store_phone == null) {
      return
    }
    if (this.finalStores[index].store_phone['internationalNumber'] === this.finalStores[index].verifiedNumber && this.finalStores[index].verifiedNumber !== '') {
      this.finalStores[index].isNumberVerified = true
      this.finalStores[index].numberText = 'Verified'
      this.finalStores[index].smsOtpOptions = false
      return
    }
    this.finalStores[index].isNumberVerified = false
    this.finalStores[index].numberText = 'Verify'
  }

  formatIdentificatinNumber(index, event) {
    if (event.keyCode == 8) {
      return
    }
    if (this.finalStores[index].identification_type == 'EIN') {
      if (this.finalStores[index].identification_number.length >= 2 && this.finalStores[index].identification_number.length < 10) {
        this.finalStores[index].identification_number = this.finalStores[index].identification_number.substr(0, 2) + '-' + this.finalStores[index].identification_number.substr(3, 9)
      }
      if (this.finalStores[index].identification_number.length > 10) {
        this.finalStores[index].identification_number = this.finalStores[index].identification_number.substr(0, 2) + '-' + this.finalStores[index].identification_number.substr(3, 9)
      }
    }
    else if (this.finalStores[index].identification_type == 'SSN') {
      if (this.finalStores[index].identification_number.length == 3) {
        this.finalStores[index].identification_number = this.finalStores[index].identification_number.substr(0, 3) + '-'
      }
      if (this.finalStores[index].identification_number.length == 6) {
        this.finalStores[index].identification_number = this.finalStores[index].identification_number.substr(0, 3) + '-'
          + this.finalStores[index].identification_number.substr(4, 6) + '-'
      }
    }
    else if (this.finalStores[index].identification_type == 'RFC') {
      this.finalStores[index].identification_number = this.finalStores[index].identification_number.substr(0, 13)
    }
  }

  deleteStore(tab) {
    this.finalStores.splice(this.finalStores.indexOf(tab), 1)
  }

  UrlOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
      || charCode == 126 || charCode == 95 || charCode == 46 || charCode == 45) {
      return true;
    }
    return false;
  }

  usePreviousStoreInfo(index, index2, val, bool) {
    if (!bool) {
      this.finalStores[index].prevStores = bool
      this.finalStores[index].store_legal_name = ''
      this.finalStores[index].identification_type = this.finalStores[index].identificationTypeList.length > 0 ? this.finalStores[index].identificationTypeList[0] : ''
      this.finalStores[index].identification_number = ''
      for (let i = 0; i < this.legalAndIdentificationList.length; i++) {
        this.legalAndIdentificationList[i].check = false
      }
      console.log('stores are',this.finalStores);
      return
    }
    console.log('stores are',this.finalStores);
    this.finalStores[index].store_legal_name = val.name
    this.finalStores[index].identification_number = val.number
    this.finalStores[index].identification_type = val.type
    this.finalStores[index].prevStores = bool
    this.legalAndIdentificationList[index2].check = bool
  }

  usePreviousStoreInfo1(i) {
    this.finalStores[i].prevStores = false
    for (let i = 0; i < this.legalAndIdentificationList.length; i++) {
      this.legalAndIdentificationList[i].check = false
    }
  }

  legalAndIdentificationList = []
  setStoresLegalName(index) {
    let exist = false
    for (let i = 0; i < this.legalAndIdentificationList.length; i++) {
      if ((this.finalStores[index].store_legal_name == this.legalAndIdentificationList[i].name)
        || this.finalStores[index].store_legal_name == '') {
        exist = true
      }
    }
    if (!exist) {
      this.legalAndIdentificationList.push({
        name: this.finalStores[index].store_legal_name,
        type: this.finalStores[index].identification_type,
        number: this.finalStores[index].identification_number,
        check: false
      })
    }
    else {
      if (this.finalStores[index].store_legal_name == '') {
        return
      }
      var index1 = this.legalAndIdentificationList.map(x => {
        return x.name;
      }).indexOf(this.finalStores[index].store_legal_name);
      this.legalAndIdentificationList[index1].number = this.finalStores[index].identification_number
    }
  }

  getStoreType(ty) {
    return ty.replace(/\_/g, ' ')
  }

  closePopup() {
    this.modalService.hide(1)
  }
}
