import { Injectable, ViewChild } from '@angular/core';
import { CustomerGQLService } from '../customer/customerGQL.service'
import { CreateSaleService } from './create-sale.service'
import { BehaviorSubject, partition, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CreateSaleGQLService } from './create-sale-gql.service';
import { AllowedTransactionType, AllowedTransactionStatus, SellLineProductType, InputProductType, ProductType } from 'src/app/generated/graphql'
import { ModalWithYesNoOptionComponent } from 'src/app/utilties/templates/modals/modal-with-yes-no-option/modal-with-yes-no-option.component';
import { NullTemplateVisitor } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class SaleCartService {
  locationId = window.localStorage.getItem('location_id')

  modalInputObject: {
    iconClass: 'icon-delete',
    headerText: String,
    yesButtonText: String,
    noButtonText: String,
    modalLayout: {
      class: String,
      backdrop: String,
      keyboard: boolean
    }
  }

  private loadingScreenSource = new BehaviorSubject(false);
  $loadingScreen = this.loadingScreenSource.asObservable()

  private refreshScreenSource = new Subject<any>();
  $refreshScreen = this.refreshScreenSource.asObservable()


  selectedCustomerId: String = null
  customer = null
  maxDiscount = 100

  createSaleInput = {
    _id: null,
    transaction_date: new Date(),
    transaction_type: AllowedTransactionType.Sell,
    transaction_status: AllowedTransactionStatus.Order,
    sub_total_amount: 0,
    Tax: null,
    tax_amount: 0,
    tax_value: '',
    is_tax_percentage: false,
    discount_amount: 0.0,
    discount_value: '',
    is_discount_percentage: false,
    total_amount: 0,
    is_apply_sale_tax: false,
    is_private: false,
    additional_notes: '',
    Customer: this.getSelectedCustomerId(),
    BusinessLocation: this.locationId,
    saleCart: []
  }

  constructor(private customerGQLService: CustomerGQLService,
    private createSaleService: CreateSaleService,
    private router: Router,
    private createSaleGQLService: CreateSaleGQLService
  ) { this.onDiscardOrder() }


  setModalInput(input) {
    this.modalInputObject = input
  }
  getModalInput() {
    return this.modalInputObject
  }

  initCreateSaleInput() {
    this.createSaleInput = {
      _id: null,
      transaction_date: new Date(),
      transaction_type: AllowedTransactionType.Sell,
      transaction_status: AllowedTransactionStatus.Order,
      sub_total_amount: 0,
      Tax: null,
      tax_amount: 0,
      tax_value: '',
      is_tax_percentage: false,
      discount_amount: 0.0,
      discount_value: '',
      is_discount_percentage: false,
      total_amount: 0,
      is_apply_sale_tax: false,
      is_private: false,
      additional_notes: '',
      Customer: this.getSelectedCustomerId(),
      BusinessLocation: this.locationId,
      saleCart: []
    }
    this.getSaleTaxsByBusinessLocation()
  }
  getCreateSaleInput() {
    return this.createSaleInput
  }

  getSaleTaxsByBusinessLocation() {
    this.createSaleGQLService.getSaleTaxByBusinessLocation(localStorage.getItem('location_id'))
      .valueChanges.subscribe(
        (res) => {
          this.createSaleInput['is_tax_percentage'] = true
          this.createSaleInput['tax_value'] = res.data.BusinessLocationById.sales_tax.toString()
          this.onCalculateSaleTax()
        }, (err) => {
          this.getSaleTaxsByBusinessLocation()
          console.log('GQL Error', err);
        }
      )
  }

  setCreateSaleInput(createSaleInput = this.createSaleInput) {
    this.createSaleInput = createSaleInput
  }

  getSaleCart() {
    return this.createSaleInput.saleCart
  }
  setSaleCart(saleCart) {
    this.createSaleInput.saleCart = saleCart
  }

  updateItemFromSaleCart(product: {}): void {
    this.createSaleInput.saleCart[this.createSaleInput.saleCart.findIndex(item => item._id == product['_id'])] = product
  }

  onDiscardOrder() {
    this.selectedCustomerId = null
    this.setCustomer(null)
    this.initCreateSaleInput()
  }

  onInitSaleCart() {
    this.createSaleInput.saleCart = []
  }

  setSelectedCustomerId(customerId: String) {
    this.selectedCustomerId = customerId
    this.getCustomerById(this.selectedCustomerId)
  }

  getSelectedCustomerId(): String {
    return this.selectedCustomerId
  }

  setCustomer(customer) {
    this.customer = customer
  }

  getCustomer() {
    return this.customer
  }


  getCustomerById(customerId) {
    this.showLoadingScreen(true)
    this.customerGQLService.getCustomerById(customerId, this.locationId)
      .valueChanges.subscribe((res) => {
        this.showLoadingScreen(false)
        this.customer = res.data.getCustomerById
      }, (err) => {
        this.showLoadingScreen(false)
        this.createSaleService.showToaster([err.message, 'error'])
      })
  }


  showLoadingScreen(isShow: boolean) {
    this.loadingScreenSource.next(isShow)
  }
  onRefreshScreen() {
    this.refreshScreenSource.next()
  }

  onCalculateSubTotal() {

    this.createSaleInput.sub_total_amount = 0
    this.createSaleInput.saleCart.forEach(element => {
      this.createSaleInput.sub_total_amount = this.createSaleInput.sub_total_amount + Number(element.total_amount)
    });

    this.onCalculateDiscount()
    this.onCalculateSaleTax()
    this.onCalculateTotalAmount()
  }

  onCalculateDiscount() {
    if (this.createSaleInput['is_discount_percentage']) {
      if (Number(this.createSaleInput['discount_value']) > this.maxDiscount) {
        this.createSaleInput['discount_value'] = this.maxDiscount.toString()
        //this.createSaleService.showToaster(["Discount percentage can't be greater the 100", 'warning'])
      }
      this.createSaleInput['discount_amount'] = parseFloat(this.percentage(Number(this.createSaleInput['discount_value']), this.createSaleInput['sub_total_amount']))
    } else {
      if (Number(this.createSaleInput['discount_value']) > Number(this.createSaleInput['sub_total_amount'])) {
        //this.createSaleService.showToaster(["Discount can't be greater the sub total amount", 'warning'])
        this.createSaleInput['discount_value'] = this.createSaleInput['sub_total_amount'].toFixed(2)
      }
      this.createSaleInput['discount_amount'] = Number(this.createSaleInput['discount_value'])
    }
    this.onCalculateSaleTax()
    this.onCalculateTotalAmount()
  }

  onCalculateTotalAmount() {
    this.createSaleInput['total_amount'] = Number(this.createSaleInput['sub_total_amount']) - this.createSaleInput['discount_amount']

    if (this.createSaleInput['is_apply_sale_tax'])
      this.createSaleInput['total_amount'] += this.createSaleInput['tax_amount']
  }

  onCalculateSaleTax() {
    if (this.createSaleInput['is_apply_sale_tax']) {
      if (this.createSaleInput['is_tax_percentage']) {
        this.createSaleInput['tax_amount'] = parseFloat(this.percentage(this.createSaleInput['tax_value'], this.createSaleInput['sub_total_amount'] - this.createSaleInput['discount_amount']))
      } else {
        this.createSaleInput['tax_amount'] = this.createSaleInput['sub_total_amount'] - parseFloat(this.createSaleInput['tax_value'])
      }
    }
    else {
      this.createSaleInput['tax_amount'] = 0
    }
  }

  percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2)
  }

  assignProductType(product: any) {
    if (product['is_product'] && !product['is_bundle_product']) {
      //simple product
      product.productTypeClass = "addingProduct"
      product.iconClass = "icon-product"
      product.sell_line_product_type = SellLineProductType.Product
    }
    else if (!product['is_product'] && !product['is_bundle_product']) {
      // Simple service
      product.productTypeClass = "addingService"
      product.iconClass = "icon-service"
      product.sell_line_product_type = SellLineProductType.Service
    }
    else if (product['is_product'] && product['is_bundle_product'] && product['bundle_products']['is_manufactured_qty']) {
      // Manufactured Bundle  QTY Check
      product.productTypeClass = "addingManBundleProduct"
      product.iconClass = "icon-manufacture_bundle_product"
      product.sell_line_product_type = SellLineProductType.ManufacturedProduct
      //this.isManufacturedProduct = true
    }
    else if (product['is_product'] && product['is_bundle_product'] && !product['bundle_products']['is_manufactured_qty']) {
      // Bundle Product 
      product.productTypeClass = "addingBundleProduct"
      product.iconClass = "icon-bundle_product"
      product.sell_line_product_type = SellLineProductType.BundleProduct
    }
    else if (!product['is_product'] && product['is_bundle_product']) {
      // Bundle service
      product.productTypeClass = "addingBundleService"
      product.iconClass = "icon-bundle_service"
      product.sell_line_product_type = SellLineProductType.BundleService
    }
  }

  addItemToDeviceIfSelected(product, saleCart: any[] = this.createSaleInput.saleCart) {
    if (product.product_type == 'giftCard' || product.is_device)
      return false
    //search for selected device
    let index = saleCart.findIndex(item => item.is_device && item.isOpen == true)
    //if found
    if (index !== -1) {
      //if device already have product
      let device = saleCart[index]
      let productIndex = device.deviceProducts.findIndex(item => item._id == product['_id']);
      //if found
      if (productIndex !== -1) {
        //Service can only be added one time
        if (!product['is_device'] && !product['is_product']) {
          // Service
          this.createSaleService.showToaster(['Service already added in device', 'warning'])
          return true
        }
        if (product['Suppliers'] && product['Suppliers'].length > 1) {
          this.createSaleService.showToaster(['Product already added in device', 'warning'])
          return true
        }
        device.deviceProducts[productIndex].quantity = parseFloat(device.deviceProducts[productIndex].quantity) + 1
      } else {

        //device.deviceProduct =  device.deviceProduct ? device.deviceProduct : []

        let isProductDeviceCompatible = this.isProductDeviceCompatible(product, device)

        if (isProductDeviceCompatible) {
          if (!this.addItemToService(product, device)) {
            if (product.sell_line_product_type == SellLineProductType.Service || product.sell_line_product_type == SellLineProductType.BundleService) {
              product.sell_line_product_type == SellLineProductType.Service ? product = this.addCompatibleServiceProduct(product, device) : ''
              product.quantity = 1
              device.deviceProducts.push(product)
            } else {
              this.createSaleService.showToaster(["product can't be added in device directly", 'warning'])
            }
          }
        } else {
          this.createSaleService.showToaster([product.product_name + ' not compatible to ' + device.deviceBrand.brand_name, 'warning'])
        }
      }
      return true
    }
    return false
  }

  addCompatibleServiceProduct(product, device) {

    product.serviceProduct = product.serviceProduct ? product.serviceProduct : []

    product.servicesBrandModel.forEach(servicebrandModal => {
      if (servicebrandModal.ServiceDeviceModel._id == device.deviceModel._id && servicebrandModal.ServiceBrand._id == device.deviceBrand._id) {
        if (servicebrandModal.ServiceItem) {
          servicebrandModal.ServiceItem.quantity = 1
          product.serviceProduct.push(servicebrandModal.ServiceItem)
        }
      }
    });
    return product
  }

  isProductDeviceCompatible(product, device) {
    let isProductDeviceCompatible = false

    switch (product.sell_line_product_type) {

      case SellLineProductType.Service: {
        if (product.servicesBrandModel.length == 0)
          isProductDeviceCompatible = true
        else {
          product.servicesBrandModel.forEach(servicebrandModal => {
            if (servicebrandModal.ServiceDeviceModel._id == device.deviceModel._id && servicebrandModal.ServiceBrand._id == device.deviceBrand._id) {
              product.service_max_price = servicebrandModal.service_max_price
              product.service_min_price = servicebrandModal.service_min_price
              isProductDeviceCompatible = true
            }
          });
        }
        break
      }
      case SellLineProductType.Product: {
        if (product.isCustomProduct) {
          isProductDeviceCompatible = true
          break
        }
        if (product.Brand._id == device.deviceBrand._id && product.DeviceModel._id == device.deviceModel._id) {
          isProductDeviceCompatible = true
        }
        break
      }
      case SellLineProductType.BundleService: {
        if (product.Brand && product.Brand._id == device.deviceBrand._id && product.DeviceModel && product.DeviceModel._id == device.deviceModel._id) {
          isProductDeviceCompatible = true
        }
        break
      }
      case SellLineProductType.BundleProduct: {
        if (product.Brand && product.Brand._id == device.deviceBrand._id && product.DeviceModel && product.DeviceModel._id == device.deviceModel._id) {
          isProductDeviceCompatible = true
        }
        break
      }
      case SellLineProductType.ManufacturedProduct: {
        if (product.Brand && product.Brand._id == device.deviceBrand._id && product.DeviceModel && product.DeviceModel._id == device.deviceModel._id) {
          isProductDeviceCompatible = true
        }
        break
      }
    }
    return isProductDeviceCompatible
  }

  addItemToService(product, device) {

    let isProdcutAddedToService = false

    if (product.sell_line_product_type == SellLineProductType.Service || product.sell_line_product_type == SellLineProductType.BundleService)
      return isProdcutAddedToService

    let index = device.deviceProducts.findIndex(item => item.sell_line_product_type == SellLineProductType.Service && item.isOpen == true)

    if (index == -1) {
      return isProdcutAddedToService
    } else {
      //device.deviceProducts[index].serviceProduct ? '' : device.deviceProducts[index].serviceProduct = []
      let productIndex = device.deviceProducts[index].serviceProduct.findIndex(item => item._id == product._id);
      if (productIndex == -1) {
        product.quantity = 1
        device.deviceProducts[index].serviceProduct.push(product)
        isProdcutAddedToService = true
      } else {
        this.createSaleService.showToaster([product.product_name + ' alread added', 'warning'])
        isProdcutAddedToService = true
      }
    }
    return isProdcutAddedToService
  }


  addItemToCart(product: any, saleCart: any[] = this.createSaleInput.saleCart) {
    product = JSON.parse(JSON.stringify(product))
    product.isOpen = true

    if (product.product_type == InputProductType.Product || product['product_type'] == InputProductType.Custom) {
      this.assignProductType(product)
    }

    if (!this.addItemToDeviceIfSelected(product)) {
      if (!product['is_device'] && product['product_type'] !== 'giftCard') {
        if (!product['is_product']) {
          this.createSaleService.showToaster(['Please select a device to add service', 'warning'])
          return
        }
      }
      // check is product already in cart
      let index = saleCart.findIndex(item => item._id == product['_id']);
      if (index !== -1) {
        if (!product.is_device && (!product['Suppliers'] || product['Suppliers'].length <= 1)) {
          saleCart[index].quantity = parseInt(saleCart[index].quantity) + 1
        }
        else {
          product.is_device ? this.createSaleService.showToaster(['Device already added', 'warning']) : this.createSaleService.showToaster(['Product already added', 'warning'])
        }
      } else {
        product['quantity'] = product.isCustomProduct ? product['quantity'] : 1
        saleCart.push(product)
      }
    }
  }

  removeItemFromCart(id: string): void {
    this.createSaleInput.saleCart = this.createSaleInput.saleCart.filter(item => item._id !== id);
    this.onCalculateSubTotal()
  }

  getSelectDeviceAndService() {
    let index = this.createSaleInput.saleCart.findIndex(item => item.is_device && item.isOpen == true)
    let device = null
    let service = null
    if (index !== -1) {
      device = this.createSaleInput.saleCart[index]
      let serviceIndex = device.deviceProducts.findIndex(item => item.sell_line_product_type == SellLineProductType.Service && item.isOpen == true)
      if (serviceIndex !== -1) {
        service = device.deviceProducts[serviceIndex]
      }
    }
  }

  createSaleInputBackendMapper() {
    let createSaleInput = {
      transaction_type: this.createSaleInput.transaction_type,
      transaction_status: this.createSaleInput.transaction_status,
      transaction_date: this.createSaleInput.transaction_date,
      sub_total_amount: Number(this.createSaleInput.sub_total_amount),
      Tax: this.createSaleInput.Tax,
      tax_amount: this.createSaleInput.tax_amount,
      tax_value: Number(this.createSaleInput.tax_value),
      is_tax_percentage: this.createSaleInput.is_tax_percentage,
      discount_amount: Number(this.createSaleInput.discount_amount),
      discount_value: Number(this.createSaleInput.discount_value),
      is_discount_percentage: this.createSaleInput.is_discount_percentage,
      total_amount: parseFloat(this.createSaleInput.total_amount.toString()),
      is_private: this.createSaleInput.is_private,
      additional_notes: this.createSaleInput.additional_notes,
      Customer: this.getSelectedCustomerId(),
      BusinessLocation: this.createSaleInput.BusinessLocation,
      is_apply_sale_tax: this.createSaleInput.is_apply_sale_tax,
      TransactionSellLines: []
    }

    this.createSaleInput.saleCart.forEach(item => {
      if (item.is_device) {
        createSaleInput.TransactionSellLines.push(this.deviceMapper(item))
      } else if (item.is_item_with_multiple_supplier) {
        let products = this.productWithMultipleSupplierMapper(item)
        if (products.length > 0)
          products.forEach(element => {
            createSaleInput.TransactionSellLines.push(element)
          });
      } else {
        createSaleInput.TransactionSellLines.push(this.productMapper(item))
      }
    })
    console.log('create sale input', createSaleInput)
    return createSaleInput
  }

  deviceMapper(item) {
    let saleCartItem = {
      is_device: true,
      product_type: item.product_type,
      Product: item._id,
      product_sku: '',
      supplier_sku: '',
      quantity: 0,
      product_purchase_price: 0,
      product_sale_price: 0,
      is_discount_percentage: false,
      discount_amount: 0,
      discount_value: 0,
      sub_total_amount: Number(item.total_amount),
      total_amount: Number(item.total_amount),
      CustomProduct: null,
      deviceProducts: [],
      Device: item._id,
      DeviceCheckIn: item.DeviceCheckIn,
      serial_number: "",
    }
    item.deviceProducts.forEach(element => {
      if (element.is_item_with_multiple_supplier) {
        let products = this.productWithMultipleSupplierMapper(element)
        if (products.length > 0)
          products.forEach(productElement => {
            saleCartItem.deviceProducts.push(productElement)
          });
      } else {
        let product = this.productMapper(element)
        if (product.sell_line_product_type == SellLineProductType.Service && element['serviceProduct'].length > 0) {
          product['serviceProduct'] = this.productServiceMapper(element)
        }
        saleCartItem.deviceProducts.push(product)
      }
    });
    return saleCartItem
  }

  productServiceMapper(product) {

    let serviceProductList = []

    product.serviceProduct.forEach(element => {
      let serviceProduct = {
        serviceProductType: element.product_type,
        serviceProductId: element._id,
        serviceProductSKU: element.sku,
        serviceProductSupplier: element.Suppliers && element.Suppliers.length > 0 && element.Suppliers[0].supplier_id ? element.Suppliers[0].supplier_id._id : null,
        serviceProductQuantity: element.quantity,
        serviceProductCustomProduct: element.isCustomProduct ? element.CustomProduct : null
      }
      serviceProductList.push(serviceProduct)
    });

    return serviceProductList
  }

  productMapper(item) {
    if (item.isCustomProduct) {
      item.average_cost = item.CustomProduct.cost_price
    }
    if (item.product_type == 'giftCard') {
      item.average_cost = item.total_amount
      item.sell_price_inc_tax = item.total_amount
    }
    let saleCartItem = {
      is_device: false,
      product_type: item.product_type,
      sell_line_product_type: item.sell_line_product_type,
      Product: item._id,
      product_sku: item.sku ? item.sku : '',
      supplier_sku: item.supplier_sku,
      quantity: Number(item.quantity),
      product_purchase_price: item.average_cost ? parseFloat(item.average_cost) : 0,
      product_sale_price: Number(item.sell_price_inc_tax),
      is_discount_percentage: item.is_discount_percentage,
      discount_amount: Number(item.discount_amount),
      discount_value: Number(item.discount_value),
      sub_total_amount: Number(item.sub_total_amount),
      total_amount: Number(item.total_amount),
      CustomProduct: item.isCustomProduct ? item.CustomProduct : null,
      serial_number: item.serial_number,
      giftCard: item.product_type == 'giftCard' ? item.giftCard : null,
      Supplier: item.Suppliers && item.Suppliers.length > 0 && item.Suppliers[0].supplier_id ? item.Suppliers[0].supplier_id._id : null
    }
    return saleCartItem
  }

  productWithMultipleSupplierMapper(item) {
    let saleCartItem = []
    if (item.supplier_item)
      item.supplier_item.forEach(element => {
        if (element.quantity > 0) {
          let product = {
            is_device: false,
            product_type: item.product_type,
            sell_line_product_type: item.sell_line_product_type,
            Product: item._id,
            product_sku: item.sku ? item.sku : '',
            supplier_sku: element.supplier_sku,
            quantity: parseInt(element.quantity),
            product_purchase_price: item.average_cost,
            product_sale_price: Number(item.sell_price_inc_tax),
            is_discount_percentage: element.is_discount_percentage,
            discount_amount: Number(element.discount_amount),
            discount_value: Number(element.discount_value),
            sub_total_amount: Number(element.sub_total_amount),
            total_amount: Number(element.total_amount),
            CustomProduct: null,
            serial_number: item.serial_number,//to be added,
            Supplier: element.supplier_id
          }
          saleCartItem.push(product)
        }
      });
    return saleCartItem
  }

  createSaleInputFrontEndMapper(input) {
    console.log('Sale cart Input', input)
    this.customer = input.Customer
    this.selectedCustomerId = input.Customer._id
    let createSaleInput = {
      _id: input._id,
      transaction_date: input.transaction_date,
      transaction_type: input.transaction_type,
      transaction_status: input.transaction_status,
      sub_total_amount: input.sub_total_amount,
      Tax: input.Tax ? input.Tax._id : null,
      tax_amount: input.tax_amount,
      tax_value: input.tax_value,
      is_tax_percentage: input.is_tax_percentage,
      discount_amount: input.discount_amount,
      discount_value: input.discount_value,
      is_discount_percentage: input.is_discount_percentage,
      total_amount: input.total_amount,
      is_apply_sale_tax: input.is_apply_sale_tax,
      is_private: input.is_private,
      additional_notes: input.additional_notes,
      Customer: this.getSelectedCustomerId(),
      BusinessLocation: this.locationId,
      saleCart: []
    }

    input.TransactionCartLine.forEach(product => {
      if (product.is_device) {
        createSaleInput.saleCart.push(this.deviceInputFrontEndMapper(product))
      } else {
        createSaleInput.saleCart.push(this.productInputFrontEndMapper(product))
      }
    });


    this.setCreateSaleInput(createSaleInput)

  }

  deviceInputFrontEndMapper(input) {

    let device = {
      _id: input.Device._id,
      is_device: input.is_device,
      brand_model_name: input.Device.brand_model_name,
      product_type: ProductType.Product,
      device_color: input.Device.device_color,
      deviceBrand: input.Device.deviceBrand,
      deviceModel: input.Device.deviceModel,
      imei_ssn: input.Device.imei_ssn,
      Customer: this.customer,
      device_image: input.Device.device_image,
      device_keeping_unit: input.Device.device_keeping_unit,
      location_id: localStorage.getItem('location_id'),
      Checkin: input.DeviceCheckIns,
      DeviceCheckIn: input.DeviceCheckIns._id,
      deviceProducts: []
    }
    device['Checkin']['DeviceImages'] = input['DeviceCheckIns']['SourceFile']
    input.products.forEach(element => {
      device.deviceProducts.push(this.productInputFrontEndMapper(element))
    })
    return device
  }

  productInputFrontEndMapper(product) {
    // item.quantity = item.total_quantity
    if (product['product_type'] == "custom") {
      product['isCustomProduct'] = true
      product['is_product'] = true
      product['is_bundle_product'] = false
      product['product_name'] = product['CustomProduct'].name
      product['_id'] = product['CustomProduct']._id
      product.CustomProduct = {
        name: product.CustomProduct.name,
        quantity: product.CustomProduct.quantity,
        cost_price: product.CustomProduct.cost_price,
        selling_price: product.CustomProduct.selling_price,
        selling_price_include_tax: product.CustomProduct.sell_price_inc_tax,
        note: product.CustomProduct.note,
        is_taxable: product.CustomProduct.is_taxable,
        location_id: localStorage.getItem('location_id')
      }
    }
    product.sell_price_inc_tax = product.product_sale_price

    if (product.sell_line_product_type == SellLineProductType.Service && product.serviceProduct) {
      product.serviceProduct = this.serviceProdctFrontEndMapper(product)
    }

    return product
    // if (item.is_bundle_product) {
    //   item.bundle_products.bundleProduct.forEach(product => {
    //     product.bundleProductID.quantity = product.bundleProductID.total_quantity
    //   });
    // }
    //return item
  }

  serviceProdctFrontEndMapper(product) {
    let serviceProductList = []

    product.serviceProduct.forEach(element => {
      let serviceProductObj = {}

      if (element.serviceProductType == ProductType.Custom) {
        element.serviceCustomProductId.product_type = ProductType.Custom
        element.serviceCustomProductId['isCustomProduct'] = true
        element.serviceCustomProductId['is_product'] = true
        element.serviceCustomProductId['is_bundle_product'] = false
        element.serviceCustomProductId['product_name'] = element.serviceCustomProductId.name
      }
      element.serviceProductType == ProductType.Product ? this.assignProductType(element.serviceProductId) : this.assignProductType(element.serviceCustomProductId)
      serviceProductObj = element.serviceProductType == ProductType.Product ? element.serviceProductId : element.serviceCustomProductId
      serviceProductObj['product_type'] = element.serviceProductType

      serviceProductList.push(serviceProductObj)
    });
    return serviceProductList
  }

  isValidateCreateSaleInput() {
    let isValid = true
    if (this.customer == null) {
      this.createSaleService.showToaster(['Select Customer', 'error'])
      isValid = false
    } else if (this.createSaleInput.saleCart.length == 0) {
      this.createSaleService.showToaster(['Add product to cart', 'error'])
      isValid = false
    } else {
      this.createSaleInput.saleCart.forEach(item => {
        item.isOpen = false
        if (item.is_device) {
          if (!item.deviceProducts || item.deviceProducts.length == 0) {
            item.isOpen = true
            this.createSaleService.showToaster(['Add product to device', 'error'])
            isValid = false
          } else if (item.DeviceCheckIn == '' || !item.DeviceCheckIn) {
            item.isOpen = true
            this.createSaleService.showToaster(['Device Check-in required', 'error'])
            isValid = false
          } else if (item._id == '' || !item._id) {
            item.isOpen = true
            this.createSaleService.showToaster(['Device Id is required', 'error'])
            isValid = false
          }

          item.deviceProducts.forEach(deviceProduct => {
            deviceProduct.isOpen = false
            if (deviceProduct.is_item_with_multiple_supplier) {
              let totalQuantityInProduct = 0
              deviceProduct.supplier_item.forEach(element => {
                totalQuantityInProduct = Number(element.quantity) + totalQuantityInProduct
              });
              if (totalQuantityInProduct == 0) {
                item.isOpen = true
                deviceProduct.isOpen = true
                this.createSaleService.showToaster(["Add quantity to supplier's item in " + deviceProduct.product_name, 'error'])
                isValid = false
              }
            }
          });
        } else if (item.product_type == 'giftCard') {
          if (!item.giftCard || item.giftCard.amount == 0 || item.giftCard.amount == '' ||
            item.giftCard.to == '' || item.giftCard.from == '' || item.giftCard.subject == '' ||
            item.giftCard.send_gift_card == '' || item.giftCard.email == '') {
            this.createSaleService.showToaster(['Provide value to gift card', 'error'])
            item.isOpen = true
            isValid = false
          }
        } else if (item.is_item_with_multiple_supplier) {
          let totalQuantityInProduct = 0
          item.supplier_item.forEach(element => {
            totalQuantityInProduct = Number(element.quantity) + totalQuantityInProduct
          });
          if (totalQuantityInProduct == 0) {
            item.isOpen = true
            this.createSaleService.showToaster(["Add quantity to supplier's item in" + item.product_name, 'error'])
            isValid = false
          }
        }
      })
    }
    return isValid
  }


  getSelectedCustomer() {
    return this.customer
  }

  getSelectedDeviceById(id) {
    return this.createSaleInput.saleCart.filter(dev => dev.is_device && dev._id == id);
  }

  getSelectedDevice() {
    let index = this.createSaleInput.saleCart.findIndex(item => item.is_device && item.isOpen == true)
    return index == -1 ? null : this.createSaleInput.saleCart[index]
  }

  getCustomProductCount() {
    return this.createSaleInput.saleCart.filter(dev => !dev.is_device && dev.isCustomProduct).length;
  }

  setCheckInData(data) {
    this.createSaleInput.saleCart[this.createSaleInput.saleCart.findIndex(item => item._id == data.Device)]['Checkin'] = data
    this.createSaleInput.saleCart[this.createSaleInput.saleCart.findIndex(item => item._id == data.Device)]['DeviceCheckIn'] = data.checkinId
    // this.createSaleInput.saleCart.filter(dev => dev.is_device && dev._id == data.Device);  
    console.log('sale cart data is ', this.createSaleInput);
  }

  setCheckInImages(id, img) {
    this.createSaleInput.saleCart[this.createSaleInput.saleCart.findIndex(item => item._id == id)]['Checkin']['DeviceImages'] = img
    console.log('sale cart updated', this.createSaleInput.saleCart);

  }

}
