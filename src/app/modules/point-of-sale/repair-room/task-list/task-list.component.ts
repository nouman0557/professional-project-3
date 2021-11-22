import { Component, OnInit } from '@angular/core';
import { RepairRoomService } from "src/app/services/repair-room/repair-room.service"
import { RepairRoomGQLService } from 'src/app/services/repair-room/repair-room-gql.service'
import { TaskEnum, DateFilterEnum } from 'src/app/generated/graphql';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { element } from 'protractor';


@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList = []
  taskStatus = []
  limit = 100
  skip = 0
  total = 0
  isLoading = false
  searchText: FormControl = new FormControl()
  repairRoomFilters = {
    task: TaskEnum.All,
    dateFilter: DateFilterEnum.None,
    startDate: null,
    endDate: null,
    search: null,
    status: null
  }
  TaskEnum = TaskEnum
  DateFilterEnum = DateFilterEnum

  hideToaster: boolean = true
  toasterMsg: String = ''
  toasterType: String = ''
  isMarkAll = false

  constructor(private _repairRoom: RepairRoomService,
    private _repairRoomGQL: RepairRoomGQLService) { }

  ngOnInit() {
    this.getRepairRoomTaskList()
    this.getTaskStatus()

    this.searchText.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      this.repairRoomFilters.search = this.searchText.value
      this.getRepairRoomTaskList()
    })
  }

  setRepairRoomStatusFilter() {
    let status: any = []
    this.taskStatus.forEach(element => {
      if (element.checked) {
        status.push(element.status_background_color)
      }
    });
    this.repairRoomFilters.status = status
    this.getRepairRoomTaskList()
  }

  setRepairRoomDefaultFilters() {
    this.repairRoomFilters = {
      task: TaskEnum.All,
      dateFilter: DateFilterEnum.None,
      startDate: null,
      endDate: null,
      search: null,
      status: null
    }

    this.taskStatus.forEach(element => {
      element.checked = false
    });

    this.getRepairRoomTaskList()
  }
  setRepairRoomTaskFilter(filter) {
    this.repairRoomFilters.task = filter
    this.getRepairRoomTaskList()
  }
  setRepairRoomDateFilter(filter) {
    this.repairRoomFilters.startDate = null
    this.repairRoomFilters.endDate = null
    this.repairRoomFilters.dateFilter = filter
    this.getRepairRoomTaskList()
  }
  setRepairRoomDataRageFilter(startDate, endDate) {
    this.repairRoomFilters.dateFilter = DateFilterEnum.None
    this.repairRoomFilters.startDate = startDate
    this.repairRoomFilters.endDate = endDate
    this.getRepairRoomTaskList()
  }
  setRepairRoomSearchFilter(searchTxt) {
    this.setRepairRoomDefaultFilters()
    this.repairRoomFilters.search = searchTxt
    this.getRepairRoomTaskList()
  }
  isSelectAll = false
  onSelectAll(isSelect: boolean) {
    this.taskList.forEach(element => {
      element.checked = isSelect
    });
    this.isSelectAll = isSelect
  }


  getRepairRoomTaskList() {
    this.isLoading = true
    this._repairRoomGQL.getRepairRoomTaskList(this.repairRoomFilters, localStorage.getItem('location_id'), this.limit, this.skip)
      .subscribe((res) => {
        this.taskList = res.data.repairRoomListing.repairRoomTransactions
        this.total = res.data.repairRoomListing.total
        this._repairRoom.setTaskList(this.taskList)
        this.isLoading = false
      }, (err) => {
        this.isLoading = false
        console.log(err.message)
      })
  }

  getTaskStatus() {
    if (this._repairRoom.getTaskStatus().length != 0) {
      this.taskStatus = this._repairRoom.getTaskStatus()
      return
    }

    this._repairRoomGQL.getRepairRoomTaskStatus()
      .subscribe((res) => {
        this.taskStatus = res.data.repairRoomStatus

        this.taskStatus.forEach(element => {
          switch (element.status_name) {
            case 'Working on it':
              element.class_name = 'workingCheck'
              element.class_name_detail = "workingOnitBox"
              break
            case 'Stuck':
              element.class_name = 'stuckCheck'
              element.class_name_detail = "stuckBox"
              break;
            case 'Done':
              element.class_name = 'doneCheck'
              element.class_name_detail = "doneBox"
              break
            case 'Not started':
              element.class_name = 'notStartedCheck'
              element.class_name_detail = "notStartedBox"
              break
          }
        });
        this._repairRoom.setTaskStatus(this.taskStatus)
      }, (err) => {
        console.log('Error', err.message)
      })
  }

  isTaskSelect() {
    let list = this.taskList.filter(element => element.checked)
    return list.length <= 0 || list.length == this.taskList.length
  }
  
  onMarkTaskAsDone() {
    let ids: any = []
    this.taskStatus
    this.taskList.forEach(element => {
      if (element.checked || this.isMarkAll) {
        ids.push(element._id)
      }
    });

    if (ids.length > 0) {
      this._repairRoomGQL.markTaskAsDone(ids, localStorage.getItem('location_id'))
        .subscribe((res) => {
          this._repairRoom.showToaster(['Order(s) updated successfully', 'success'])
          this.getRepairRoomTaskList()
        }, (err) => {
          this._repairRoom.showToaster([err.message, 'error'])
        })
    } else
      this._repairRoom.showToaster(['Select order to mark as done', 'error'])
  }

  onSelectTaskDetail(taskId) {
    this._repairRoom.setTaskId(taskId)
    this._repairRoom.isListing = false;
  }

  SelectAllDropOrders = false
  openSelectAllOrders() {
    this.SelectAllDropOrders = !this.SelectAllDropOrders;
  }
  SelectAllDropTasks = false
  openSelectAllTasks() {
    this.SelectAllDropTasks = !this.SelectAllDropTasks;
  }
  ordersSettingsOpen = false
  openOrdersSettings() {
    this.ordersSettingsOpen = !this.ordersSettingsOpen;
  }

  changeStatus = 'Working on it'
  changeStatusValue(type, val) {
    this[type] = val
  }



}
