import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PointofsaleRoutingModule } from '../point-of-sale/point-of-sale-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UtilitiesModule } from 'src/app/utilties/utilities.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [HeaderComponent,
    FooterComponent],
  imports: [
    CommonModule,
    PointofsaleRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    UtilitiesModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    AngularDraggableModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule {
}
