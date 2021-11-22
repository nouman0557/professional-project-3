import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service'

@Component({
  selector: 'app-device-checkin-rep',
  templateUrl: './device-checkin.component.html',
  styleUrls: ['./device-checkin.component.css']
})
export class DeviceCheckinComponent implements OnInit {

  constructor(
    private _repairRoomService: RepairRoomService,
    private router: Router,
    ) { }

  deviceData=[]
  devData:any
  cusData:any
  ngOnInit() {
    this._repairRoomService.setTabTile('', 'Device-Checkin', '')
    this._repairRoomService.setActiveTab(true, false)
    this.devData=this._repairRoomService.getDeviceId()
    this.cusData=this._repairRoomService.getCustomerId()
  }

}
