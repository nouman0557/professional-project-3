import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LunaGuardService } from 'src/app/guard/luna-guard.service';
import { RepairRoomComponent } from "./repair-room.component"
import { ExtraItemComponent } from "./extra-item/extra-item.component"
import { DeviceCheckinComponent } from "./device-checkin/device-checkin.component"
import { DeviceCommentComponent } from "./device-comment/device-comment.component"


const routes: Routes = [
  {
    path: '',
    component: RepairRoomComponent,
    canActivate: [LunaGuardService],
    children:[
      {
        path: '',
        component: ExtraItemComponent,
      },
      {
        path: 'device-checkin',
        component: DeviceCheckinComponent
      },
      {
        path: 'device-comment',
        component: DeviceCommentComponent
      } 
      , {
        path: 'extra-item',
        component: ExtraItemComponent,
        data: { checkin: '1' },
      },
    ]
  }
];

// {
//   path: 'Device/Check-In/:deviceId',
//   component: DeviceCheckinComponent,
//   outlet: 'right-panel',
//   data: { navigationSource: 'repairRoom' },
// },

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoomRoutingModule { }
