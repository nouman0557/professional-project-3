import { Component, OnInit, Output, TemplateRef,EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  @ViewChild("downloadFileModal", { static: false }) downloadFileModal: TemplateRef<any>
  @Output() downloadFileEmit  : EventEmitter<any> = new EventEmitter<any>()
  modalOpen = false
  modalRef: BsModalRef
  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
  
  }

  openModal() {
    this.modalOpen = true;
    this.modalRef= this.modalService.show(this.downloadFileModal, { class: 'modal-sm ' + 'custModal wd300', backdrop: 'static', keyboard: false })
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalRef.hide();
      this.modalOpen=false
    }
  }

  workDone(value){
    this.downloadFileEmit.emit(value)
    this.ngOnDestroy()
  }
}