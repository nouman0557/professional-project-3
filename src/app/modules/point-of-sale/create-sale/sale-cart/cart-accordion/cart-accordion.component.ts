import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cart-accordion',
  templateUrl: './cart-accordion.component.html',
  styleUrls: ['./cart-accordion.component.css']
})
export class CartAccordionComponent implements OnInit {

  @Input() product: {}
  giftCardForm: FormGroup
  constructor(private formBulider: FormBuilder) { }

  ngOnInit() {
    this.checkProductType()
  }
  checkProductType(product: {} = this.product) {

    if (product['is_product'] && !product['is_bundle_product']) {
      //simple product QTY Check
      product['product_type'] = 'product'
    }
    else if (!product['is_product'] && !product['is_bundle_product']) {
      // Simple service
      product['product_type'] = 'service'
    }
    else if (product['is_product'] && product['is_bundle_product'] && product['bundle_products']['is_manufactured_qty']) {
      // Manufactured Bundle  QTY Check
      product['product_type'] = 'manufacturedBundleProduct'
    }
    else if (product['is_product'] && product['is_bundle_product'] && !product['bundle_products']['is_manufactured_qty']) {
      // Bundle Product 
      product['product_type'] = 'bundleProduct'
    }
    else if (!product['is_product'] && product['is_bundle_product']) {
      // Bundle service
      product['product_type'] = 'bundleService'
    }
    else if (product['is_custom']) {
      // Customer Product
      product['product_type'] = 'product'
    } else {
      product['product_type'] = 'device'
    }
  }

  initializeCreateGiftCard() {
    this.giftCardForm = this.formBulider.group({
      amount: ['', [Validators.required]],
      to: ['', [Validators.required]],
      from: ['', [Validators.required]],
      subject: ['', Validators.required],
      send_gift_card: ['', [Validators.required]],
      email: ['', [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      message: [''],
      is_used: [false],
      is_email_send: [false],
      is_active: [false],
    });
  }

}
