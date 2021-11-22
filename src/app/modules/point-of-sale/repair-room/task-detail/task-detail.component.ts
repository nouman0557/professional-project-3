import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RepairRoomService } from "src/app/services/repair-room/repair-room.service"
import { RepairRoomGQLService } from "src/app/services/repair-room/repair-room-gql.service"
import { RepeatingServiceCall } from "src/app/services/repair-room/RepeatingServiceCall"
import { EnvironmentUrl } from 'src/environments/environment-url';
import { ServiceItemEnum, AlertTypeEnum } from 'src/app/generated/graphql'
import { ExtraItemComponent } from '../extra-item/extra-item.component';


@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @ViewChild("extraItem", { static: true }) extraItem: ExtraItemComponent
  @Output() public getRepairRoomTaskList: EventEmitter<any> = new EventEmitter();
  taskDetail = {}
  isLoading = false
  taskStatus = []
  technicianList = []
  selectedDeviceDetail: any
  selectedTaskItem: any
  imageBasePath = EnvironmentUrl.Images
  transactionId
  timerTimeDelay = 60000 // 1 min
  purchaseAlertMessage = ''
  isPreventToggle = false
  ServiceItemEnum = ServiceItemEnum

  showSupplierToOrderPart = false
  selectedSupplier
  supplierCompanyName = ''
  productQunatity = 0
  productSuppliersInfo = []

  orderPart = {
    showSupplierToOrderPart: false,
    supplier: {},
    supplierCompanyName: '',
    productQunatity: 0,
    product: {}
  }
  $checkExtraItem: any
  constructor(
    private _repairRoom: RepairRoomService,
    private _repairRoomGQL: RepairRoomGQLService) { }

  test: any
  ngOnInit() {
    this.getRepairRoomTaskDetail()
    this.getAllTechnicianList()
    this.taskStatus = this._repairRoom.getTaskStatus()
    this.$checkExtraItem = this._repairRoom.checkExtraItem$.subscribe((res) => {
      if (res) {
        this.getRepairRoomTaskDetail()
      }
    });
  }

  getRepairRoomTaskDetail(taskId = this._repairRoom.getTaskId()) {
    this.isLoading = true
    this._repairRoomGQL.getRepairRoomTaskDetail(localStorage.getItem('location_id'), taskId)
      .subscribe((res) => {
        this.isLoading = false
        this._repairRoom.setTaskDetail(res.data.repairRoomInvoiceDetail)
        this.taskDetail = this._repairRoom.getTaskDeatil()
        console.log('Task Details--->', this.taskDetail)
        this.transactionId = this.taskDetail['Transaction']['_id']
        this.assignCssClasses()
        this.initTaskDetailTimer()

      }, (err) => {
        this.isLoading = false
        this._repairRoom.showToaster([err.message, 'error'])
      })
  }

  updateRepirRoomTaskList() {
    this.getRepairRoomTaskList.emit();
  }
  onBackButtonClick() {
    this._repairRoom.isListing = true;
    this._repairRoom.setDeviceDetails(null)
    this.updateRepirRoomTaskList()
  }

  getAllTechnicianList() {
    this._repairRoomGQL.getAllTechnicianList(localStorage.getItem('location_id'))
      .subscribe((res) => {
        this.technicianList = res.data.TechnicianList
        console.log('technicianList', this.technicianList)
      }, (err) => {
        this._repairRoom.showToaster([err.message, 'error'])
      })
  }

  assignCssClasses() {
    this.taskDetail['Devices'].forEach(element => {
      element.deviceItems.forEach(item => {
        item.isTypeOpen = false
        item.isStatusOpen = false
        item.isAlertOpen = false
        this.changeStatus = item.service_status.status_name
        switch (item.service_status.status_name) {
          case 'Working on it':
            item.class_name_detail_parent = "workingOnitStatus"
            break;
          case 'Stuck':
            item.class_name_detail_parent = "stuckStatus"
            break;
          case 'Done':
            item.class_name_detail_parent = "doneStatus"
            break
          case 'Not started':
            item.class_name_detail_parent = "notStartedStatus"
            break
          case 'Reopen':
            item.class_name_detail_parent = "reOpenStatus"
            break
        }
        

        switch (item.repair_room_item_type) {
          case ServiceItemEnum.Defective:
            item.item_type_icon = "icon-verify_supplier"
            break;
          case ServiceItemEnum.Defective:
            item.item_type_icon = "icon-delete"
            break
          case ServiceItemEnum.Exchange:
            item.item_type_icon = "fas fa-exchange-alt"
            break
          default:
            item.item_type_icon = "fas fa-th-large"
        }

        item.Product.serviceProduct.forEach(element => {
          switch (element.service_repair_room_item_type) {
            case ServiceItemEnum.Defective:
              element.service_product_item_type_icon = "icon-verify_supplier"
              break;
            case ServiceItemEnum.Damaged:
              element.service_product_item_type_icon = "icon-delete"
              break
            case ServiceItemEnum.Exchange:
              element.service_product_item_type_icon = "fas fa-exchange-alt"
              break
            default:
              element.service_product_item_type_icon = "fas fa-th-large"
          }
        });

      });


    });
  }

  initTaskDetailTimer() {

    this.taskDetail['Transaction']['total_repair_time_string'] = this._repairRoom.time_convert(this.taskDetail['Transaction']['total_repair_time'])

    this.taskDetail['Devices'].forEach(device => {
      device.device_total_repair_time_string = this._repairRoom.time_convert(device.device_total_repair_time)

      device.deviceItems.forEach(service => {
        service.isStartTimer = false
        service.time_log_string = this._repairRoom.time_convert(service.time_log)

        service.timerCaller = new RepeatingServiceCall<any>(this.timerTimeDelay);
        service.timerCaller.observable$.subscribe(() => {
          service.time_log += 1
          device.device_total_repair_time += 1
          this.taskDetail['Transaction']['total_repair_time'] += 1

          service.time_log_string = this._repairRoom.time_convert(service.time_log)
          device.device_total_repair_time_string = this._repairRoom.time_convert(device.device_total_repair_time)
          this.taskDetail['Transaction']['total_repair_time_string'] = this._repairRoom.time_convert(this.taskDetail['Transaction']['total_repair_time'])
        })
        service.timerCaller.stop()
      });
    });
  }

  assignTechnicialToDevice(deviceDetail, technician, locationID = localStorage.getItem('location_id')) {
    let deviceId = deviceDetail['device']['_id']
    let technicianId = technician['id']

    this._repairRoomGQL.assignTechnicialToDevice(this.transactionId, deviceId, technicianId, locationID)
      .subscribe((res) => {
        deviceDetail.technicion = res.data.technicianAssignToDevice
        this._repairRoom.showToaster(['Technicial assign to device', 'success'])
      }, (err) => {
        this._repairRoom.showToaster([err.message, 'error'])
      })
  }

  timeLeft: number = 60;
  interval;

  pauseTimer() {
    clearInterval(this.interval);
  }

  noOpenAccordian(e) {
    // e.stopPropagation();
  }

  openDeviceId = ''
  clickOnService = false
  openExtraItemSession(index) {
    console.log('Task Details-->', this.taskDetail)
    let selectedDevice = this.taskDetail['Devices'][index]
    let data = {}
    // if (this.taskDetail['Devices'][index]._id == this.openDeviceId) {
    //   this.openDeviceId = this.taskDetail['Devices'][index]._id 
    //   return
    // }
    if (this.clickOnService) {
      this.clickOnService = false
      return
    }
    this.openDeviceId = this.taskDetail['Devices'][index]._id
    data['transactionKeepingUnit'] = this.taskDetail['Transaction'].transaction_keeping_unit
    data['deviceModelName'] = selectedDevice.device.deviceBrand && selectedDevice.device.deviceBrand.brand_name
    data['deviceId'] = selectedDevice.device._id
    data['device_keeping_unit'] = selectedDevice.device.device_keeping_unit
    data['customerId'] = this.taskDetail['Transaction'].Customer._id
    data['first_name'] = this.taskDetail['Transaction'].Customer.first_name
    data['last_name'] = this.taskDetail['Transaction'].Customer.last_name
    data['phone'] = this.taskDetail['Transaction'].Customer.phone
    data['transactionId'] = this.taskDetail['Transaction']._id
    data['deviceSelectedForProduct'] = true
    data['sellLineID'] = this.taskDetail['Transaction']._id
    data['sellLineServiceModelID'] = this.taskDetail['Transaction']._id
    data['itemArrayIds'] = []
    for (let i = 0; i < this.taskDetail['Devices'][index]['deviceItems'].length; i++) {
      data['itemArrayIds'].push(this.taskDetail['Devices'][index]['deviceItems'][i]['Product']['_id'])
    }
    data['addItem'] = true
    this._repairRoom.setDeviceDetails(data)
  }

  openDeviceServiceId = ''
  openExtraItemSessionNew(index, dService) {
    this.clickOnService = true
    let selectedDevice = this.taskDetail['Devices'][index]
    let data = {}
    // if (dService._id == this.openDeviceServiceId) {
    //   this.openDeviceServiceId =dService._id 
    //   return
    // }
    this.openDeviceServiceId = dService._id
    data['transactionKeepingUnit'] = this.taskDetail['Transaction'].transaction_keeping_unit
    data['deviceModelName'] = selectedDevice.device.deviceBrand && selectedDevice.device.deviceBrand.brand_name
    data['deviceId'] = selectedDevice.device._id
    data['device_keeping_unit'] = selectedDevice.device.device_keeping_unit
    data['customerId'] = this.taskDetail['Transaction'].Customer._id
    data['first_name'] = this.taskDetail['Transaction'].Customer.first_name
    data['last_name'] = this.taskDetail['Transaction'].Customer.last_name
    data['phone'] = this.taskDetail['Transaction'].Customer.phone
    data['transactionId'] = this.taskDetail['Transaction']._id
    data['deviceSelectedForProduct'] = false
    data['sellLineID'] = dService._id
    data['sellLineServiceModelID'] = dService['Product']['serviceProduct']._id
    data['itemArrayIds'] = []
    for (let i = 0; i < this.taskDetail['Devices'][index]['deviceItems'].length; i++) {
      data['itemArrayIds'].push(this.taskDetail['Devices'][index]['deviceItems'][i]['Product']['_id'])
    }
    // if (dService['Product']['serviceProduct'].length > 0) {
    //   data['addItem'] = false
    // } else {
    //   data['addItem'] = true
    // }
    data['addItem'] = true
    this._repairRoom.setDeviceDetails(data)
  }

  serviceTimer(service, device, transaction) {
    //output: 0,1,2,3,4,5......
    if (!device.technicion) {
      this._repairRoom.showToaster(['Assign technician to device', 'warning'])
      return
    }
    service.isStartTimer = !service.isStartTimer
    if (service.isStartTimer && device.technicion) {
      service.timerCaller.start()
    } else if (!service.isStartTimer && device.technicion) {
      service.timerCaller.stop()
      this.logTechnicianTime(transaction._id, device.device._id, service._id, device.technicion.id, service.time_log)
    }
  }

  logTechnicianTime(transactionID, deviceID, serviceID, technicianID, log_time, location_id = localStorage.getItem('location_id')) {
    this._repairRoomGQL.logTechnicianTime(transactionID, deviceID, serviceID, technicianID, location_id, log_time)
      .subscribe((res) => {

      }, (err) => {
        this._repairRoom.showToaster([err.message, 'error'])
      })
  }


  changeStatus = 'Working on it'
  changeStatusValue(deviceDetail, item, status, locationId = localStorage.getItem('location_id')) {
    if (item.service_status.status_name == status) {
      return
    }
    let deviceId = deviceDetail['device']['_id']
    let sellID = item['_id']
    let oldStatus = item.service_status.status_name
    let oldClass = item.class_name_detail_parent

    this._repairRoomGQL.changeTaskServiceStatus(this.transactionId, deviceId, sellID, status, locationId)
      .subscribe((res) => {
        deviceDetail.device_color_pallet = res.data.taskServiceMarkAsDone
        this._repairRoom.showToaster(['Status update successfully', 'success'])
      }, (err) => {
        item.service_status.status_name = oldStatus
        item.class_name_detail_parent = oldClass
        this._repairRoom.showToaster([err.message, 'error'])
      })

    item.service_status.status_name = status
    switch (status) {
      case 'Working on it':
        item.class_name_detail_parent = "workingOnitStatus"
        break;
      case 'Stuck':
        item.class_name_detail_parent = "stuckStatus"
        break;
      case 'Done':
        item.class_name_detail_parent = "doneStatus"
        break
      case 'Not started':
        item.class_name_detail_parent = "notStartedStatus"
        break
      case 'Reopen':
        item.class_name_detail_parent = "reOpenStatus"
        break
    }

  }

  onMarkDeviceAsDone(deviceDetail) {
    let transactionId = this.taskDetail['Transaction']['_id']
    let deviceId = deviceDetail['device']['_id']
    this._repairRoomGQL.changeDeviceStatus(transactionId, deviceId, localStorage.getItem('location_id')).
      subscribe((res) => {
        this._repairRoom.showToaster(['Device status updated', 'success'])
        this.getRepairRoomTaskDetail()
        deviceDetail.device_color_pallet = res.data.taskDeviceMarkAsDone
      }, (err) => {
        this._repairRoom.showToaster([err.message, 'error'])
      })
  }


  onChangeItemType(item, type) {
    this._repairRoomGQL.setItemType(this.transactionId, item._id, localStorage.getItem('location_id'), type)
      .subscribe((res) => {
        this._repairRoom.showToaster(['Item type change to ' + type, 'success'])
        item.repair_room_item_type = type
        switch (item.repair_room_item_type) {
          case ServiceItemEnum.Defective:
            item.item_type_icon = "icon-verify_supplier"
            break;
          case ServiceItemEnum.Damaged:
            item.item_type_icon = "icon-delete"
            break
          case ServiceItemEnum.Exchange:
            item.item_type_icon = "fas fa-exchange-alt"
            break
          default:
            item.item_type_icon = "fas fa-th-large"
        }
      }, (err) => {
        this._repairRoom.showToaster([err.message, 'error'])
      })
  }

  selectedReason = '';
  reasons = []
  getReasons(product, reason) {
    product['typeSelected'] = true
    product['previousState'] = product['service_repair_room_item_type'] || 'fas fa-th-large'
    product['type'] = reason
    product.service_repair_room_item_type = reason
    switch (reason) {
      case ServiceItemEnum.Defective:
        product.service_product_item_type_icon = "icon-verify_supplier"
        break;
      case ServiceItemEnum.Damaged:
        product.service_product_item_type_icon = "icon-delete"
        break
      case ServiceItemEnum.Exchange:
        product.service_product_item_type_icon = "fas fa-exchange-alt"
        break
      default:
        product.service_product_item_type_icon = "fas fa-th-large"
    }
    this._repairRoomGQL.getReasons(reason).subscribe(
      (res) => {
        this.reasons = res['data'].getReasons
      }, (err) => {
        this.reasons = []
      }
    )
  }

  selectReason(reason, product, service) {//,deviceItem
    this._repairRoomGQL.setServiceProductType(product._id,this.transactionId, service, product.serviceProductType == 'custom' ? product.serviceCustomProductId._id : product['serviceProductId']['_id'], localStorage.getItem("location_id"), product['type'], reason)
      .subscribe(
        (res) => {
          if(!res['data'].SetServiceProductType) {
            this._repairRoom.showToaster(['Something went wrong', 'error'])
            this.selectedReason = ''
            return
          }
          // if(reason == 'Not Required' && product['type'] == 'Trash') {
          //   let id = product.serviceProductType == 'custom' ? product.serviceCustomProductId._id : product['serviceProductId']['_id']
          //   let ind = null
          //   for (let index = 0; index < deviceItem.length; index++) {
          //     if (deviceItem[index]['serviceProductType'] == 'custom') {
          //       if(deviceItem[index]['serviceCustomProductId']['_id'] == id) {
          //         ind = index
          //         break
          //       }
          //     }
          //     else {
          //       if(deviceItem[index]['serviceProductId']['_id'] == id) {
          //         ind = index
          //         break
          //       }
          //     }
          //   }
          //   // let ind = deviceItem.findIndex(el => el._id == id)
          //   deviceItem.splice(ind,1)
          // }
          this._repairRoom.showToaster(['Item type change to ' + product['type'], 'success'])
          this.selectedReason = ''
          product['serviceReason'] = reason
          delete product['typeSelected']
          delete product['previousState']
          delete product['type']
        }, (err) => {
          this._repairRoom.showToaster([err.message, 'error'])
          this.selectedReason = ''
        }
      )
  }

  onChangeServiceProductType(serviceProdcut, product, service, type) {
    // this._repairRoomGQL.setServiceProductType(this.transactionId, service._id, product._id, localStorage.getItem("location_id"), type)
    //   .subscribe(
    //     (res) => {
    //       this._repairRoom.showToaster(['Item type change to ' + type, 'success'])
    //       serviceProdcut.service_repair_room_item_type = type
    //       switch (type) {
    //         case 'RMA':
    //           serviceProdcut.service_product_item_type_icon = "icon-verify_supplier"
    //           break;
    //         case 'BuyBack':
    //           serviceProdcut.service_product_item_type_icon = "icon-link_devices"
    //           break;
    //         case 'Trash':
    //           serviceProdcut.service_product_item_type_icon = "icon-delete"
    //           break
    //         case 'Swipe':
    //           serviceProdcut.service_product_item_type_icon = "fas fa-exchange-alt"
    //           break
    //         default:
    //           serviceProdcut.service_product_item_type_icon = "fas fa-th-large"
    //       }
    //     }, (err) => {
    //       this._repairRoom.showToaster([err.message, 'error'])
    //     })
  }

  onPurchaseAlert(transaction, deviceDetail, item, purchaseAlertMessage) {
    if (purchaseAlertMessage == '') {
      return
    }

    let PurchaseAlertInput = {
      transactionID: this.transactionId,
      transactionSellID: item._id,
      deviceID: deviceDetail.device._id,
      alert_title: transaction.transaction_keeping_unit + ' - ' + deviceDetail.device.deviceBrand.brand_name + ' ' + 'Repair',
      alert_message: purchaseAlertMessage,
      alert_type: AlertTypeEnum.PurchaseAlert,
      location_id: localStorage.getItem('location_id')
    }

    this._repairRoomGQL.transactionAlert(PurchaseAlertInput)
      .subscribe((res) => {
        this._repairRoom.showToaster(['Purchase alert created', 'success'])
        this.purchaseAlertMessage = ''
      }, (err) => {
        this._repairRoom.showToaster([err.messange, 'error'])
      })
  }

  getOrderPartSupplier(product_id, search = null, location_id = localStorage.getItem('location_id')) {
    this._repairRoomGQL.getOrderPartSuppliers(location_id, product_id, search)
      .subscribe((res) => {
        this.productSuppliersInfo = res.data.OrderPartSuppliers
      })
  }

  onOrderPart(product, supplier, quantity) {
    if (quantity < 1) {
      this._repairRoom.showToaster(['Add quantity', 'warning'])
      return
    }
    this._repairRoom.closeModel();
    let OrderPartInput = {
      supplier_id: supplier.Supplier._id,
      product_id: product._id,
      sku_number: supplier.sku_number,
      order_qty: quantity,
      product_price: product.sell_price_inc_tax,
      location_id: localStorage.getItem('location_id')
    }
    this._repairRoomGQL.orderPart(OrderPartInput)
      .subscribe((res) => {
        this._repairRoom.showToaster(['Order part request have bern send', 'success'])
      }, (err) => {
        this._repairRoom.showToaster([err.message, 'error'])
      })
  }

  initOrderPart() {
    this.orderPart = {
      showSupplierToOrderPart: false,
      supplier: {},
      supplierCompanyName: '',
      productQunatity: 0,
      product: {}
    }

  }
  statusFilter = []
  setRepairRoomStatusFilter() {
    let status: any = []
    this.taskStatus.forEach(element => {
      if (element.checked) {
        status.push(element.status_name)
      }
    });
    this.statusFilter = status
  }

  noOpenAccordianOnInput(e) {
    e.stopPropagation();
  }

}
