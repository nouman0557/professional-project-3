import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { ActivatedRoute, Router } from '@angular/router';
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { CreateSaleGQLService } from 'src/app/services/create-sale/create-sale-gql.service';
import { DeviceIssuesType, AllowedModel } from 'src/app/generated/graphql';
import PatternLock from 'patternlock';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { RepairRoomService } from 'src/app/services/repair-room/repair-room.service';
import { Location } from '@angular/common';
import { EnvironmentUrl } from 'src/environments/environment-url';

@Component({
  selector: 'app-device-checkin',
  templateUrl: './device-checkin.component.html',
  styleUrls: ['./device-checkin.component.css']
})
export class DeviceCheckinComponent implements OnInit {
  baseUrl = EnvironmentUrl.Images
  deviceId: string
  device = []
  customer = {}
  deviceCheckInForm: any;
  deviceIssues = []
  deviceItems = []
  imagesAttached = []
  loadPrevousCheckIn = false
  issuesOther = false
  itemsOther = false
  prevCheckinDate = null
  deviceCheckInId = ''
  modalRef: BsModalRef;
  @Input() devData: any;
  @Input() cusData: any;
  constructor(private createSaleService: CreateSaleService,
    private route: ActivatedRoute,
    private router: Router,
    private saleCartService: SaleCartService,
    private formbulider: FormBuilder,
    private modalService: BsModalService,
    private _repairRoomService: RepairRoomService,
    private createSaleGQLService: CreateSaleGQLService,
    private location: Location
  ) { }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  callFromRepairRoom = false
  ngOnInit() {

    if (!this.isObjectEmpty(this.devData) && !this.isObjectEmpty(this.cusData)) {
      this.customer = this.cusData
      this.deviceId = this.devData['_id']
      let dev = {}
      dev['device_keeping_unit'] = this.devData['device_keeping_unit']
      dev['DeviceCheckIn'] = ''
      this.device.push(dev)
      this.callFromRepairRoom = true
    } else {
      this.customer = this.saleCartService.getSelectedCustomer()
      this.route.params.subscribe(params => {
        if (params['deviceId']) {
          this.deviceId = params['deviceId']
        }
      });
      this.device = this.saleCartService.getSelectedDeviceById(this.deviceId)
    }
    console.log('Customer detail is', this.customer);
    if (this.customer == null) {
      this.router.navigateByUrl(`Pointofsale/CreateSale/Order`)
    }
    console.log('device is', this.device);
    if (this.device.length > 0) {
      if (this.device[0]['DeviceCheckIn'] != '') {
        this.imagesAttached = this.device[0]['Checkin']['DeviceImages']
        this.deviceCheckInId = this.device[0]['DeviceCheckIn']
        this.initializeDeviceCheckInForm(this.deviceId, this.customer, this.device[0]['Checkin'])
        this.issues = this.device[0]['Checkin']['DeviceIssues']
        this.items = this.device[0]['Checkin']['DeviceItems']
        // this.deviceImages = this.device[0]['Checkin']['images']
      }
      else {
        this.initializeDeviceCheckInForm(this.deviceId, this.customer, null)
      }
    }
    else {
      this.initializeDeviceCheckInForm(this.deviceId, this.customer, null)
    }
    console.log('device is', this.device);

    this.getDeviceIssuesAndItems()
    this.createSaleService.setActiveSection(false, true, false)
    this.createSaleService.setSectionTiles('', '', 'Check In', '')
  }

  getDeviceIssuesAndItems() {
    this.createSaleGQLService.getDeviceIssues(DeviceIssuesType.Issues).valueChanges.subscribe(
      (res) => {
        console.log('device issues are ', res['data'].deviceIssues);
        this.deviceIssues = res['data'].deviceIssues
      }, (err) => {
        console.log('error while loading device issues', err);
      }
    )
    this.createSaleGQLService.getDeviceIssues(DeviceIssuesType.Items).valueChanges.subscribe(
      (res) => {
        console.log('device items are ', res['data'].deviceIssues);
        this.deviceItems = res['data'].deviceIssues
      }, (err) => {
        console.log('error while loading device issues', err);
      }
    )
    // this.initializeDeviceCheckInForm(this.deviceId, this.customer, null)
    this.createSaleService.setActiveSection(false, true, false)
    this.createSaleService.setSectionTiles('', '', 'Check In', '')
  }

  createDeviceIssues(name, type) {
    let obj = {
      name: this.deviceCheckInForm.controls[name].value,
      type: type
    }
    this.createSaleGQLService.createDeviceIssues(obj).subscribe(
      (res) => {
        this.deviceCheckInForm.controls[name].setValue('')
        if(type == 'issues') {
          this.deviceIssues.push(res['data'].createDeviceIssues)
          return
        }
        this.deviceItems.push(res['data'].createDeviceIssues)
      }, (err) => {
        console.log('err while creating issue/item',err);        
      }
    )
  }

  getPreviousCheckInData(date) {
    var checkInDate = new Date(date);
    this.createSaleGQLService.getPreviousCheckIns(this.customer['_id'], checkInDate).valueChanges.subscribe(
      (res) => {
        console.log('checkin search result is', res['data'].getPreviousDeviceCheckIn);
        if (res['data'].getPreviousDeviceCheckIn == null) {
          return
        }
        this.initializeDeviceCheckInForm(this.deviceId, this.customer, res['data'].getPreviousDeviceCheckIn)
        this.issues = res['data'].getPreviousDeviceCheckIn.DeviceIssues
        this.items = res['data'].getPreviousDeviceCheckIn.DeviceItems
      }, (err) => {
        console.log('error while loading prev data', err);
      }
    )
  }

  initializeDeviceCheckInForm(dev, customer, check) {
    this.deviceCheckInForm = this.formbulider.group({
      Device: [dev],
      client_name: [customer == null ? '' : customer.first_name + ' ' + customer.last_name, [Validators.required]],
      client_phone_number: [customer == null ? '' : customer.phone, [Validators.required]],
      client_device_id: [this.device.length == 0 ? '' : this.device[0].device_keeping_unit],
      check_in_date: [check == null ? new Date() : new Date(check.check_in_date), [Validators.required]],
      carrier: [check == null ? '' : check.carrier],
      password: [check == null ? '' : check.password],
      is_pattern: [check == null ? false : check.is_pattern],
      pattern_code: [check == null ? '' : check.pattern_code],
      device_issue: [check == null ? '' : check.device_issue],
      step_to_reproduce: [check == null ? '' : check.step_to_reproduce],
      cosmetic_condition: [check == null ? '' : check.cosmetic_condition],
      device_canbe_tested: [check == null ? false : check.device_canbe_tested],
      reason_for_canbe_tested: [check == null ? '' : check.reason_for_canbe_tested],
      device_previously_repaired: [check == null ? false : check.device_previously_repaired],
      device_type_previous_repair: [check == null ? '' : check.device_type_previous_repair],
      place_repair_done: [check == null ? '' : check.place_repair_done],
      is_water_damage: [check == null ? false : check.is_water_damage],
      is_warranty: [check == null ? false : check.is_warranty],
      battery_life: [check == null ? '' : check.battery_life,],
      approved_to_device_restored: [check == null ? 'yes' : check.approved_to_device_restored, [Validators.required]],
      note: [check == null ? '' : check.note],
      otherDeviceIssues: [''],
      otherDeviceItem: [''],
      Customer: [customer == null ? '' : customer._id],
      BusinessLocation: [window.localStorage.getItem('location_id')],
    });
  }

  get fDeviceCheckInForm() {
    return this.deviceCheckInForm.controls
  }

  setFormValues(form, fel, val) {
    if(fel == 'is_pattern' && !val) {
      if(this.deviceCheckInForm.controls.password.value == '') {
        return
      }
    }
    this[form].controls[fel].setValue(val)
  }

  setDirectValues(field) {
    this[field] = !this[field]
  }

  issues = []
  items = []
  deviceIssueanditemleft(any, issue, type) {
    if (any.target.checked) {
      if (type == 'issue') {
        this.issues.push(issue);
      } else {
        this.items.push(issue);
      }
    } else {
      if (type == 'issue') {
        const index = this.issues.findIndex(x => x._id == issue._id);
        this.issues.splice(index, 1);
      } else {
        const index = this.items.findIndex(x => x._id == issue._id);
        this.items.splice(index, 1);
      }
    }
  }

  isChecked(issue, type) {
    if (type == 'issue') {
      let ret = this.issues.filter(iss => iss._id == issue._id);
      if (ret.length > 0) {
        return true
      }
      return false
    } else {
      let ret = this.items.filter(iss => iss._id == issue._id);
      if (ret.length > 0) {
        return true
      }
      return false
    }
  }

  checkinSubmitted = false
  saveDeviceCheckIn() {
    if (this.deviceCheckInForm.invalid) {
      this.checkinSubmitted = true
      return
    }
    if (this.issues.length == 0 && this.deviceCheckInForm.controls.otherDeviceIssues.value == '') {
      this.showToaster = false
      this.toasterType = 'error'
      this.toasterMsg = 'Please select at least one issue'
      return
    }
    let checkInData = this.deviceCheckInForm.value
    let allIssues = []
    let allItems = []
    this.issues.forEach(element => {
      allIssues.push(element._id)
    });
    this.items.forEach(element => {
      allItems.push(element._id)
    });
    checkInData['DeviceIssues'] = allIssues
    checkInData['DeviceItems'] = allItems
    if (!checkInData['device_canbe_tested']) {
      delete checkInData['reason_for_canbe_tested']
    }
    if (!checkInData['device_canbe_tested']) {
      delete checkInData['device_type_previous_repair']
    }
    console.log('device det', checkInData);
    let img = JSON.parse(JSON.stringify(this.deviceImages))
    for (let i = 0; i < this.deviceImages.length; i++) {
      delete this.deviceImages[i]['base64']
    }
    this.createSaleGQLService.createDeviceCheckIn(this.deviceCheckInId, checkInData, this.deviceImages).subscribe(
      (res) => {
        console.log('device checkin res', res['data'].createDeviceCheckIns);
        checkInData['DeviceIssues'] = res['data'].createDeviceCheckIns.DeviceIssues
        checkInData['DeviceItems'] = res['data'].createDeviceCheckIns.DeviceItems
        checkInData['checkinId'] = res['data'].createDeviceCheckIns._id
        checkInData['images'] = JSON.parse(JSON.stringify(this.deviceImages))
        checkInData['DeviceImages'] = res['data'].createDeviceCheckIns.SourceFile
        if (!this.callFromRepairRoom) {
          this.saleCartService.setCheckInData(checkInData)
        }
        this.deviceImages = []
        this.onCancel()
      }, (err) => {
        this.showToaster = false
        this.toasterType = 'error'
        this.toasterMsg = err.graphQLErrors[0].message
        console.log('err in checkin', err);
      }
    )
  }

  getCheckInByID(id) {
    this.createSaleGQLService.getDeviceCheckInByID(id).valueChanges.subscribe(
      (res) => {
        let checkInData = {}
        checkInData['Device'] = res['data'].getdeviceCheckIn.Device._id
        checkInData['DeviceIssues'] = res['data'].getdeviceCheckIn.DeviceIssues
        checkInData['DeviceItems'] = res['data'].getdeviceCheckIn.DeviceItems
        checkInData['checkinId'] = res['data'].getdeviceCheckIn._id
        checkInData['DeviceImages'] = res['data'].getdeviceCheckIn.SourceFile
        this.saleCartService.setCheckInData(checkInData)
      }, (err) => {
        console.log('err while loading checkin data');

      }
    )
  }

  deviceImages = []
  images = []
  onFileChanged(event) {
    this.deviceImages = []
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      this.deviceImages.push(event.target.files[i]);
    }
    if (event.target.files.length !== 0) {
      for (let i = 0; i < this.deviceImages.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(this.deviceImages[i]);
        reader.onload = (event: any) => {
          this.deviceImages[i]['base64'] = event.target.result;
        }
      }
    }
  }

  removeImage(index) {
    this.deviceImages.splice(index, 1)
  }

  removeImageFromDb(img, index) {
    console.log('img is', img);
    this.createSaleGQLService.removeFile(img['_id']).subscribe(
      (res) => {
        if (res['data'].deleteFile) {
          this.imagesAttached.splice(index, 1)
        }
      }, (err) => {
        this.showToaster = false
        this.toasterType = 'error'
        this.toasterMsg = err.graphQLErrors[0].message
        console.log('err in removing images', err);
      }
    )
  }

  uploadCheckInImages(id) {
    let img = JSON.parse(JSON.stringify(this.deviceImages))
    for (let i = 0; i < img.length; i++) {
      delete this.deviceImages[i]['base64']
    }
    let obj = {
      model_type: AllowedModel.Device,
      model_id: this.deviceId,
      location_id: localStorage.getItem('location_id')
    }
    this.createSaleGQLService.uploadCheckinDeviceImages(obj, this.deviceImages).subscribe(
      (res) => {
        this.deviceImages = []
        console.log('files uploaded', res);
        this.getCheckInByID(id)
      }, (err) => {
        console.log('err while uploading files', err);
      }
    )
  }

  onCancel() {
    if (this.callFromRepairRoom) {
      this.router.navigateByUrl('/Pointofsale/RepairRoom')
      return
    }
    this.createSaleService.setSectionTiles('', '', 'Device List', '')
    this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:ProductList/${this.deviceId})`)
  }

  showToaster = true
  toasterMsg = 'no msg'
  toasterType = 'error'
  closeToaster() {
    this.showToaster = true
  }

  lock: any
  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
    this.setFormValues('deviceCheckInForm', 'is_pattern', true)
    this.setFormValues('deviceCheckInForm', 'password', '')
    this.lock = new PatternLock('#patternHolder', { enableSetPattern: true });
    this.lock.setPattern(this.deviceCheckInForm.controls.pattern_code.value);
  }

  savePattern() {
    this.lock.getPattern();
    this.deviceCheckInForm.controls.pattern_code.setValue(this.lock.getPattern())
    this.setFormValues('deviceCheckInForm', 'is_pattern', true)
    console.log(this.lock.getPattern());
    this.modalRef.hide()
  }

  closeModel() {
    this.modalRef.hide()
  }

}