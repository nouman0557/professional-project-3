import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerGQLService } from 'src/app/services/customer/customerGQL.service';
import { SupplierService } from '../../../../../services/stock/supplier.service'

@Component({
  selector: 'manage-credit',
  templateUrl: './manage-credit.component.html',
  styleUrls: ['./manage-credit.component.css']
})
export class ManageCreditComponent implements OnInit {

  @Output() onCancelProcess: EventEmitter<any> = new EventEmitter();
  @Output() onShowToaster: EventEmitter<any> = new EventEmitter();
  @Output() onManageCreditChange = new EventEmitter();
  @Input() supplier
  @Input() supplierCreditLogs


  manageCreditForm: FormGroup;
  storeCreditReasons: any
  submitManageCredit = false
  manageCreditLoader: boolean = false


  constructor(private formbulider: FormBuilder,
    private supplierService: SupplierService,private customerGQLService: CustomerGQLService) { }

  ngOnInit() {
    this.initManageCreditFrom()
    this.getReasons()

  }

  initManageCreditFrom() {
    this.manageCreditForm = this.formbulider.group({
      amount: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      orderId: ['', Validators.required],
      note: ['', Validators.required],
      date: [new Date(), [Validators.required]],
      supplierId: [this.supplier['_id'], [Validators.required]],
      location_id: [localStorage.getItem('location_id'), [Validators.required]],
    });
  }


  onSubmitMangeCredit() {
    if (!this.manageCreditForm.invalid) {
      this.manageCreditLoader = true
      this.manageCreditForm.controls.amount.setValue(parseFloat(this.manageCreditForm.controls.amount.value))
      this.supplierService.addSupplierManageCredit(this.manageCreditForm.value)
        .subscribe(
          (responce) => {
            this.manageCreditLoader = false
            this.showToaster('Amount Credited and supplier', 'success')
            this.supplierCreditLogs.unshift(responce['data'].createSupplierManageCredit)
            this.supplier['supplier_store_credit'][0].supplier_credit_amount = responce['data'].createSupplierManageCredit.balance
            this.onManageCreditChange.emit()
            this.initManageCreditFrom()
            this.onChangeReason('chooseReason', 'Choose Reason')
            // this.cancelProcess('manageCredit','cutomerInfo')

          },
          (error) => {
            this.manageCreditLoader = false
            this.showToaster(error.message, 'error')
          }
        )
    } else {
      this.submitManageCredit = true
      this.showToaster('Missing Form Fields', 'error')

    }
  }



  getReasons() {
    this.manageCreditLoader = true
    this.customerGQLService.getReasons('store_credit').subscribe((res) => {
          this.storeCreditReasons = res['data'].getReasons
          this.onChangeReason('chooseReason', 'Choose Reason')
          console.log('customer S C REson res-->', this.storeCreditReasons);
          this.manageCreditLoader = false
        }, (err) => {
          console.log('customer  S C REson err -->', err);
          this.manageCreditLoader = false
          return err
        }
      )
  }

  onChangeReason(type, val) {
    this[type] = val
    val !== 'Choose Reason' ? this.manageCreditForm.controls.reason.setValue(val) : ''
  }
  
  cancelProcess(screenToShow, screenToHide) {
    this.onCancelProcess.emit([screenToShow, screenToHide])
  }

  showToaster(message, status) {
    this.onShowToaster.emit([message, status])
  }

}
