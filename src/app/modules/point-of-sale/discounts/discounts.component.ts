import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import {
  CreateCampaignGQL, CampaignInput, GetAllCampaignsGQL, GetAllTagsOfDiscountGQL, CreateTagGQL, TagInput,
  CreateDiscountGQL, DiscountInput, Status, Is_Active, UpdateDiscountGQL, CreateCouponCodeGQL, SearchTagsByTypeGQL,
  DeleteDiscountGQL, SearchInDiscountsGQL, SearchProductGQL, SearchCampaignsGQL, GetCampaignswithDiscountsGQL,
  GetDiscountsAndSearchGQL, EffectDiscountToCustomerGQL,
  SearchStatus,
  SendEmailGiftCardGQL, SearchDiscountTagsGQL, SearchCustomerTagsGQL
} from 'src/app/generated/graphql';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { CSVService } from 'src/app/services/csv.service';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  discounList = []
  addDiscountForm: FormGroup;
  addGiftForm: FormGroup;
  editDiscountForm: FormGroup;
  modalRef: BsModalRef;
  discounts = true
  gifts = false
  existingDiscounts = true
  addDiscounts = false
  editDiscounts = false
  existingGifts = true
  addGifts = false
  editGifts = false
  discountFilter = 'All'
  selectreq = 'Select requirements'
  descountSelected: DiscountInput
  campaignSearch: FormControl = new FormControl();
  discountSearch: FormControl = new FormControl();
  searchProducts: FormControl = new FormControl();
  searchDiscountTag: FormControl = new FormControl();
  searchCustomerTag: FormControl = new FormControl();
  campaignsList = false
  discountTagsList = false
  customerTagsList = false
  searchGift: FormControl = new FormControl();

  constructor(
    private modalService: BsModalService,
    private formbulider: FormBuilder,
    private getAllDiscountsGQL: GetDiscountsAndSearchGQL,
    private createDiscountGQL: CreateDiscountGQL,
    private toaster: ToasterService,
    private updateDiscountGQL: UpdateDiscountGQL,
    private deleteDiscountGQL: DeleteDiscountGQL,
    private CSVService: CSVService,
    private searchProductGQL: SearchProductGQL,
    private createCampaignGQL: CreateCampaignGQL,
    private createTagGQL: CreateTagGQL,
    private createCouponCodeGQL: CreateCouponCodeGQL,
    private searchTagsByTypeGQL: SearchTagsByTypeGQL,
    private searchCampaignsGQL: SearchCampaignsGQL,
    // private getAllGiftCardsGQL: GetAllGiftCardsGQL,
    private datePipe: DatePipe,
    private sendEmailGiftCard: SendEmailGiftCardGQL,
    private searchCustomerTagsGQL: SearchCustomerTagsGQL,
    private searchDiscountTagsGQL: SearchDiscountTagsGQL,
    private effectDiscountToCustomerGQL: EffectDiscountToCustomerGQL
  ) { }

  ngOnInit() {
    this.initializeaddDiscountForm()
    this.initializeaddGiftForm()
    this.getAllDiscounts()
    this.getAllGiftCards()
    this.campaignSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.getAllCampaigns()
    });
    this.discountSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.getAllDiscounts()
    });
    this.searchProducts.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.searchProduct()
    });
    // this.searchDiscountTag.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
    //   this.getAllDiscountTags()
    // });
    this.searchCustomerTag.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.getCustomerTags()
    });
    this.searchGift.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
      if (this.searchGift.value == '') {
        this.allGift = true
        this.usedGift = false
        this.notUsedGift = false
        this.activeGift = false
        this.getAllGiftCards()
      } else {
        this.allGift = false
        this.getAllGiftCards()
      }
    });
  }

  //////////////// Discount Section  /////////////////
  generateCouponCode() {
    this.createCouponCodeGQL.watch().valueChanges.subscribe(
      (res) => {
        console.log('coupon code is', res['data'].createCouponCode);
        this.addDiscountForm.controls.code.setValue(res['data'].createCouponCode.code)
      }, (err) => {
        console.log('coupon code err', err);
      }
    )
  }

  allProducts = []
  selectedProduct = []
  searchProduct() {
    this.closeList = false
    this.searchProductGQL.watch({
      search: this.searchProducts.value,
      locationId: window.localStorage.getItem('location_id')
    }).valueChanges.subscribe(
      (res) => {
        console.log('product search response is', res['data'].searchProduct);
        this.allProducts = JSON.parse(JSON.stringify(res['data'].searchProduct))
      }, (err) => {
        console.log('product search error is ', err);
      }
    )
  }

  itemExist = false
  closeList = false
  selectProduct(product) {
    this.itemExist = false
    for (let i = 0; i < this.selectedProduct.length; i++) {
      if (this.selectedProduct[i]._id === product._id) {
        this.itemExist = true
      }
    }
    if (!this.itemExist) {
      this.selectedProduct.push(product)
      this.closeList = true
    }
    else {
      this.toaster.showError('Product already added', '')
    }
  }

  allCampaigns = []
  getAllCampaigns() {
    this.campaignsList = false
    this.searchCampaignsGQL.watch({
      search: this.campaignSearch.value
    }).valueChanges.subscribe(
      (res) => {
        this.allCampaigns = res['data'].searchCampaigns
      }, (err) => {
        console.log('error while getting all campains', err);
      }
    )
  }

  selectedCampaign = {}
  selectCampaign(campaign) {
    this.campaignSearch.setValue(campaign.name)
    this.selectedCampaign = campaign
    this.addDiscountForm.controls.Campaign.setValue(campaign._id)
    this.campaignsList = true
  }

  createCampaing() {
    let campaignInput: CampaignInput = {
      name: this.campaignSearch.value,
      BusinessLocation: window.localStorage.getItem('location_id')
    }
    this.createCampaignGQL.mutate({
      input: campaignInput
    }).subscribe(
      (res) => {
        console.log('create campaign res', res['data'].createCampaign);
        this.allCampaigns.push(res['data'].createCampaign)
        this.addDiscountForm.controls.Campaign.setValue(res['data'].createCampaign._id)
        this.selectedCampaign = res['data'].createCampaign
        this.campaignsList = true
        this.toaster.showSuccess('Campaign create successfully', 'Campaign create')
      }, (err) => {
        console.log('create campaign err', err);
        this.toaster.showError(err['message'].substring(15, 50), 'Campaign')
      }
    )
  }

  allDiscountTags = []
  addTagToList(type, list) {
    let itemExists = false
    for (let i = 0; i < this[list].length; i++) {
      if (this[list][i] == this[type].value) {
        itemExists = true
      }
    }
    if (!itemExists) {
      this[list].push(this[type].value)
      this[type].setValue('')
    }
    else {
      this.toaster.showError('Tag already exist', '')
    }
  }

  selectedDicountTags = []
  selectDiscountTag(tag) {
    this.discountTagsList = true
    this.selectedDicountTags.push(tag)
  }

  getAllDiscountTags() {
    this.discountTagsList = false
    this.searchDiscountTagsGQL.watch({
      search: this.searchDiscountTag.value
    }).valueChanges.subscribe(
      (res) => {
        this.allDiscountTags = res['data'].searchDiscountTags
      }, (err) => {
        console.log('tags of discount err', err);
      }
    )
  }

  allCustomerTags = []
  getCustomerTags() {
    this.customerTagsList = false
    this.searchCustomerTagsGQL.watch({
      search: this.searchCustomerTag.value
    }).valueChanges.subscribe(
      (res) => {
        this.allCustomerTags = res['data'].searchCustomerTags
      }, (err) => {
        console.log('tags of customer err', err);
      }
    )
  }

  selectedCustomerTags = []
  selectCustomerTag(tag) {
    this.customerTagsList = true
    this.selectedCustomerTags.push(tag)
    this.searchCustomerTag.setValue(null)
  }

  updateFilters(filter) {
    this.discountFilter = filter
    this.getAllDiscounts()
  }

  discountLoader = false
  getAllDiscounts() {
    this.discountLoader = true
    this.getAllDiscountsGQL.watch({
      input: {
        limit: 1000,
        skip: 0,
        BusinessLocation: window.localStorage.getItem('location_id'),
        status: SearchStatus[this.discountFilter],
        search: this.discountSearch.value == null ? "" : this.discountSearch.value,
      }
    }).valueChanges.subscribe(
      (res) => {
        console.log('all dis', res['data']);
        this.discountLoader = false
        this.discounList = res['data'].getDiscountsAndSearch
      }, (err) => {
        console.log('error while loading dis', err);
        this.discountLoader = false
      }
    )
  }

  totalCustomers = 0
  effectedCustomers = 0
  updateDiscountBar() {
    if (this.addDiscountForm.controls.is_customer_since.value) {
      if (this.addDiscountForm.controls.customer_since.value == '') {
        return
      }
    }
    if (this.addDiscountForm.controls.is_customer_spent_amount.value) {
      if (this.addDiscountForm.controls.spent_amount.value == '') {
        return
      }
    }
    let obj = {
      is_customer_since: this.addDiscountForm.controls.is_customer_since.value,
      customer_since: this.addDiscountForm.controls.customer_since.value,
      is_customer_spent_amount: this.addDiscountForm.controls.is_customer_spent_amount.value,
      is_customer_more_then_said_amount: this.addDiscountForm.controls.is_customer_more_then_said_amount.value,
      spent_amount: parseFloat(this.addDiscountForm.controls.spent_amount.value)
    }
    this.effectDiscountToCustomerGQL.watch({
      input: obj
    }).valueChanges.subscribe(
      (res) => {
        console.log('update discount bar res',res['data'].effectDiscountToCustomer);
        this.totalCustomers = res['data'].effectDiscountToCustomer.Total_customer
        this.effectedCustomers = res['data'].effectDiscountToCustomer.effect_customer
      }, (err) => {
        console.log('update discount bar err',err);
      }
    )
  }

  addDiscountSubmitted = false
  initializeaddDiscountForm() {
    this.addDiscountForm = this.formbulider.group({
      Campaign: [, [Validators.required]],
      code: ['', [Validators.required]],
      Tags: [],
      is_percentage: [false, [Validators.required]],
      discount_amount: ['', [Validators.required]],
      is_minimum_purchase: [false, [Validators.required]],
      is_minimum_amount: [true, [Validators.required]],
      how_much_amount: [''],
      is_entire_order: [true, [Validators.required]],
      Product: [],
      is_customer_since: [true, [Validators.required]],
      customer_since: [''],
      is_new_customer_only: [false, [Validators.required]],
      new_customer_register_after_date: [''],
      is_customer_spent_amount: [false, [Validators.required]],
      is_customer_more_then_said_amount: [false, [Validators.required]],
      spent_amount: [''],
      customerTags: [],
      is_customer_can_use_only_once: [true, [Validators.required]],
      number_of_usage_per_customer: [''],
      can_schedule: [true, [Validators.required]],
      schedule_from_date: [''],
      schedule_from_time: [''],
      schedule_to_date: [''],
      schedule_to_time: [''],
      send_email: [false],
      BusinessLocation: [window.localStorage.getItem('location_id')]
    });
  }

  get faddDiscountForm() {
    return this.addDiscountForm.controls;
  }

  setDiscountProperties(type, property) {
    this[type].controls[property].setValue(!this[type].controls[property].value)
    this.updateDiscountBar()
  }

  setCustomerDiscountProperties(type, property, property2) {
    this[type].controls[property].setValue(!this[type].controls[property].value)
    this[type].controls[property2].setValue(!this[type].controls[property2].value)
    this.updateDiscountBar()
  }

  setAmount(type, val) {
    this[type].controls.choseAmount.setValue(val)
  }

  setDiscountType(type) {
    this[type].controls.is_percentage.setValue(!this[type].controls.is_percentage.value)
  }

  setMinimumAmount(type) {
    this[type].controls.is_minimum_amount.setValue(!this[type].controls.is_minimum_amount.value)
  }

  appDiscountOnOrder(type) {
    this[type].controls.is_entire_order.setValue(!this[type].controls.is_entire_order.value)
  }

  finalProducts = []
  extractProducts() {
    this.finalProducts = []
    for (let i = 0; i < this.selectedProduct.length; i++) {
      this.finalProducts.push(this.selectedProduct[i]._id)
    }
    return this.finalProducts
  }

  prepareDiscountData(type) {
    let discountObject = this[type].value
    let sFDate = this.datePipe.transform(discountObject['schedule_from_date'], 'yyyy-MM-dd');
    let sTDate = this.datePipe.transform(discountObject['schedule_to_date'], 'yyyy-MM-dd');
    discountObject['tags'] = this.selectedDicountTags
    discountObject['customerTags'] = this.selectedCustomerTags
    discountObject['Product'] = this.extractProducts()
    // discountObject['status'] = Status.Active
    discountObject['is_active'] = Is_Active.Enabled
    discountObject['schedule_from'] = new Date(sFDate + ' ' + discountObject['schedule_from_time']).toString()
    discountObject['schedule_to'] = new Date(sTDate + ' ' + discountObject['schedule_to_time']).toString()
    delete discountObject['schedule_from_date']
    delete discountObject['schedule_to_date']
    delete discountObject['schedule_from_time']
    delete discountObject['schedule_to_time']
    discountObject['customer_since'] = discountObject['customer_since'].toString()
    discountObject['new_customer_register_after_date'] = !this[type].controls.is_new_customer_only.value ? null : discountObject['new_customer_register_after_date'].toString()
    discountObject['how_much_amount'] = parseFloat(discountObject['how_much_amount'])
    discountObject['spent_amount'] = parseFloat(discountObject['spent_amount'])
    discountObject['discount_amount'] = parseFloat(discountObject['discount_amount'])
    discountObject['number_of_usage_per_customer'] = this[type].controls.is_customer_can_use_only_once.value ? null : parseFloat(discountObject['number_of_usage_per_customer'])
    discountObject['schedule_from'] = !this[type].controls.can_schedule.value ? null : discountObject['schedule_from']
    discountObject['schedule_to'] = !this[type].controls.can_schedule.value ? null : discountObject['schedule_to']
    discountObject['spent_amount'] = !this[type].controls.is_customer_spent_amount.value ? null : discountObject['spent_amount']
    discountObject['new_customer_register_after_date'] = !this[type].controls.is_new_customer_only.value ? null : discountObject['new_customer_register_after_date']
    discountObject['customer_since'] = !this[type].controls.is_customer_since.value ? null : discountObject['customer_since']
    discountObject['how_much_amount'] = !this[type].controls.is_minimum_purchase.value ? null : discountObject['how_much_amount']
    discountObject['status'] = Status.Active
    delete discountObject['how_much_amount']
    discountObject = this.cleanObject(discountObject)
    console.log('final object is', discountObject);
    return discountObject
  }

  addDiscount() {
    this.addDiscountSubmitted = true
    if (this.addDiscountForm.invalid) {
      this.toaster.showError('Please fill all the required fields', '')
      return;
    }
    this.createDiscountGQL.mutate({
      input: this.prepareDiscountData('addDiscountForm')
    }).subscribe(
      (res) => {
        this.getAllDiscounts()
        this.existingDiscounts = true
        this.addDiscounts = false
        this.addDiscountSubmitted = false
        this.selectedCampaign = ''
        this.selectedProduct = []
        this.selectedDicountTags = []
        this.selectedCustomerTags = []
        this.toaster.showSuccess('Discount added sucessfully', 'Discount added')
        this.initializeaddDiscountForm()
      }, (err) => {
        console.log('discount added err', err);
        this.toaster.showError(err['message'].substr(15, 47), 'Discount err')
      }
    )
  }

  /////////////////// Update Discount //////////////////
  campaignDate: any
  editDiscountSubmitted = false
  initializeEditDiscountForm(comp, dis) {
    this.campaignDate = comp.start_date
    let sFtime = this.datePipe.transform(dis.schedule_from, 'hh:mm');
    let sTtime = this.datePipe.transform(dis.schedule_to, 'hh:mm');
    this.campaignSearch.setValue(comp['name'])
    this.editDiscountForm = this.formbulider.group({
      Campaign: [comp['_id'], [Validators.required]],
      code: [dis.code, [Validators.required]],
      Tags: [],
      is_percentage: [dis.is_percentage, [Validators.required]],
      discount_amount: [dis.discount_amount, [Validators.required]],
      is_minimum_purchase: [dis.is_minimum_purchase, [Validators.required]],
      is_minimum_amount: [dis.is_minimum_amount, [Validators.required]],
      how_much_amount: [dis.how_much_amount],
      is_entire_order: [dis.is_entire_order, [Validators.required]],
      Product: [],
      is_customer_since: [dis.is_customer_since, [Validators.required]],
      customer_since: [new Date(dis.customer_since)],
      is_new_customer_only: [dis.is_new_customer_only, [Validators.required]],
      new_customer_register_after_date: [dis.new_customer_register_after_date],
      is_customer_spent_amount: [dis.is_customer_spent_amount, [Validators.required]],
      is_customer_more_then_said_amount: [dis.is_customer_more_then_said_amount, [Validators.required]],
      spent_amount: [dis.spent_amount],
      customerTags: [],
      is_customer_can_use_only_once: [dis.is_customer_can_use_only_once, [Validators.required]],
      number_of_usage_per_customer: [dis.number_of_usage_per_customer],
      can_schedule: [dis.can_schedule, [Validators.required]],
      schedule_from_date: [new Date(dis.schedule_from)],
      schedule_from_time: [sFtime],
      schedule_to_date: [new Date(dis.schedule_to)],
      schedule_to_time: [sTtime],
      send_email: [false],
      BusinessLocation: [window.localStorage.getItem('location_id')]
    });
    console.log('discount update Values----------->', this.editDiscountForm.value);

  }

  get fEditDiscountForm() {
    return this.editDiscountForm.controls;
  }

  updateDiscount() {
    this.editDiscountSubmitted = true
    if (this.editDiscountForm.invalid) {
      return;
    }
    this.updateDiscountGQL.mutate({
      id: this.descountSelected['_id'],
      input: this.prepareDiscountData('editDiscountForm')
    }).subscribe(
      (res) => {
        console.log('discount update res', res['data']);
        this.existingDiscounts = true
        this.editDiscounts = false
        this.getAllDiscounts()
        this.toaster.showSuccess('Discount updated sucessfully', 'Discount update')
      }, (err) => {
        console.log('discount added err', err);
        this.toaster.showError('Error while updating discount', 'Discount err')
      }
    )
  }

  //////////////////// End here ///////////////////

  removeDiscount() {
    this.deleteDiscountGQL.mutate({
      id: this.descountSelected['_id']
    }).subscribe(
      (res) => {
        console.log('dis remove res', res['data']);
        this.getAllDiscounts()
        this.modalRef.hide()
        this.toaster.showSuccess('Discount removed', 'Discount Remove')
      }, (err) => {
        console.log('dis remove err', err);
        this.toaster.showError('Error while removing discount', 'Discount Remove')
      }
    )
  }


  exportAsCSV(type): void {
    this.CSVService.saveAsCSVFile(this[type], 'discount');
  }

  //============================================== Discount section end here ==========================================//

  //============================================== Gift card section start from here ==========================================//

  exportGiftAsCSV() {
    let giftObj = []
    for (let i = 0; i < this.giftList.length; i++) {
      if (this.giftList[i]['checked'] == true) {
        let tempObj = {}
        let sentDate = this.datePipe.transform(this.giftList[i]['send_gift_card'], 'yyyy-MM-dd');
        tempObj['Subject'] = this.giftList[i]['subject']
        tempObj['Sender Name'] = this.giftList[i]['Customer'].first_name + ' ' + this.giftList[i]['Customer'].last_name
        tempObj['Receiver Name'] = this.giftList[i]['to']
        tempObj['Sender Email'] = this.giftList[i]['Customer'].email
        tempObj['Receiver Email'] = this.giftList[i]['email']
        tempObj['Amount'] = this.giftList[i]['amount']
        tempObj['Message'] = this.giftList[i]['message']
        tempObj['Sent Date'] = sentDate
        tempObj['Card Number'] = this.giftList[i]['card_no']
        giftObj.push(tempObj)
      }
    }
    if (this.isObjectEmpty(giftObj)) {
      this.toaster.showError('Select Gift Card', 'Please Select Gift Card First')
    } else {
      this.CSVService.saveAsCSVFile(giftObj, 'GiftRecoeds');
    }
  }

  allGift = true
  usedGift = false
  notUsedGift = false
  activeGift = false
  giftLoader = false
  getAllGiftCards() {
    // if (this.usedGift == true || this.activeGift == true || this.notUsedGift == true) {
    //   this.allGift = false
    // }
    // this.giftLoader = true
    // this.getAllGiftCardsGQL.watch({
    //   input: {
    //     all: this.allGift,
    //     card_no: this.searchGift.value == null ? '' : this.searchGift.value,
    //     is_used: this.usedGift
    //   }
    // }).valueChanges.subscribe(
    //   (res) => {
    //     this.giftList = res['data'].GetAllGiftCards
    //     for (let i = 0; i < this.giftList.length; i++) {
    //       this.giftList[i]['checked'] = false
    //     }
    //     console.log('All gift cards are-->', this.giftList);
    //     this.giftLoader = false
    //   }, (err) => {
    //     console.log('all gift cards err', err);
    //     this.giftLoader = false
    //   }
    // )
  }

  giftCheked(values: any, gift) {
    if (values.target.checked == true) {
      gift.checked = true
    } else {
      gift.checked = false
    }
  }

  changeAllGiftType() {
    this.allGift = true
    this.usedGift = false
    this.activeGift = false
    this.notUsedGift = false
    this.getAllGiftCards()
  }

  changeUsedGiftType() {
    this.usedGift = true
    this.notUsedGift = false
    this.getAllGiftCards()
  }

  changeNotUsedGiftType() {
    this.notUsedGift = true
    this.usedGift = false
    this.getAllGiftCards()
  }

  changeActiveGiftType() {
    this.activeGift = !this.activeGift
    this.getAllGiftCards()
  }

  addGiftSubmitted = false
  initializeaddGiftForm() {
    this.addGiftForm = this.formbulider.group({
      giftCardName: ['', [Validators.required]],
      choseAmount: [, [Validators.required]]

    });
  }

  get faddGiftForm() {
    return this.addGiftForm.controls;
  }

  editGiftForm: any
  initializeEditGiftForm(giftCards) {
    this.editGiftForm = this.formbulider.group({
      giftCardName: [giftCards.giftCardName, [Validators.required]],
      choseAmount: [giftCards.choseAmount, [Validators.required]]

    });
  }

  addGiftObject = {}
  giftList = []
  saveGiftCard() {
    if (this.addGiftForm.invalid) {
      this.addGiftSubmitted = true
    } else {
      this.addGiftObject = JSON.parse(JSON.stringify(this.addGiftForm.value))
      this.getAllGiftCards()
      console.log("the gift card values", this.giftList)
      this.initializeaddGiftForm()
      this.addGifts = false
      this.existingGifts = true
    }
  }

  removeGiftCards() {
    var index = this.giftList.map(x => {
      return x._id;
    }).indexOf(this.addGiftObject);
    this.giftList.splice(index, 1);
    this.modalRef.hide()
  }

  editGiftCards(giftCard) {
    this.initializeEditGiftForm(giftCard)
    this.existingGifts = false
    this.editGifts = true


  }

  sentemail = false
  emailSendLoader = false
  sendEmailGiftCardFun(id) {
    this.emailSendLoader = true
    this.sendEmailGiftCard.watch({
      id: id,
    }).valueChanges.subscribe(
      (res) => {
        this.sentemail = res['data'].sendEmailGiftCard
        console.log('send Email Gift Card res', this.sentemail);
        this.emailSendLoader = false
        this.toaster.showSuccess('Email Send Successfully', 'Email Sent')
      }, (err) => {
        console.log('send Email Gift Card err', err)
        this.emailSendLoader = false
        this.toaster.showError('Email Not Send Try Again', 'Email Not Sent')
      }
    )
  }

  //============================================== Gift card section start from here ==========================================//

  loadSection(val) {
    switch (val) {
      case 'D': {
        this.discounts = true
        this.gifts = false
        break;
      }
      case 'G': {
        this.discounts = false
        this.gifts = true
      }
    }
  }

  closeLists() {
    // this.campaignsList = true
    // this.discountTagsList = true
    // this.customerTagsList = true
    // this.closeList = true
  }

  removeTags(id, type, field) {
    var index = this[type].map(x => {
      return x._id;
    }).indexOf(id);
    this[type].splice(index, 1);
  }

  removeDiscountAndCustomerTags(val, type) {
    for (let i = 0; i < this[type].length; i++) {
      if (this[type][i] == val) {
        this[type].splice(i, 1);
      }
    }
  }

  disFilter: SearchStatus
  applyDiscountFilter(type, val, status) {
    this[type] = val
    if (status == "All") {
      this.disFilter = SearchStatus.All
    } else if (status == "Active") {
      this.disFilter = SearchStatus.Active
    } else if (status == "Scheduled") {
      this.disFilter = SearchStatus.Scheduled
    } else {
      this.disFilter = SearchStatus.Expired
    }
    this.getAllDiscounts()
  }

  changeValue(type, val) {
    this[type] = val
  }

  cancel(val, val1) {
    this[val] = false
    this[val1] = true
    this.initializeaddDiscountForm()
    this.selectedDicountTags = []
    this.selectedCustomerTags = []
    this.getAllDiscounts()
  }

  open(val, val1) {
    this[val] = false
    this[val1] = true
  }

  openEditDis(comp, dis) {
    this.initializeEditDiscountForm(comp, dis)
    this.descountSelected = dis
    this.existingDiscounts = false
    this.editDiscounts = true
  }

  closeModel() {
    this.modalRef.hide()
  }

  model_remove(template: TemplateRef<any>, cls, type, val) {
    this[type] = val
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
  }

  cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '' || obj[propName] == NaN) {
        delete obj[propName];
      }
    }
    return obj
  }

  checkBoxClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  addTag(event, type, list) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 32 || charCode == 13 || charCode == 9) {
      this.addTagToList(type, list)
      return false
    }
    return true
  }

}
