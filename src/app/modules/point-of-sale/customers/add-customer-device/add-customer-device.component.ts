import { Component, OnInit, ElementRef, ViewChild, TemplateRef, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateDeviceGQL, CheckImeiSsnNoGQL, GetDeviceByIdGQL,
  CreateDeviceTagGQL,CreateDeviceModelGQL, GetAllCompatibleDeviceTagsGQL, UpdateDeviceGQL, GetAllSystemBrandsGQL, CreateSystemBrandGQL, UpdateSystemBrandGQL
} from 'src/app/generated/graphql';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NoUnusedFragmentsRule } from 'graphql';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { CustomerGQLService } from 'src/app/services/customer/customerGQL.service'
declare function profilePicture(op1, op2, op3): any

@Component({
  selector: 'app-add-customer-device',
  templateUrl: './add-customer-device.component.html',
  styleUrls: ['./add-customer-device.component.css']
})
export class AddCustomerDeviceComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('adddevice', { static: true }) template: ElementRef;
  @Input() deviceId: any;
  @Input() customerId: any;
  @Input() deviceUpdateOrAdd = 'Add'
  modalOpen = false;
  @ViewChild("adddevice", { static: false }) adddevice: TemplateRef<any>;
  @Output() addDeviceDone: EventEmitter<any> = new EventEmitter<any>();

  deviceForm: any
  deviceSubmitted = false
  showSearchInput = false
  devicesBrandSearch = '' //: FormControl = new FormControl();
  deviceModelLoading = false

  baseUrl = EnvironmentUrl.Images
  navigationSource = ''
  constructor(
    private modalService: BsModalService,
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private createDevice: CreateDeviceGQL,
    private customerService: CustomerService,
    private checkImeiSsnNo: CheckImeiSsnNoGQL,
    private getAllCompatibleDeviceTagsGQL: GetAllCompatibleDeviceTagsGQL,
    private createDeviceModel: CreateDeviceModelGQL,
    private updateDevice: UpdateDeviceGQL,
    private getDeviceById: GetDeviceByIdGQL,
    private getAllSystemBrands: GetAllSystemBrandsGQL,
    private createSystemBrand: CreateSystemBrandGQL,
    private updateSystemBrand: UpdateSystemBrandGQL,
    private router: Router,
    private _customerGQL: CustomerGQLService

  ) { }

  ngOnInit() {
    
    this.getAllSystemBrand()
    // this.getAllBrandWiseModels()
  }

  getDeviceByIdFun() {
    if (this.deviceId == '' || this.deviceId == undefined || this.deviceId == null) {
      return
    }
    this.deviceBrandList = false
    this.devicesBrandSearch = ''
    this.deviceLoader = true
    this.modalOpen = true
    this.getDeviceById.watch({
      device_id: this.deviceId
    }).valueChanges.subscribe(
      (res) => {
        this.deviceLoader = false
        console.log('getDeviceById res', res['data'].getDeviceById);
        let returnVal = res['data'].getDeviceById
        if (returnVal) {
          let device = {}
          // device['brand_model_name']=returnVal['brand_model_name'][0]
          device['deviceBrand'] = returnVal['deviceBrand']
          device['deviceModel'] = returnVal['deviceModel']
          device['device_color'] = returnVal['device_color']
          device['imei_ssn'] = returnVal['imei_ssn']
          device['customerId'] = returnVal['Customer']._id
          this.customerId = returnVal['Customer']._id
          device['device_image'] = returnVal['device_image']
          this.initializeDeviceFormWithValues(device)
          console.log("getDeviceById-->", device)
          this.modalRef = this.modalService.show(this.template, { class: 'modal-sm ' + 'custModal wd600', backdrop: 'static', keyboard: false });
        } else {
          this.deviceLoader = false
          this.showToaster = false
          this.toasterMsg = 'Something went wrong'
          this.toasterType = 'error'
        }
      }, (err) => {
        this.deviceLoader = false
        console.log(' err', err);
        this.showToaster = false
        this.toasterMsg = 'Something went wrong'
        this.toasterType = 'error'
      }
    )
  }

  showSearchInputFun() {
    this.showSearchInput = true
    this.deviceBrandList = true
  }

  hideSearchInputFun() {
    this.showSearchInput = false
    this.deviceBrandList = false
  }

  deviceBrand = 'Select Device Brand'
  deviceModel = 'Select Device Model'
  initializeDeviceForm() {
    this.modalOpen = true
    this.deviceSubmitted = false
    this.ImeiError=false
    this.deviceBrand = 'Select Device Brand'
    this.deviceModel = 'Select Device Model'
    this.deviceForm = this.formbulider.group({
      deviceBrand: ['', [Validators.required]],
      deviceModel: ['', [Validators.required]],
      device_color: ['', [Validators.required]],
      imei_ssn: ['', [Validators.required]],
      customer: [this.customerId, [Validators.required]],
      location_id: [window.localStorage.getItem('location_id'), [Validators.required]],
      device_image: [''],
    });
    this.hideSearchInputFun()
    this.devicesBrandSearch = ''
    this.modalRef = this.modalService.show(this.template, { class: 'modal-sm ' + 'custModal wd600', backdrop: 'static', keyboard: false });
  }

  initializeDeviceFormWithValues(device) {
    this.deviceBrand = device.deviceBrand.brand_name
    this.deviceModel = device.deviceModel.name
    this.devicesBrandSearch = device.brand_model_name
    this.ImeiError=false
    this.deviceForm = this.formbulider.group({
      deviceBrand: [device.deviceBrand._id, [Validators.required]],
      deviceModel: [device.deviceModel._id, [Validators.required]],
      device_color: [device.device_color, [Validators.required]],
      imei_ssn: [device.imei_ssn, [Validators.required]],
      customer: [device.customerId, [Validators.required]],
      location_id: [window.localStorage.getItem('location_id'), [Validators.required]],
      device_image: [''],
    });
    this.makeDevicePhoto(device['device_image'])
  }

  get fDeviceForm() {
    return this.deviceForm.controls
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalRef.hide();
    }
  }

  deviceLoader = false
  ImeiError = false
  addDevice() {
    if (this.deviceForm.invalid) {
      this.deviceSubmitted = true
      return;
    } else {
      this.deviceSubmitted = false
      let deviceData = JSON.parse(JSON.stringify(this.deviceForm.value))
      if (this.deviceUpdateOrAdd != 'Add') {
        this.updateDeviceFun(deviceData)
        return
      }
      this.deviceLoader = true
      this.createDevice.mutate({
        input: deviceData
      }).subscribe(
        (res) => {
          this.deviceLoader = false
          console.log(' res', res['data'].createDevice);
          let returnVal = res['data'].createDevice
          if (returnVal) {
            this.customerService.showToaster(['Device added successfully', 'success'])
            this.modalRef.hide();
            this.addDeviceDone.emit();
            //  if(this.navigationSource=='customer'){
            //   this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${this.customerId})`)
            //   }else{
            //     this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${this.customerId})`)
            //   }
          } else {
            this.showToaster = false
            this.toasterMsg = 'Something went wrong'
            this.toasterType = 'error'
          }
        }, (err) => {
          this.deviceLoader = false
          console.log(' err', err);
          if (err.message == "GraphQL error: Device imei_ssn number already exist") {
            this.ImeiError = true
          }
          this.customerService.showToaster([err.message, 'error'])
        }
      )
    }
  }

  updateDeviceFun(device) {
    this.deviceLoader = true
    this.updateDevice.mutate({
      input: device,
      device_id: this.deviceId
    }).subscribe(
      (res) => {
        this.deviceLoader = false
        console.log(' res', res['data'].updateDevice);
        let returnVal = res['data'].updateDevice
        if (returnVal) {
          this.customerService.showToaster(['Device updated successfully', 'success'])
          this.modalRef.hide();
          this.addDeviceDone.emit();
          //  if(this.navigationSource=='customer'){
          //   this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${this.customerId})`)
          //   }else{
          //     this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${this.customerId})`)
          //   }
        } else {
          this.showToaster = false
          this.toasterMsg = 'Something went wrong'
          this.toasterType = 'error'
        }
      }, (err) => {
        this.deviceLoader = false
        console.log(' err', err);
        if (err.message == "GraphQL error: Device imei_ssn number already exist") {
          this.ImeiError = true
        }
        this.customerService.showToaster([err.message, 'error'])
      }
    )
  }

  hideErrorFun(type) {
    this[type] = false
  }

  selectBrand(value) {
    this.deviceForm.controls['brand_model_name'].setValue(value.name)
    this.deviceBrandList = false
    this.showSearchInput = false
    this.devicesBrandSearch = value.name
  }

  deviceImg: any
  imgData: File;
  deviceFileName = ''
  onFileChanged(event) {
    if (event.target.files.length !== 0) {
      this.imgData = <File>event.target.files[0]
      this.deviceFileName = this.imgData.name
      if (this.imgData.type === 'image/png' || this.imgData.type === 'image/jpg' || this.imgData.type === 'image/jpeg') {
        let reader = new FileReader()
        reader.readAsDataURL(this.imgData)
        reader.onload = (event) => {
          this.deviceForm.controls['device_image'].setValue(event.srcElement['result'])
        }
      }
    }
  }

  closeDeviceModel() {
    this.modalRef.hide();
    // this.addDeviceDone.emit();
    // if(this.navigationSource=='customer'){
    // this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${this.customerId})`)
    // }else{
    //   this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${this.customerId})`)
    // }
  }

  ImeiMessage = ''
  verifyCusDeviceIMEI() {
    if (this.deviceForm.controls.imei_ssn.value === '') {
      return
    }
    else {
      this.checkImeiSsnNo.watch({
        imei_ssn: this.deviceForm.controls.imei_ssn.value
      }).valueChanges.subscribe(
        (res) => {
          console.log('imei ver res', res);
          if (res['data'].checkImeiSsnNo) {
            let returnVal = res['data'].checkImeiSsnNo
            let device = {}
            device['deviceBrand'] = returnVal['deviceBrand']
            device['deviceModel'] = returnVal['deviceModel']
            device['device_color'] = returnVal['device_color']
            device['imei_ssn'] = returnVal['imei_ssn']
            device['customerId'] = this.customerId//returnVal['Customer']._id
            device['device_image'] = returnVal['device_image']
            this.initializeDeviceFormWithValues(device)
          }
        }, (err) => {
          console.log('imei ver err', err);
        }
      )
    }
  }

  compatibleDevicesList = false
  allDeviceModels = []
  deviceBrandList = false
  getAllDeviceModels() {
    this.getAllCompatibleDeviceTagsGQL.watch({
      search: this.devicesBrandSearch//.value == null ? "" : this.devicesBrandSearch.value,
    }).valueChanges.subscribe(
      (res) => {
        if (res['data'].searchDeviceTags) {
          this.allDeviceModels = res['data'].searchDeviceTags
          console.log('deviceBrandAndModel-->', this.allDeviceModels);
        }
      }, (err) => {
        console.log('no device tag err', err);
      }
    )
  }

  selectModel(modelId) {
    this.deviceForm.controls['deviceModel'].setValue(modelId)
  }

  getAllBrandWiseModels(brand_id) {
    this.deviceForm.controls['deviceBrand'].setValue(brand_id)
    this.deviceForm.controls['deviceModel'].setValue('')
    this.deviceModel='Select Device Brand'
    this.deviceModelLoading = true
    this._customerGQL.getAllDeviceModelByBrand(brand_id).valueChanges.subscribe(
      (res) => {
        this.deviceModelLoading = res.loading
        if (res['data'].getAllDeviceModelByBrand) {
          this.allDeviceModels = res['data'].getAllDeviceModelByBrand
          console.log('getAllDeviceModelByBrand-->', this.allDeviceModels);
        }
      }, (err) => {
        this.deviceModelLoading = false
        console.log('no device tag err', err);
      }
    )
  }

  createSystemDevice(product_name, brand_id) {
    let systemDeviceInput =  {
      product_name:product_name,
      description : '',
      product_price: 0,
      product_brand: brand_id,
      BusinessLocation: localStorage.getItem('location_id'),
      is_system_created: false
    }
    this._customerGQL.createSystemDevice(systemDeviceInput).subscribe(
      (res) => {
        this.allDeviceModels.push(res.data.createSystemDevice)
      }, (err) => {
        this.customerService.showToaster([err.message, 'error'])
      }
    )
  }

  showToaster = false
  toasterMsg = ''
  toasterType = ''
  AddDeviceBrandModelFun(value) {
    this.deviceBrandList = false
    this.createDeviceModel.mutate({
     input:{
      name: value,
      brand: this.deviceForm.value.deviceBrand,
      BusinessLocation:this.locationId
     }
    }).subscribe(
      (res) => {
        this.showToaster = false
        this.toasterMsg = 'Model Added Successfully'
        this.toasterType = 'success'
        this.showSearchInput = false
        this.getAllBrandWiseModels(this.deviceForm.value.deviceBrand)
      }, (err) => {
        console.log('error while adding new comp dev', err);
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
      }
    )
  }

  closeToaster() {
    this.showToaster = true
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  ssnNumberOnly(event): boolean {
    //This is temprary work I am working on omit special char Directive 
    if (event.key == '-' || event.key == '@' || event.key == '$' || event.key == '.' || event.key == '!' || event.key == '#' || event.key == ')' || event.key == '`' || event.key == '_'
      || event.key == '%' || event.key == '=' || event.key == '|' || event.key == '(' || event.key == '~' || event.key == '"' || event.key == '+' || event.key == '}' || event.key == '{'
      || event.key == '^' || event.key == ']' || event.key == '[' || event.key == '&' || event.key == ',' || event.key == '*' || event.key == ':' || event.key == ';'
      || event.key == '>' || event.key == '<' || event.key == '?' || event.key == '/') {
      return false
    }
    let string = this.deviceForm.controls.imei_ssn.value
    if (string.length == 10) {
      let output = [string.slice(0, 3), '-', string.slice(3, 6), '-', string.slice(6, 10)].join('');
      this.deviceForm.controls['imei_ssn'].setValue(output)
      return false
    } else if (string.length < 10) {
      return true
    }
    return false
  }

  toDataURL = url => fetch(url, {
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }))

  async makeDevicePhoto(picture) {
    this.deviceLoader = true
    let data = this.baseUrl + picture
    if (data != undefined && data != "") {
      this.toDataURL(data)
        .then(result => {
          this.deviceLoader = false
          this.deviceFileName = 'xyz'
          this.deviceForm.controls['device_image'].setValue(event.srcElement['result'])
        }
        );
    }
  }
  //=============================================== Start System Brand Session ================================================//

  allSystemBrand = []
  getAllSystemBrand() {
    this.getAllSystemBrands.watch({}).valueChanges.subscribe(
      (res) => {
        if (res['data'].getAllSystemBrands) {
          this.allSystemBrand = res['data'].getAllSystemBrands
          console.log('allSystemBrand in Add device-->', this.allSystemBrand);
        }
      }, (err) => {
        console.log('no device tag err', err);
      }
    )
  }

  locationId=window.localStorage.getItem('location_id')
  createSystemBrandFun(search) {
    this.deviceBrandList = false
    this.createSystemBrand.mutate({
      input: {
        brand_name: search,
        description: "Brand created at Add device",
        BusinessLocation: this.locationId
      }
    }).subscribe(
      (res) => {
        this.showToaster = false
        this.toasterMsg = 'Model Added Successfully'
        this.toasterType = 'success'
        this.showSearchInput = false
        this.getAllSystemBrand()
      }, (err) => {
        console.log('error while adding new comp dev', err);
        this.showToaster = false
        this.toasterMsg = err.graphQLErrors[0].message
        this.toasterType = 'error'
      }
    )
  }

  addDeviceBrand = (name) => {
    this.createSystemBrandFun(name) 
  }

  addDeviceBrandModel = (name) => {
    this.AddDeviceBrandModelFun(name)
  }
  //=============================================== Start System Brand Session ================================================//

}

