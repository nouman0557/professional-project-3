import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { CreateSaleGQLService } from 'src/app/services/create-sale/create-sale-gql.service';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service';
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { ProductTypes, InputProductType } from 'src/app/generated/graphql';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchProduct: FormControl = new FormControl();
  searchProductDetail: string = 'product_name,sku'
  allProducts = []
  giftCount: number = 0
  loadProducts = false
  fetchAllProducts = true
  modalRef: BsModalRef;
  customProductForm: any;
  deviceId = ''
  productTypeFilter = 'AllProducts'
  $productList: any
  isProduct = true

  productListingSearchFilter = {
    businessLocation: localStorage.getItem('location_id'),
    productType: ProductTypes[this.productTypeFilter],
    is_product: this.isProduct,
    device_id: this.deviceId,
    search: this.searchProduct.value == null ? '' : this.searchProduct.value
  }

  constructor(private createSaleGQLService: CreateSaleGQLService,
    private saleCartService: SaleCartService,
    private createSaleService: CreateSaleService,
    private activatedRoute: ActivatedRoute,
    private formbulider: FormBuilder,
    private modalService: BsModalService,) { }

  ngOnInit() {
    this.createSaleService.setActiveSection(true, false, false)
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('paramameters are', params.DeviceID);
      if (params.DeviceID != undefined && this.saleCartService.getSelectedCustomerId() !== null && this.saleCartService.getSelectedCustomerId() !== '') {
        this.deviceId = params.DeviceID
      }
    })

    this.$productList = this.createSaleService.$deviceProductListSource.subscribe((res) => {
      this.deviceId = res[0]
      this.isProduct = res[1]
      this.getAllProducts()
    });

    this.searchProduct.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      this.getAllProducts()
    })
    this.getAllProducts()
  }

  getAllProducts() {
    this.productListingSearchFilter = {
      businessLocation: localStorage.getItem('location_id'),
      productType: ProductTypes[this.productTypeFilter],
      is_product: this.isProduct,
      device_id: this.deviceId,
      search: this.searchProduct.value == null ? '' : this.searchProduct.value
    }
    this.loadProducts = true
    let result = this.createSaleGQLService.getAllProductsWithFilters(this.productListingSearchFilter)
    result.valueChanges.subscribe(
      (res) => {
        this.loadProducts = false
        this.allProducts = res['data'].getProductsbyDevicewithSearch
      }, (err) => {
        this.loadProducts = false
        console.log('error while fetching products', err);
      }
    )
  }


  getDeviceProductAndService(device_id, is_product) {
    this.productListingSearchFilter = {
      businessLocation: localStorage.getItem('location_id'),
      productType: ProductTypes[this.productTypeFilter],
      is_product: is_product,
      device_id: device_id,
      search: this.searchProduct.value == null ? '' : this.searchProduct.value
    }
    this.loadProducts = true
    let result = this.createSaleGQLService.getAllProductsWithFilters(this.productListingSearchFilter)
    result.valueChanges.subscribe(
      (res) => {
        this.loadProducts = false
        this.allProducts = res['data'].getProductsbyDevicewithSearch
        console.log('all products are', this.allProducts);
      }, (err) => {
        this.loadProducts = false
        console.log('error while fetching products', err);
      }
    )
  }


  resetProductFilter() {
    this.fetchAllProducts = true
    this.deviceId = null
    this.isProduct = true
    this.allProducts = []
    this.productTypeFilter = 'AllProducts'
    this.searchProduct.setValue('')
    this.getAllProducts()
  }


  changeProductFilter(isAllProduct) {

    if (isAllProduct) {
      this.isProduct = true
      this.deviceId = null
      this.allProducts = []
      this.getAllProducts()
    } else {
      let device = this.saleCartService.getSelectedDevice()
      if (device) {
        this.isProduct = false
        this.deviceId = device['_id']
        this.allProducts = []
        this.getAllProducts()
      }else{
        this.createSaleService.showToaster(['Please Select a device','warning'])
      }
    }

  }

  onSelectGift() {
    this.saleCartService.addItemToCart({ '_id': 'gift#' + this.giftCount++, 'product_type': InputProductType.GiftCard })
  }

  onSelectProduct(product) {
    product['product_type'] = InputProductType.Product
    this.saleCartService.addItemToCart(product)
  }

  initializeAddCustomProductForm() {
    this.customProductForm = this.formbulider.group({
      quantity: [, [Validators.required, Validators.minLength(1)]],
      product_name: ['', [Validators.required]],
      default_sell_price: ['', [Validators.required, Validators.minLength(1)]],
      is_taxable: [false],
      location_id: [window.localStorage.getItem('location_id')],
      cost_price: [],
      note: [''],
      sell_price_inc_tax: ['']
    });
  }

  get fcustomProductForm() {
    return this.customProductForm.controls;
  }

  changeFormValue(form, fel, val) {
    if (form == 'customProductForm' && fel == 'is_taxable') {
      if (val) {
        this.updateValidators(true)
      }
      else {
        this.updateValidators(false)
      }
    }
    this[form].controls[fel].setValue(val)
  }

  updateValidators(bool) {
    if (bool) {
      this.customProductForm.controls['sell_price_inc_tax'].setValidators([Validators.required])
      this.customProductForm.controls['sell_price_inc_tax'].updateValueAndValidity()
      return
    }
    this.customProductForm.controls['sell_price_inc_tax'].setValidators(null)
    this.customProductForm.controls['sell_price_inc_tax'].updateValueAndValidity()
  }

  submitted = false
  addCustomProducts() {
    this.submitted = true
    if (this.customProductForm.invalid) {
      return;
    }
    let product = this.customProductForm.value
    product['product_type'] = InputProductType.Custom
    product['isCustomProduct'] = true
    product['is_product'] = true
    product['is_bundle_product'] = false
    product['quantity'] = Number(product['quantity'])
    product['default_sell_price'] = Number(product['default_sell_price'])
    product['cost_price'] = Number(product['cost_price'])
    product['sell_price_inc_tax'] = product.is_taxable ? Number(product['sell_price_inc_tax']) : Number(product['default_sell_price'])
    product['_id'] = 'Custom#' + this.saleCartService.getCustomProductCount() + 1

    product.CustomProduct = {
      name: product['product_name'],
      quantity: product['quantity'],
      cost_price: product['cost_price'],
      selling_price: product['default_sell_price'],
      selling_price_include_tax: product['sell_price_inc_tax'],
      note: product['note'],
      is_taxable: product['is_taxable'],
      location_id: product['location_id']
    }

    console.log('custom product values are ', product);
    this.saleCartService.addItemToCart(product)
    this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>, cls) {
    this.submitted = false
    this.initializeAddCustomProductForm()
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
  }

  closeModel() {
    this.modalRef.hide()
  }
}
