import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ModalModule, TabsModule, AccordionModule, BsDatepickerModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImportItemsComponent } from './import-items/import-items.component';
import { CustomersRoutingModule } from '../customers/customers-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UtilitiesModule } from 'src/app/utilties/utilities.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { PayWithCardComponent } from './pay-with-card/pay-with-card.component';
import { YesNoComponent } from './yes-no/yes-no.component';
import { DownloadFileComponent } from './download-file/download-file.component';

@NgModule({
  declarations: [
    ImportItemsComponent,
    PayWithCardComponent,
    YesNoComponent,
    DownloadFileComponent
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
  ],
  exports:[
    ImportItemsComponent,
    PayWithCardComponent,
    YesNoComponent,
    DownloadFileComponent
  ]
})
export class SharedTemplatesModule { }
