import { Component, OnInit, Input, OnChanges, 
  SimpleChanges, Output, EventEmitter, 
  ElementRef, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SellLineProductType } from 'src/app/generated/graphql';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { parse } from 'querystring';
import { ModalWithYesNoOptionComponent } from 'src/app/utilties/templates/modals/modal-with-yes-no-option/modal-with-yes-no-option.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sale-product',
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.css']
})
export class SaleProductComponent implements OnInit, OnChanges {

  @Input() product: {}
  @Input() isDeviceProduct: boolean
  @Output() public removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() public onCalculateTotal: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalTemplate', { static: true }) modalTemplate: ModalWithYesNoOptionComponent
  modalInputObject = {
    iconClass: 'icon-delete',
    headerText: '',
    yesButtonText: 'Yes',
    noButtonText: 'No',
    modalLayout: {
      class: 'modal-sm custModal wd300',
      backdrop: 'static', 
      keyboard: false
    }
  }

  linkSupplier = "Select Supplier"

  isAddProductSerialNumber: boolean = false
  isAddSubProductSerialNumber: boolean = false
  productQuantity: number = 0
  isManufacturedProduct = false

  constructor(private elRef: ElementRef,
    private _createSale: CreateSaleService,
    private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void { }


  ngDoCheck() {
    if (this.productQuantity !== this.product['quantity']) {
      this.cdr.detectChanges()
    }
  }

  ngOnInit() {
    this.onInitProductVariable()
    this.onCalculateTotalAmount()
    setTimeout(() => {
      this.onChangeQuantity()
    }, 100)

  }

  onInitProductVariable() {

    this.product['discount_amount'] ? '' : this.product['discount_amount'] = 0
    this.product['total_amount'] ? '' : this.product['total_amount'] = 0
    this.product['is_discount_percentage'] ? '' : this.product['is_discount_percentage'] = true
    this.product['discount_value'] ? '' : this.product['discount_value'] = ''
    this.product['supplier_sku'] = this.product['Suppliers'] && this.product['Suppliers'].length > 0 ? this.product['Suppliers'][0].sku_number : ''
    this.product['serial_number'] = ''
    this.product['is_add_serial_number'] = false
    if (this.product['is_bundle_product']) {
      this.product['bundle_products']['bundleProduct'].forEach(element => {
        element.serial_number = ''
        element.is_add_serial_number = false
        element.productQuantityInBundle = element.quantity
      });
    }
  }

  onChangeQuantity() {
    //avalible quantity check
    if (this.product['sell_line_product_type'] == SellLineProductType.BundleProduct) {
      if (this.product['max_bundle'] < this.product['quantity'] ) {
        this.modalInputObject.headerText = "Quantity avalible is " + this.product['max_bundle'] + ". Do you want to continue?"
        this.modalTemplate.openModal()
      }
    } else if (this.product['sell_line_product_type'] == SellLineProductType.Product && !this.product['isCustomProduct'] ) {
      if (this.product['ProductStockPrice'][0]['qty_available'] < this.product['quantity']) {
        this.modalInputObject.headerText = "Quantity avalible is " + this.product['ProductStockPrice'][0]['qty_available'] + ". Do you want to continue?"
        this.modalTemplate.openModal()
      }
    }
    if (this.product['is_bundle_product']) {
      this.product['bundle_products']['bundleProduct'].forEach(element => {
        element.quantity = this.product['quantity'] * element.productQuantityInBundle
      });
    }
  }

  modalCallBackFunction(isYes: boolean) {
    //this.holdQuantityCheck = false
    if (!isYes) {
      if (this.product['sell_line_product_type'] == SellLineProductType.BundleProduct) {
        if (this.product['max_bundle'] < 1) {
          this.onRemoveFromCart()
          return
        }
        this.product['quantity'] = this.product['max_bundle']
      } else if (this.product['sell_line_product_type'] == SellLineProductType.Product) {
        if (!this.product['isCustomProduct'] && this.product['ProductStockPrice'][0]['qty_available'] < 1) {
          this.onRemoveFromCart()
          return
        }
        this.product['quantity'] = this.product['ProductStockPrice'][0]['qty_available']
      }
    }
  }

  onCalculateTotalAmount() {
    this.productQuantity = this.product['quantity']

    if (this.product['is_discount_percentage']) {
      if (this.product['discount_value'] > 100) {
        this.product['discount_value'] = 100
        this._createSale.showToaster(["Discount percentage can't be greater the 100", 'warning'])
      }
      this.product['sub_total_amount'] = (this.product['sell_price_inc_tax'] * this.product['quantity']).toFixed(2)
      this.product['discount_amount'] = parseFloat(this.percentage(this.product['discount_value'], this.product['sub_total_amount'])).toFixed(2)
      this.product['total_amount'] = this.product['sub_total_amount'] - this.product['discount_amount']
    } else {
      this.product['sub_total_amount'] = (this.product['sell_price_inc_tax'] * this.product['quantity']).toFixed(2)
      this.product['discount_amount'] = this.product['discount_value']
      this.product['total_amount'] = this.product['sub_total_amount'] - this.product['discount_amount']
    }

    this.onCalculateTotal.emit()
  }

  percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2)
  }

  onRemoveFromCart() {
    this.removeFromCart.emit([this.product['_id']]);
  }
  noOpenAccordian(e) {
    if (this.isDeviceProduct && this.product['is_bundle_product']) { }
    else {
      e.stopPropagation();
    }
  }
  noOpenAccordianOnInput(e) {
    e.stopPropagation();
  }
}
