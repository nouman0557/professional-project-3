import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { AccountComponent } from './account.Component';
import { LoginService } from 'src/app/services/account/login.service';
import { RegisterService } from 'src/app/services/account/register.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgSelectModule } from '@ng-select/ng-select';
import { UtilitiesModule } from 'src/app/utilties/utilities.module';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
  AccountComponent,
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  // AutofocusDirective
],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    NgxIntlTelInputModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    NgSelectModule,
    GooglePlaceModule,
    UtilitiesModule,
    NgOtpInputModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
  ],
  providers:[
    LoginService,
    RegisterService
  ]
})
export class AccountModule { }
