import { Component, OnInit, Input, ViewChild, TemplateRef, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Papa } from 'ngx-papaparse';
import { truncate } from 'fs';

@Component({
  selector: 'app-import-items',
  templateUrl: './import-items.component.html',
  styleUrls: ['./import-items.component.css']
})
export class ImportItemsComponent implements OnInit {

  @Input() ItemToImport: String
  @Input() mappedColumns: any 
  @Input() sampleCsvPath:any
  @Input() nonSkipAbleFieldsIndex:any
  modalOpen = false
  modalRef: BsModalRef
  @ViewChild("importModal", { static: false }) importModal: TemplateRef<any>
  @Output() importCustomer  : EventEmitter<any> = new EventEmitter<any>()
  fileName=''
  fileUploadTemplate=true
  constructor(
    private modalService: BsModalService,
    private papa: Papa,
  ) { }

  ngOnInit() {
  }

  openModal() {
    this.modalOpen = true;
    this.modalRef= this.modalService.show(this.importModal, { class: 'modal-sm ' + 'box-importPO box-width', backdrop: 'static', keyboard: false })
  }

  itemDataList = []
  itemsFields = []
  fileFieldsName: any
  onFileChanged(event) {
      this.fileName = event[0].name
      this.papa.parse(event[0], {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {
              console.log('Field Names', result);
              this.fileFieldsName = result.meta.fields
              this.itemDataList = result.data;

              console.log("itemDataList ---->", this.itemDataList);
              for (let i = 0; i < this.fileFieldsName.length; i++) {
                  let obj = {}
                  for (let k = 0; k < this.mappedColumns.length; k++) {
                      if (this.mappedColumns[k] == this.fileFieldsName[i]) {
                          obj['name'] = this.fileFieldsName[i]
                          obj['nameForShowData'] = this.fileFieldsName[i]
                          obj['selectionBox'] = false
                          obj['selectedBox'] = true
                          obj['notMapped'] = false
                          obj['skip'] = false
                          this.itemsFields.push(obj)
                      }
                  }
                  if (this.isObjectEmpty(obj)) {
                      obj['name'] = ''
                      obj['csvName'] = this.fileFieldsName[i]
                      obj['selectionBox'] = true
                      obj['selectedBox'] = false
                      obj['notMapped'] = true
                      obj['skip'] = false
                      this.itemsFields.push(obj)
                  }
              }

              this.initializeColumns(result.meta.fields)
          }
      });
  }
  
  columnToMapItem = []
  colItem = []
  initializeColumns(col) {
      this.columnToMapItem = []
      for (let i = 0; i < col.length; i++) {
          for (let k = 0; k < this.mappedColumns.length; k++) {
              if (col[i] === this.mappedColumns[k]) {
                  this.columnToMapItem.push(
                      {
                          c_db: col[i],
                          c_csv: this.mappedColumns[k]
                      }
                  )
                  this.colItem[i] = this.mappedColumns[k]
              }
          }
          if (this.colItem[i] == undefined || this.colItem[i] == '') {
              this.colItem[i] = 'Make A selection'
          }
      }
  }

  skipItemSlide(index) {
    for (let i = 0; i < this.nonSkipAbleFieldsIndex.length; i++) {
        if(this.nonSkipAbleFieldsIndex[i] ==this.itemsFields[index]['name']){
            this.showToaster = false
            this.toasterMsg = 'This field is must for '+ this.ItemToImport +' add'
            this.toasterType = 'error'
            return
        }
     }
     this.itemsFields[index]['skip'] = true
     this.itemsFields[index]['name'] = ''
     this.itemsFields[index]['notMapped'] = true
     this.colItem[index] = 'Make A selection'

}

checkSkipAble(index){
    for (let i = 0; i < this.nonSkipAbleFieldsIndex.length; i++) {
        if(this.nonSkipAbleFieldsIndex[i] ==this.itemsFields[index]['name']){
            return false
        }
     }
     return true
}

changeColItemName(value, i) {
    var index = this.itemsFields.map(x => {
        return x.name;
    }).indexOf(value);
    if (index != -1) {
        this.showToaster = false
        this.toasterMsg = 'This field is already selected'
        this.toasterType = 'error'
        return
    }
    this.colItem[i] = value
    this.newColName = value
}

newColName = ''
changeValueOfMapColumns(type, i) {
    if (this.newColName == '') {
        this.itemsFields[i].selectionBox = false
        this.itemsFields[i].selectedBox = true
        return
    }
    this[type] = this.newColName
    this.colItem[i] = this.newColName
    this.itemsFields[i].selectionBox = false
    this.itemsFields[i].selectedBox = true
    this.itemsFields[i]['skip'] = false
    this.itemsFields[i]['name'] = this.newColName
    this.columnToMapItem.push(
        { c_db: this.newColName, c_csv: this.itemsFields[i]['csvName'] }
    )
    this.newColName = ''
}

saveUnkownCol(i) {
    if (this.newColName == "") {
        this.showToaster = false
        this.toasterMsg = 'Please select field first'
        this.toasterType = 'error'
        return
    }
    var index = this.itemsFields.map(x => {
        return x.name;
    }).indexOf(this.newColName);
    if (index != -1) {
        this.showToaster = false
        this.toasterMsg = 'This field is already selected'
        this.toasterType = 'error'
        return
    }
    this.itemsFields[i].selectionBox = false
    this.itemsFields[i].selectedBox = true
    this.itemsFields[i]['skip'] = false
    this.itemsFields[i]['notMapped'] = false
    this.itemsFields[i]['name'] = this.newColName
    this.columnToMapItem.push(
        { c_db: this.newColName, c_csv: this.itemsFields[i]['csvName'] }
    )
    this.newColName = ''
}

saveEditedCol(i) {
    this.itemsFields[i].selectionBox = false
    this.itemsFields[i].selectedBox = true
    this.itemsFields[i]['skip'] = false
    this.itemsFields[i]['name'] = this.newColName
}

  selectedBox = true
  selectionBox = false
  editCol(i) {
      this.itemsFields[i]['selectedBox'] = false
      this.itemsFields[i]['selectionBox'] = true
  }

  skipEditedCol(i) {
      this.itemsFields[i].selectionBox = false
      this.itemsFields[i].selectedBox = true
  }

  doneMappingItems(){
    let array=[]
    array.push(this.itemDataList)
    array.push(this.columnToMapItem)
    this.importCustomer.emit(array)
    this.modalRef.hide()
    this.discardEverything()
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalRef.hide();
      this.discardEverything()
    }
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
        if (Obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

showToaster = true
toasterMsg = 'no msg'
toasterType = 'error'
closeToaster() {
    this.showToaster = true
}

discardEverything(){
  this.itemDataList = []
  this.itemsFields = []
  this.fileFieldsName=[]
  this.toasterMsg = 'no msg'
  this.toasterType = 'error'
  this.showToaster = true
  this.selectedBox = true
  this.selectionBox = false
  this.newColName = ''
  this.columnToMapItem = []
  this.colItem = []
  this.modalOpen = false
  this.fileName=''
  this.fileUploadTemplate=true
}

}
