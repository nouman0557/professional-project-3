import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomerGQLService } from "src/app/services/customer/customerGQL.service"
import { CustomerService } from "src/app/services/customer/customer.service"
import { CreateSaleService } from 'src/app/services/create-sale/create-sale.service'

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  isCustomerSubmitted: Boolean = false
  emailError = false
  loading: boolean = false
  customerId: string = ''
  navigationSource: string = ''
  titleText = "Add the following data to create a customer"
  locationId=window.localStorage.getItem('location_id')
  constructor(private formbulider: FormBuilder,
    private customerGQLService: CustomerGQLService,
    private customerService: CustomerService,
    private createSaleService: CreateSaleService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.initializeCustomerForm()
    this.route.data.subscribe(data => {
      this.navigationSource = data.navigationSource;
    })

    this.route.params.subscribe(params => {
      if (params['customerId']) {
        this.customerId = params['customerId']
        this.titleText = "Edit the following data of customer"
        this.getCustomerById(params['customerId'])
      }
    });
    this.changeSectionTitle(this.navigationSource)
    

  }
  

  getCustomerById(id) {
    this.loading = true
    this.customerGQLService.getCustomerById(id,this.locationId)
      .valueChanges.subscribe(
        (res) => {
          this.initializeCustomerForm(res['data'].getCustomerById)
          console.log(res['data'].getCustomerById)
          this.loading = false
        },
        (err) => {
          console.log('Error on get customer by id', err.message)
          this.loading = false
        })
  }

  
  changeSectionTitle(navigationSource = this.navigationSource){
    if (navigationSource == 'customer') {
      if (this.customerId == '' || this.customerId == undefined) {
        this.customerService.onChangeSection('Add CUSTOMER')
      } else {
        this.customerService.onChangeSection('EDIT CUSTOMER')
      }
    } else if (navigationSource == 'createSale') {
      if (this.customerId == '' || this.customerId == undefined) {
        this.createSaleService.setSectionTiles('','','ADD CUSTOMER','')
      } else {
        this.createSaleService.setSectionTiles('','','EDIT CUSTOMER','')
      }
    }
  }


  initializeCustomerForm(customer = null) {
    if (!customer) {
      this.customerForm = this.formbulider.group({
        email: [, [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        first_name: ['', [Validators.required]],
        last_name: [, [Validators.required]],
        address_1: [, [Validators.required]],
        address_2: [''],
        city: [, [Validators.required]],
        state: [, [Validators.required]],
        zip_code: [, [Validators.required]],
        phone: [, [Validators.required]],
        can_sms: [false, [Validators.required]],
        can_email: [false, [Validators.required]],
        location_id: [localStorage.getItem('location_id'), [Validators.required]],
        Tags: [[]],
        marketing_question: [[]]
      });
    }
    else {
      this.customerForm = this.formbulider.group({
        email: [customer.email, [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        first_name: [customer.first_name, [Validators.required]],
        last_name: [customer.last_name, [Validators.required]],
        address_1: [customer.address_1, [Validators.required]],
        address_2: [customer.address_2],
        city: [customer.city, [Validators.required]],
        state: [customer.state, [Validators.required]],
        zip_code: [customer.zip_code, [Validators.required]],
        phone: [customer.phone, [Validators.required]],
        can_sms: [customer.can_sms, [Validators.required]],
        can_email: [customer.can_email, [Validators.required]],
        location_id: [localStorage.getItem('location_id'), [Validators.required]],
        Tags: [customer.tags],
        marketing_question: [customer.marketing_question]
      });
    }
  }

  getStringArrayFromTags(tagsList) {
    let allTags = []
    for (let i = 0; i < tagsList.length; i++) {
      if (tagsList[i].name)
        allTags.push(tagsList[i].name)
      else
        allTags.push(tagsList[i])
    }

    return allTags;
  }

  saveCustomer() {
    this.isCustomerSubmitted = true
    if (this.customerForm.invalid || !this.customerService.validateEmail(this.customerForm.controls.email.value)) {
      console.log('form', this.customerForm)
      return;
    }
    else {
      this.customerForm.controls.Tags.setValue(this.getStringArrayFromTags(this.customerForm.controls.Tags.value))
      this.customerForm.controls.marketing_question.setValue(this.getStringArrayFromTags(this.customerForm.controls.marketing_question.value))
      if (this.customerId == '') {
        this.addCustomer(this.customerForm.value)
      } else {
        this.updateCustomer(this.customerId, this.customerForm.value)
      }
    }
  }

  addCustomer(customer) {
    this.loading = true
    this.customerGQLService.addCustomer(this.customerForm.value)
      .subscribe(
        (res) => {
          this.loading = false
          let customer = res['data'].createCustomer
          this.customerService.setSelectedCustomerId(customer._id)
          this.customerService.onCustomerListinRefresh()
          this.navigationSource == 'customer' ? this.customerService.showToaster(['Customer added succesfully', 'success']) : this.createSaleService.showToaster(['Customer added succesfully', 'success']) 
          this.onCancel(customer._id)
        }, (err) => {
          this.loading = false
          this.navigationSource == 'customer' ? this.customerService.showToaster([err.message, 'error']) : this.createSaleService.showToaster([err.message, 'error'])
          console.log(err.message)
        }
      )
  }

  updateCustomer(customerId, customer) {
    this.loading = true
    this.customerGQLService.updateCustomer(customerId, customer)
      .subscribe((res) => {
        this.loading = false
        this.customerService.setSelectedCustomerId(customerId)
        this.customerService.onCustomerListinRefresh()
        this.navigationSource == 'customer' ? this.customerService.showToaster(['Customer updated succesfully', 'success']) : this.createSaleService.showToaster(['Customer updated succesfully', 'success'])
        this.onCancel(customerId)
      }, (err) => {
        this.loading = false
        this.navigationSource == 'customer' ? this.customerService.showToaster([err.message, 'error']) : this.createSaleService.showToaster([err.message, 'error'])
      })
  }

  onCancel(customerId = '') {
    if (this.navigationSource == 'customer') {
      if (customerId == '') {
        this.router.navigateByUrl(`Pointofsale/Customers/Listing`);
      } else {
        this.router.navigateByUrl(`Pointofsale/Customers/Listing/(right-panel:detail/${customerId})`)
      }
    } else if (this.navigationSource == 'createSale') {
       
      this.createSaleService.setSectionTiles('','','CUSTOMER LIST','')
      this.router.navigateByUrl('Pointofsale/CreateSale/Order')
    }

  }

}
