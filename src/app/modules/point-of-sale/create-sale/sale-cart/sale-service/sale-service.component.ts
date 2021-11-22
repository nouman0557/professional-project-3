import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service';

@Component({
  selector: 'sale-service',
  templateUrl: './sale-service.component.html',
  styleUrls: ['./sale-service.component.css']
})
export class SaleServiceComponent implements OnInit {

  @Input() product: {}
  @Input() isDeviceProduct: boolean
  @Output() public removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() public onCalculateTotal: EventEmitter<any> = new EventEmitter();
  @Output() public onServiceSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('open_selectSupplier', { static: true }) open_selectSupplier: TemplateRef <any>

  serviceProductLength = 0

  constructor(private _createSale: CreateSaleService) { }

  ngOnInit() {
    console.log('Service Product', this.product)
    this.onInitProductVariable()
    this.onCalculateTotalAmount()
  }

  ngDoCheck(){
    if(this.serviceProductLength !== this.product['serviceProduct'].length){
      this.serviceProductLength = this.product['serviceProduct'].length
      this.productWithMultipleSku(this.product['serviceProduct'])
    }
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
    this.serviceProductLength = this.product['serviceProduct'].length
  }

  onCalculateTotalAmount() {
    //this.productQuantity = this.product['quantity']

    if (this.product['sell_price_inc_tax'] < this.product['service_min_price']) {
      this.product['sell_price_inc_tax'] = this.product['service_min_price']
      this._createSale.showToaster(['Minimum price can be ' + this.product['service_min_price'], 'warning'])
    }

    if (this.product['is_discount_percentage']) {
      if (this.product['discount_value'] > 100) {
        this.product['discount_value'] = 100
        this._createSale.showToaster(["Discount percentage can't be greater the 100", 'warning'])
      }
      this.product['sub_total_amount'] = (this.product['sell_price_inc_tax'] * this.product['quantity']).toFixed(2)
      this.product['discount_amount'] = parseFloat(this._createSale.percentage(this.product['discount_value'], this.product['sub_total_amount'])).toFixed(2)

      if (this.product['sub_total_amount'] - this.product['discount_amount'] < this.product['service_min_price']) {
        this.product['discount_value'] = 0
        this._createSale.showToaster(['Minimum price can be ' + this.product['service_min_price'], 'warning'])
      } else {
        
        this.product['total_amount'] = this.product['sub_total_amount'] - this.product['discount_amount']
      }
    } else {
      this.product['sub_total_amount'] = (this.product['sell_price_inc_tax'] * this.product['quantity']).toFixed(2)
      this.product['discount_amount'] = this.product['discount_value']
      this.product['total_amount'] = this.product['sub_total_amount'] - this.product['discount_amount']
    }

    this.onCalculateTotal.emit()
  }

  onRemoveProductFromService(index) {
    this.product['serviceProduct'].splice(index, 1);
  }

  onRemoveFromCart() {
    this.removeFromCart.emit([this.product['_id']]);
  }

  noOpenAccordianOnInput(e) {
    e.stopPropagation();
  }

  onSelectService(isSelected) {
    this.onServiceSelect.emit(isSelected)
  }


  selectedProduct = null
  selectSupplier = null
  productIndex = null
  productWithMultipleSku(serviceProduct){
    serviceProduct.forEach((product,index) => {
      if(product.Suppliers.length > 1){
        this.selectedProduct = product
        this.productIndex = index
        this._createSale.openModal(this.open_selectSupplier,'custModal wd500')
      }

    });
  }

  assignSupplierToProduct(supplier){
    this.selectedProduct.Suppliers =[]
    this.selectedProduct.Suppliers.push(supplier)
    this.selectSupplier = null
  }

}
