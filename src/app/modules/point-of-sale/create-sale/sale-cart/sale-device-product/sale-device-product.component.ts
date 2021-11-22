import { Component, OnInit, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { PrintService } from 'src/app/print/print.service'
import PatternLock from 'patternlock';
import { EnvironmentUrl } from 'src/environments/environment-url';



@Component({
  selector: 'sale-device-product',
  templateUrl: './sale-device-product.component.html',
  styleUrls: ['./sale-device-product.component.css']
})
export class SaleDeviceProductComponent implements OnInit {
  baseUrl = EnvironmentUrl.Images
  @Input() device: {}
  @Output() public removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() public onCalculateTotal: EventEmitter<any> = new EventEmitter();

  customer = {}

  constructor(private router: Router,
    private createSaleService: CreateSaleService,
    private printService: PrintService) { }

  ngOnInit() {
    this.device['storeName'] = localStorage.getItem('storeName')
    this.device['total_amount'] = 0
  }
  clearDeviceCheckIn() {
    this.device['Checkin'] = null
    this.device['DeviceCheckIn'] = ''
  }

  onCheckInDevice(deviceId) {
    this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:Device/Check-In/${deviceId})`)
  }

  onCalculateTotalAmount() {
    this.device['total_amount'] = 0
    if (this.device['deviceProducts'].length > 0) {
      this.device['deviceProducts'].forEach(item => {
        this.device['total_amount'] = this.device['total_amount'] + item.total_amount
      })
    }
    this.onCalculateTotal.emit()
  }

  onRemveProductFromDevice(id) {
    this.device['deviceProducts'] = this.device['deviceProducts'].filter(item => item._id !== id)
    this.onCalculateTotalAmount()
  }

  onRemoveFromCart(id) {
    this.removeFromCart.emit([id]);
  }
  noOpenAccordian(e) {
    e.stopPropagation();
  }

  print() {
    this.printService.printDocument('device-label', this.device)
  }

  onSelectSerivice(isOpen) {
    let is_product = !isOpen
    this.createSaleService.getDeviceProductAndService(this.device['_id'], isOpen)
  }

  onDeviceSelect(isOpen) {
    let is_product = !isOpen
    this.createSaleService.getDeviceProductAndService(this.device['_id'], is_product)
  }

  openPatternModel(template: TemplateRef<any>, cls) {
    this.createSaleService.openModal(template, cls)
    var lock = new PatternLock('#patternHolder', { enableSetPattern: true });
    lock.setPattern(this.device['Checkin']['pattern_code']);
    lock.disable();
  }
}
