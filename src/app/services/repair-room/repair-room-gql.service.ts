import { Injectable } from '@angular/core';
import {
  GetRepairRoomTaskDetailGQL, GetRepairRoomTaskListGQL, GetRepairRoomTaskStatusGQL,
  TaskMarkAsDoneGQL, TaskServiceMarkAsDoneGQL, TaskDeviceMarkAsDoneGQL, GetAllTechnicianGQL,
  TechnicianAssignToDeviceGQL, TechnicianTimeLogGQL, RepairRoomOrderPartGQL, SetServiceItemTypeGQL,
  CreateTransactionAlertGQL, OrderPartSuppliersGQL, TaskEnum, DateFilterEnum, SetServiceProductTypeGQL, GetReasonsGQL
} from 'src/app/generated/graphql'
import { map, startWith, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepairRoomGQLService {

  repairRoomFilters = {
    task: TaskEnum.All,
    dateFilter: DateFilterEnum.None,
    startDate: null,
    endDate: null,
    search: null,
    status: null
  }

  constructor(private getRepairRoomTaskDetailGQL: GetRepairRoomTaskDetailGQL,
    private getRepairRoomTaskListGQL: GetRepairRoomTaskListGQL,
    private getRepairRoomTaskStatusGQL: GetRepairRoomTaskStatusGQL,
    private taskMarkAsDone: TaskMarkAsDoneGQL,
    private taskServiceMarkAsDone: TaskServiceMarkAsDoneGQL,
    private taskDeviceMarkAsDone: TaskDeviceMarkAsDoneGQL,
    private getAllTechnician: GetAllTechnicianGQL,
    private technicianAssignToDevice: TechnicianAssignToDeviceGQL,
    private technicianTimeLog: TechnicianTimeLogGQL,
    private repairRoomOrderPart: RepairRoomOrderPartGQL,
    private setServiceItemType: SetServiceItemTypeGQL,
    private createTransactionAlert: CreateTransactionAlertGQL,
    private orderPartSuppliers: OrderPartSuppliersGQL,
    private setServiceProductTypeGQL: SetServiceProductTypeGQL,
    private getReasonsGQL: GetReasonsGQL) { }

  getRepairRoomTaskList(reapirRoomFilter, location_id, limit, skip) {
    return this.getRepairRoomTaskListGQL.watch({
      reapirRoomFilter: reapirRoomFilter,
      location_id: location_id,
      limit: limit,
      skip: skip,
    }).valueChanges
  }
  getReapirRoomFilter(){
    return this.repairRoomFilters
  }

  getRepairRoomTaskDetail(location_id, transactionID) {
    return this.getRepairRoomTaskDetailGQL.watch({
      transactionID: transactionID,
      location_id: location_id
    }).valueChanges
  }

  getRepairRoomTaskStatus() {
    return this.getRepairRoomTaskStatusGQL.watch().valueChanges
  }
  
  getAllTechnicianList(location_id) {
    return this.getAllTechnician.watch({ location_id }).valueChanges
  }

  markTaskAsDone(ids: [], location_id) {
    return this.taskMarkAsDone.mutate({
      transactionIDs: ids,
      location_id: location_id
    })
  }

  changeDeviceStatus(transactionID, deviceID, location_id) {
    return this.taskDeviceMarkAsDone.mutate({ transactionID, deviceID, location_id })
  }

  changeTaskServiceStatus(transactionID, deviceID, sellID, status, location_id) {
    return this.taskServiceMarkAsDone.mutate({ transactionID, deviceID, sellID, status, location_id })
  }

  assignTechnicialToDevice(transactionID, deviceID, technicianID, location_id) {
    return this.technicianAssignToDevice.mutate({ transactionID, deviceID, technicianID, location_id })
  }

  logTechnicianTime(transactionID, deviceID, serviceID, technicianID, location_id, log_time) {
    return this.technicianTimeLog.mutate({ transactionID, deviceID, serviceID, technicianID, location_id, log_time })
  }

  orderPart(OrderPartInput) {
    return this.repairRoomOrderPart.mutate({ input: OrderPartInput })
  }

  setItemType(transactionID, serviceID, location_id, service_item_type) {
    return this.setServiceItemType.mutate({ transactionID, serviceID, location_id, service_item_type })
  }

  getReasons(type) {
    return this.getReasonsGQL.watch(
      {
        reason_type: type
      }
    ).valueChanges
  }

  setServiceProductType(id,transactionID,serviceID,productID,location_id, service_item_type, reason){
    return this.setServiceProductTypeGQL.mutate({
      _id: id,
      transactionID:transactionID,
      serviceID: serviceID,
      productID: productID,
      location_id:location_id,
      service_item_type:service_item_type,
      service_reasons: reason
    })
  }

  transactionAlert(PurchaseAlertInput) {
    return this.createTransactionAlert.mutate({ input: PurchaseAlertInput })
  }

  getOrderPartSuppliers(location_id, product_id, search) {
    return this.orderPartSuppliers.watch({ location_id, product_id, search }).valueChanges
  }


}
