import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './tickets/tickets.component';
import { StockComponent } from './stock/stock.component';
import { ReportsComponent } from './reports-old/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { ModalModule, TabsModule, AccordionModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { PointofsaleComponent } from './point-of-sale.component';
import { PointofsaleRoutingModule } from './point-of-sale-routing.module';
import { CreateSaleServiceOld } from 'src/app/services/create-sale/create-sale-old.service';
import { HomeService } from 'src/app/services/home/home.service';
import { CommonService } from 'src/app/services/common/common.service';
import { OrderAndSaleService } from 'src/app/services/order and invoice/order-and-sale.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { HeaderComponent } from '../layout/header/header.component'
import { Orders } from '../Globals/order'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TagInputModule } from 'ngx-chips';
import { CSVService } from 'src/app/services/csv.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PoOrder } from '../Globals/po-order';
import { DiscountsComponent } from './discounts/discounts.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FranchiseComponent } from './franchise/franchise.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import { SelectModule } from 'ng2-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { UtilitiesModule } from 'src/app/utilties/utilities.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
// import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';
import { NgxBarcodeModule } from 'ngx-barcode';
import { SharedModule } from '../shared/shared.module';
import { SortableModule } from 'ngx-bootstrap';
import { BuybackProgramComponent } from './stock/buyback-program/buyback-program.component';
import { supplierBuyBack } from '../shared/Filters/supplierIsBuyBackPipe'
import { OrderStatuesComponent } from './stock/buyback-program/order-statues/order-statues.component';
import { OrderProcessingListComponent } from './stock/buyback-program/order-processing-list/order-processing-list.component'
import { SupplierService } from 'src/app/services/stock/supplier.service';
import { ManageCreditComponent } from './stock/store-credit/manage-credit/manage-credit.component';
import { TransferCreditComponent } from './stock/store-credit/transfer-credit/transfer-credit.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TicketsGQLService } from 'src/app/services/order and invoice/ticketsGQLService';
import { TechbarAiComponent } from './techbar-ai/techbar-ai.component';
import {WebcamModule} from 'ngx-webcam';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedTemplatesModule } from './shared-templates/shared-templates.module';

@NgModule({
  declarations: [
    PointofsaleComponent,
    HomeComponent,
    TicketsComponent,
    StockComponent,
    ReportsComponent,
    SettingsComponent,
    DiscountsComponent,
    FranchiseComponent,
    BuybackProgramComponent,
    supplierBuyBack,
    OrderStatuesComponent,
    OrderProcessingListComponent,
    ManageCreditComponent,
    TransferCreditComponent,
    CheckoutComponent,
    TechbarAiComponent
  ],
  providers: [
    Orders,
    HomeService,
    HeaderComponent,
    CreateSaleServiceOld,
    CommonService,
    OrderAndSaleService,
    ProductsService,
    RepairRoomService,
    ReportsService,
    SettingsService,
    StockService,
    DatePipe,
    CSVService,
    PoOrder,
    SupplierService,
    TicketsGQLService,
  ],
  imports: [
    PointofsaleRoutingModule,
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    AccordionModule.forRoot(),
    LayoutModule,
    BsDatepickerModule.forRoot(),
    TagInputModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    InfiniteScrollModule,
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    // SelectModule,
    UtilitiesModule,
    NgxBarcodeModule,
    SortableModule.forRoot(),
    // DatetimePopupModule.forRoot(),
    NgCircleProgressModule.forRoot({
      "maxPercent": 100,
      "space": -8,
      "radius": 100,
      "subtitle": [
        "To Reach Daily Goals"
      ],
      "titleFontSize": "44",
      "unitsFontSize": "44",
      "subtitleFontSize": "16",
      "imageHeight": 150,
      "imageWidth": 150,
      "animation": true,
      "animateTitle": true,
      "animateSubtitle": true,
      "animationDuration": 1000,
      "showUnits": true,
      "responsive": true
    }),
    NgxIntlTelInputModule,
    GooglePlaceModule,
    SharedModule,
    WebcamModule,
    NgSelectModule,
    // SharedTemplatesModule
  ]
})
export class PointOfSaleModule { }
