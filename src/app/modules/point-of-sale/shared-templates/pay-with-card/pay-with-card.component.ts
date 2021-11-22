import { Component, OnInit,ViewChild,Output,EventEmitter ,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';
@Component({
  selector: 'app-pay-with-card',
  templateUrl: './pay-with-card.component.html',
  styleUrls: ['./pay-with-card.component.css']
})
export class PayWithCardComponent implements OnInit {

  @ViewChild("payWithCardModal", { static: false }) payWithCardModal: TemplateRef<any>
  @Output() cardDetails  : EventEmitter<any> = new EventEmitter<any>()
  modalOpen = false
  modalRef: BsModalRef
  cardDetailsData={}
  constructor(
    private modalService: BsModalService,
  ) { }
  
  ngOnInit() {
  
  }

  openModal() {
    this.modalOpen = true;
    let date = new Date()
    let year = Number(date.getFullYear().toString().substr(-2))
    for (let i = 0; i < 7; i++) {
      this.years.push((year + i).toString())
    }
    this.modalRef= this.modalService.show(this.payWithCardModal, { class: 'modal-sm ' + 'box-custom-product wd400', backdrop: 'static', keyboard: false })
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalRef.hide();
    }
  }

  years = []
  months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  discardEverything(){
    this.modalOpen = false
    this.sNumber = false
    this.sName = false
    this.sDate = false
    this.selectMonth = 'Select Month'
    this.selectYear = 'Select Year'
    this.creditCardInput = ''
    this.ccNumber = ''
    this.ccName = ''
    this.ccMonth = ''
    this.ccYear = ''
    this.ccCCV = ''
    this.CCardFlip = false
    this.cardType = 'Card Type'
    this.years = []
    this.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    this.modalRef.hide();
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
        if (Obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  ccNumber = ''
  ccName = ''
  ccMonth = ''
  ccYear = ''
  ccCCV = ''
  CCardFlip = false
  flipCard() {
    this.CCardFlip = !this.CCardFlip
  }

  cardType = 'Card Type'
  checkCardType() {
    if (this.ccNumber.length >= 3) {
      creditCardType(this.ccNumber).filter((card) => {
        this.cardType = card.niceType
      });
    }
  }

  sNumber = false
  sName = false
  sDate = false
  selectMonth = 'Select Month'
  selectYear = 'Select Year'
  creditCardInput = ''
  sNumberAdd() {
    this.sNumber = !this.sNumber
  }

  sNameAdd() {
    this.sName = !this.sName
  }

  sDateAdd() {
    this.sDate = !this.sDate
  }

  changeExpire(type, val) {
    this[type] = val
  }

  payWithCard(){
    if (this.ccNumber == '' || this.selectMonth == '' || this.selectYear == '' || this.ccCCV == '') {
      return
    }
    this.cardDetailsData['card_number']= this.ccNumber
    this.cardDetailsData['card_month']= this.selectMonth
    this.cardDetailsData['card_year']= this.selectYear
    this.cardDetailsData['card_security']= this.ccCCV
    this.cardDetails.emit(this.cardDetailsData)
    this.discardEverything()
  }

}

