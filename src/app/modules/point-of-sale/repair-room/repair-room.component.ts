import { Component, OnInit } from '@angular/core';
import { RepairRoomService } from "src/app/services/repair-room/repair-room.service"
@Component({
  selector: 'app-repair-room',
  templateUrl: './repair-room.component.html',
  styleUrls: ['./repair-room.component.css']
})
export class RepairRoomComponent implements OnInit {

  activeTab = {
    rightTab1: false,
    rightTab2: false,
  }

  tabTitle = {
    leftTabTitle: 'REPAIR ROOM',
    rightTabTitle1: 'EXTRA ITEMS',
    rightTabTitle2: 'COMMS',
  }

  hideToaster: boolean = true
  toasterMsg: String = ''
  toasterType: String = ''

  $toraster: any

  constructor(private _repairRoomService: RepairRoomService) { }

  ngOnInit() {
    this.activeTab = this._repairRoomService.getActiveTab()
    this.tabTitle = this._repairRoomService.getTabTitle()
    this.$toraster = this._repairRoomService.onShowToaster$.subscribe((res) => {
      this.toasterFunction(res[0], res[1])
    });
  }

  toasterFunction(message, status) {
    this.hideToaster = false
    this.toasterMsg = message
    this.toasterType = status
  }
  closeToaster() {
    this.hideToaster = true
  }
  
  goToComponent(componentName, data = null) {
    this._repairRoomService.goToComponent(componentName, data)
  }

}
