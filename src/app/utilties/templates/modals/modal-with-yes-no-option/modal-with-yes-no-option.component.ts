import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'modal-with-yes-no-option',
  templateUrl: './modal-with-yes-no-option.component.html',
  styleUrls: ['./modal-with-yes-no-option.component.css']
})
export class ModalWithYesNoOptionComponent implements OnInit {

  inputObjectSample:{
    iconClass:'icon-delete',
    headerText:'',
    yesButtonText:'',
    noButtonText:'',
    modalLayout:{
      class:'',
      backdrop:'',
      keyboard:boolean
    }
  }

  modalRef: BsModalRef
  @Input() modalInput
  @Output() callBackFunction  : EventEmitter<any> = new EventEmitter<any>()
  @ViewChild("modal", { static: false }) modal: TemplateRef<any>
  
  constructor(private modalService: BsModalService,) { }

  ngOnInit() { }
  setModalInput(input){
    this.modalInput = input
  }
  openModal() {
    this.modalRef= this.modalService.show(this.modal, this.modalInput.modalLayout ? this.modalInput.modalLayout : { class: 'modal-sm custModal wd250', backdrop: 'static', keyboard: false })
  }

  closeModal(isYesButtonClick){
    this.modalRef.hide();
    this.callBackFunction.emit(isYesButtonClick)
  }
}
