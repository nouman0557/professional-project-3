import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PointOfSaleModule } from './modules/point-of-sale/point-of-sale.module';
import { AccountModule } from './modules/account/account.module';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ToastrModule } from 'ngx-toastr';
import { DefaultOptions } from 'apollo-client';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UtilitiesModule } from './utilties/utilities.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from './modules/shared/shared.module';
import { CurrencyPipe } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PrintLayoutComponent } from './print/print-layout/print-layout.component';
import { InvoiceComponent } from './print/invoice/invoice.component';
import { DevicePrintLabelComponent } from './print/device-print-label/device-print-label.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { AngularDraggableModule } from 'angular2-draggable';
import { NgSelectModule } from '@ng-select/ng-select';

import { CreateSaleGQLService } from 'src/app/services/create-sale/create-sale-gql.service';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    PrintLayoutComponent,
    InvoiceComponent,
    DevicePrintLabelComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxIntlTelInputModule,
    AppRoutingModule,
    HttpClientModule,
    TabsModule.forRoot(),
    FormsModule,
    NgSelectModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    PointOfSaleModule,
    AccountModule,
    ApolloModule,
    HttpLinkModule,
    ImageCropperModule,
    UtilitiesModule,
    InfiniteScrollModule,
    NgxBarcodeModule,
    ToastrModule.forRoot({
      tapToDismiss: true,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    }),
    NgOtpInputModule,
    SharedModule,

  ],
  exports: [
    NgSelectModule,
  ],
  providers: [
    EnvironmentUrl,
    CurrencyPipe,
    CreateSaleGQLService,
    CreateSaleService,
    SaleCartService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  url = ''
  constructor(apollo: Apollo, httpLink: HttpLink) {
    this.url = EnvironmentUrl.getAPIUrl
    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
    let authLink = new ApolloLink((operation, forward) => {
      let token = localStorage.getItem('token');
      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          'x-token': token ? `${token}` : ''
        }
      });
      // Call the next link in the middleware chain.
      return forward(operation);
    });

    apollo.create({
      link: authLink.concat(httpLink.create({ uri: this.url })),
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions
    });
  }
}
