import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { parse } from 'graphql';
import { SellLineProductType } from 'src/app/generated/graphql';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service';
import { ModalWithYesNoOptionComponent } from 'src/app/utilties/templates/modals/modal-with-yes-no-option/modal-with-yes-no-option.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sale-procduct-with-multiple-supplier',
  templateUrl: './sale-procduct-with-multiple-supplier.component.html',
  styleUrls: ['./sale-procduct-with-multiple-supplier.component.css']
})
export class SaleProcductWithMultipleSupplierComponent implements OnInit, AfterViewInit {


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
  showSupplierList = false

  total_amount = 0
  discount_value = 0
  quantity = 0
  sell_price_inc_tax = 0
  serial_number = ''



  constructor(private cdr: ChangeDetectorRef,
    private _createSale: CreateSaleService) { }
  ngAfterViewInit(): void {
    this.cdr.detectChanges()
  }

  ngOnInit() {
    this.initValues()
  }

  initValues() {

    this.product['discount_amount'] ? '' : this.product['discount_amount'] = 0
    this.product['total_amount'] ? '' : this.product['total_amount'] = this.product['sell_price_inc_tax'] * this.product['quantity']
    this.product['is_discount_percentage'] ? '' : this.product['is_discount_percentage'] = true
    this.product['discount_value'] ? '' : this.product['discount_value'] = ''
    this.product['sub_total_amount'] ? '' : this.product['sub_total_amount'] = 0
    this.product['supplier_item'] ? '' : this.product['supplier_item'] = []
    this.product['is_item_with_multiple_supplier'] = true
    this.product['serial_number'] = ''
    this.product['is_add_serial_number'] = false
    this.product['sell_line_product_type'] = SellLineProductType.Product


    if (this.product['Suppliers'] && this.product['Suppliers'].length > 0 && this.product['supplier_item'].length == 0) {
      this.product['Suppliers'].forEach(element => {
        let item = {
          discount_amount: element.discount_amount || 0,
          total_amount: element.total_amount || 0,
          is_discount_percentage: element.is_discount_percentage || true,
          discount_value: element.discount_value || 0,
          sub_total_amount: element.sub_total_amount || 0,
          quantity: element.quantity || '',
          supplier_sku: element.sku_number,
          supplier_company: element.supplier_id ? element.supplier_id.supplier_company : 'Unknown',
          product_sku: this.product['sku'],
          supplier_id: element.supplier_id ? element.supplier_id._id : null,
          sell_price_inc_tax: element.product_sale_price || this.product['sell_price_inc_tax'],
          current_stock: element.current_stock,

        }
        this.product['supplier_item'].push(item)
      });
    }
    this.onCalculateTotalAmount()
  }

  onRemoveFromCart() {
    this.removeFromCart.emit([this.product['_id']]);
  }

  supplierCheckForQuantity
  onChangeQuantity(supplier_item) {
    this.supplierCheckForQuantity = supplier_item
    if (supplier_item.current_stock < supplier_item.quantity) {
      this.modalInputObject.headerText = "Quantity avalible is " + supplier_item.current_stock + ". Do you want to continue?"
      this.modalTemplate.openModal()
    }
  }

  modalCallBackFunction(isYes: boolean) {
    if (!isYes) {
      if (!this.product['isCustomProduct'] && this.product['ProductStockPrice'][0]['qty_available'] < 1) {
        this.onRemoveFromCart()
        return
      }
      this.supplierCheckForQuantity['quantity'] = this.supplierCheckForQuantity.current_stock < 1 ? 0 : this.supplierCheckForQuantity.current_stock
      this.onCalculateTotalAmount()
    }
  }

  onCalculateTotalAmount() {

    this.product['quantity'] = 0
    if (this.product['is_discount_percentage'] && Number(this.product['discount_value']) > 100) {
      this.product['discount_value'] = 100
      this._createSale.showToaster(["Discount percentage can't be greater the 100", 'warning'])
    }

    this.product['supplier_item'].forEach(element => {

      //element['quantity'] = Number(element['quantity'])
      element['discount_value'] = Number(this.product['discount_value'])
      element['sell_price_inc_tax'] = Number(this.product['sell_price_inc_tax'])

      if (element['is_discount_percentage']) {
        element['sub_total_amount'] = (Number(element['sell_price_inc_tax']) * Number(element['quantity'])).toFixed(2)
        element['discount_amount'] = parseFloat(this.percentage(Number(element['discount_value']), element['sub_total_amount'])).toFixed(2)
        element['total_amount'] = element['sub_total_amount'] - element['discount_amount']
      } else {
        element['sub_total_amount'] = element['sell_price_inc_tax'] * element['quantity']
        element['discount_amount'] = element['discount_value']
        element['total_amount'] = element['sub_total_amount'] - element['discount_amount']
      }

      this.product['quantity'] = this.product['quantity'] + Number(element['quantity'])
    });

    //this.product['quantity'] == 0 ? this.product['quantity'] = 1 : this.product['quantity']
    this.product['sub_total_amount'] = (this.product['sell_price_inc_tax'] * this.product['quantity']).toFixed(2)
    this.product['discount_amount'] = parseFloat(this.percentage(this.product['discount_value'], this.product['sub_total_amount'])).toFixed(2)
    this.product['total_amount'] = this.product['sub_total_amount'] - this.product['discount_amount']

    this.onCalculateTotal.emit()

  }



  percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2)
  }

  changeValue(type, val) {
    this[type] = val
  }

  noOpenAccordian(e) {
    if (!this.isDeviceProduct)
      e.stopPropagation();
  }
  noOpenAccordianOnInput(e) {
    e.stopPropagation();
  }

}
