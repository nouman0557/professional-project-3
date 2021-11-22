import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ModalModule, TabsModule, AccordionModule, TooltipModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CreateSaleRoutingModule } from './create-sale-routing.module';

import { CreateSaleComponent } from './create-sale/create-sale.component';
import { CustomersModule } from './../customers/customers.module'
import { SaleCartComponent } from './sale-cart/sale-cart.component'
import { ProductListComponent } from './product-list/product-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { SaleGiftComponent } from './sale-cart/sale-gift/sale-gift.component';

import { SaleDeviceProductComponent } from './sale-cart/sale-device-product/sale-device-product.component';
import { SaleProductComponent } from './sale-cart/sale-product/sale-product.component';
import { DeviceCheckinComponent } from './device-checkin/device-checkin.component';
import { CartAccordionComponent } from './sale-cart/cart-accordion/cart-accordion.component';
import { SaleProcductWithMultipleSupplierComponent } from './sale-cart/sale-procduct-with-multiple-supplier/sale-procduct-with-multiple-supplier.component';

// import { CreateSaleGQLService } from 'src/app/services/create-sale/create-sale-gql.service';
// import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
// import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service'


import { SharedModule } from '../../shared/shared.module';
import { UtilitiesModule } from 'src/app/utilties/utilities.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import { AddCustomerDeviceComponent } from '../customers/add-customer-device/add-customer-device.component';
import { SharedTemplatesModule } from '../shared-templates/shared-templates.module';
import { SaleServiceComponent } from './sale-cart/sale-service/sale-service.component';

@NgModule({
  declarations: [
    CreateSaleComponent,
    SaleCartComponent,
    ProductListComponent,
    DeviceListComponent,
    SaleGiftComponent,
    SaleDeviceProductComponent,
    SaleProductComponent,
    DeviceCheckinComponent,
    CartAccordionComponent,
    SaleProcductWithMultipleSupplierComponent,
    SaleServiceComponent
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CustomersModule,
    CommonModule,
    CreateSaleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    SharedModule,
    InfiniteScrollModule,
    UtilitiesModule,
    NgxBarcodeModule,
    NgxPrintModule,
    SharedTemplatesModule
  ],
  providers: [
    // CreateSaleGQLService,
    // CreateSaleService,
    // SaleCartService
  ],
  exports:[
    DeviceCheckinComponent
  ]
})
export class CreateSaleModule { }
