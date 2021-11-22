import { Component, OnInit, TemplateRef } from '@angular/core';
import { StockService } from 'src/app/services/stock/stock.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RestoreDeviceGQL, PermanentDeleteDeviceGQL, DeleteDeviceGQL, GetDeviceByIdGQL, 
  GetDeviceHistoryGQL, CreateFolderGQL,FileUploadGQL,GetfoldersWithFilesGQL,AllowedModel, DeleteFileGQL } from 'src/app/generated/graphql';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.css']
})
export class DeviceHistoryComponent implements OnInit {

  constructor(
    private createSaleService: CreateSaleService,
    private saleCartService: SaleCartService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private getDeviceById : GetDeviceByIdGQL,
    private customerService: CustomerService,
    private getDeviceHistory: GetDeviceHistoryGQL,
    private createFolder : CreateFolderGQL,
    private getfoldersWithFiles : GetfoldersWithFilesGQL,
    private fileUpload : FileUploadGQL,
    private deleteFile: DeleteFileGQL,
    private _repairRoom: RepairRoomService,

  ) { }
  invNum = 'Select Invoice Numnber'
  deviceID=''
  customerId=''
  deviceHistoryData=[]
  allCheckbox=false
  navigationSource: any
  locationId = localStorage.getItem('location_id')

  ngOnInit() {
    this.createSaleService.setSectionTiles('','','Device History','')
    this.createSaleService.setActiveSection(false,true,false)
    this.route.data.subscribe(data => {
      this.navigationSource = data.navigationSource;
    })
  this.route.params.subscribe(params => {
    if (params['DeviceId']) {
      this.deviceID = params['DeviceId']
      this.deviceHistoryLoader=true
      this.getCustomerDevicesHistory(this.deviceID)
      this.getDeviceByIdFun(this.deviceID) 
    }
  });
  }

  getCustomerDevicesHistory(deviceId){
    this.deviceHistoryLoader=true
    this.getDeviceHistory.watch({
      device_id:deviceId,
      location_id:this.locationId
    }).valueChanges.subscribe(
      (res) => {
        this.deviceHistoryLoader=false
          console.log('getDeviceHistory res---->', res['data'].getDeviceHistory);
           let returnVal  = res['data'].getDeviceHistory
           if(returnVal){
            this.deviceHistoryData=returnVal
           }
      }, (err) => {
        this.deviceHistoryLoader=false
          console.log('getDeviceHistory err', err);
      }
     )
  }

  backToComponent() {
    if (this.navigationSource == 'customer') {
      this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${this.customerId})`)
    } else if (this.navigationSource == 'createSale') {
      this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${this.customerId})`)
    }
  }

  changeValue(type, val) {
    this[type] = val
  }

  devicesSettingsOpen=false
  openDevicesSettings(){
    this.devicesSettingsOpen=!this.devicesSettingsOpen
  }
  
  deviceHistoryLoader=false
  device={}
  getDeviceByIdFun(id) {
    this.deviceHistoryLoader=true
    this.getDeviceById.watch({
      device_id:id
    }).valueChanges.subscribe(
      (res) => {
        this.deviceHistoryLoader=false
          console.log('getDeviceById res', res['data'].getDeviceById);
           let returnVal  = res['data'].getDeviceById
           if(returnVal){
            this.device['brand_model_name']=returnVal['deviceBrand']['brand_name']+' '+returnVal['deviceModel']['name']
            this.device['device_color']=returnVal['device_color']
            this.device['imei_ssn']=returnVal['imei_ssn']
            this.device['customerId']=returnVal['Customer']._id
             this.customerId=returnVal['Customer']._id
            this.device['device_image']=returnVal['device_image']
            console.log("getDeviceById-->",this.device)
           }else{
            this.deviceHistoryLoader=false
           }
      }, (err) => {
        this.deviceHistoryLoader=false
          console.log('getDeviceById err', err)
      }
  )
  }

  theCheckbox = false;
  checkedAllField(list, event) {
    for (let i = 0; i < list.length; i++) {
      list[i]['checked'] = event.target.checked
    }
  }

  singleItemChecked(list,index,event){
    this.theCheckbox=true
        list[index]['checked']=event.target.checked
        for (let i = 0; i < list.length; i++) {
          if(!list[i]['checked']){
            this.theCheckbox=false
          }
     }
  }

  selectedCustomerIds=[]
  deviceModalFor=''
  openDeviceModal(template: TemplateRef<any>, cls, check) {
    this.deviceModalFor=check
    for (let i = 0; i < this.deviceHistoryData.length; i++) {
      if(this.deviceHistoryData['checked']){
      this.selectedCustomerIds.push(this.deviceHistoryData['_id']) 
        }}
    if(this.isObjectEmpty(this.selectedCustomerIds)){
      // this.devicesSettingsOpen=false
      this.customerService.showToaster(["Please select device first", 'error'])
      return
    }
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }
   
  isObjectEmpty(Obj) {
    for (var key in Obj) {
        if (Obj.hasOwnProperty(key))
            return false;
    }
    return true;
 }

 showToaster = true
 toasterMsg = ''
 toasterType = ''
 closeToaster() {
   this.showToaster=true
 }
 
 //===================================== Images Folders Session =======================================//

 deviceImages = []
 uploadImages(event) {
  for (var i = 0; i <= event.target.files.length - 1; i++) {
    this.deviceImages.push(event.target.files[i]);
  }
  if(this.isObjectEmpty(this.deviceImages)){
    return
  }
  this.devicefolderLoader=true
  this.fileUpload.mutate({
    file: this.deviceImages,
    input:{
      folder_id: this.selectedFolder['_id'],
      location_id:this.locationId,
    }},{
      context: {
        useMultipart: true
      }
  }).subscribe(
    (res) => {
      this.devicefolderLoader=false
        console.log('fileUpload res--->', res['data'].fileUpload);
         let returnVal  = res['data'].fileUpload
         if(returnVal){
          this.showToaster = false
          this.toasterMsg = 'Image Added successfully'
          this.toasterType = 'success'
          this.getDeviceImagesAndFolders()
         }
    }, (err) => {
      this.devicefolderLoader=false
          this.showToaster = false
          this.toasterMsg = err.message
          this.toasterType = 'error'
          console.log('fileUpload err--->', err.message);
    }
    )
 }

 modalRef: BsModalRef;
 deviceForImage=[]
 openFetchDeviceImagesModal(template: TemplateRef<any>, cls, device) {
   this.getDeviceImagesAndFolders()
   this.deviceForImage=device
   this.deviceImageSelect = {}
   this.showImageDetail = false
   this.selectedFolder=[]
   this.deviceFoldersWithFiles=[]
   this.devicefolderLoader=false
   this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
 }

 createFolderFun(){
  this.devicefolderLoader=true
  this.createFolder.mutate({
    input:{
      model_type:AllowedModel.Device,
      model_id:  this.deviceID,
      location_id:this.locationId,
    }
  }).subscribe(
    (res) => {
      this.devicefolderLoader=false
        console.log('createFolder res--->', res['data'].createFolder);
         let returnVal  = res['data'].createFolder
         if(returnVal){
          this.showToaster = false
          this.toasterMsg = 'Folder Added successfully'
          this.toasterType = 'success'
          this.getDeviceImagesAndFolders()
         }
    }, (err) => {
      this.devicefolderLoader=false
          this.showToaster = false
          if(err.message=="GraphQL error: Create only one folder per day"){
            this.toasterMsg ="Create only one folder per day"
          }else{
          this.toasterMsg = err.message
          }
          this.toasterType = 'error'
          console.log('createFolder err--->', err.message);
    }
    )
 }

 selectedFolder=[]
 baseUrl = EnvironmentUrl.Images
 showImagesOfDirectory(folder,index) {
  this.selectedFolder=folder
   for (let i = 0; i < this.deviceFoldersWithFiles.length; i++) {
     this.deviceFoldersWithFiles[i]['isVisible'] = false
   }
   this.deviceFoldersWithFiles[index]['isVisible'] = true
 }

 deviceImageSelect = {}
 showImageDetail = false
 selectDeviceImage(img, dir, fil) {
  this.deviceImageSelect = img
  this.deviceImageSelect['dir'] = dir
  this.deviceImageSelect['file'] = fil
  this.showImageDetail = true
}

 deviceFoldersWithFiles=[]
 devicefolderLoader=false
 getDeviceImagesAndFolders(){ 
  this.devicefolderLoader=true
  this.getfoldersWithFiles.watch({
    location_id:this.locationId,
    model_type: AllowedModel.Device,
    model_id:this.deviceID
  }).valueChanges.subscribe(
    (res) => {
      this.devicefolderLoader=false
        console.log('getfoldersWithFiles res-->', res['data'].getfoldersWithFiles);
         let returnVal  = res['data'].getfoldersWithFiles
         if(returnVal){
          this.deviceFoldersWithFiles=returnVal
          for (let i = 0; i < this.deviceFoldersWithFiles.length; i++) {
            this.deviceFoldersWithFiles[i]['isVisible'] = false
            if( this.deviceFoldersWithFiles[i]['_id']==this.selectedFolder['_id']){
              this.deviceFoldersWithFiles[i]['isVisible']=true
              this.showImageDetail=true
            }
          }
         }
    }, (err) => {
      this.devicefolderLoader=false
      console.log('getfoldersWithFiles err-->', err.message);
    }
)
 }

 deleteImage(file) {
  this.deleteFile.mutate({
    file_id: file['_id']
  }).subscribe(
    (res) => {
      console.log('delelele res', res);
      if (res['data'].deleteFile) {
        this.getDeviceImagesAndFolders()
        // let check=this.deviceFoldersWithFiles[i]['SourceFile'][j+1]
        // this.deviceFoldersWithFiles[this.deviceImageSelect['dir']].SourceFile.splice(this.deviceImageSelect['file'], 1);
       this.deviceImageSelect = {}
       this.showImageDetail = false
      }
    }, (err) => {
      console.log('delelele err', err);
    }
  )
}
 //===================================== Images Folders Session =======================================//
 noOpenAccordianOnInput(e) {
  e.stopPropagation();
}
}
