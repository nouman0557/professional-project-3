import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ModalModule, TabsModule, AccordionModule, BsDatepickerModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component'
import { CustomerListingComponent } from './customer-listing/customer-listing.component'
import { CustomerDetailsComponent } from './customer-details/customer-details.component'
import { CustomerAddComponent } from './customer-add/customer-add.component'
import { SharedModule } from '../../shared/shared.module';
import { AddCustomerDeviceComponent } from './add-customer-device/add-customer-device.component';
import { UtilitiesModule } from 'src/app/utilties/utilities.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { DeviceHistoryComponent } from './device-history/device-history.component';
import { SharedTemplatesModule } from '../shared-templates/shared-templates.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CustomerTicketsComponent } from './customer-tickets/customer-tickets.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerListingComponent, 
    CustomerDetailsComponent,
    CustomerAddComponent,
    AddCustomerDeviceComponent,
    DeviceHistoryComponent,
    CustomerTicketsComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule,
    InfiniteScrollModule,
    TooltipModule.forRoot(),
    UtilitiesModule,
    NgxBarcodeModule,
    BsDropdownModule.forRoot(),
    SharedTemplatesModule,
    PdfViewerModule,
    NgSelectModule,
    
  ],
  exports:[
    AddCustomerDeviceComponent,
  ]
})
export class CustomersModule { }
