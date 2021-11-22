import { Injectable, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RepairRoomGQLService } from './repair-room-gql.service'
import { TaskEnum, DateFilterEnum } from 'src/app/generated/graphql';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RepairRoomService {

  taskList = []
  taskStatus = []
  isListing = true
  modalRef: BsModalRef;
  isLoading = false
  deviceId: any
  activeTab = {
    rightTab1: false,
    rightTab2: false,
  }
  tabTitle = {
    leftTabTitle: 'REPAIR ROOM',
    rightTabTitle1: 'EXTRA ITEMS',
    rightTabTitle2: 'COMMS',
  }
  taskId = null
  taskDetail = {}

  // Observable string sources
  private showToasterSource = new Subject<any>();
  // Observable string streams
  onShowToaster$ = this.showToasterSource.asObservable();
  private deviceDetailsSource = new Subject<any>();
  private checkExtraItem = new Subject<any>();
  deviceDetails$ = this.deviceDetailsSource.asObservable();
  checkExtraItem$ = this.checkExtraItem.asObservable();
  constructor(
    private _repairRoomGQL: RepairRoomGQLService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  goToComponent(component: string, data: any = null) {
    this.router.navigate(['/', 'Pointofsale', 'RepairRoom', component], { state: { data: data } });
  }

  setTabTile(leftTabTitle, rightTabTitle1, rightTabTitle2) {
    this.tabTitle.leftTabTitle = leftTabTitle != '' ? leftTabTitle : this.tabTitle.leftTabTitle
    this.tabTitle.rightTabTitle1 = rightTabTitle1 != '' ? rightTabTitle1 : this.tabTitle.rightTabTitle1
    this.tabTitle.rightTabTitle2 = rightTabTitle2 != '' ? rightTabTitle2 : this.tabTitle.rightTabTitle2
  }

  setActiveTab(righTab1: boolean, rightTab2: boolean) {
    this.activeTab.rightTab1 = righTab1
    this.activeTab.rightTab2 = rightTab2
  }

  getTabTitle() {
    return this.tabTitle
  }

  getActiveTab() {
    return this.activeTab
  }

  setTaskList(taskList) {
    this.taskList = taskList
  }

  getTaskList() {
    return this.taskList
  }

  setTaskStatus(taskStatus) {
    this.taskStatus = taskStatus
  }

  getTaskStatus() {
    return this.taskStatus
  }

  setTaskId(taskID) {
    this.taskId = taskID
  }
  getTaskId() {
    return this.taskId
  }

  setTaskDetail(taskDetail) {
    this.taskDetail = taskDetail
  }

  getTaskDeatil() {
    return this.taskDetail
  }


  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  closeModel() {
    this.modalService.hide(1)
  }

  isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  // Service message commands
  showToaster(valueArray: any) {
    this.showToasterSource.next(valueArray);
  }

  tempDataForReturnCheckIn = []
  setDeviceDetails(valueArray: any) {
    this.deviceDetailsSource.next(valueArray);
    this.tempDataForReturnCheckIn = valueArray
  }

  getTempDataForReturnCheckIn() {
    return this.tempDataForReturnCheckIn
  }

  time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ' hrs';
  }

  getDeviceId() {
    return this.deviceId
  }

  setDeviceId(id) {
    this.deviceId = id
  }

  setCustomerId(id) {
    this.customerId = id
  }
  customerId: any
  getCustomerId() {
    return this.customerId
  }

  setCheckExtraItem(valueArray: any) {
    this.checkExtraItem.next(valueArray);
  }

  deviceItemMapper(input) {
    let deviceItem = {
      _id: input._id,
      product_type: input.product_type,
      sell_line_product_type: input.sell_line_product_type,
      customProduct: null,
      Product: input.Product,
      service_status: {
        status_background_color: "#808080",
        status_font_color: "#fff",
        status_icon: null,
        status_name: "Not started",
        status_type: null,
        __typename: "labelStatus"
      },
      repair_room_item_type: null,
      time_log: 0,
      class_name_detail_parent: "notStartedStatus"
    }
    return deviceItem
  }


}
