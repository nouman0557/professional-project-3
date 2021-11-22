import { Component, OnInit } from '@angular/core';
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service'

@Component({
  selector: 'app-device-comment',
  templateUrl: './device-comment.component.html',
  styleUrls: ['./device-comment.component.css']
})
export class DeviceCommentComponent implements OnInit {

  constructor(private _repairRoomService: RepairRoomService) { }

  ngOnInit() {
    this._repairRoomService.setTabTile('','','Comms')
    this._repairRoomService.setActiveTab(false,true)
  }
  
  messageSettingsOpen = false;
  openMessageSettings() {
    this.messageSettingsOpen = !this.messageSettingsOpen;
  }
  
}
