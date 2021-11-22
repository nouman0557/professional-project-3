import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SupplierService } from '../../../../../services/stock/supplier.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeOfAccount } from 'src/app/generated/graphql'
import { StoreReader } from 'apollo-cache-inmemory';

@Component({
  selector: 'transfer-credit',
  templateUrl: './transfer-credit.component.html',
  styleUrls: ['./transfer-credit.component.css']
})
export class TransferCreditComponent implements OnInit {

  @Output() onCancelProcess: EventEmitter<any> = new EventEmitter();
  @Input() supplier
  @Input() supplierCreditLogs
  @Output() onShowToaster: EventEmitter<any> = new EventEmitter();
  @Output() onTransferCreditChange = new EventEmitter();
  stores = []
  transferCreditForm: FormGroup;
  submitTransferCredit: boolean = false
  accountListing = []
  activeAccount
  accountType: string = 'store'
  transferCreditLoader: boolean = false

  constructor(private supplierService: SupplierService,
    private formbulider: FormBuilder) { }

  ngOnInit() {
    this.getAllStore()
    this.initTransferCreditFrom()
  }

  initTransferCreditFrom() {
    this.transferCreditForm = this.formbulider.group({
      account_type: [TypeOfAccount.Store, Validators.required],
      amount: ['', [Validators.required]],
      storeId: ['', [Validators.required]],
      note: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      supplierId: [this.supplier['_id'], [Validators.required]],
      location_id: [localStorage.getItem('location_id'), [Validators.required]],
    });
  }

  getAllStore() {
    this.supplierService.getSupplierStores().valueChanges.subscribe(
      (res) => {
        this.stores = res['data'].getAllBusinessStoreAdmin
        this.stores = this.stores.filter(store => {
          return store['_id'] != localStorage.getItem('location_id')
        })
        this.accountListing = this.stores
        this.changeStore('changeCurrentStore', 'Select A Store')
      }, (err) => {
        this.showToaster(err.message, 'error')
      }
    )
  }

  changeAccountType(accountType) {
    if (accountType == 'store') {
      this.accountType = accountType
      //this.transferCreditForm.controls.account_type.setValue(TypeOfAccount.Store)
      //setTimeout(() => { this.accountListing = this.stores });

    } else {
      this.accountType = accountType
      //this.transferCreditForm.controls.account_type.setValue(TypeOfAccount.Paypal)
      //setTimeout(() => { this.accountListing = [] })
    }
  }

  onSubmitTransferCredit() {
    if (!this.transferCreditForm.invalid) {
      this.transferCreditLoader = true
      this.transferCreditForm.controls.amount.setValue(parseFloat(this.transferCreditForm.controls.amount.value))
      this.supplierService.addTransferStoreCredit(this.transferCreditForm.value)
        .subscribe(
          (responce) => {
            this.submitTransferCredit = false
            this.transferCreditLoader = false
            this.showToaster('Amount Transfer succesfully', 'success')
            this.supplierCreditLogs.unshift(responce['data'].createTransferStoreCredit)

            this.supplier['supplier_store_credit'][0].supplier_credit_amount = responce['data'].createTransferStoreCredit.balance

            this.onTransferCreditChange.emit()
            this.changeStore('changeCurrentStore', 'Select A Store')
            this.initTransferCreditFrom()
            //this.cancelProcess('manageCredit', 'cutomerInfo')

          },
          (error) => {
            this.transferCreditLoader = false
            this.showToaster(error.message, 'error')
          }
        )
    } else {
      this.submitTransferCredit = true
      this.showToaster('Missing Form Fields', 'error')

    }
  }



  changeStore(type, val) {
    if (val == 'Select A Store') {
      this[type] = val
    } else {
      this[type] = val['store_name']
      this.transferCreditForm.controls.storeId.setValue(val['_id'])
    }
  }

  cancelProcess(screenToShow, screenToHide) {
    this.onCancelProcess.emit([screenToShow, screenToHide])
  }

  showToaster(message, status) {
    this.onShowToaster.emit([message, status])
  }
}
