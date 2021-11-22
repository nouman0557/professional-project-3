import { Component, OnInit, TemplateRef, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserPinCodeVerifyGQL, UserClockedInGQL } from "src/app/generated/graphql";
import { CommonService } from 'src/app/services/common/common.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
  time = ''
  timer;
  hours = '00'
  min = '00'
  i = 0
  @ViewChild('open_signIn',{static: true}) template : ElementRef;
  year=new Date().getFullYear();
  constructor(
    private modalService: BsModalService,
    private verifyUserPinGQL: UserPinCodeVerifyGQL,
    private toaster: ToasterService,
    private userClockedInGQL: UserClockedInGQL,
    private changeDetectorRef: ChangeDetectorRef,
    private commonService: CommonService,
  ) { }

  modalRef: BsModalRef;
  pinBox = false;
  clockedIn = false
  clockedOut = false
  temp = false
  userName = ''
  riseAndShine=false
  ngOnInit() {
    this.userName = window.localStorage.getItem('userPDet')
  }

  ngAfterViewInit() {
    let check=window.localStorage.getItem('StartModel')
    if (check == null) {
    // this.modalRef = this.modalService.show(this.template, { class: 'modal-sm ' + 'box-clockInPin', backdrop: 'static', keyboard: false });
    // this.openpinBox()
    this.pinBox = true
    this.riseAndShine=true
    this.changeDetectorRef.detectChanges()

    }
    localStorage.setItem("StartModel",'No');
  }

  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }
  
  openpinBox() {
    this.riseAndShine=false
    this.Pin = ''
    if (!this.pinBox && (this.clockedIn || this.clockedOut)) {
      this.pinBox = false
      this.clockedIn = false
      this.clockedOut = false
    }
    else {
      this.pinBox = !this.pinBox
    }
  }

  Pin = '';

  handleInput(val) {
    if (this.Pin.length < 6) {
      this.Pin += val
    }
  }

  clockInData = {}
  verifyPinCode() {
    if (this.Pin === '') {
      this.pinBox = true
      // this.toaster.showError('Please enter PIN', 'PIN Empty')
    } else {
      this.verifyUserPinGQL.mutate({
        pincode: this.Pin
      }).subscribe(
        (res) => {
          clearInterval(this.timer);
          this.time = ''
          this.clockInData = res['data'].userPinCodeVerify
          if (res['data'].userPinCodeVerify.oldClockHistoryId == null) {
            this.pinBox = false
            this.clockedIn = true
            this.clockedOut = false
            // this.toaster.showInfo('Please clock in', 'Clock in')
          }
          else {
            let userTime = res['data'].userPinCodeVerify.clocked_in_time.split(':')
            this.hours = userTime[0].toString()
            this.min = userTime[1].toString()
            this.i = Number(userTime[2])
            this.pinBox = false
            this.clockedIn = false
            this.clockedOut = true
            this.startTimer()
            // this.toaster.showInfo('You are already clocked in', 'Clock in')
          }
          this.userName = res['data'].userPinCodeVerify.User.first_name + ' ' + res['data'].userPinCodeVerify.User.last_name
          console.log("the rses data is", res['data']);
        }, (err) => {
          console.log("the err data is", err);
          // this.toaster.showError('Please enter correct PIN', 'PIN Incorrect')
        });
    }
  }

  userClockIn() {
    this.userClockedInGQL.mutate({
      businessLocation: window.localStorage.getItem('location_id'),
      userClockInPin: this.clockInData['UserClockInPin'],
      userId: this.clockInData['User']['id']
    }).subscribe(
      (res) => {
        clearInterval(this.timer);
        this.time = ''
        console.log('clocked in res', res['data'].userClockedIn);
        let userTime = res['data'].userClockedIn.clock_in_time.split(':')
        this.hours = userTime[0].toString()
        this.min = userTime[1].toString()
        this.i = Number(userTime[2])
        this.startTimer()
        this.clockedIn = false
        this.clockedOut = true
        // this.toaster.showSuccess('Successfully cloked in', 'Clocked IN')
        this.commonService.setFotterItem(true)
      }, (err) => {
        console.log('clocked in err', err);
        // this.toaster.showError('Something went wrong while cloked in', 'Clocked IN')
      }
    )
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.i = this.i + 1
      if (this.i >= 60) {
        this.min = Number(this.min) < 10 ? '0' + (Number(this.min) + 1).toString() : (Number(this.min) + 1).toString()
        this.i = 0
        if (Number(this.min) >= 60) {
          this.hours = Number(this.hours) < 10 ? '0' + (Number(this.hours) + 1).toString() : (Number(this.hours) + 1).toString()
          this.min = '00'
        }
      }
      this.time = this.hours + ':' + this.min + ':' + this.i
    }, 1000);
  }

  userClockOut() {
    this.pinBox = false
    this.clockedIn = false
    this.clockedOut = true
  }

  userClockOutNow() {
    this.userClockedInGQL.mutate({
      businessLocation: localStorage.getItem('location_id'),
      oldClockHistoryId: this.clockInData['oldClockHistoryId'],
      userClockInPin: this.clockInData['UserClockInPin'],
      userId: this.clockInData['User']['id']
    }).subscribe(
      (res) => {
        this.pinBox = false
        this.clockedIn = false
        this.clockedOut = false
        this.hours = '00'
        this.min = '00'
        this.time = ''
        this.i = 0
        clearInterval(this.timer);
        console.log('clock out res', res['data']);
        this.commonService.setFotterItem(true)
      }, (err) => {
        console.log('clock out err', err);
      }
    )
  }

  deleteOndeDigit() {
    this.Pin = this.Pin.slice(0, this.Pin.length - 1)
  }

  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
  }

  openCalculator(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: false});
  }

  closeModel() {
    this.modalRef.hide();
  }
  
  closeClockInModel() {
    // this.modalRef.hide();
    this.Pin = ''
    this.pinBox = false
    this.clockedIn = false
    this.clockedOut = false
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
  boxCalculator = false
  openCalculatorBox(){
    this.boxCalculator = !this.boxCalculator
  }

  closeCalculatorBox(){
    this.boxCalculator = false;
  }
  boxChat = false
  boxFaqMain = true
  boxFaqDetail = false
  boxConvoIcon = false
  openChatBox(){
    this.boxChat = !this.boxChat
  }
  openFaqDetail(){
    this.boxFaqMain = false
    this.boxFaqDetail = true
    this.boxConvoIcon = false
  }
  backtoFaqMain(){
    this.boxFaqMain = true
    this.boxFaqDetail = false
    this.boxConvoIcon = false
  }
  openConvo(){
    let convo: HTMLElement = document.getElementById("boxConvoid") as HTMLElement
    convo.click()
    this.boxConvoIcon = true
  }
}
