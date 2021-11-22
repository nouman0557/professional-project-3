import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import {SaleCartService} from 'src/app/services/create-sale/sale-cart.service'
import { 
GetUserDetailGQL, UserClockOutBeforeLogOutGQL, CashRegistersOfLocationGQL,
OpenAndCloseCashRegisterGQL, 
UpdateBusinessUserGQL,
UserStatus,
UserLogoUploadGQL,
UserLogoDeleteGQL,
UniqueUserEmailGQL,
CheckUserEmailGQL,
GetCountriesGQL,
OwnerPasswordUpdateGQL,
GeneratePinCodeGQL,
UserPinCodeResendGQL,
CreatePinCodeGQL,
GetUserPinCodeByIdGQL,
AllowMethodPhoneVerify,
UniquePinCodeVerifyGQL
} from "src/app/generated/graphql";
import { UserBusinessLocationsGQL } from 'src/app/generated/graphql';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../account/register/_helper/must-match.validator';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { CommonService } from 'src/app/services/common/common.service';
declare function profilePicture(op1, op2, op3): any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HeaderComponent implements OnInit {
  baseUrl = EnvironmentUrl.Images
  // baseUrl = 'http://3.227.161.233:5001/upload/'
  itemsPerSlide = 8;
  singleSlideOffset = true;
  noWrap = true;
  createSaleActive = false
  $headerData: any
  constructor(
    private modalService: BsModalService,
    private UserBusinessLocations: UserBusinessLocationsGQL,
    private getUserDetail: GetUserDetailGQL,
    private userClockOutBeforeLogOut: UserClockOutBeforeLogOutGQL,
    private router: Router,
    private toaster: ToasterService,
    private CashRegistersOfLocation: CashRegistersOfLocationGQL,
    private openAndCloseCashRegister: OpenAndCloseCashRegisterGQL,
    private formbulider: FormBuilder,
    private updateBusinessUser: UpdateBusinessUserGQL,
    private userLogoUpload: UserLogoUploadGQL,
    private userLogoDelete : UserLogoDeleteGQL,
    private getCountriesGQL: GetCountriesGQL,
    private uniqueUserEmailGQL: UniqueUserEmailGQL,
    private ownerPasswordUpdate: OwnerPasswordUpdateGQL,
    private modalSecondService: BsModalService,
    private _generatePinCode: GeneratePinCodeGQL,
    private createPinCode : CreatePinCodeGQL,
    private getUserPinCodeById: GetUserPinCodeByIdGQL,
    private userPinCodeResend: UserPinCodeResendGQL,
    private uniquePinCodeVerify : UniquePinCodeVerifyGQL,
    private _saleCart: SaleCartService,
    private commonService : CommonService


    ) {
  }
  userDetail = {}
  modalRef: BsModalRef;
  allStores = []
  storeDetail:any

  ngOnInit() {
    this.$headerData = this.commonService.headerData$.subscribe((res) => {
      if(res){
        this.storeDetail = JSON.parse(CryptoJS.AES.decrypt(window.localStorage.getItem('store'), 'luna').toString(CryptoJS.enc.Utf8));
      }else{
        this.userInfo() 
      }
    });
    this.storeDetail = JSON.parse(CryptoJS.AES.decrypt(window.localStorage.getItem('store'), 'luna').toString(CryptoJS.enc.Utf8));
    console.log('store detail',this.storeDetail);
    this.userInfo()
    this.getStores()
    this.getAllCountries()
    this.getAllCashRegister() 
  }

  userInfo() {
    this.getUserDetail.watch().valueChanges.subscribe(
      (res) => {
        this.userDetail = res['data'].me
        if(this.userDetail != null) {
          console.log('user detail is',this.userDetail);
          // window.localStorage.setItem('User_Id', this.userDetail['id']);
          window.localStorage.setItem('Photo', this.userDetail['avatar_location']);
          this.userDetail['storeName'] = window.localStorage.getItem('storeName');
          this.userDetail['storeID'] = window.localStorage.getItem('storeID');
          console.log("store name inside user detail added", this.userDetail)
          this.initializeEditUser(this.userDetail)
          return 
        }
        localStorage.removeItem('location_id')
        localStorage.removeItem('token')
        this.router.navigate(['/Login'])
      }, (err) => {
        localStorage.removeItem('location_id')
        localStorage.removeItem('token')
        this.router.navigate(['/Login'])
        console.log('User info', err);
      }
    )
  }

  signOutLoader=false
  signOutLoader2=false
  signOutUser() {
    this.signOutLoader2=true
    this.userClockOutBeforeLogOut.mutate({
      is_check_clockIn:false
    }).subscribe(
      (res) => {
          console.log(' res', res);
          this.signOutLoader2=false
           let returnVal  = res['data'].userClockOutBeforeLogOut
           this.clearServiceData()
           if(returnVal){
            localStorage.removeItem('StartModel');
            localStorage.removeItem('location_id');
            localStorage.removeItem('user_id')
            localStorage.removeItem('User_Id');
            localStorage.removeItem('token');
            this.router.navigate(['/Login']);
           } else{
            this.toaster.showError('Clock out Problem, Please try agin','Not Clock out')
            localStorage.removeItem('StartModel');
            this.router.navigate(['/Login']);
             return
           }
      }, (err) => {
        this.signOutLoader2=false
          console.log(' err', err);
          localStorage.removeItem('StartModel');
          this.router.navigate(['/Login']);
          // this.toaster.showError(err,'Not Clock out')
        } )
  }

  clearServiceData(){
    this._saleCart.onDiscardOrder()
  }

  chooseStore = localStorage.getItem('storeName');
  changeValue(type, val) {
    this[type] = val
  }

  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
  }

  openSignOutModal(template: TemplateRef<any>, cls) {
    this.signOutLoader=true
    this.userClockOutBeforeLogOut.mutate({
      is_check_clockIn:true
    }).subscribe(
      (res) => {
          console.log(' res', res);
          this.signOutLoader=false
           let returnVal  = res['data'].userClockOutBeforeLogOut
           this.clearServiceData()
           if(returnVal){
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
           } else{
            localStorage.removeItem('StartModel');
            localStorage.removeItem('location_id');
            localStorage.removeItem('user_id')
            localStorage.removeItem('User_Id');
            localStorage.removeItem('token');
            this.router.navigate(['/Login']); 
            return
           }
      }, (err) => {
        this.signOutLoader=false
          console.log(' err', err);
          this.toaster.showError('Something went wrong, Please try agin','Sign Out')
      } )
  }

  closeModel() {
    this.modalRef.hide();
  }

  model_cashRegister(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false});
  }

  userProfile = false;
  openUserProfile() {
    // this.notificationDrop=false
    this.commonService.setNotificationPopupValue(false)
    this.commonService.setUserProfilePopupValue(!this.commonService.getUserProfilePopupValue())
    // this.userProfile = !this.userProfile;
  }
  
  notificationDrop = false;
  openNotification() {
  // this.userProfile=false
  this.commonService.setUserProfilePopupValue(false)  
  this.commonService.setNotificationPopupValue(!this.commonService.getNotificationPopupValue())
  // this.notificationDrop = !this.notificationDrop;

  }  
  // this.commonService.setUserProfilePopupValue(false)
  // this.commonService.setNotificationPopupValue(false)

  getStores() {
    this.UserBusinessLocations.watch().valueChanges.subscribe((response) => {
      this.allStores = response['data'].userBusinessLocations
    },
      (err) => {
        localStorage.removeItem('location_id')
        localStorage.removeItem('token')
        this.router.navigate(['/Login'])
        console.log('Error from GQL', err)
      }
    )
  }

  newId: string
  sName: string
  newStore=[]
  changeStore(val, template: TemplateRef<any>, cls) {
    let location_id = localStorage.getItem('location_id')
    if (val._id != location_id) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
      this.newId = val._id
      this.newStore=val
      this.sName = val.store_name
    }
  }
  
  //For the Store Changing and all the data
  // ccording to the selected store base on ID
  localcookie: any
  yesChangeStore() {
    localStorage.setItem('location_id', this.newId);
    localStorage.setItem('storeName',this.sName);
    this.localcookie = CryptoJS.AES.encrypt(JSON.stringify(this.newStore), 'luna');
    window.localStorage.setItem('store', this.localcookie);
    this.chooseStore = this.sName
    this.modalRef.hide();
    this.clearServiceData();
    // let currentURL = window.location.href;
    // if(currentURL=='http://localhost:4200/Pointofsale/Home'){
    //   this.ngOnInit()
    // }else{
    //   this.router.navigate(['/Pointofsale/Home'])
    // } 
    window.location.replace("/Pointofsale/Home");
    setTimeout(() => {
      window.location.reload();
      },50)
  }

//========================================== Start Register Change Session  ==================================//
cahReegisterData=[]
selectedRegisterId=''
getRegisterLoader=false
getAllCashRegister() {
  this.getRegisterLoader=true
    this.selectedRegisterId=window.localStorage.getItem('RegisterId')
    this.CashRegistersOfLocation.watch({
     ID: window.localStorage.getItem('location_id')
   }
   ).valueChanges.subscribe((response) => {
    this.getRegisterLoader=false
     if (response != null) {
       this.cahReegisterData = response['data']['cashRegistersOfLocation'];
       console.log('final drawers are', this.cahReegisterData);
     }
   },
     (err) => {
      this.getRegisterLoader=false
       console.log('Error from GQL', err)
     }
   )
}

chageRegister(register){
  this.selectedRegisterId=register._id
  this.newRegiter=register
}

newRegiter=[]
selectCashRegister(){
  this.getRegisterLoader=true
this.openAndCloseCashRegister.mutate({
  openCashRegisterId :this.newRegiter['_id'],
  locationId: window.localStorage.getItem('location_id'),
  closeCashRegister  :window.localStorage.getItem('RegisterId')
    }).subscribe(
     (res) => {
      this.getRegisterLoader=false
      let returnVal  = res['data'].openAndCloseCashRegister
      if(returnVal){
        this.modalRef.hide();
        this.selectedRegisterId=this.newRegiter['_id']
        window.localStorage.setItem('RegisterId', this.newRegiter['_id']);
        this.toaster.showSuccess('Cash Register Changed Successfully', '')
      }
       }, (err) => {
        this.getRegisterLoader=false
        this.toaster.showError('Something Went Wrong.', 'Try Again')
       let message=err.graphQLErrors[0].message
        console.log(' err', message);
    }
)

}
//========================================== End Register Change Session  ==================================//
//========================================== Start User Profile Update Session  ==================================//
selectusrRole = 'Select Role'
userlogo = ''
selectusrCountry = 'Select Country'
selectusrStatus = 'Select Status'
editUserForm: FormGroup;
userLogo = ''
selecteduserId = ''
model_editUser(template: TemplateRef<any>, cls, user) {
  this.userProfile = !this.userProfile;
  this.initializeEditUser(user)
  this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
}

userSelected = {}
initializeEditUser(user) {
  this.codeGenerate=false
   this.selectusrRole = user.roles[0] == '' || user.roles[0] == undefined ? 'Select Role' : user.roles[0]
   this.userSelected = user
   this.selecteduserId = user.id
   this.initializePasswordUpdateForm(user.id)
   this.getUserPinCodeByIdFun()
   this.userlogo =user.avatar_location==null||user.avatar_location==""?"":this.baseUrl+ user.avatar_location
   console.log('user to edit is', user);
   // this.selectusrStatus = user.status=="in_active"?"InActive":"Active"
   this.selectusrStatus =user.status==null?'Select Status':user.status=="in_active"?"InActive":"Active"
   this.selectusrCountry = user.Country==null?"Select Country":user.Country.name==null?'Select Country':user.Country.name
   let id=user.Country==null?'':user.Country._id
   let BLid=user.BusinessLocation==null?window.localStorage.getItem('location_id'):user.BusinessLocation._id
   let Bid=user.business_id==null?window.localStorage.getItem('BusinessId'):user.business_id._id
   let secondNameArray =  user['last_name'].split('(');
   this.editUserForm = this.formbulider.group({
     email: [user.email, [Validators.required,
     Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
     first_name: [user.first_name, [Validators.required]],
     last_name: [secondNameArray[0], [Validators.required]],
     phone: [user.phone, [Validators.required]],
     status: [user.status],
     address_1: [user.address_1],
     address_2: [user.address_2],
     country: [id, [Validators.required]],
     city: [user.city],
     state: [user.state],
     zipcode: [user.zipcode],
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
      //  this.getAllUsers()
       this.updateUserLoader = false
       console.log('user update res', res['data'].updateBusinessUser);
       this.userDetail=[]
       this.userInfo()
      //  this.userDetail = userUpdateInput
      //  this.userDetail['Country'] = []
      //  this.userDetail['Country']['_id'] = this.userDetail['Country']
      //  this.userDetail['Country']['name'] = this.selectusrCountry
      //  this.userDetail['avatar_location']=window.localStorage.getItem('Photo');
       this.toaster.showSuccess('User updated successfully', 'User Updated')
      //  this.modalService.hide(1)
     }, (err) => {
       this.updateUserLoader = false
       console.log('error on updating user', err);
       this.toaster.showError('something went wrong while updating user', 'User Update')
     }
   )
 }
 
 toDataURL = url => fetch(url, {
  method: 'GET',
  headers: { 'Access-Control-Allow-Origin': '*'}
   })
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.onloadend = () => resolve(reader.result);
 reader.onerror = reject;
 reader.readAsDataURL(blob);
}))

img: any
async model_ProfilePhoto(template: TemplateRef<any>, cls,photo) {
 this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
 if( photo!= undefined && photo!= ""){
   this.toDataURL(photo)
   .then(result => {
     this.img = profilePicture('.profile', result , '')
       }
   );
 }else{
   this.img = profilePicture('.profile', '' , '')
 }
}

saveUserPhotoLoader = false
saveUserPhoto() {
  this.userlogo=''
  console.log('this.selectedUser', this.selecteduserId);
  if (this.img.getAsDataURL() === 'data:image/png;base64,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') {
    this.toaster.showError('Please select image', '')
    return
  }
  this.userlogo = this.img.getAsDataURL()
  //this.userlogo = this.img.getAsDataURL()
  this.userLogoUpload.mutate({
    user_id: this.selecteduserId,
    logo: this.img.getAsDataURL()
  }).subscribe(
    (res) => {
      console.log('businessLogoUpload res', res['data'].userLogoUpload);
      if (res['data'].userLogoUpload != null) {
        this.userDetail['avatar_location']=res['data'].userLogoUpload
        window.localStorage.setItem('Photo', this.userDetail['avatar_location']);
        this.saveUserPhotoLoader = false
        this.toaster.showSuccess('Picture Updated Successfully', '')
      }
    }, (err) => {
      this.saveUserPhotoLoader = false
      this.toaster.showError('Something went worng, Try agin', 'Logo Not Updated')
      console.log('businessLogoUpload err', err);
    }
  )
  this.modalRef.hide();
}

logoError = false
imgData: File;
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

isObjectEmpty(Obj) {
  for (var key in Obj) {
    if (Obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

userLogoDeleteLoader=false
userLogoDeleteFun(){
  this.userLogoDeleteLoader=true
  this.userLogoDelete.mutate({
    user_id: this.selecteduserId
  }).subscribe(
    (res) => {
      this.userLogoDeleteLoader=false
        console.log('userLogoDelete res', res['data'].userLogoDelete);
         let returnVal  = res['data'].userLogoDelete
         if(returnVal){
          this.modalRef.hide();
          this.userLogo=''
          // this.getAllUsers()
          this.img = profilePicture('.profile', '' , '')
          this.toaster.showSuccess('Profile Photo Deleted Successfully.', 'Photo Delete')
          window.localStorage.removeItem('Photo')
          this.userDetail['avatar_location']=''
         } else{
          this.toaster.showError('Something Went Wrong.', 'Try Again')
         } 
    }, (err) => {
      this.userLogoDeleteLoader=false
        console.log('userLogoDelete err', err);
        this.toaster.showError('Something Went Wrong.', 'Try Again')
    }
  )
}

closePopup() {
  this.modalRef.hide();
}

changeUserRoleValue(val) {
  this.selectusrRole = val
}

changeUserStatusValue(val) {
  this.selectusrStatus = val
}

changeCountry(val, id, type) {
  this[type].controls['country'].setValue(id)
  this.selectusrCountry = val
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

closeUserModel() {
  this.modalService.hide(1);
}

cleanObject(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName];
    }
  }
  return obj
}

emailError = false
verifyUserEmail(type, id) {
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

 //-------------- Change  Password -------------------//

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
 oldPasswordNotCorrect=false
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
         this.passwordUpdateLoader = false
         this.passwordUpdateSubmitted = false
        //  this.initializePasswordUpdateForm(this.businessInfoData['owner_id'].id)
         console.log('ownerPasswordUpdate res', res['data'].OwnerPasswordUpdate);
         let returnVal = res['data'].OwnerPasswordUpdate
         if (returnVal) {
          this.initializePasswordUpdateForm(this.selecteduserId)
           this.toaster.showSuccess('Password Updated Successfully', 'Password Updated')
         } else {
           this.toaster.showError('Incorrect password entered. ', 'Password Not Updated')
         }
       }, (err) => {
         this.passwordUpdateLoader = false
         this.passwordUpdateSubmitted = false
         let message=err.graphQLErrors[0].message
         if(message=='User old Password does not match'){
           this.oldPasswordNotCorrect=true
         }
        //  this.initializePasswordUpdateForm(this.businessInfoData['owner_id'].id)
        //  this.toaster.showError('Incorrect password entered. ', 'Password Not Updated')
         console.log('ownerPasswordUpdate err', err);
       })
   }
 }

 oldPasswordNotCorrectFun(){
  this.oldPasswordNotCorrect=false
 }
 //-------------- End Change  Password -------------------//

 //========================================== Start User Pin Genration ==================================//

 newPinCode=''
 pinShareType='sms'
 userPincodeLoader=false
 userPincode2Loader=false
 codeGenerate=false
 genrateBtnDisable=false
 resendPinCode = false
 generatePinCodeFun(){
   this.userPincodeLoader=true
   this.resendPinCode=false
   this.checkResend=false
   this._generatePinCode.watch().valueChanges.subscribe(
     (res) => {
       this.codeGenerate=true
       this.userPincodeLoader=false
         console.log('generatePinCode res', res['data'].generatePinCode);
          this.newPinCode= String(res['data'].generatePinCode)
     }, (err) => {
       this.userPincodeLoader=false
            let message=err.graphQLErrors[0].message
         console.log('generatePinCode err', err);
     }
 )
 }

 updatePinSahreMethod(type){
   this.pinShareType=type
 }

 createAndSharePinCodeFun(){
   this.confirmPassword4PinLoader=true
   this.createPinCode.mutate({
   input: {
     userID: this.selecteduserId,
     pincode:parseFloat(this.newPinCode),
     method: this.pinShareType=='email'?AllowMethodPhoneVerify.Email:AllowMethodPhoneVerify.Sms,
     businessLocation: window.localStorage.getItem('location_id'),
     password: this.confirmPassword4Pin
   }
    }).subscribe(
     (res) => {
       this.codeGenerate=false
       this.confirmPassword4PinLoader=false
         console.log(' res', res['data'].createPinCode);
          let returnVal  = res['data'].createPinCode
          if(returnVal){
          //  this.modalService.hide(1);
          this.modalRef.hide();
          this.toaster.showSuccess('Your Pin Code Shared Successfully', '')
          }
     }, (err) => {
      this.confirmPassword4PinLoader=false
      let message=err.graphQLErrors[0].message
      let code=err.graphQLErrors[0].code
      if(code=='incorrect_password'){
       this.confirmPassword4PinError=true
      }
     //  this.toaster.showError('Something Went Wrong.', 'Try Again')
      console.log(' err', message);
     }
 )
 }

 confirmPassword4PinErrorReset(){
   this.confirmPassword4PinError=false
   this.confirmPassword4PinEmpty=false

 }

 sharePinCode = false
 updatePinCode = false
 generatePinCode = true
 getUserPinCodeByIdFun(){
       this.getUserPinCodeById.watch({
         userId: this.selecteduserId,
     }).valueChanges.subscribe(
         (res) => {
             console.log('getUserPinCodeById res', res['data'].getUserPinCodeById);
              let returnVal  = res['data'].getUserPinCodeById
              if(returnVal!=null){
               this.newPinCode=String(returnVal.pincode)
               this.sharePinCode = false
               this.updatePinCode = false
               this.generatePinCode = false
               this.resendPinCode = true
              }else{
               this.sharePinCode = false
               this.updatePinCode = false
               this.generatePinCode = true
               this.resendPinCode = false
             }
         }, (err) => {
     let message=err.graphQLErrors[0].message
             console.log('getUserPinCodeById err', message);
         }
     )
  }

 userPinCodeResendFun(){
   this.confirmPassword4PinLoader=true
   this.userPinCodeResend.mutate({
     userID: this.selecteduserId,
     method: this.pinShareType=='email'?AllowMethodPhoneVerify.Email:AllowMethodPhoneVerify.Sms,
     password: this.confirmPassword4Pin
   }).subscribe(
     (res) => {
       this.codeGenerate=true
       this.confirmPassword4PinLoader=false
       this.sharePinCode=false
       this.generatePinCode=false
       this.resendPinCode=true
       this.updatePinCode=false
       this.checkResend=false
      this.modalRef.hide();
       console.log('generatePinCode res', res['data'].userPinCodeResend);
      //  this.newPinCode= String(res['data'].userPinCodeResend)
       this.toaster.showSuccess('Your Pin Code Shared Successfully', '')
     }, (err) => {
       this.confirmPassword4PinLoader=false
       let code=err.graphQLErrors[0].code
       if(code=='incorrect_password'){
        this.confirmPassword4PinError=true
       }
      //this.toaster.showError('Something Went Wrong.', 'Try Again')
     //let message=err.graphQLErrors[0].message
         console.log('generatePinCode err', err);
     }
 )
 }

 openSharePinCode(){
   this.newPinCode=''
   this.sharePinCode=true
   this.generatePinCodeFun()
 }

 checkResend=false
 reSendPin(){
   this.sharePinCode=true
   this.checkResend=true
 }

 closeSharePinModel(){
   this.modalRef.hide();
 }

 regenerateCode(){
   this.updatePinCode = true
   this.sharePinCode=true
   this.resendPinCode=false
   this.pinShareCheck=false
   this.pinLessThenSix=false
   this.generatePinCodeFun()
 }

 closeSharePinCode(){
   if(this.confirmPassword4Pin==''){
     this.confirmPassword4PinEmpty=true
     return
   }
   if(this.checkResend){
     this.userPinCodeResendFun()
   } else {
     this.createAndSharePinCodeFun()
   }
   this.sharePinCode=false
   this.generatePinCode=false
   this.resendPinCode=true
   this.updatePinCode=false
 }

 openUpdatePinCode(){
   this.sharePinCode=false
   this.resendPinCode=false
   this.updatePinCode=true
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

 reSendPinFun(template: TemplateRef<any>, cls){
  this.checkResend=true
  this.confirmPassword4Pin=''
  this.confirmPassword4PinError=false
  this.modalRef = this.modalSecondService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
 }

 uniquePinCodeVerifyFun(template: TemplateRef<any>, cls) {
   this.confirmPassword4Pin=''
   this.confirmPassword4PinError=false
   let lenth=this.newPinCode.length
   if(lenth<6)
   {
     this.pinShareCheck=false
     this.pinLessThenSix=true
     return  
   }
   this.pinLessThenSix=false
   this.pinShareCheck=false
   this.userPincode2Loader=true
   this.uniquePinCodeVerify.watch({
     pincode:parseFloat(this.newPinCode)
 }).valueChanges.subscribe(
     (res) => {
     console.log('uniquePinCodeVerify res', res['data'].uniquePinCodeVerify);
      let returnVal  = res['data'].uniquePinCodeVerify
      this.userPincode2Loader=false
      if(returnVal){
       this.pinShareCheck=true
       return
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

//========================================== End User Profile Update Session  ==================================//
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
  }
}