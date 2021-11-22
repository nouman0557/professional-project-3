import { Component, OnInit, TemplateRef, NgModuleRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as Highcharts from 'highcharts';
import {
  CreateUserGQL, GetAllUsersGQL, UpdateUserGQL, UserUpdateInput, UserInput, UserStatus,
  GetCountriesGQL, RemoveUserGQL, GetAllStoresGQL, CreateBusinessLocationGQL, BusinessLocationInput, UpdateBusinessLocationGQL, UdateBusinessGQL, GetBusinessInfoForUpdateGQL, GetTodayCLockOfUsersGQL, GetCLockOfUserByIdGQL,
  CreateChartOfAccountGQL, UpdateChartOfAccountGQL, GetAllAccountsByTypeGQL,
  GetAllChartOfAccountsGQL, GetAllAccountTypesGQL, UpdateBusinessAdminGQL, OwnerPasswordUpdateGQL,
  BusinessLogoUploadGQL, CreateOtpGQL, AllowMethodPhoneVerify, CreateEmailOtpGQL,
  VerifyEmailOtpGQL,
  GetAllBusinessStoreAdminGQL, GetAllBusinessUsersGQL,
  CreateBusinessStoreAdminGQL, CreateBusinessUserGQL,
  UpdateBusinessStoreAdminGQL, StatusBusinessUserGQL,
  DeleteBusinessStoreAdminGQL, DeleteBusinessUserGQL, GetUserPinCodeByIdGQL,
  StatusBusinessStoreAdminGQL, UpdateBusinessUserGQL, StoreLogoUploadGQL, UserPinCodeResendGQL,
  PhoneOtpInput, CheckUserEmailGQL, EmailOtpInput, PhoneVerifyOtpInput, VerifyOtpGQL, EmailVerifyOtpInput,
  Store, GetCityStateTaxGQL, CheckStoreNickNameGQL, UserLogoUploadGQL, AllowStoreType, UniqueUserEmailGQL, BusinessStatus, GetBusinessAdminGQL, GetUsersLogsActivityGQL,
  AllSearchApplication, BusinessLogoDeleteGQL, UserLogoDeleteGQL, StoreLogoDeleteGQL, GeneratePinCodeGQL, CreatePinCodeGQL,
  CashRegistersOfLocationGQL, GetCashDrawerLogsGQL, UniquePinCodeVerifyGQL, CreateCashRegisterGQL, UpdateCashRegisterGQL, DeleteCashRegisterGQL
} from 'src/app/generated/graphql';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster/toaster.service'
import { logging, error } from 'protractor';
import { DatePipe } from '@angular/common';
import { MustMatch } from '../../account/register/_helper/must-match.validator';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { RegisterService } from 'src/app/services/account/register.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
declare function profilePicture(op1, op2, op3): any
import * as CryptoJS from 'crypto-js';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { CommonService } from 'src/app/services/common/common.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  selectusrCountry = 'Select Country'
  selectusrStatus = 'Select Status'
  selectRegisterStatus = 'Select Status'
  storeType = "Select Store Type"
  taxUse = 'Select Tax Usage'
  groupUse = 'Select Tax Group'
  taxRegion = 'Select Tax Region'
  groupFilter = 'Filter by Group'
  regionFilter = 'Filter by Region'
  selectusrRole = 'Select Role'
  selectAccount = 'select'
  selectSubAcc = 'Select Sub Account'
  selectEditAccount = 'Select Edit Account'
  selectSupplier = 'Select Supplier'
  selectPurchase = 'Select Purchase'
  selectCustomer = 'Select Customer'
  selectInventary = 'Select Inventary'
  selectCurrencyType = 'Select Currency'
  selectCash = 'Select Cash Book'
  selectBankbk = 'Select Bank Book '
  selectSaletx = 'Select Sale Tax'
  showMessage = ''
  editAccSubmit = false
  editMessage = ''
  addSettingAccSubmit = false
  settingAccountForm: any
  modalRef: BsModalRef;
  business = true
  businessInfo = true
  editBusiness = false
  attendenceList = true
  attendenceDetails = false
  accountList = true
  accountDetails = false
  storeList = true
  storeInfo = false
  userList = true
  userInfo = false
  store = false
  user = false
  attendence = false
  taxesAll = false
  taxesAllList = true
  taxesR = false
  taxesRList = true
  subTaxes = false
  subUsers = false
  subAccount = false
  roles = false
  permissions = false
  account = false
  accountShift = false
  sharePinCode = false
  updatePinCode = false
  generatePinCode = true
  resendPinCode = false
  cashRegisterDetails = false
  //========================= G.Setting ==Variable==End===============//
  allUsers = []
  selectedUser = {}
  addUserForm: any;
  addAccountForm: any
  editAccountForm: any
  imgLink: string;
  imgData: File;
  fileName: string;
  editUserForm: FormGroup;
  addStoreForm: FormGroup;
  editStoreForm: FormGroup;
  addAccountSubmitted = false
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Pakistan, CountryISO.Mexico];
  emailPattern = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  count = ['Pak', 'USA', 'Mexixo']
  userSearch: FormControl = new FormControl();
  storeSearch: FormControl = new FormControl();
  // baseUrl = 'http://3.227.161.233:5001/upload/'
  baseUrl = EnvironmentUrl.Images
  dateFormat='MMM/dd/yyyy'
  constructor(
    private formbulider: FormBuilder,
    private modalService: BsModalService,
    private modalSecondService: BsModalService,
    private toaster: ToasterService,
    private getCountriesGQL: GetCountriesGQL,
    private removeUserGQL: RemoveUserGQL,
    private getTodayCLockOfUsers: GetTodayCLockOfUsersGQL,
    private datePipe: DatePipe,
    private getCLockOfUserById: GetCLockOfUserByIdGQL,
    private getAllChartOfAccountsGQL: GetAllChartOfAccountsGQL,
    private getAllAccountTypesGQL: GetAllAccountTypesGQL,
    private createChartOfAccountGQL: CreateChartOfAccountGQL,
    private updateChartOfAccountGQL: UpdateChartOfAccountGQL,
    private getAllAccountsByTypeGQL: GetAllAccountsByTypeGQL,
    private updateBusinessAdmin: UpdateBusinessAdminGQL,
    private ownerPasswordUpdate: OwnerPasswordUpdateGQL,
    private businessLogoUpload: BusinessLogoUploadGQL,
    private createOtpGQL: CreateOtpGQL,
    private verifyEmail: CheckUserEmailGQL,
    private createEmailOtpGQL: CreateEmailOtpGQL,
    private verifyEmailOtpGQL: VerifyEmailOtpGQL,
    private verifyOtpGQL: VerifyOtpGQL,
    private getCityStateTaxGQL: GetCityStateTaxGQL,
    private checkStoreNickNameGQL: CheckStoreNickNameGQL,
    private getAllBusinessUsers: GetAllBusinessUsersGQL,
    private createBusinessUser: CreateBusinessUserGQL,
    private statusBusinessUser: StatusBusinessUserGQL,
    private deleteBusinessUser: DeleteBusinessUserGQL,
    private updateBusinessUser: UpdateBusinessUserGQL,
    private getAllBusinessStoreAdmin: GetAllBusinessStoreAdminGQL,
    private createBusinessStoreAdmin: CreateBusinessStoreAdminGQL,
    private updateBusinessStoreAdmin: UpdateBusinessStoreAdminGQL,
    private deleteBusinessStoreAdmin: DeleteBusinessStoreAdminGQL,
    private statusBusinessStoreAdmin: StatusBusinessStoreAdminGQL,
    private userLogoUpload: UserLogoUploadGQL,
    private uniqueUserEmailGQL: UniqueUserEmailGQL,
    private storeLogoUpload: StoreLogoUploadGQL,
    private getBusinessAdmin: GetBusinessAdminGQL,
    private getUsersLogsActivity: GetUsersLogsActivityGQL,
    private businessLogoDelete: BusinessLogoDeleteGQL,
    private userLogoDelete: UserLogoDeleteGQL,
    private storeLogoDelete: StoreLogoDeleteGQL,
    private _generatePinCode: GeneratePinCodeGQL,
    private createPinCode: CreatePinCodeGQL,
    private getUserPinCodeById: GetUserPinCodeByIdGQL,
    private userPinCodeResend: UserPinCodeResendGQL,
    private cashRegistersOfLocationGQL: CashRegistersOfLocationGQL,
    private getCashDrawerLogsGQL: GetCashDrawerLogsGQL,
    private uniquePinCodeVerify : UniquePinCodeVerifyGQL,
    private createCashRegister : CreateCashRegisterGQL,
    private updateCashRegister : UpdateCashRegisterGQL,
    private deleteCashRegister : DeleteCashRegisterGQL,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private stockService: StockService,

  ) {

  }
  
  $fotterdata: any
  ngOnInit() {
    this.$fotterdata = this.commonService.fotterdata$.subscribe((res) => {
      if(res){
        this.getAllUsers()
      }else{
      }
    });
    this.getAllUsers()
    this.initializeAddUser()
    this.getBusinessInfo()
    this.getAllCountries()
    this.getAllStores()
    this.initializeStore()
    this.getTodayCLockOfUsersFun()
    this.getAllAccount()
    this.initializeAddAccount()
    this.initializeEditAccount('account')
    this.initializeAccountSetting()
    this.userSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.getAllUsers()
    });
    this.storeSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
    });
  }
  ngAfterViewInit() {
    this.loadCharts()
  }

  changeDateFormat(value){
    this.dateFormat=value
  }

  getUserLoader = false
  userFilter = "all"
  getAllUsers() {
    this.getUserLoader = true
    this.getAllBusinessUsers.watch({
      store_id: window.localStorage.getItem('location_id'),
      filter: this.userFilter
    }).valueChanges.subscribe(
      (res) => {
        this.allUsers = []
        this.getUserLoader = false
        let data = res['data'].getAllBusinessUsers
        for (let i = 0; i < data.length; i++) {
          if (data[i]['is_deleted'] != undefined && data[i]['is_deleted'] != null) {
            if (!data[i]['is_deleted']) {
              this.allUsers.push(data[i])
            }
          }
          if (data[i]['id'] == this.selecteduserId) {
            this.selectedUser = data[i]
            this.selecteduserId = data[i].id
            this.userlogo = this.selectedUser['avatar_location'] == null || this.selectedUser['avatar_location'] == "" ? "" : this.baseUrl + this.selectedUser['avatar_location']

          }
          this.saveUserPhotoLoader = false
        }
        console.log('all users res--->', this.allUsers);
      }, (err) => {
        this.getUserLoader = false
        console.log('all users err', err);
      }
    )
  }

  updateFilters(type, value) {
    this[type] = value
    if (type == "userFilter") {
      this.getAllUsers()
    }
    if (type == "storeFilter") {
      this.getAllStores()
    }
  }

  backToUserProfile() {
    this.userInfo = false
    this.userList = true
    this.userlogo = ''
  }

  selecteduserId = ''
  userlogo = ''
  selectUser(user) {
    // this.userTimeLogData=[]
    // this.logActivityData = []
    this.codeGenerate = false
    this.newPinCode = ''
    this.pinShareType = 'sms'
    this.userPincodeLoader = false
    this.selectedUser = user
    this.selecteduserId = user.id
    this.userlogo = user.avatar_location == null || user.avatar_location == "" ? "" : this.baseUrl + user.avatar_location
    this.userList = false
    this.userInfo = true
    this.getUsersLogsActivityFun()
    this.userTimeLogFun()
    this.getUserPinCodeByIdFun()
  }

  initializeAddUser() {
    this.selectusrStatus = 'Select Status'
    this.selectusrCountry = 'Select Country'
    this.selectusrRole = 'Select Role'
    this.fileName = ''
    this.logo = null
    this.userlogo = ""
    this.addUserForm = this.formbulider.group({
      email: ['', [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      status: [''],
      password: ['', Validators.required],
      confirm_password: [, [Validators.required]],
      address_1: ['', [Validators.required]],
      address_2: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      salaryHour: ['', [Validators.required]],
      roles: [''],
      BusinessLocation: [window.localStorage.getItem('location_id')],
      Business: [window.localStorage.getItem('location_id')]
    }, {
      validator: MustMatch('password', 'confirm_password')
    });

  }

  get faddUser() {
    return this.addUserForm.controls
  }

  closeToaster() {
    this.showToaster = true
  }
  emailError = false
  showToaster = true
  toasterMsg = 'no msg'
  toasterType = 'error'
  verifyUserEmail(type, id) {
    if(this[type].controls.email.value.length<3){return}
    if (!this.stockService.validateEmail(this[type].controls.email.value)) {
      this.toasterMsg = 'Your email is invalid. Please enter correct email'
      this.toasterType = 'error'
      this.emailError = true
      return
    }
    let obj = {
      email: this[type].controls.email.value,
      user_id: id
    }
    obj = this.cleanObject(obj)
    this.uniqueUserEmailGQL.watch(obj).valueChanges.subscribe(
      (res) => {
        if (res['data'].uniqueUserEmail != null) {
          if (id != '' && res['data'].uniqueUserEmail.id == this.userSelected['id']) {
            return
          }
          this.toaster.showError('Email already exists', '')
          this.emailError = true
          this[type].controls.email.setValue('')
          return
        }
        else {
          this.emailError = false
        }
      }, (err) => {
        this.toaster.showError('Email already exists', '')
        this.emailError = true
        this[type].controls.email.setValue('')
      }
    )
  }

  addUserSubmitted = false
  addUserLoader = false
  userLogo = ''
  addUser() {
    console.log('selectusrRole', this.selectusrRole);
    if (this.addUserForm.invalid) {
      this.addUserSubmitted = true
      return;
    }
    this.addUserSubmitted = false
    if (this.selectusrCountry == 'Select Country') {
      this.toaster.showError('Select Country First', 'Select Country')
      return
    }
    if (this.selectusrStatus == 'Select Status') {
      this.toaster.showError('Select Status First.', 'Select Status')
      return
    }
    if (this.selectusrRole == 'Select Role') {
      this.toaster.showError('Select Role First.', 'Select Role')
      return
    }
    this.addUserForm.controls.status.setValue(this.selectusrStatus == 'Active' ? UserStatus.Active : UserStatus.InActive)
    let rol = []
    rol.push(this.selectusrRole)
    this.addUserForm.controls.roles.setValue(rol)
    this.addUserLoader = true
    let userUpdateInput = JSON.parse(JSON.stringify(this.addUserForm.value))
    delete userUpdateInput['confirm_password']
    userUpdateInput['salaryHour'] = parseFloat(userUpdateInput['salaryHour'])
    this.createBusinessUser.mutate({
      logo: this.userLogo,
      input: userUpdateInput
    }).subscribe(
      (res) => {
        this.checkPhoto = false
        this.addUserLoader = false
        this.getAllUsers()
        console.log('add user info res', res['data'].createBusinessUser);
        // this.toaster.showSuccess('User added successfully', 'User added')
        this.modalService.hide(1)
        this.addUserSubmitted = false
        // this.initializeAddUser()
      }, (err) => {
        this.addUserLoader = false
        console.log('add user info err', err);
        this.toaster.showError('Something went wrong.', 'User Add')
      }
    )
  }

  userSelected = {}
  initializeEditUser(user) {
    this.selectusrRole = user.roles[0] == '' || user.roles[0] == undefined ? 'Select Role' : user.roles[0]
    this.userSelected = user
    this.selecteduserId = user.id
    // this.userlogo = this.baseUrl+user.avatar_location
    this.userlogo = user.avatar_location == null || user.avatar_location == "" ? "" : this.baseUrl + user.avatar_location
    console.log('user to edit is', user);
    // this.selectusrStatus = user.status=="in_active"?"InActive":"Active"
    this.selectusrStatus = user.status == null ? 'Select Status' : user.status == "in_active" ? "InActive" : "Active"
    this.selectusrCountry = user.Country == null ? "Select Country" : user.Country.name == null ? 'Select Country' : user.Country.name
    let id = user.Country == null ? '' : user.Country._id
    let BLid = user.BusinessLocation == null ? window.localStorage.getItem('location_id') : user.BusinessLocation._id
    let Bid = user.business_id == null ? window.localStorage.getItem('BusinessId') : user.business_id._id
    let secondNameArray = user['last_name'].split('(');
    this.editUserForm = this.formbulider.group({
      email: [user.email, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      first_name: [user.first_name, [Validators.required]],
      last_name: [secondNameArray[0], [Validators.required]],
      phone: [user.phone, [Validators.required]],
      status: [user.status],
      address_1: [user.address_1, [Validators.required]],
      address_2: [user.address_2],
      country: [id, [Validators.required]],
      city: [user.city, [Validators.required]],
      state: [user.state, [Validators.required]],
      zipcode: [user.zipcode, [Validators.required]],
      salaryHour: [user.salaryHour, [Validators.required]],
      roles: [user.roles[0]],
      BusinessLocation: [BLid, [Validators.required]],
      Business: [Bid, [Validators.required]],
      password: [user.password]
    });
  }

  get feditUser() {
    return this.editUserForm.controls
  }

  editUserSubmitted = false
  updateUserLoader = false
  updateUser() {
    if (this.editUserForm.invalid) {
      this.editUserSubmitted = true
      return;
    }
    this.editUserSubmitted = false
    if (this.selectusrCountry == 'Select Country') {
      this.toaster.showError('Select Country First', 'Select Country')
      return
    }
    if (this.selectusrStatus == 'Select Status') {
      this.toaster.showError('Select Status First.', 'Select Status')
      return
    }
    if (this.selectusrRole == 'Select Role') {
      this.toaster.showError('Select Role First.', 'Select Role')
      return
    }
    let rol = []
    rol.push(this.selectusrRole)
    this.editUserForm.controls.status.setValue(this.selectusrStatus == 'Active' ? UserStatus.Active : UserStatus.InActive)
    this.editUserForm.controls.roles.setValue(rol)
    let userUpdateInput = JSON.parse(JSON.stringify(this.editUserForm.value))
    delete userUpdateInput.confirm_password
    userUpdateInput['salaryHour'] = parseFloat(userUpdateInput['salaryHour'])
    this.updateUserLoader = true
    this.updateBusinessUser.mutate({
      _id: this.userSelected['id'],
      input: userUpdateInput
    }).subscribe(
      (res) => {
        this.getAllUsers()
        this.updateUserLoader = false
        console.log('user update res', res['data'].updateBusinessUser);
        this.selectedUser = userUpdateInput
        this.selectedUser['Country'] = []
        this.selectedUser['Country']['_id'] = this.selectedUser['Country']
        this.selectedUser['Country']['name'] = this.selectusrCountry
        this.toaster.showSuccess('User updated successfully', 'User Updated')
        this.modalService.hide(1)
        this.commonService.setHeaderItem(false)
      }, (err) => {
        this.updateUserLoader = false
        console.log('error on updating user', err);
        this.toaster.showError('something went wrong while updating user', 'User Update')
      }
    )
  }

  userToDelete = {}
  userToDeleteLoader = false
  removeBUser() {
    console.log('user delete res', this.userToDelete);
    this.userToDeleteLoader = true
    this.deleteBusinessUser.mutate({
      _id: this.userToDelete['id']
    }).subscribe(
      (res) => {
        this.userToDeleteLoader = false
        this.getAllUsers()
        console.log('user delete res', res);
        this.modalService.hide(1)
        // this.toaster.showSuccess('User removed successfully', 'User delete')
      }, (err) => {
        this.userToDeleteLoader = false
        console.log('error while deleting user', err);
        this.toaster.showError('Something went wrong while deeting user', 'User delete')
      }
    )
  }

  closeUserModel() {
    this.addUserSubmitted = false
    this.modalService.hide(1);
  }

  model_removeUser(template: TemplateRef<any>, cls, user) {
    this.userToDelete = user
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  saveUserPhotoLoader = false
  saveUserPhoto() {
    this.userlogo = ''
    console.log('this.selectedUser', this.selecteduserId);
    if (this.img.getAsDataURL() === 'data:image/png;base64,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') {
      this.toaster.showError('Please select image', '')
      return
    }
    this.userlogo = this.img.getAsDataURL()
    if (this.checkPhoto) {
      this.modalRef.hide();
      return
    }
    //this.userlogo = this.img.getAsDataURL()
    this.userLogoUpload.mutate({
      user_id: this.selecteduserId,
      logo: this.img.getAsDataURL()
    }).subscribe(
      (res) => {
        console.log('businessLogoUpload res', res['data'].userLogoUpload);
        if (res['data'].userLogoUpload != null) {
          this.selectedUser['avatar_location'] = res['data'].userLogoUpload
          this.saveUserPhotoLoader = false
          this.toaster.showSuccess('Picture Updated Successfully', '')
          this.commonService.setHeaderItem(false)
        }
      }, (err) => {
        this.saveUserPhotoLoader = false
        this.toaster.showError('Something went worng, Try agin', 'Logo Not Updated')
        console.log('businessLogoUpload err', err);
      }
    )
    this.modalRef.hide();
  }

  userStatusUpdate(userId, event) {
    let status;
    const isChecked = event.target.checked;
    if (isChecked === true) {
      status = BusinessStatus.Active;
    } else {
      status = BusinessStatus.Inactive;
    }
    this.statusBusinessUser.mutate({
      _id: userId,
      status: status
    }).subscribe(
      (res) => {
        const result = JSON.parse(JSON.stringify(res['data'].statusBusinessUser));
        if (result === true) {
          this.getAllUsers();
          this.commonService.setHeaderItem(false)
        }
      }, (err) => {
        console.log('Error ', err);
      }
    );
  }

  userTimeLogData: any
  userTimeLogLoader = false
  userTimeLogFun() {
    this.userTimeLogLoader = true
    this.getCLockOfUserById.watch({
      userId: this.selecteduserId,
      location_id: window.localStorage.getItem('location_id'),
      toDate: "",
      fromDate: ""
    }).valueChanges.subscribe(
      (res) => {
        this.userTimeLogLoader = false
        let data = res['data'].getUserClockInOutHistoryLogs
        this.userTimeLogData = data
        console.log('Clock User Detail Data', this.userTimeLogData);
      }, (err) => {
        this.userTimeLogLoader = false
        console.log('Clock User Detail Data', err);
      }
    )
  }

  //======================================================== Start Store Managment =============================================//
  saveStorePhotoLoader = false
  storeLogo = ''
  checkStorePhoto = false
  saveStorePhoto() {
    console.log('this.selectedUser', this.selecteduserId);
    if (this.img.getAsDataURL() === 'data:image/png;base64,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') {
      this.toaster.showError('Please select image', '')
      return
    }
    this.storeLogo = this.img.getAsDataURL()
    if (this.storeModelName == "Add") {
      this.modalRef.hide();
      return
    }
    // this.saveStorePhotoLoader = true
    this.storeLogoUpload.mutate({
      store_id: this.storeSelectedId,
      logo: this.img.getAsDataURL()
    }).subscribe(
      (res) => {
        console.log('businessLogoUpload res', res['data'].storeLogoUpload);
        if (res['data'].storeLogoUpload != null) {
          this.storeSelected['logo'] = res['data'].storeLogoUpload
          this.saveStorePhotoLoader = false
         let storeDetail = JSON.parse(CryptoJS.AES.decrypt(window.localStorage.getItem('store'), 'luna').toString(CryptoJS.enc.Utf8));
         storeDetail['logo']=res['data'].storeLogoUpload
         let localcookie = CryptoJS.AES.encrypt(JSON.stringify(storeDetail), 'luna');
         window.localStorage.setItem('store', localcookie);
         this.commonService.setHeaderItem(true)
         this.toaster.showSuccess('Picture Updated Successfully', '')
        }
      }, (err) => {
        this.saveStorePhotoLoader = false
        this.toaster.showError('Something went worng, Try agin', 'Logo Not Updated')
        console.log('businessLogoUpload err', err);
      }
    )
    this.modalRef.hide();
  }

  allStores = []
  storeFilter = "all"
  getStoreLoader = false
  getAllStores() {
    this.getStoreLoader = true
    this.getAllBusinessStoreAdmin.watch({
      business_id: window.localStorage.getItem('BusinessId'),
      filter: this.storeFilter
    }).valueChanges.subscribe(
      (res) => {
        this.allStores = []
        this.getStoreLoader = false
        console.log('all store res', res);
        this.allStores = res['data'].getAllBusinessStoreAdmin
        console.log('all store res-->', res['data'].getAllBusinessStoreAdmin);
        for (let i = 0; i < this.allStores.length; i++) {
          if (this.allStores[i]['_id'] == this.storeSelectedId) {
            this.storeSelected = this.allStores[i]
            this.storeSelectedId = this.allStores[i]._id
            this.storeLogo = this.allStores[i].logo == null || this.allStores[i].logo == "" ? '' : this.baseUrl + this.allStores[i].logo
          }
        }
      }, (err) => {
        this.getStoreLoader = false
        console.log('all store err', err);
      }
    )
  }

  selectStore(store) {
    this.storeSelected = store
    this.storeSelectedId = store._id
    this.storeLogo = store.logo == null || store.logo == "" ? '' : this.baseUrl + store.logo
    this.storeList = false
    this.storeInfo = true
    this.getAllCashRegistrarOfLocation(store)
  }

  allCashRegitrar = []
  listCashRegistrarLoader=false
  getAllCashRegistrarOfLocation(loc) {
    this.listCashRegistrarLoader=true
    this.cashRegistersOfLocationGQL.watch({
      ID: loc._id
    }).valueChanges.subscribe(
      (res) => {
        this.listCashRegistrarLoader=false
        console.log('res of registrar', res);
        if (res['data'].cashRegistersOfLocation != null) {
          this.allCashRegitrar = res['data'].cashRegistersOfLocation
        }
      }, (err) => {
        this.listCashRegistrarLoader=false
        console.log('err while fetching registrar', err);
      }
    )
  }

  cashRegistrarName = ''
  cashRegistrarLogs = []
  selectCashRegister(reg) {
    this.cashRegistrarLogs = []
    this.cashRegistrarName = reg.name
    this.getCashDrawerLogsGQL.watch({
      businessLocation : localStorage.getItem('location_id'),
      cashRegisterID : reg._id,

    }).valueChanges.subscribe(
      (res) => {
        console.log('logs of cash registrar',res['data'].getCashDrawerLogs);
        if(res['data'].getCashDrawerLogs != null) {
          this.cashRegistrarLogs = res['data'].getCashDrawerLogs
        }
      }, (err) => {
        this.toaster.showError('Error while loading logs','')
      }
    )
    this.cashRegisterDetails = true
    this.storeInfo = false
  }

  get faddStore() {
    return this.editStoreForm.controls
  }

  addStoreSubmitted = false
  addStore() {
    if (this.storeLogo.includes("http")) {
      this.toaster.showError('Please Upload Logo First', 'Store Logo')
      return
    }
    this.editStoreSubmitted = true
    if (this.editStoreForm.invalid) {
      // this.toaster.showError('Please fill all the required fields', 'Update ERR')
      return;
    }
    if (this.editStoreForm.value.isNumberVerified == false || this.editStoreForm.value.isEmailVerified == false) {
      this.toaster.showError('Please Verify First', 'Verify First')
      return
    }
    this.editAddStoreLoader = true
    let storeUpdateInput = JSON.parse(JSON.stringify(this.editStoreForm.value))
    storeUpdateInput['store_phone'] = storeUpdateInput['store_phone'].internationalNumber
    let sType: AllowStoreType
    if (storeUpdateInput['store_type'] == 'Independent Repair') {
      sType = AllowStoreType.IndependentRepairStore
    } else if (storeUpdateInput['store_type'] == 'Franchise') {
      sType = AllowStoreType.Franchise
    } else {
      sType = AllowStoreType.FranchiseOem
    }
    storeUpdateInput['store_type'] = sType
    storeUpdateInput['sales_tax'] = parseFloat(storeUpdateInput['sales_tax'])
    delete storeUpdateInput['ein_ssn']
    delete storeUpdateInput['isEmailVerified']
    delete storeUpdateInput['emailText']
    delete storeUpdateInput['isNumberVerified']
    delete storeUpdateInput['numberText']
    delete storeUpdateInput['type']
    delete storeUpdateInput['smsOtpOptions']
    delete storeUpdateInput['shortCode']
    delete storeUpdateInput['isStoreNickUnique']
    delete storeUpdateInput['verifiedNumber']
    delete storeUpdateInput['country']
    delete storeUpdateInput['confirm_password']
    delete storeUpdateInput['verifiedEmail']
    this.createBusinessStoreAdmin.mutate({
      logo: this.storeLogo,
      business_id: window.localStorage.getItem('BusinessId'),
      input: storeUpdateInput
    }).subscribe(
      (res) => {
        this.editAddStoreLoader = false
        this.getAllStores()
        console.log('add Store info res', res['data'].createBusinessStoreAdmin);
        this.toaster.showSuccess('Store added successfully', 'Store added')
        this.modalService.hide(1)
        this.addUserSubmitted = false
        this.editStoreSubmitted = false
        this.initializeStore()
      }, (err) => {
        this.editAddStoreLoader = false
        console.log('add Store info err', err);
        this.toaster.showError('Error while adding user', 'Store error')
      }
    )
  }

  storeSelected = {}
  storeSelectedId = ''
  storyCountryId = ''
  initializeEditStore(store) {
    this.identificationTypeList = []
    if (store == null || store == undefined) {
      return
    }
    if(store.identification_type != '' && store.identification_type != null) {
      this.identificationTypeList.push(store.identification_type)
    }
    this.editStoreSubmitted = false
    this.storeModelName = 'Edit'
    // this.storeLogo = this.baseUrl + store.logo
    this.storeLogo = store.logo == null || store.logo == "" ? '' : this.baseUrl + store.logo
    this.selectusrCountry = store['Country'] == null ? "Select Country" : store['Country'].name
    this.storeSelected = store
    this.storeSelectedId = store._id
    // this.storeLogo=store.logo
    let ty = store.identification_type == null || store.identification_type == undefined ? '' : store.identification_type
    if (store.store_type == 'independent_repair_store') {
      this.storeType = 'Independent Repair'
    } else if (store.store_type == 'franchise') {
      this.storeType = 'Franchise'
    } else if (store.store_type == null) {
      this.storeType = 'Select Store Type'
    }
    else {
      this.storeType = 'Franchise OEM'
    }

    this.editStoreForm = this.formbulider.group({
      store_email: [store.email, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      store_name: [store.store_name, [Validators.required]],
      store_legal_name: [store.store_legal_name, [Validators.required]],
      store_phone: [store.phone, [Validators.required]],
      ein_ssn: [store.ein_ssn],
      sales_tax: [store.sales_tax, Validators.required],
      address_1: [store.address_1, [Validators.required]],
      address_2: [store.address_2],
      city: [store.city, [Validators.required]],
      state: [store.state, [Validators.required]],
      zip_code: [store.zip_code, [Validators.required]],
      Country: [store['Country'] == null ? "No ID" : store['Country']._id, [Validators.required]],
      store_type: [store.store_type, [Validators.required]],
      store_nick_name: [store.store_nick_name, [Validators.required]],
      provider_name: [store.provider_name],
      identification_number: [store.identification_number, [Validators.required]],
      identification_type: [ty],
      isEmailVerified: [true],
      emailText: ['Verified'],
      isNumberVerified: [true],
      numberText: ['Verified'],
      type: ['sms'],
      smsOtpOptions: [false],
      shortCode: [''],
      isStoreNickUnique: [true],
      verifiedNumber: [store.phone],
      country: [''],
      verifiedEmail: [store.email]
    });
    // this.editStoreForm.controls['Country'].setValue([this.allCountries]);
  }

  getFormValues(type, field) {
    return this[type].controls[field].value
  }

  storeModelName = 'Edit'
  initializeStore() {
    this.identificationTypeList = []
    this.editStoreSubmitted = false
    this.selectusrCountry = 'Select Country'
    this.storeType = "Select Store Type"
    this.storeLogo = ''
    this.editStoreForm = this.formbulider.group({
      store_email: ['', [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      store_name: ['', [Validators.required]],
      store_legal_name: ['', [Validators.required]],
      store_phone: ['', [Validators.required]],
      ein_ssn: [''],
      sales_tax: ['', Validators.required],
      address_1: ['', [Validators.required]],
      address_2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      store_type: ['', [Validators.required]],
      store_nick_name: ['', [Validators.required]],
      provider_name: [''],
      identification_number: ['', [Validators.required]],
      identification_type: [''],
      isEmailVerified: [''],
      emailText: ['Verify'],
      isNumberVerified: [''],
      numberText: ['Verify'],
      type: ['sms'],
      smsOtpOptions: [false],
      shortCode: [''],
      isStoreNickUnique: [true],
      verifiedNumber: [''],
      country: [''],
      verifiedEmail: ['']

    });
    // this.editStoreForm.controls['Country'].setValue([this.allCountries]);

  }

  get feditStore() {
    return this.editStoreForm.controls
  }

  editStoreSubmitted = false
  updateStore() {
    if (this.storeModelName == 'Add') {
      this.addStore()
      return
    }
    this.editStoreSubmitted = true
    if (this.editStoreForm.invalid) {
      // this.toaster.showError('Please fill all the required fields', 'Update ERR')
      return;
    }
    if (this.editStoreForm.value.isNumberVerified == false || this.editStoreForm.value.isEmailVerified == false) {
      this.toaster.showError('Please Verify First', 'Verify First')
      return
    }
    this.editAddStoreLoader = true
    let storeUpdateInput = JSON.parse(JSON.stringify(this.editStoreForm.value))
    storeUpdateInput['store_phone'] = storeUpdateInput['store_phone'].internationalNumber
    let sType: AllowStoreType
    if (storeUpdateInput['store_type'] == 'Independent Repair') {
      sType = AllowStoreType.IndependentRepairStore
    } else if (storeUpdateInput['store_type'] == 'Franchise') {
      sType = AllowStoreType.Franchise
    } else {
      sType = AllowStoreType.FranchiseOem
    }
    storeUpdateInput['store_type'] = sType
    storeUpdateInput['sales_tax'] = parseFloat(storeUpdateInput['sales_tax'])
    delete storeUpdateInput['ein_ssn']
    delete storeUpdateInput['isEmailVerified']
    delete storeUpdateInput['emailText']
    delete storeUpdateInput['isNumberVerified']
    delete storeUpdateInput['numberText']
    delete storeUpdateInput['type']
    delete storeUpdateInput['smsOtpOptions']
    delete storeUpdateInput['shortCode']
    delete storeUpdateInput['isStoreNickUnique']
    delete storeUpdateInput['verifiedNumber']
    delete storeUpdateInput['country']
    delete storeUpdateInput['confirm_password']
    delete storeUpdateInput['verifiedEmail']
    this.updateBusinessStoreAdmin.mutate({
      _id: this.storeSelectedId,
      business_id: window.localStorage.getItem('BusinessId'),
      input: storeUpdateInput
    }).subscribe(
      (res) => {
        this.editStoreSubmitted = false
        console.log('user update res', res['data'].updateBusinessStoreAdmin);
        this.editAddStoreLoader = false
        this.getAllStores()
        this.toaster.showSuccess('Store updated successfully', 'Store Updated')
        this.modalService.hide(1)
        this.cancel('storeInfo', 'storeList')
        this.initializeStore()
      }, (err) => {
        this.editAddStoreLoader = false
        console.log('error on updating user', err);
        this.toaster.showError('something went wrong while updating store', 'Store Update')
      }
    )
  }

  storeToDelete = {}
  removeStore() {
    this.removeUserGQL.watch({
      userId: this.userToDelete['id']
    }).valueChanges.subscribe(
      (res) => {
        this.getAllStores()
        this.getAllUsers()
        console.log('user delete res', res);
        this.modalService.hide(1)
        this.toaster.showSuccess('User removed successfully', 'User delete')
      }, (err) => {
        console.log('error while deleting user', err);
        this.toaster.showError('Something went wrong while deeting user', 'User delete')
      }
    )
  }

  //------------------New Store Flow ----------------------------//
  editAddStoreLoader = false
  handleAddressChange(event) {
    // if(this.storeSelected['store_name']== this.editStoreForm.value.store_name){
    //   this.initializeEditStore(this.storeSelected)
    //   return
    // }
    this.initializeStore()
    console.log('event is', event);
    this.selectusrCountry = 'Please select your country'
    this.editStoreForm.controls['store_name'].setValue(event.name)
    this.editStoreForm.controls['store_phone'].setValue(event.international_phone_number.replace(/\s/g, ''))
    // this.editStoreForm.value.store_phone = 'Please select your country'
    // this.editStoreForm.value.store_name = event.name
    // this.editStoreForm.controls.store_phone = event.international_phone_number.replace(/\s/g, '')
    this.verifyStoreNumber()

    let adresses = event.address_components
    let obj = {}
    for (let i = 0; i < adresses.length; i++) {
      for (let j = 0; j < adresses[i].types.length; j++) {
        if (adresses[i].types[j] == 'postal_code') {
          obj['zipCode'] = adresses[i]['long_name']
        }
        else if (adresses[i].types[j] == 'subpremise') {
          this.editStoreForm.controls['address_2'].setValue(adresses[i].long_name)
        }
        else if (adresses[i].types[j] == 'administrative_area_level_1') {
          obj['State'] = adresses[i]['long_name']
        }
        else if (adresses[i].types[j] == 'locality') {
          obj['City'] = adresses[i]['long_name']
        }
        else if (adresses[i].types[j] == 'country') {
          obj['Country'] = adresses[i]['long_name']
          // this.editStoreForm.controls.shortCode= adresses[i]['long_name']
          this.editStoreForm.controls['shortCode'].setValue(adresses[i]['long_name'])
        }
        else if (adresses[i].types[j] == 'route') {
          this.editStoreForm.controls['address_1'].setValue(adresses[i]['long_name']);
          // this.editStoreForm.value.address_1 = this.editStoreForm.controls.address_1 + ' ' + adresses[i]['long_name']
          this.editStoreForm.controls['store_nick_name'].setValue(((event.name + adresses[i]['long_name']).replace(/\s/g, '')).toLowerCase())
          this.verifyStoreNickName()
        }
        else if (adresses[i].types[j] == 'premise' || adresses[i].types[j] == 'street_number') {
          // this.editStoreForm.value.address_1 = ""
          // this.editStoreForm.controls.address_1 = adresses[i]['long_name']
          this.editStoreForm.controls['address_1'].setValue('')
          this.editStoreForm.controls['address_1'].setValue(adresses[i]['long_name'])
        }
      }
      if (this.editStoreForm.value.address_1 == '') {
        let add = event.vicinity.split(',')
        for (let k = 0; k < add.length - 1; k++) {
          // this.editStoreForm.value.address_1 = this.editStoreForm.value.address_1 + ' ' + add[k]
          this.editStoreForm.controls['address_1'].setValue(this.editStoreForm.value.address_1 + ' ' + add[k])
        }
      }
      if (this.editStoreForm.value.store_nick_name == '') {
        // this.editStoreForm.value.store_nick_name= (event.name.replace(/\s/g, '')).toLowerCase();
        this.editStoreForm.controls['store_nick_name'].setValue((event.name.replace(/\s/g, '')).toLowerCase())
        this.verifyStoreNickName()

      }
    }
    obj['latitude'] = ''
    obj['longitude'] = ''
    obj['placeID'] = event.place_id
    obj['gAddress'] = this.editStoreForm.value.address_1

    this.getDetail(obj)
    console.log('current store data is', this.editStoreForm);
  }

  makeNewData(data) {
    let obj = {}
    obj['zipCode'] = this.editStoreForm.value.zip_code
    obj['State'] = this.editStoreForm.value.state
    obj['City'] = this.editStoreForm.value.city
    obj['Country'] = this.editStoreForm.value.shortCode
    obj['latitude'] = ''
    obj['longitude'] = ''
    obj['placeID'] = ""
    obj['gAddress'] = this.editStoreForm.value.address_1
    this.getDetail(obj)
  }

  identificationTypeList = []
  getDetail(detailObject) {
    this.identificationTypeList = []
    this.getCityStateTaxGQL.watch({
      input: detailObject
    }).valueChanges.subscribe(
      (res) => {
        if (res['data'].getCityStateTax == null) {
          this.editStoreForm.controls['sales_tax'].setValue('')
          this.editStoreForm.controls['state'].setValue('')
          this.editStoreForm.controls['city'].setValue('')
          this.selectusrCountry = 'Please select your country'
          this.editStoreForm.controls['Country'].setValue('')
          return
        }
        console.log('res of zip code is', res['data'].getCityStateTax);
        this.editStoreForm.controls['Country'].setValue(res['data'].getCityStateTax.Country._id)
        // this.selectusrCountry=res['data'].getCityStateTax.Country.name
        this.selectusrCountry = res['data'].getCityStateTax.Country.name
        this.identificationTypeList = res['data'].getCityStateTax.Country.identification_types
        if (this.identificationTypeList.length > 0) {
          this.editStoreForm.controls['identification_type'].setValue(this.identificationTypeList[0])
        } else {
          this.identificationTypeList = []
        }
        this.editStoreForm.controls['sales_tax'].setValue(res['data'].getCityStateTax.tax.total.toString())
        this.editStoreForm.controls['state'].setValue(res['data'].getCityStateTax.State.state_name)
        this.editStoreForm.controls['city'].setValue(res['data'].getCityStateTax.City.city_name)
        this.editStoreForm.controls['zip_code'].setValue(res['data'].getCityStateTax.zipCode)
        this.editAddStoreLoader = false
      }, (err) => {
        this.editAddStoreLoader = false
        console.log('err of zip code is', err);
      }
    )
  }

  verifyStoreNickName() {
    this.checkStoreNickNameGQL.watch({
      store_nick_name: this.editStoreForm.controls.store_nick_name.value
    }).valueChanges.subscribe(
      (res) => {
        if (!res['data'].checkStoreNickName) {
          this.editStoreForm.controls['isStoreNickUnique'].setValue(true)
        }
        else {
          this.editStoreForm.controls['isStoreNickUnique'].setValue(false)
        }
      }, (err) => {
        this.editAddStoreLoader = false
        this.editStoreForm.controls['isStoreNickUnique'].setValue(false)
      }
    )
  }

  UrlOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
      || charCode == 126 || charCode == 95 || charCode == 46 || charCode == 45) {
      return true;
    }
    return false;
  }

  verifyStoreEmail() {
    if (this.editStoreForm.value.store_email === this.editStoreForm.value.verifiedEmail && this.editStoreForm.value.verifiedEmail !== '') {
      this.editStoreForm.controls['isEmailVerified'].setValue(true)
      // this.editStoreForm.value.isEmailVerified = true
      // this.editStoreForm.value.emailText = 'Verified'
      this.editStoreForm.controls['emailText'].setValue('Verified')
      return
    }
    this.editStoreForm.controls['isEmailVerified'].setValue(false)
    this.editStoreForm.value.isEmailVerified = false
    this.editStoreForm.controls['emailText'].setValue('Verify')
    // this.editStoreForm.value.emailText = 'Verify'
  }

  verifyStoreNumber() {
    if (this.editStoreForm.value.store_phone == null) {
      return
    }
    let VerifiedNum = this.editStoreForm.value.verifiedNumber.replace(/\s/g, "")
    let newNum = this.editStoreForm.value.store_phone['internationalNumber'].replace(/\s/g, "")
    if (newNum === VerifiedNum &&
      this.editStoreForm.value.verifiedNumber !== '') {
      // this.editStoreForm.value.isNumberVerified = true
      //  this.editStoreForm.value.numberText  = 'Verified'
      //  this.editStoreForm.value.smsOtpOptions = false
      this.editStoreForm.controls['numberText'].setValue('Verified')
      this.editStoreForm.controls['isNumberVerified'].setValue(true)
      this.editStoreForm.controls['smsOtpOptions'].setValue(false)

      return
    }
    // this.editStoreForm.value.isNumberVerified  = false
    // this.editStoreForm.value.numberText  = 'Verify'
    this.editStoreForm.controls['numberText'].setValue('Verify')
    this.editStoreForm.controls['isNumberVerified'].setValue(false)


  }

  currentIndex: any
  sendStorewiseEmailOTPCode(template: TemplateRef<any>, cls, index) {
    if (!this.emailPattern.test(this.editStoreForm.value.store_email)) {
      this.toaster.showError('Please enter valid email', '')
      return
    }
    this.currentIndex = index
    let obj: EmailOtpInput = {
      email: this.editStoreForm.value.store_email
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

  showSMSOTPOptions() {
    if (this.editStoreForm.value.store_phone == '') {
      return
    }
    this.editStoreForm.controls['smsOtpOptions'].setValue(true)
  }

  updateVerMethod(val) {
    //this.editStoreForm.value.type = val//AllowMethodPhoneVerify[val]
    this.editStoreForm.controls['type'].setValue(val)
  }

  sendStorewiseSMSOTPCode(template: TemplateRef<any>, cls) {
    if (this.editStoreForm.value.store_phone == '') {
      this.toaster.showError('Please enter phone', '')
      return
    }
    let obj: PhoneOtpInput = {
      phone: this.editStoreForm.value.store_phone['internationalNumber'],
      method: this.editStoreForm.value.type == 'sms' ? AllowMethodPhoneVerify.Sms : AllowMethodPhoneVerify.Call
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

  changeEIN_SSN(val) {
    this.editStoreForm.controls['identification_type'].setValue(val)
    this.editStoreForm.controls['identification_number'].setValue('')
  }

  formatIdentificatinNumber(event) {
    if (event.keyCode == 8) {
      return
    }
    if (this.editStoreForm.value.identification_type == 'EIN') {
      if (this.editStoreForm.value.identification_number.length >= 2 && this.editStoreForm.value.identification_number.length < 10) {
        // this.editStoreForm.value.identification_number = this.editStoreForm.value.identification_number.substr(0, 2) + '-' + this.editStoreForm.value.identification_number.substr(3, 9)
        this.editStoreForm.controls['identification_number'].setValue(this.editStoreForm.value.identification_number.substr(0, 2) + '-' + this.editStoreForm.value.identification_number.substr(3, 9))
      }
      if (this.editStoreForm.value.identification_number.length > 10) {
        // this.editStoreForm.value.identification_number = this.editStoreForm.value.identification_number.substr(0, 2) + '-' + this.editStoreForm.value.identification_number.substr(3, 9)
        this.editStoreForm.controls['identification_number'].setValue(this.editStoreForm.value.identification_number.substr(0, 2) + '-' + this.editStoreForm.value.identification_number.substr(3, 9))
      }
    }
    else if (this.editStoreForm.value.identification_type == 'SSN') {
      if (this.editStoreForm.value.identification_number.length == 3) {
        // this.editStoreForm.value.identification_number = this.editStoreForm.value.identification_number.substr(0, 3) + '-'
        this.editStoreForm.controls['identification_number'].setValue(this.editStoreForm.value.identification_number.substr(0, 3) + '-')
      }
      if (this.editStoreForm.value.identification_number.length == 6) {
        // this.editStoreForm.value.identification_number = this.editStoreForm.value.identification_number.substr(0, 3) + '-'
        //   + this.editStoreForm.value.identification_number.substr(4, 6) + '-'
        this.editStoreForm.controls['identification_number'].setValue(this.editStoreForm.value.identification_number.substr(0, 3) + '-'
          + this.editStoreForm.value.identification_number.substr(4, 6) + '-')
      }
    }
    else if (this.editStoreForm.value.identification_type == 'RFC') {
      // this.editStoreForm.value.identification_number = this.editStoreForm.value.identification_number.substr(0, 13)
      this.editStoreForm.controls['identification_number'].setValue(this.editStoreForm.value.identification_number.substr(0, 13))
    }
  }

  storewiseEmailOTPError = false
  storeEmailOTP = ''
  verifyStorewiseEmailOTPCode() {
    let obj: EmailVerifyOtpInput = {
      email: this.editStoreForm.value.store_email,
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
          // this.editStoreForm.value.verifiedEmail= this.editStoreForm.value.store_email
          this.editStoreForm.controls['verifiedEmail'].setValue(this.editStoreForm.value.store_email)
          // this.editStoreForm.value.isEmailVerified= true
          this.editStoreForm.controls['isEmailVerified'].setValue(true)
          // this.editStoreForm.value.emailText= 'Verified'
          this.editStoreForm.controls['emailText'].setValue('Verified')
          console.log('stores are', this.editStoreForm);
          this.modalRef.hide()
        }
      }, (err) => {
        this.storewiseEmailOTPError = true
        console.log('OTP  ver err', err);
      }
    )
  }

  storewiseNumberOTPError = false
  storeSMSOTP = ''
  verifyStorewiseSMSOTP() {
    let obj: PhoneVerifyOtpInput = {
      phone: this.editStoreForm.value.store_phone['internationalNumber'],
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
          // this.editStoreForm.value.verifiedNumber= this.editStoreForm.value.store_phone['internationalNumber']
          // this.editStoreForm.value.isNumberVerified= true
          // this.editStoreForm.value.numberText= 'Verified'
          this.storewiseNumberOTPError = false
          // this.editStoreForm.value.smsOtpOptions = false
          this.editStoreForm.controls['verifiedNumber'].setValue(this.editStoreForm.value.store_phone['internationalNumber'])
          this.editStoreForm.controls['isNumberVerified'].setValue(true)
          this.editStoreForm.controls['numberText'].setValue('Verified')
          this.editStoreForm.controls['smsOtpOptions'].setValue(false)
          this.modalRef.hide()
        }
      }, (err) => {
        console.log('err of ver phone', err);
        this.storewiseNumberOTPError = true
      }
    )
  }

  statusUpdate(storeId, event) {
    let status;
    const isChecked = event.target.checked;
    if (isChecked === true) {
      status = BusinessStatus.Active;
    } else {
      status = BusinessStatus.Inactive;
    }
    this.statusBusinessStoreAdmin.mutate({
      _id: storeId,
      status: status
    }).subscribe(
      (res) => {
        const result = JSON.parse(JSON.stringify(res['data'].statusBusinessStoreAdmin));
        if (result === true) {
          this.getAllStores();
        }

      }, (err) => {
        console.log('Error ', err);
      }
    );
  }
  //======================================================== End Store Managment  =============================================//

  logo: File
  onFileChanged(event) {
    if (event.target.files.length !== 0) {
      this.imgLink = ''
      this.imgData = <File>event.target.files[0]
      if (this.imgData.type === 'image/png' || this.imgData.type === 'image/jpg' || this.imgData.type === 'image/jpeg') {
        this.logo = this.imgData
        if (this.logo.name.length > 35) {
          this.fileName = this.logo.name.substr(0, 35) + '...';
        }
        else {
          this.fileName = this.logo.name
        }
      }
    }
  }

  logoError = false
  onPhotoChanged(event) {
    if (event.target.files.length !== 0) {
      this.imgData = <File>event.target.files[0]
      if (this.imgData.type === 'image/png' || this.imgData.type === 'image/jpg' || this.imgData.type === 'image/jpeg') {
        let reader = new FileReader()
        reader.readAsDataURL(this.imgData)
        reader.onload = (event) => {
          this.img.removeImage()
          this.img = profilePicture('.profile', reader.result, '')
        }
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  changeTab(type) {
    if (type == "business") {
      this.initializeBusinessInfoForm(this.businessInfoData)
    }
    if (type == "user") {
      this.getAllUsers()
    }
    this.business = false;
    this.store = false;
    this.user = false;
    this.attendence = false;
    this.taxesAll = false;
    this.taxesR = false;
    this.roles = false;
    this.permissions = false;
    this.account = false;
    this.accountShift = false
    this.POS = false
    this[type] = true;
  }

  changeCountry(val, id, type) {
    // this[type].value.country=id
    if (type == 'editStoreForm') {
      this[type].controls['Country'].setValue(id)
      this.selectusrCountry = val
      return
    }
    this[type].controls['country'].setValue(id)
    this.selectusrCountry = val
  }

  getAccbyType = ''
  changeValue(type, val, formName, id) {
    this[type] = val
    this[formName].controls.account_type_Id.setValue(id);
    if (formName == 'addAccountForm') {
      this.getAccbyType = id
      this.AccountsByType()
    }
  }

  changeUserRoleValue(val) {
    this.selectusrRole = val
  }

  changeUserStatusValue(val) {
    this.selectusrStatus = val
  }
  //For Sub Accunt
  changeValue1(type, val, formName, id) {
    this[type] = val
    this[formName].controls.parent_account_Id.setValue(id);
    if (formName == 'editAccountForm') {
      this[formName].controls.account_type_Id.setValue(id);
    }
  }

  changeSettingValue(type, val, formName, fieldName, id) {
    this[type] = val
    this[formName].controls[fieldName].setValue(id);
  }
  changeCurrencyType(type, val){
    this[type] = val
  }
  cancel(val, val1) {
    this[val] = false
    this[val1] = true
  }

  open(val, val1) {
    this[val] = false
    this[val1] = true
  }

  openSub() {
    this.subTaxes = true
  }

  closeSub() {
    this.subTaxes = false
    this.subUsers = false
    this.subAccount = false
    this.subSettingPOS = false
  }

  openSubUser() {
    this.subUsers = true
  }

  closeSubUser() {
    this.subUsers = false
  }

  openSubAccount() {
    this.subAccount = true
  }

  openSubSetting() {
    this.subSettingPOS = true
  }

  closeModel() {
    //this.initializeStore()
    this.otpEmailValid = true
    this.otpSMSValid = true
    this.OTPCode = ''
    this.storewiseEmailOTPError = false
    this.storewiseNumberOTPError = false
    this.modalService.hide(1);
    this.initializePasswordUpdateForm(this.businessInfoData['owner_id'].id)
    this.checkPhoto = false

  }

  closeModalForOTP() {
    this.otpEmailValid = true
    this.otpSMSValid = true
    this.OTPCode = ''
    this.modalService.hide(1);

  }
  //========================= G.Setting ==Variable====================// 
  showSetting(val, val1) {
    this[val] = true
    this[val1] = false
  }

  subSettingPOS = false
  POS = false
  noCCSett = true
  noCashSett = true
  noChecqueSett = true
  noPaypalSett = true
  noNetTermsSett = true
  nostoreCreditSett = true
  noCouponsSett = true
  noPayInvoiceSett = true
  notwillioIntSett = true
  nopayPalIntSett = true
  notbrainTreeIntSett = true
  //////////////////////////
  creditCardSetting = false
  cashSetting = false
  checqueSetting = false
  PaypalSetting = false
  netTermsSetting = false
  storeCreditSetting = false
  couponsSetting = false
  PayInvoiceSetting = false
  twillioIntSetting = false
  payPalIntSetting = false
  brainTreeIntSetting = false
  //////////////////////
  changeCreditCard = false
  changeCash = false
  changeChecque = false
  changePaypal = false
  changenetTerms = false
  changestoreCredit = false
  changeCoupons = false
  changePayInvoice = false
  changetwillioInt = false
  changepayPalInt = false
  changebrainTreeInt = false
  //============================================= for Yes No Button G.Setting 2162 And Model ==================================================
  changeVal(val, val1) {
    this[val] = true
    this[val1] = false
    if (val == 'noCCSett') {
      this.creditCardSetting = false
    }
    if (val == 'noCashSett') {
      this.cashSetting = false
    }
    if (val == 'noChecqueSett') {
      this.checqueSetting = false
    }
    if (val == 'noPaypalSett') {
      this.PaypalSetting = false
    }
    if (val == 'noNetTermsSett') {
      this.netTermsSetting = false
    }
    if (val == 'nostoreCreditSett') {
      this.storeCreditSetting = false
    }
    if (val == 'noCouponsSett') {
      this.couponsSetting = false
    }
    if (val == 'noPayInvoiceSett') {
      this.PayInvoiceSetting = false
    }
    if (val == 'notwillioIntSett') {
      this.twillioIntSetting = false
    }
    if (val == 'nopayPalIntSett') {
      this.payPalIntSetting = false
    }
    if (val == 'notbrainTreeIntSett') {
      this.brainTreeIntSetting = false
    }
  }
  //////////================================//////////
  model_remove(template: TemplateRef<any>, cls, user) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_addStore(template: TemplateRef<any>, cls) {
    this.initializeStore()
    this.storeModelName = 'Add'
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editStore(template: TemplateRef<any>, cls, store) {
    this.initializeEditStore(store)
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  checkPhoto = false
  model_addUser(template: TemplateRef<any>, cls) {
    this.checkPhoto = true
    this.initializeAddUser()
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editUser(template: TemplateRef<any>, cls, user) {
    this.initializeEditUser(user)
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editAccount(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_addTax(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editTax(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_addGroup(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editGroup(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_addRegion(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editRegion(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_addPermission(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editPermission(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_addRole(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_editRole(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_changePassword(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  openModal(template: TemplateRef<any>, cls, type) {
    this.modalRef = this.modalSecondService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  openMailModal(template: TemplateRef<any>, cls, type) {
    if (type == 'email') {
      this.verify('email', template, cls)
    }
    else if (this.businessInfoForm.controls.phone.value != '') {
      this.modalRef = this.modalService.show(template, {
        class: 'modal-sm ' + cls,
        backdrop: 'static', keyboard: false
      });
    }
  }

  closeSecondModel() {
    this.modalSecondService.hide(1)
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  closeVerifyModel() {
    this.modalRef.hide()
    this.storewiseEmailOTPError = false
    this.storewiseNumberOTPError = false
    this.storeEmailOTP = ''
    this.storeSMSOTP = ''
  }
  //====================================== End Models ==================================================================//
  //====================================== Start Business Verification Session ==================================================//

  sendSMSOTPCode(template: TemplateRef<any>, cls) {
    let obj: PhoneOtpInput = {
      phone: this.businessInfoForm.controls.phone.value['internationalNumber'],
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

  emailVerified = false
  businessLegalName = true;
  isUniqueBrandCode = true
  message = ''
  businessMessage = ''
  uniqueCodeMessagee = ''
  error = false;

  verify(type, template: TemplateRef<any>, cls) {
    console.log('verifying ', type, '............');
    if (type === 'email') {
      let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let isEmail = reg.test(this.businessInfoForm.controls.email.value);
      if (isEmail) {
        this.verifyEmail.watch({
          email: this.businessInfoForm.controls.email.value
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

  sendOTPCode() {
    let obj: EmailOtpInput = {
      email: this.businessInfoForm.controls.email.value
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

  otpSMSValid = true
  smsCodeVerified = false
  OTPCode = ''
  verifiedEmail = ''
  verifiedSMS = ''
  emailText = 'Verified'
  phoneText = 'Verified'
  verifySameNumber() {
    if (this.businessInfoForm.controls.phone.value == null) {
      return
    }
    let VerifiedNum = this.verifiedSMS.replace(/\s/g, "")
    let NewNum = this.businessInfoForm.controls.phone.value['internationalNumber'].replace(/\s/g, "")
    if (VerifiedNum === NewNum) {
      this.smsCodeVerified = true
      this.phoneText = 'Verified'
      this.otpSMSValid = true
      return true
    }
    this.smsCodeVerified = false
    this.phoneText = 'Verify'
    return false
  }


  otpEmailValid = true
  emailCodeVerified = false
  verifyCode() {
    let obj: EmailVerifyOtpInput = {
      email: this.businessInfoForm.controls.email.value,
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
          //this.otpEmailValid = false
          this.emailCodeVerified = false
          // this.OTPCode = ''
          // this.toaster.showError('Invalid OTP Code. Try Again', 'Invalid OTP Code')
        }
        else {
          this.otpEmailValid = true
          this.emailCodeVerified = true
          this.verifiedEmail = this.businessInfoForm.controls.email.value
          this.emailText = 'Verified'
          this.modalService.hide(1)
          this.OTPCode = ''
        }
      }, (err) => {
        console.log('OTP  ver err', err);
        this.otpEmailValid = false
        //this.OTPCode = ''
      }
    )
  }

  verifySMSOTP() {
    let obj: PhoneVerifyOtpInput = {
      phone: this.businessInfoForm.controls.phone.value['internationalNumber'],
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
          this.verifiedSMS = this.businessInfoForm.controls.phone.value['internationalNumber']
          this.modalService.hide(1)
          this.smsCodeVerified = true
          this.otpSMSValid = true
          this.OTPCode = ''
        }
      }, (err) => {
        // this.toaster.showError('Invalid OTP Code. Try Again', 'Invalid OTP Code')
        console.log('err of ver phone', err);
        this.otpSMSValid = false
        //this.OTPCode = ''
      }
    )
  }

  verifySameEmail() {
    if (this.verifiedEmail === this.businessInfoForm.controls.email.value && this.verifiedEmail !== '') {
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

  changeEmailverify() {
    this.emailCodeVerified = false
  }

  //====================================== End Business Verification Session =================================//

  //======================================Business Management ================================================//

  businessInfoLoader = false
  businessInfoData: any
  getBusinessInfo() {
    this.getBusinessAdmin.watch({
      _id: window.localStorage.getItem('BusinessId')
    }).valueChanges.subscribe(
      (res) => {
        console.log('business Info Data res', res['data'].getBusinessAdmin);
        this.businessInfoData = res['data'].getBusinessAdmin
        this.initializeBusinessInfoForm(this.businessInfoData)
        this.initializePasswordUpdateForm(this.businessInfoData['owner_id'].id)
        this.photo = this.businessInfoData['logo'] == null || this.businessInfoData['logo'] == "" ? '' : this.baseUrl + this.businessInfoData['logo']
        console.log('businessInfoData--->', this.businessInfoData);
      }, (err) => {
        console.log('business Info GQL err', err);
      }
    )
  }

  backToBusinessProfile() {
    this.editBusiness = false
    this.businessInfo = true
    this.emailText = 'Verified'
    this.phoneText = 'Verified'
    this.getBusinessInfo()
  }

  businessInfoForm: any
  dataSavedBusInfo = false
  fy_end_month = ''
  initializeBusinessInfoForm(bInfo) {
    this.smsCodeVerified = true
    this.emailCodeVerified = true
    this.dataSavedBusInfo = false
    this.updateBussId = bInfo['_id']
    this.businessEndMonth = bInfo['fy_end_month']
    this.accounting_method = bInfo['accounting_method']
    this.photo = bInfo['logo'] == null || bInfo['logo'] == "" ? '' : this.baseUrl + bInfo['logo']
    this.verifiedEmail = bInfo['owner_id']['email']
    this.verifiedSMS = bInfo['owner_id']['phone']
    // let format=window.localStorage.getItem('dateFormate')
    this.dateFormat=bInfo.date_format==null?'MMM/dd/yyyy':bInfo.date_format
    this.businessInfoForm = this.formbulider.group({
      fy_end_month: [bInfo['fy_end_month'], [Validators.required]],
      accounting_method: [bInfo['accounting_method'], [Validators.required]],
      business_system_name: [bInfo['business_system_name'], [Validators.required]],
      first_name: [bInfo['owner_id'].first_name, [Validators.required]],
      last_name: [bInfo['owner_id'].last_name, [Validators.required]],
      email: [bInfo['owner_id'].email, [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: [bInfo['owner_id'].phone, [Validators.required]],
    });

  }

  get fBusinessInfoForm() {
    return this.businessInfoForm.controls;
  }

  openBussEdit(val, val1) {
    this[val] = false
    this[val1] = true
    this.initializeBusinessInfoForm(this.businessInfoData)
  }

  placeholder
  businessEndMonth = 'Last day of January'
  changeBusinessEndMonth(value) {
    this.businessEndMonth = value
  }

  updateBussId = ''
  updateBussInfo() {
    if (this.businessInfoForm.invalid) {
      this.dataSavedBusInfo = true;
      return;
    } else if (this.smsCodeVerified == false || this.emailCodeVerified == false) {
      this.toaster.showError('Please Verify First', 'Verify First')
      this.dataSavedBusInfo = true;
      return
    } else {
      this.businessInfoLoader = true
      this.businessInfoForm.value.accounting_method = this.accounting_method
      this.businessInfoForm.value.fy_end_month = this.businessEndMonth
      this.businessInfoForm.value.phone = this.businessInfoForm.value.phone.internationalNumber
      let businessInfoFormData = JSON.parse(JSON.stringify(this.businessInfoForm.value))
      if(this.dateFormat=='MMM DD,YYYY'){
        this.dateFormat='mediumDate'
      }
      businessInfoFormData['date_format']=this.dateFormat==null?"MMM/dd/yyyy":this.dateFormat
      console.log('business Info Form Data  ---->', businessInfoFormData);
      this.updateBusinessAdmin.mutate({
        _id: this.updateBussId,
        input: businessInfoFormData
      }).subscribe(
        (res) => {
          this.dataSavedBusInfo = false
          let data = res['data']['udateBusiness']
          console.log('business Update return Value  ---->', data);
          this.getBusinessInfo()
          this.cancel('editBusiness', 'businessInfo')
          this.businessInfoLoader = false
          localStorage.setItem('dateFormate', this.dateFormat==null?"MMM/dd/yyyy":this.dateFormat);
          this.toaster.showSuccess('Business Update successfully', 'Business Update')
        }, (err) => {
          console.log('GQL err', err);
          this.dataSavedBusInfo = false
          this.businessInfoLoader = false
          this.toaster.showError('Business Not Update', 'Please Retry ')

        }
      )
    }
  }

  changeStoreType(val) {
    this.storeType = val
    //this.editStoreForm.value.store_type = this.storeType
    this.editStoreForm.controls['store_type'].setValue(val)
  }

  countryID = ''
  changeCountry2(val, id) {
    this.selectusrCountry = val
    this.countryID = id
    this.editStoreForm.value.Country = id
  }

  allCountries: any
  getAllCountries() {
    this.getCountriesGQL.watch().valueChanges.subscribe(
      (res) => {
        this.allCountries = res['data'].countries
        console.log('All countries-->', this.allCountries);
      }, (err) => {
        console.log('err in countries');
      }
    )
  }

  accounting_method = 'accrual'
  setACCMethod(met) {
    this.accounting_method = met
  }

  photo = ''
  onLogoFileChanged(event) {
    if (event.target.files.length !== 0) {
      this.imgData = <File>event.target.files[0]
      if (this.imgData.type === 'image/png' || this.imgData.type === 'image/jpg' || this.imgData.type === 'image/jpeg') {
        let reader = new FileReader()
        reader.readAsDataURL(this.imgData)
        reader.onload = (event) => {
          this.img.removeImage()
          // this.photo = ''
          this.img = profilePicture('.profile', reader.result, '')
        }
      }
    }
  }

  savePhotoLoader = false
  savePhoto() {
    if (this.img.getAsDataURL() === 'data:image/png;base64,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') {
      this.toaster.showError('Please select image', '')
      return
    }
    // this.savePhotoLoader = true
    this.photo = this.img.getAsDataURL()
    this.businessLogoUpload.mutate({
      business_id: this.updateBussId,
      logo: this.img.getAsDataURL()
    }).subscribe(
      (res) => {
        this.savePhotoLoader = false
        console.log('businessLogoUpload res', res['data'].businessLogoUpload);
        if (res['data'].businessLogoUpload != null) {
          // this.photo = res['data'].businessLogoUpload
          this.toaster.showSuccess('Picture Updated Successfully', '')
        }
      }, (err) => {
        this.savePhotoLoader = false
        this.toaster.showError('Something went worng, Try agin', 'Logo Not Updated')
        console.log('businessLogoUpload err', err);
      }
    )
    this.modalRef.hide();
  }

  //-------------- Change Business Password -------------------//

  passwordUpdateForm: any
  passwordUpdateSubmitted = false
  initializePasswordUpdateForm(userId) {
    this.passwordUpdateSubmitted = false
    this.passwordUpdateForm = this.formbulider.group({
      userId: [userId, [Validators.required]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      newConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validator: MustMatch('newPassword', 'newConfirmPassword')
    }
    );

  }

  get fPasswordUpdateForm() {
    return this.passwordUpdateForm.controls;
  }

  passwordUpdateLoader = false
  oldPasswordNotCorrect = false
  ownerPasswordUpdateFun() {
    if (this.passwordUpdateForm.invalid) {
      this.passwordUpdateSubmitted = true
      return;
    } else {
      let passwordUpdateFormData = JSON.parse(JSON.stringify(this.passwordUpdateForm.value))
      this.passwordUpdateLoader = true
      this.ownerPasswordUpdate.mutate({
        input: passwordUpdateFormData
      }).subscribe(
        (res) => {
          this.dataSavedBusInfo = false
          this.passwordUpdateLoader = false
          this.passwordUpdateSubmitted = false
          this.modalService.hide(1)
          this.initializePasswordUpdateForm(this.businessInfoData['owner_id'].id)
          console.log('ownerPasswordUpdate res', res['data'].OwnerPasswordUpdate);
          let returnVal = res['data'].OwnerPasswordUpdate
          if (returnVal) {
            this.toaster.showSuccess('Password Updated Successfully', 'Password Updated')
          } else {
            this.toaster.showError('Incorrect password entered. ', 'Password Not Updated')
          }
        }, (err) => {
          this.passwordUpdateLoader = false
          this.dataSavedBusInfo = false
          this.passwordUpdateSubmitted = false
          // this.initializePasswordUpdateForm(this.businessInfoData['owner_id'].id)
          let message = err.graphQLErrors[0].message
          if (message == 'User old Password does not match') {
            this.oldPasswordNotCorrect = true
          }
          // this.toaster.showError('Incorrect password entered. ', 'Password Not Updated')
          console.log('ownerPasswordUpdate err', err);
        })
    }
  }

  oldPasswordNotCorrectFun() {
    this.oldPasswordNotCorrect = false
  }

  //====================================== End Business Management ================================================//

  //============================================ Attendence Management ============================================//

  todayCLockOfUsers: any
  getTodayCLockOfUsersFun() {

    this.getTodayCLockOfUsers.watch().valueChanges.subscribe(
      (res) => {
        console.log('todayCLockOfUsers', res);
        this.todayCLockOfUsers = res['data'].getTodayCLockOfUsers
        console.log('today CLock Of Users', this.todayCLockOfUsers);
      }, (err) => {
        console.log('todayCLockOfUsers err', err);
      }
    )
  }

  toDate = ''
  fromDate = ''
  selectedCustTotalHrs: Number = 0
  clockUserDetail: any
  clockUserDetailData: any
  getUserClockdDetail(val, val1, clockUser) {
    this.clockUserDetail = clockUser
    let myDate1 = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    let myDate2 = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    if (myDate1 == null) { myDate1 = '' }
    if (myDate2 == null) { myDate2 = '' }
    this[val] = false
    this[val1] = true
    this.getCLockOfUserById.watch({
      userId: clockUser.User['id'],
      location_id: window.localStorage.getItem('location_id'),
      toDate: myDate1,
      fromDate: myDate2
    }).valueChanges.subscribe(
      (res) => {
        let data = res['data'].getUserClockInOutHistoryLogs
        this.clockUserDetailData = data
        this.toDate = this.clockUserDetailData.endDate.toDate()
        this.fromDate = this.clockUserDetailData.startDate.toDate()
        console.log('Clock User Detail Data', this.clockUserDetailData);
      }, (err) => {
        console.log('Clock User Detail Data', err);
      }
    )
  }

  changedate() {
    this.getUserClockdDetail('', '', this.clockUserDetail)
  }

  //============================================ END Attendence Management =========================================//
  //=====Get Account Data=====//
  allAccountList = []
  getAllAccount() {
    this.getAllChartOfAccountsGQL.watch().valueChanges.subscribe(
      (res) => {
        this.allAccountList = res['data'].GetAllChartOfAccounts
        console.log('All Account List res', this.allAccountList);
      }, (err) => {
        console.log('Error getting Account List data', err);
      }
    )
  }

  //============================================= Accounts ============================================================//
  initializeAddAccount() {
    this.addAccountForm = this.formbulider.group({
      account_type_Id: ['', [Validators.required]],
      parent_account_Id: ['', Validators.required],
      account_code: ['', Validators.required],
      account_name: ['', [Validators.required]],
      Opening_balance: [],
      account_balance: [],
      description: [''],
      BusinessLocation: [window.localStorage.getItem('location_id')]
    });
  }

  get faddAccount() {
    return this.addAccountForm.controls
  }

  addAccount() {
    if (this.addAccountForm.invalid) {
      this.addAccountSubmitted = true
      this.showMessage = "Account Created Error";
      this.toaster.showSuccess('Error', ' Added Account');
      return;
    }
    this.addAccountSubmitted = true
    this.addAccountForm.value.Opening_balance = parseFloat(this.addAccountForm.value.Opening_balance);
    this.addAccountForm.value.account_balance = parseFloat(this.addAccountForm.value.account_balance);
    let addAccountFormInput = JSON.parse(JSON.stringify(this.addAccountForm.value))
    console.log("Values are", addAccountFormInput);
    this.createChartOfAccountGQL.mutate({
      input: addAccountFormInput
    }).subscribe(
      (res) => {
        console.log("Account Are Craeted ...", res['data']);
        //this.allAccountList.push(addAccountFormInput);
        this.showMessage = "Account Created";
        this.toaster.showSuccess('Sucessfully', 'Account Created');
        this.getAllAccount()
        this.modalRef.hide();
        this.initializeAddAccount();
        this.addAccountSubmitted = false
      }, (err) => {
        console.log("Account Craeted res Error...");
        this.addAccountSubmitted = true
        this.showMessage = "Account Al-Ready Created";
        this.initializeAddAccount();
      }
    )
  }

  AccountId = ''
  editAccountSubmitted = false
  initializeEditAccount(account) {
    this.editAccountForm = this.formbulider.group({
      account_type_Id: [account._id, [Validators.required]],
      parent_account_Id: [account.parent_account_Id],
      account_code: [account.account_code, Validators.required],
      account_name: [account.account_name, [Validators.required]],
      Opening_balance: [account.Opening_balance],
      account_balance: [account.account_balance],
      BusinessLocation: [window.localStorage.getItem('location_id')]
    });
    this.selectEditAccount = account.account_type_Id == null ? null : account.account_type_Id.title
    this.AccountId = account._id
    console.log("Account Id is", this.AccountId)
  }

  get feditAccount() {
    return this.editAccountForm.controls
  }

  updateAccount() {
    if (this.editAccountForm.invalid) {
      this.editAccSubmit = true
      this.editMessage = 'Error Updating Value'
      this.toaster.showError('Updating Value', 'Error')
      console.log("Edit Form Values", this.editAccountForm.value);
      return;
    }
    this.editAccountForm.value.Opening_balance = parseFloat(this.editAccountForm.value.Opening_balance);
    this.editAccountForm.value.account_balance = parseFloat(this.editAccountForm.value.account_balance);
    console.log("Edit Form Values", this.editAccountForm.value);
    this.updateChartOfAccountGQL.mutate({
      _id: this.AccountId,
      input: this.editAccountForm.value
    }).subscribe(
      (res) => {
        console.log("Edit Account Response.................");
        console.log("Edit Account Response.................", res['data']);
        this.toaster.showSuccess('Sucessfully', 'Account Updated');
        this.getAllAccount()
        this.modalRef.hide();
      }, (error) => {
        console.log("Edit Account Error................");
      }
    )
  }

  allAccountType: any
  getAccount() {
    this.getAllAccountTypesGQL.watch().valueChanges.subscribe(
      (res) => {
        this.allAccountType = res['data'].GetAllAccountTypes
        console.log('All Account res is:', this.allAccountType);
      }, (err) => {
        console.log('Error getting Account data', err);
      }
    )
  }

  ////User Activity By Tayyab
  getLogLoader = false
  logType = AllSearchApplication.All
  logActivityData = []
  getUsersLogsActivityFun() {
    this.getLogLoader = true
    this.getUsersLogsActivity.watch({
      input: {
        userId: this.selecteduserId,
        limit: 100,
        skip: 0,
        type: this.logType
      }
    }).valueChanges.subscribe(
      (res) => {
        console.log(' res', res['data']);
        this.logActivityData = JSON.parse(JSON.stringify(res['data'].getUsersLogsActivity))
        this.getLogLoader = false
      }, (err) => {
        console.log(' err', err);
        this.getLogLoader = false

      }
    )
  }

  updateFiltersLOG(value) {
    this.logType = value
    this.getUsersLogsActivityFun()
  }
  showSubAcc = false
  showSubAccount() {
    this.showSubAcc = !this.showSubAcc
  }

  allAccbyType = []
  AccountsByType() {
    this.getAllAccountsByTypeGQL.watch({
      _id: this.getAccbyType
    }).valueChanges.subscribe(
      (res) => {
        console.log("Get All Account by type...", res['data'].GetAllAccountsByType);
        this.allAccbyType = res['data'].GetAllAccountsByType
      }, (err) => {
      }
    )
  }

  initializeAccountSetting() {
    this.settingAccountForm = this.formbulider.group({
      supplier_payable: [''],
      customer_receivable: [''],
      cash_book: [''],
      bank_book: [''],
      sales_tax: ['']
    });
  }

  get faccountSetting() {
    return this.settingAccountForm.controls
  }

  addSetting() {
    //   let settingAccountValue = JSON.parse(JSON.stringify(this.settingAccountForm.value))
    //   this.businessLocationSettingsGQL.mutate({
    //     _id:window.localStorage.getItem('location_id'),
    //     input: settingAccountValue
    //   }).subscribe(
    //     (res)=>{
    //       console.log("Account Setting Response",this.settingAccountForm.value);
    //       console.log("Account Setting Response",res['data']);
    //     },(err)=>{
    //       console.log("Account Setting Error:",err);
    //       console.log("Account Setting Response",this.settingAccountForm.value);
    //     }
    //   )
  }

  toDataURL = url => fetch(url, {
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }))

  img: any
  async model_ProfilePhoto(template: TemplateRef<any>, cls, photo) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
    if (photo != undefined && photo != "") {
      this.toDataURL(photo)
        .then(result => {
          this.img = profilePicture('.profile', result, '')
        }
        );
    } else {
      this.img = profilePicture('.profile', '', '')
    }
  }

  convertToImage(url) {
    return new Promise(
      (resolve) => {
        var image = (fetch(url, {
          mode: "no-cors"
        })
          .then(function (res) { return res.arrayBuffer(); })
          .then(function (buf) { return new File([buf], 'logo', { type: '.png' }); })
        );
        resolve(image)
      }
    )
  }

  closePopup() {
    this.modalRef.hide();
    // this.modalService.hide(1)
  }


  /////// Clean Object method  remove properties whose are null || '' || undefined
  cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj
  }
  ////// Ends here 

  //========================================== Start Logo's Delete Methods ==================================//
  businessLogoDeleteLoader = false
  userLogoDeleteLoader = false
  storeLogoDeleteLoader = false
  businessLogoDeleteFun() {
    this.businessLogoDeleteLoader = true
    this.businessLogoDelete.mutate({
      business_id: window.localStorage.getItem('BusinessId')
    }).subscribe(
      (res) => {
        this.businessLogoDeleteLoader = false
        console.log('businessLogoDelete res', res['data'].businessLogoDelete);
        let returnVal = res['data'].businessLogoDelete
        if (returnVal) {
          this.modalRef.hide();
          this.photo = ''
          this.img = profilePicture('.profile', '', '')
          this.toaster.showSuccess('Profile Photo Deleted Successfully.', 'Photo Delete')
        } else {
          this.toaster.showError('Something Went Wrong.', 'Try Again')
        }

      }, (err) => {
        this.businessLogoDeleteLoader = false
        console.log('businessLogoDelete err', err);
        this.toaster.showError('Something Went Wrong.', 'Try Again')
      }
    )
  }

  userLogoDeleteFun() {
    this.userLogoDeleteLoader = true
    this.userLogoDelete.mutate({
      user_id: this.selecteduserId
    }).subscribe(
      (res) => {
        this.userLogoDeleteLoader = false
        console.log('userLogoDelete res', res['data'].userLogoDelete);
        let returnVal = res['data'].userLogoDelete
        if (returnVal) {
          this.modalRef.hide();
          this.userLogo = ''
          this.getAllUsers()
          this.img = profilePicture('.profile', '', '')
          this.toaster.showSuccess('Profile Photo Deleted Successfully.', 'Photo Delete')
        } else {
          this.toaster.showError('Something Went Wrong.', 'Try Again')
        }
      }, (err) => {
        this.userLogoDeleteLoader = false
        console.log('userLogoDelete err', err);
        this.toaster.showError('Something Went Wrong.', 'Try Again')
      }
    )
  }

  storeLogoDeleteFun() {
    this.storeLogoDeleteLoader = true
    this.storeLogoDelete.mutate({
      store_id: this.storeSelectedId
    }).subscribe(
      (res) => {
        this.storeLogoDeleteLoader = false
        console.log('storeLogoDelete res', res['data'].storeLogoDelete);
        let returnVal = res['data'].storeLogoDelete
        if (returnVal) {
          this.modalRef.hide();
          this.storeLogo = ''
          this.img = profilePicture('.profile', '', '')
          this.getAllStores()
          this.toaster.showSuccess('Profile Photo Deleted Successfully.', 'Photo Delete')
        } else {
          this.toaster.showError('Something Went Wrong.', 'Try Again')
        }
      }, (err) => {
        this.storeLogoDeleteLoader = false
        console.log('storeLogoDelete err', err);
        this.toaster.showError('Something Went Wrong.', 'Try Again')
      }
    )
  }

  //========================================== End Logo's Delete Methods ==================================//

  //========================================== Start User Pin Genration ==================================//

  newPinCode = ''
  pinShareType = 'sms'
  userPincodeLoader = false
  userPincode2Loader = false
  codeGenerate = false
  genrateBtnDisable = false
  generatePinCodeFun() {
    this.userPincodeLoader = true
    this.resendPinCode = false
    this.checkResend = false
    this._generatePinCode.watch().valueChanges.subscribe(
      (res) => {
        this.codeGenerate = true
        this.userPincodeLoader = false
        console.log('generatePinCode res', res['data'].generatePinCode);
        this.newPinCode = String(res['data'].generatePinCode)
      }, (err) => {
        this.userPincodeLoader = false
        let message = err.graphQLErrors[0].message
        console.log('generatePinCode err', err);
      }
    )
  }

  updatePinSahreMethod(type) {
    this.pinShareType = type
  }

  createAndSharePinCodeFun() {
    this.confirmPassword4PinLoader = true
    this.createPinCode.mutate({
      input: {
        userID: this.selecteduserId,
        pincode: parseFloat(this.newPinCode),
        method: this.pinShareType == 'email' ? AllowMethodPhoneVerify.Email : AllowMethodPhoneVerify.Sms,
        businessLocation: window.localStorage.getItem('location_id'),
        password: this.confirmPassword4Pin
      }
    }).subscribe(
      (res) => {
        this.pinShareCheck=false
        this.codeGenerate = false
        this.confirmPassword4PinLoader = false
        console.log(' res', res['data'].createPinCode);
        let returnVal = res['data'].createPinCode
        if (returnVal) {
          this.modalService.hide(1);
          this.toaster.showSuccess('Your Pin Code Shared Successfully', '')
        }
      }, (err) => {
       this.confirmPassword4PinLoader=false
       let message=err.graphQLErrors[0].message
       let code=err.graphQLErrors[0].code
       if(code=='incorrect_password'){
        this.confirmPassword4PinError=true
       }
       console.log(' err', message);
      }
    )
  }

  confirmPassword4PinErrorReset() {
    this.confirmPassword4PinError = false
    this.confirmPassword4PinEmpty = false

  }

  getUserPinCodeByIdFun() {
    this.getUserPinCodeById.watch({
      userId: this.selecteduserId,
    }).valueChanges.subscribe(
      (res) => {
        console.log('getUserPinCodeById res', res['data'].getUserPinCodeById);
        let returnVal = res['data'].getUserPinCodeById
        if (returnVal != null) {
          this.newPinCode = String(returnVal.pincode)
          this.sharePinCode = false
          this.updatePinCode = false
          this.generatePinCode = false
          this.resendPinCode = true
        } else {
          this.sharePinCode = false
          this.updatePinCode = false
          this.generatePinCode = true
          this.resendPinCode = false
        }
      }, (err) => {
        let message = err.graphQLErrors[0].message
        console.log('getUserPinCodeById err', message);
      }
    )
  }

  userPinCodeResendFun() {
    this.confirmPassword4PinLoader = true
    this.userPinCodeResend.mutate({
      userID: this.selecteduserId,
      method: this.pinShareType == 'email' ? AllowMethodPhoneVerify.Email : AllowMethodPhoneVerify.Sms,
      password: this.confirmPassword4Pin
    }).subscribe(
      (res) => {
        this.pinShareCheck=false
        this.codeGenerate = true
        this.confirmPassword4PinLoader = false
        this.sharePinCode = false
        this.generatePinCode = false
        this.resendPinCode = true
        this.updatePinCode = false
        this.checkResend = false
        this.modalService.hide(1);
        console.log('generatePinCode res', res['data'].userPinCodeResend);
        this.newPinCode = String(res['data'].userPinCodeResend)
        this.toaster.showSuccess('Your Pin Code Shared Successfully', '')
      }, (err) => {
        this.confirmPassword4PinLoader = false
        let code = err.graphQLErrors[0].code
        if (code == 'incorrect_password') {
          this.confirmPassword4PinError = true
        }
        //this.toaster.showError('Something Went Wrong.', 'Try Again')
        //let message=err.graphQLErrors[0].message
        console.log('generatePinCode err', err);
      }
    )
  }

  openSharePinCode() {
    this.newPinCode = ''
    this.sharePinCode = true
    this.generatePinCodeFun()
  }

  checkResend = false
  reSendPin() {
    this.sharePinCode = true
    this.checkResend = true
  }

  closeSharePinModel() {
    this.modalRef.hide();

  }

  regenerateCode() {
    this.updatePinCode = true
    this.sharePinCode = true
    this.resendPinCode = false
    this.generatePinCodeFun()
  }

  closeSharePinCode() {
    if (this.confirmPassword4Pin == '') {
      this.confirmPassword4PinEmpty = true
      return
    }
    if (this.checkResend == true) {
      this.userPinCodeResendFun()
    } else {
      this.createAndSharePinCodeFun()
    }
    this.sharePinCode = false
    this.generatePinCode = false
    this.resendPinCode = true
    this.updatePinCode = false
  }

  openUpdatePinCode() {
    this.sharePinCode = false
    this.resendPinCode = false
    this.updatePinCode = true
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

  confirmPassword4Pin = ''
  confirmPassword4PinLoader = false
  confirmPassword4PinError = false
  confirmPassword4PinEmpty = false
  pinShareCheck=false
  pinLessThenSix=false
  uniquePinCodeVerifyFun(template: TemplateRef<any>, cls) {
    if(this.newPinCode.length<6)
    {
      this.pinLessThenSix=true
      return  
    }
    this.pinLessThenSix=false
    this.userPincode2Loader=true
    this.uniquePinCodeVerify.watch({
      pincode:parseFloat(this.newPinCode)
  }).valueChanges.subscribe(
      (res) => {
      console.log('uniquePinCodeVerify res', res['data'].uniquePinCodeVerify);
       let returnVal  = res['data'].uniquePinCodeVerify
       this.userPincode2Loader=false
       if(returnVal==true){
        this.pinShareCheck=true
       }else{
        this.pinShareCheck=false
        this.confirmPassword4Pin = ''
        this.confirmPassword4PinLoader = false
        this.confirmPassword4PinError = false
        this.confirmPassword4PinEmpty = false
        this.modalRef = this.modalSecondService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
       }
      }, (err) => {
        this.userPincode2Loader=false
        let message=err.graphQLErrors[0].message
        if(message='pin code already exist please choose alternate'){
          this.pinShareCheck=true
        }
        console.log('uniquePinCodeVerify err', message);
      }
  )
  }

  endTheError(){
    this.pinShareCheck=false
    this.pinLessThenSix=false
  }

 //========================================== End User Pin Genration ==================================//
 //========================================== Start Cash Register==================================//

 cashRegisterForm: any
 cashRegisterSubmitted = false
 initializeCashRegisterForm() {
  this.update="Add"
  this.selectRegisterStatus = 'Select Status'
   this.cashRegisterSubmitted = false
   this.cashRegisterForm = this.formbulider.group({
     name: ['', [Validators.required]],
     status: [''],
     opening_amount: ['', [Validators.required]],
     closing_amount: ['', [Validators.required]],
    // closed_at: ['', [Validators.required]],
     location_id: [window.localStorage.getItem('location_id'), [Validators.required]]
   }
   );
 }

 get fCashRegisterForm() {
   return this.cashRegisterForm.controls;
 }

 cashRegisterLoader = false
 cashRegisterCreateFun() {
   if (this.cashRegisterForm.invalid) {
     this.cashRegisterSubmitted = true
     return;
   } else if(this.selectRegisterStatus == 'Select Status'){
     this.cashRegisterSubmitted=true
           return
   } else {
     let cashRegisterFormData = JSON.parse(JSON.stringify(this.cashRegisterForm.value))
     cashRegisterFormData['opening_amount']=  parseFloat(cashRegisterFormData['opening_amount'])
     cashRegisterFormData['closing_amount']=  parseFloat(cashRegisterFormData['closing_amount'])
     if(this.update=="Update"){
      this.cashRegisterUpdateFun(cashRegisterFormData)
      return
    }
     this.cashRegisterLoader = true
     this.createCashRegister.mutate({
       input: cashRegisterFormData
     }).subscribe(
       (res) => {
         this.cashRegisterLoader = false
         this.cashRegisterSubmitted = false
         this.modalService.hide(1)
         this.initializeCashRegisterForm()
         this.getAllCashRegistrarOfLocation(this.storeSelected)
         console.log('cashRegister res', res['data'].createCashRegister);
         let returnVal = res['data'].createCashRegister
         if (returnVal) {
           this.toaster.showSuccess('Cash Register Created Successfully', 'Register Created')
         } else {
          this.toaster.showError('Something Went Wrong.', 'Try Again')         }
       }, (err) => {
         this.cashRegisterLoader = false
         this.cashRegisterSubmitted = false
         let message = err.graphQLErrors[0].message
         console.log('cashRegister err', err);
         this.toaster.showError('Something Went Wrong.', 'Try Again')
       })
   }
 }

 changeRegisterStatusValue(val) {
  this.selectRegisterStatus = val
  this.cashRegisterForm.controls['status'].setValue(val)

 }

 closeRegisterModel(){
  this.cashRegisterSubmitted=false
  this.modalService.hide(1);
 }

 update="Add"
 model_addRegister(template: TemplateRef<any>, cls) {
  this.initializeCashRegisterForm()
  this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_UpdateRegister(template: TemplateRef<any>, cls,register) {
    this.update="Update"
    this.initializeUpdateCashRegisterForm(register)
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  model_deleteRegister(template: TemplateRef<any>, cls,register){
    this.selectedRegID=register._id
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  selectedRegID=''
  initializeUpdateCashRegisterForm(register) {
    this.update="Update"
    this.selectedRegID=register._id
    this.selectRegisterStatus = register.status==null||register.status==""?'Select Status':register.status
     this.cashRegisterSubmitted = false
     this.cashRegisterForm = this.formbulider.group({
       name: [register.name, [Validators.required]],
       status: [register.status],
       opening_amount: [register.opening_amount, [Validators.required]],
       closing_amount: [register.closing_amount, [Validators.required]],
      // closed_at: [register.closed_at, [Validators.required]],
       location_id: [window.localStorage.getItem('location_id'), [Validators.required]]
     }
     );
   }

 cashRegisterUpdateFun(cashRegisterFormData) {
      this.cashRegisterLoader = true
      this.updateCashRegister.mutate({
        id:this.selectedRegID,
        input: cashRegisterFormData
      }).subscribe(
        (res) => {
          this.cashRegisterLoader = false
          this.cashRegisterSubmitted = false
          this.modalService.hide(1)
          this.initializeCashRegisterForm()
          console.log('cashRegister res', res['data'].updateCashRegister);
          let returnVal = res['data'].updateCashRegister
          this.getAllCashRegistrarOfLocation(this.storeSelected)
          if (returnVal) {
            this.toaster.showSuccess('Cash Register Updated Successfully', 'Register Updated')
          } else {
          this.toaster.showError('Something Went Wrong.', 'Try Again') 
               }
        }, (err) => {
          this.cashRegisterLoader = false
          this.cashRegisterSubmitted = false
          let message = err.graphQLErrors[0].message
          console.log('cashRegister err', err);
          this.toaster.showError('Something Went Wrong.', 'Try Again') 
        })
    }
    
  deleteRegister() {
    this.deleteCashRegister.mutate({
      id: this.selectedRegID
    }).subscribe(
      (res) => {
          console.log('deleteCashRegister res', res['data'].deleteCashRegister);
           let returnVal  = res['data'].deleteCashRegister
           if(returnVal){
            this.getAllCashRegistrarOfLocation(this.storeSelected)
            this.toaster.showSuccess('Cash Register Delete Successfully', 'Register Delete')
           }else{
            this.toaster.showError('Something Went Wrong.', 'Try Again')
           }
      }, (err) => {
      let message=err.graphQLErrors[0].message
      this.toaster.showError('Something Went Wrong.', 'Try Again')
          console.log('deleteCashRegister err', message);
      }
  )
    }

  loadCharts(){
    Highcharts.chart('salesChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 12000,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Sales',
        showInLegend: false,
        data: [
          12000, 35000, 23000, 51000, 29000, 17000
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('purchaseChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 17287,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Purchase',
        showInLegend: false,
        data: [
          21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
          10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
          5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('inventoryChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 1436,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Inventory',
        showInLegend: false,
        data: [
          1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
          20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
          26662, 26956, 27912, 28999, 28965, 27826, 25579, 19313, 94113, 19331
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('incomeChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 1005,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Imcome',
        showInLegend: false,
        data: [
            369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
            20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
            26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
            
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('balanceChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 150,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Balance',
        showInLegend: false,
        data: [
          5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
          1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
          11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
          30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000
        ], 
        color: '#5bdcc0'
      }]
    });
    this.cdr.detectChanges()
  }
  selectRoleUser = true
  selectRolesList = false
  permissionBox = false
  enablePermissionBox(){
    this.modalRef.hide();
    this.permissionBox = true
  }
  savePermissionBox(){
    this.permissionBox = false
  }
  selectRolesListBtn(){
    this.selectRoleUser = false
    this.selectRolesList = true
  }
  backtoselectRoleUser(){
    this.selectRolesList = false
    this.selectRoleUser = true
  }
}