import { Component, OnInit,AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'
import { SaleCartService } from 'src/app/services/create-sale/sale-cart.service'
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit, AfterViewInit, OnDestroy {


  toraster$: any
  sectionText$: any
  $activeSection: any

  hideToaster: boolean = true
  toasterMsg: String = ''
  toasterType: String = ''
  

  activeSection = {
    rightSection1: false,
    rightSection2: false,
    rightSection3: false
  }

  sectionTitles = {
    leftSectionTitle: 'ORDER SUMMARY',
    rightSectionTitle1: 'PRODUCT LIST',
    rightSectionTitle2: 'CUSTOMER LIST',
    rightSectionTitle3: 'NOTES',
  }

  constructor(private createSaleService: CreateSaleService,
    private router: Router,
    private route: ActivatedRoute,
    private saleCartService: SaleCartService,
    private cdr : ChangeDetectorRef) { }

  ngOnInit() { }
  ngOnDestroy(){
    this.toraster$.unsubscribe()
    this.sectionText$.unsubscribe()
    this.$activeSection.unsubscribe()
  }

  ngAfterViewInit(){
    this.toraster$ = this.createSaleService.onShowToaster$.subscribe((res) => {
      this.toasterFunction(res[0], res[1])
    });
    this.sectionText$ = this.createSaleService.sectionTitleText$.subscribe((res) => {
      this.sectionTitles = this.createSaleService.getSectionTitles()
    })
    this.$activeSection = this.createSaleService.$activeSection.subscribe((res)=>{
      this.activeSection = res
      this.cdr.detectChanges();
    })
    this.highLightSection()

  }
  highLightSection() {
    
    if (this.router.url == '/Pointofsale/CreateSale/Order' || this.router.url.includes("CustomerList"))
      this.activeSection.rightSection2 = true
    else if (this.router.url.includes('ProductList'))
      this.activeSection.rightSection1 = true
    else if(this.router.url.includes("DeviceList")){
      this.activeSection.rightSection2 = true
      this.sectionTitles.rightSectionTitle2 = "Device List"
    }
  }

  loadComponet(component) {
    if (component == 'productList') {
      this.resetActiveSection()
      this.activeSection.rightSection1 = true
      this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:ProductList)`)
    } else if (component == 'customerList') {
      this.resetActiveSection()
      this.activeSection.rightSection2 = true
      if (this.saleCartService.getSelectedCustomerId() == '' || this.saleCartService.getSelectedCustomerId() == null) {
        this.router.navigateByUrl('Pointofsale/CreateSale/Order')
      }
      else {
        this.router.navigateByUrl(`Pointofsale/CreateSale/Order/(right-panel:DeviceList/${this.saleCartService.getSelectedCustomerId()})`)
      }
    }
  }
  resetActiveSection() {
    this.activeSection = {
      rightSection1: false,
      rightSection2: false,
      rightSection3: false
    }
  }

  toasterFunction(message, status) {
    this.hideToaster = false
    this.toasterMsg = message
    this.toasterType = status
  }
  closeToaster() {
    this.hideToaster = true
  }

}
