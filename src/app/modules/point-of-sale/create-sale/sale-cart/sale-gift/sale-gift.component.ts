import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service';
import { SellLineProductType } from 'src/app/generated/graphql';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sale-gift',
  templateUrl: './sale-gift.component.html',
  styleUrls: ['./sale-gift.component.css']
})
export class SaleGiftComponent implements OnInit, OnChanges {

  @Input() gift: {}
  @Output() public removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() public onCalculateTotal: EventEmitter<any> = new EventEmitter();
  customer = null
  toDayDate = new Date()

  giftCardForm: FormGroup;
  submitGiftCard: boolean = false

  constructor(private formBulider: FormBuilder,
    private saleCartService: SaleCartService,) { }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngDoCheck() {
    if (this.customer != this.saleCartService.getSelectedCustomer()) {
      this.customer = this.saleCartService.getSelectedCustomer()
      this.giftCardFromControl['from'].setValue(this.customer['_id'])
    }
  }
  ngOnInit() {
    this.gift['_id'] = this.gift['giftCard'] && this.gift['giftCard']._id ? this.gift['giftCard']._id : this.gift['_id'] 

    this.initializeCreateGiftCard(this.gift['giftCard'])

    this.gift['discount_amount'] = this.gift['discount_amount'] || ''
    this.gift['discount_value'] = this.gift['discount_value'] || ''
    this.gift['total_amount'] = this.gift['total_amount'] || ''
    this.gift['sub_total_amount'] = this.gift['sub_total_amount'] || ''

    this.gift['sell_line_product_type'] = SellLineProductType.GiftCard
  }

  initializeCreateGiftCard(giftCardInput) {
    if (giftCardInput) {
      this.giftCardForm = this.formBulider.group({
        amount: [giftCardInput.amount, [Validators.required]],
        to: [giftCardInput.to, [Validators.required]],
        from: [giftCardInput.Customer ? giftCardInput.Customer._id : giftCardInput.from, [Validators.required]],
        subject: [giftCardInput.subject, Validators.required],
        send_gift_card: [new Date(giftCardInput.send_gift_card), [Validators.required]],
        email: [giftCardInput.email, [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        message: [giftCardInput.message],
        is_used: [giftCardInput.is_used],
        is_email_send: [giftCardInput.is_email_send],
        is_active: [giftCardInput.is_active],
        BusinessLocation: [localStorage.getItem('location_id'), [Validators.required]]
      });
      this.onSubmit()
    }else{
      this.giftCardForm = this.formBulider.group({
        amount: ['', [Validators.required]],
        to: ['', [Validators.required]],
        from: ['', [Validators.required]],
        subject: ['', Validators.required],
        send_gift_card: [new Date(), [Validators.required]],
        email: ['', [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        message: [''],
        is_used: [false],
        is_email_send: [false],
        is_active: [false],
        BusinessLocation: [localStorage.getItem('location_id'), [Validators.required]]
      });
    }
  }

  get giftCardFromControl() {
    return this.giftCardForm.controls
  }

  giftAmountOnFocusOut() {
    this.giftCardFromControl['amount'].setValue(Number(this.gift['total_amount'])); 
    this.gift['sub_total_amount'] = Number(this.gift['total_amount'])
  }
  onSubmit() {
    this.submitGiftCard = true
    if (this.giftCardForm.invalid) {
      setTimeout(() => {
        this.submitGiftCard = false
      }, 2000)
      return
    } else {
      let gift = this.giftCardForm.value
      gift['amount'] = Number(gift['amount'])
      this.gift['giftCard'] = gift
      this.gift['isOpen'] = false
      this.onCalculateTotal.emit()
    }
  }
  onClearAll() {
    this.initializeCreateGiftCard(null)
    this.gift['total_amount'] = ''
    this.gift['giftCard'] = {}
    if (this.customer) {
      this.giftCardFromControl['from'].setValue(this.customer['_id'])
    }
  }

  onRemoveFromCart() {
    this.removeFromCart.emit(this.gift['_id']);
  }

  noOpenAccordian(e) {
    e.stopPropagation();
  }

}
