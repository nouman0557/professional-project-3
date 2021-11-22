import { Component, OnInit, Output, TemplateRef,EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.css']
})
export class YesNoComponent implements OnInit {
  @ViewChild("yesNoModal", { static: false }) yesNoModal: TemplateRef<any>
  @Output() yesNoModalEmit  : EventEmitter<any> = new EventEmitter<any>()
  modalOpen = false
  modalRef: BsModalRef
  iconName='delete'
  headerText=''
  yesButtonText=''
  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
  
  }

  openModal() {
    this.modalOpen = true;
    this.modalRef= this.modalService.show(this.yesNoModal, { class: 'modal-sm ' + 'custModal wd210', backdrop: 'static', keyboard: false })
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalRef.hide();
    }
  }

  discardEverything(){
    this.modalOpen = false
    this.iconName=''
    this.headerText=''
    this.yesButtonText=''
    this.modalRef.hide();
  }

  workDone(value){
    this.yesNoModalEmit.emit(value)
    this.discardEverything()
  }

}
