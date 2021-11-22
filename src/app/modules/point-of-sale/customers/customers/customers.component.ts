import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart, RouterOutlet } from "@angular/router";

import { CustomerService } from "src/app/services/customer/customer.service"

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  hideToaster: boolean = true
  toasterMsg: String = ''
  toasterType: string = ''
  sectionHeadingText: string = ''
  toraster$: any
  sectionText$: any

  constructor(private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private outlet: RouterOutlet) { }

  ngOnDestroy(): void {
    this.toraster$.unsubscribe()
    this.sectionText$.unsubscribe()
  }
  ngOnInit() {
    this.toraster$ = this.customerService.onShowToasted$.subscribe((res) => {
      this.toasterFunction(res[0], res[1])
    });
    this.sectionText$ = this.customerService.sectionTitleText$.subscribe((res) => {
      this.sectionHeadingText = res
    })
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
