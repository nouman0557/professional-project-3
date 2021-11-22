import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ModalModule, TabsModule, AccordionModule, TooltipModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../../shared/shared.module';
import { UtilitiesModule } from 'src/app/utilties/utilities.module';
import { NgSelectModule } from '@ng-select/ng-select';


import { RepairRoomRoutingModule } from './repair-room-routing.module';

import { RepairRoomComponent } from "./repair-room.component"
import { ExtraItemComponent } from "./extra-item/extra-item.component"
import { DeviceCheckinComponent } from "./device-checkin/device-checkin.component"
import { DeviceCommentComponent } from "./device-comment/device-comment.component"
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
//import { DeviceCheckinComponent } from '../create-sale/device-checkin/device-checkin.component'
import { CreateSaleModule } from '../create-sale/create-sale.module';




@NgModule({
  declarations: [
    RepairRoomComponent,
    ExtraItemComponent,
    DeviceCheckinComponent,
    DeviceCommentComponent,
    TaskListComponent,
    TaskDetailComponent
  ],

  imports: [
    CommonModule,
    RepairRoomRoutingModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CommonModule,
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
    CreateSaleModule,
    NgSelectModule
  ],
  providers: [
  ]
})
export class RepairRoomModule { }
