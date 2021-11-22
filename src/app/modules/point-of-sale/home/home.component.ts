import { Component, OnInit, TemplateRef, NgModuleRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  GetCurrencyWithUnitGQL, CashRegistersOfLocationGQL, SaveOpenCashDrawerLogGQL, OpenCashDrawerType, SaveTillCountGQL,
  GetCashRegisterByIdGQL, GetAllAlertsGQL, AlertTypeEnum, GetAllBusinessUsersGQL
} from 'src/app/generated/graphql';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepairRoomGQLService } from "src/app/services/repair-room/repair-room-gql.service"
import { CommonService } from 'src/app/services/common/common.service';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  changeCashregister = 'Cash Register 1'
  isLoading = false
  openCashDrawer: FormGroup;
  baseUrl = EnvironmentUrl.Images
  $fotterdata: any
  constructor(
    private modalService: BsModalService,
    private getCurrencyWithUnitGQL: GetCurrencyWithUnitGQL,
    private CashRegistersOfLocation: CashRegistersOfLocationGQL,
    private saveOpenCashDrawerLogGQL: SaveOpenCashDrawerLogGQL,
    private saveTillCountGQL: SaveTillCountGQL,
    private getCashRegisterByIdGQL: GetCashRegisterByIdGQL,
    private formbulider: FormBuilder,
    private getAllAlerts: GetAllAlertsGQL,
    private _repairRoomGQL: RepairRoomGQLService,
    private getAllBusinessUsers: GetAllBusinessUsersGQL,
    private commonService: CommonService,
    private router: Router,
  ) { }

  expectedTotal = 0
  amountToDeposit = ''
  tillCountArray: any
  totalCurrencies = []
  purchaseAlerts = []
  customerAlerts = []
  repairTaskList = []
  limit = 100
  skip = 0

  ngOnInit() {
    this.$fotterdata = this.commonService.fotterdata$.subscribe((res) => {
      if (res) {
        this.getAllUsers()
      } else {
      }
    });
    this.getAllCurrencyUnits()
    this.getAllCashRegister()
    this.openCashDrawerFormIni()
    this.getAllAlert()
    this.getRepairRoomTaskList()
    this.getAllUsers()
  }

  getRepairRoomTaskList() {
    this.isLoading = true
    this._repairRoomGQL.getRepairRoomTaskList(this._repairRoomGQL.getReapirRoomFilter(), localStorage.getItem('location_id'), this.limit, this.skip)
      .subscribe((res) => {
        if(res['data'].repairRoomListing != null) {
          this.repairTaskList = res.data.repairRoomListing.repairRoomTransactions
          this.isLoading = false
        }
      })
  }
  time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ' hrs';
  }

  tillCounttotal = 0
  // calculateTotaltillCount(number,curr) {
  //   if(this.tillCountArray[number] == null || this.tillCountArray[number] == undefined) {
  //     return
  //   }
  //   this.tillCounttotal = Number(this.tillCounttotal) + (Number(this.tillCountArray[number]) * curr)
  //   console.log(this.tillCounttotal);
  // }

  getAllAlert() {
    this.getAllAlerts.watch({
      location_id: localStorage.getItem('location_id'),
      alert_type: AlertTypeEnum.PurchaseAlert
    }).valueChanges.subscribe((res) => {
      this.purchaseAlerts = res.data.getAllAlerts
    })
    this.getAllAlerts.watch({
      location_id: localStorage.getItem('location_id'),
      alert_type: AlertTypeEnum.CustomerAlert
    }).valueChanges.subscribe((res) => {
      this.customerAlerts = res.data.getAllAlerts
    })
  }

  getAllCurrencyUnits() {
    this.getCurrencyWithUnitGQL.watch({
      cashRegisterId: localStorage.getItem('RegisterId'),
      location_id: localStorage.getItem('location_id')
    }).valueChanges.subscribe(
      (res) => {
        if(res['data'].getCurrencyWithUnit != null) {
          this.totalCurrencies = res['data'].getCurrencyWithUnit.currency
          this.tillCountArray = new Array(this.totalCurrencies.length).fill({ qty: null, unit: 0, total: 0 });
          this.expectedTotal = res['data'].getCurrencyWithUnit.expected_amount
          this.amountToDeposit = ''
          this.tillCounttotal = 0
        }
      }, (err) => {
      }
    )
  }

  calculateTotaltillCount(num, curr, newAmount) {
    this.tillCounttotal = 0
    this.tillCountArray[num] = { qty: newAmount, unit: curr, total: curr * newAmount }
    for (let i = 0; i < this.tillCountArray.length; i++) {
      this.tillCounttotal = parseFloat((this.tillCounttotal + this.tillCountArray[i].total).toFixed(2))
    }
  }

  submitTillCount() {
    if (Number(this.amountToDeposit) > this.tillCounttotal) {
      return
    }
    let obj = {}
    obj['cashRegisterID'] = localStorage.getItem('RegisterId')
    obj['BusinessLocation'] = localStorage.getItem('location_id')
    obj['expected_amount'] = Number(this.expectedTotal.toFixed(2))
    obj['counted_amount'] = this.tillCounttotal
    obj['discrepancy'] = Number((this.expectedTotal - this.tillCounttotal).toFixed(2))
    obj['deposited'] = Number(this.amountToDeposit)
    obj['remaining_amount'] = Number((this.tillCounttotal - Number(this.amountToDeposit)).toFixed(2))
    let arr = []
    for (let i = 0; i < this.tillCountArray.length; i++) {
      this.tillCountArray[i].qty = Number(this.tillCountArray[i].qty)
      if (this.tillCountArray[i].qty != 0) {
        arr.push(this.tillCountArray[i])
      }
    }
    obj['cashDemonination'] = arr
    this.saveTillCountGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        if (res['data'].saveTillCount != null) {
          this.tillCountArray = new Array(this.totalCurrencies.length).fill({ qty: null, unit: 0, total: 0 });
          this.expectedTotal = res['data'].saveTillCount.expected_amount
          this.amountToDeposit = ''
          this.tillCounttotal = 0
          this.tillHelpBox = false
          this.getAllCurrencyUnits()
          this.modalService.hide(1);
        }
      }, (err) => {

      }
    )
  }

  cashReegisterData = []
  getAllCashRegister() {
    this.CashRegistersOfLocation.watch({
      ID: window.localStorage.getItem('location_id')
    }
    ).valueChanges.subscribe(
      (response) => {
        if (response['data'].cashRegistersOfLocation != null) {
          this.cashReegisterData = response['data']['cashRegistersOfLocation'];
          let id = localStorage.getItem('RegisterId');
          var index = this.cashReegisterData.map(x => {
            return x._id;
          }).indexOf(localStorage.getItem('RegisterId'))
          if (!this.isObjectEmpty(this.cashReegisterData[index])) {
            this.changeCashregister = this.cashReegisterData[index]['name']
          }
        }
      },
      (err) => {
        console.log('Error from GQL', err)
      }
    )
  }

  openCashDrawerFormIni() {
    this.openCashDrawer = this.formbulider.group({
      amount: [, [Validators.required]],
      remarks: ['', [Validators.required]]
    })
  }

  get fopenCashDrawerFormIni() {
    return this.openCashDrawer.controls
  }

  submitCash = false
  openCashDrawerType = ''
  withDrawAmountError = false
  submitCashDrawer() {
    this.submitCash = false
    if (this.openCashDrawer.invalid) {
      this.submitCash = true
      return
    }
    if (this.WithDrawMoney) {
      this.getCashRegisterByIdGQL.watch({
        id: localStorage.getItem('RegisterId')
      }).valueChanges.subscribe(
        (res) => {
          if (res['data'] != null) {
            if (res['data'].getCashRegisterById.opening_amount < Number(this.openCashDrawer.controls.amount.value)) {
              this.withDrawAmountError = true
              return
            }
            this.WithDrawMoney = false;
            this.addMoney = false;
            this.otherMoney = false;
            this.withDrawAmountError = false
            this.clockINCode = true;
          }
        }, (err) => {
          this.withDrawAmountError = true
        }
      )
      return
    }
    this.WithDrawMoney = false;
    this.addMoney = false;
    this.otherMoney = false;
    this.clockINCode = true;
  }

  drawerMain = true
  WithDrawMoney = false
  addMoney = false
  otherMoney = false
  clockINCode = false

  openDrawer(ty, dr) {
    this.drawerMain = false
    this.WithDrawMoney = false
    this.addMoney = false
    this.otherMoney = false
    this.clockINCode = false
    this.openCashDrawerType = dr
    this[ty] = true
  }

  userPin = ''
  updateSubmitted = false
  errorMessage = 'User PIN code is required'
  updateCashDrawer() {
    this.updateSubmitted = false
    if (this.userPin == '') {
      this.updateSubmitted = true
      return
    }
    let obj = this.openCashDrawer.value
    obj['cashRegisterID'] = localStorage.getItem('RegisterId')
    obj['BusinessLocation'] = localStorage.getItem('location_id')
    obj['clockin_pin'] = Number(this.userPin)
    obj['amount'] = parseFloat(obj['amount'])
    obj['openCashDrawerType'] = OpenCashDrawerType[this.openCashDrawerType]
    this.saveOpenCashDrawerLogGQL.mutate({
      input: obj
    }).subscribe(
      (res) => {
        if (res['data'] != null) {
          this.modalService.hide(1);
          this.drawerMain = true;
          this.WithDrawMoney = false;
          this.addMoney = false;
          this.otherMoney = false;
          this.clockINCode = false;
          this.userPin = ''
          this.openCashDrawerFormIni()
          return
        }
      }, (err) => {
        console.log('err of open cash drawer is', err);
        this.updateSubmitted = true
        if (err.graphQLErrors[0].code == 'limit_exceeded') {
          this.withDrawAmountError = true
          this.WithDrawMoney = true;
          this.addMoney = false;
          this.otherMoney = false;
          this.clockINCode = false;
          return
        }
        this.errorMessage = err.graphQLErrors[0].message
      }
    )
  }

  closeModel() {
    this.modalService.hide(1);
    this.userPin = ''
    this.drawerMain = true;
    this.WithDrawMoney = false;
    this.addMoney = false;
    this.otherMoney = false;
    this.clockINCode = false;
    this.updateSubmitted = false
    this.submitCash = false
    this.WithDrawMoney = false
    this.withDrawAmountError = false
    this.openCashDrawerFormIni()
  }

  model_tillCount(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    this.getAllCurrencyUnits()
    this.getAllCashRegister()
  }

  model_cashDrawer(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }


  openClockinCode() {
    this.WithDrawMoney = false;
    this.addMoney = false;
    this.otherMoney = false;
    this.clockINCode = true;
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

  changeValue(type, val) {
    this[type] = val.name
    localStorage.setItem('RegisterId', val._id)
    this.getAllCurrencyUnits()
  }

  tillHelpBtn = true;
  tillHelpBox = false;
  tillHelpBoxOPEN = false;
  opentillHelp() {
    this.tillHelpBtn = false;
    this.tillHelpBox = true;
    setTimeout(() => {
      this.tillHelpBoxOPEN = true;
    }, 100);
  }

  closetillHelp() {
    this.tillHelpBoxOPEN = false
    setTimeout(() => {
      this.tillHelpBox = false;
      this.tillHelpBtn = true;
    }, 900);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getUserLoader = false
  allUsers = []
  getAllUsers() {
    this.getUserLoader = true
    this.getAllBusinessUsers.watch({
      store_id: window.localStorage.getItem('location_id'),
      filter: 'all'
    }).valueChanges.subscribe(
      (res) => {
        this.allUsers = res['data'].getAllBusinessUsers
        this.getUserLoader = false
      }, (err) => {
        this.getUserLoader = false
        localStorage.removeItem('location_id')
        localStorage.removeItem('token')
        this.router.navigate(['/Login'])
        console.log('all users err', err);
      }
    )
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

}
