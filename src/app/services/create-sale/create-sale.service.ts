import { Injectable, TemplateRef } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Injectable({
  providedIn: 'root'
})
export class CreateSaleService {

  sectionTitles = {
    leftSectionTitle: 'ORDER SUMMARY',
    rightSectionTitle1: 'PRODUCT LIST',
    rightSectionTitle2: 'CUSTOMER LIST',
    rightSectionTitle3: 'NOTES',
  }
  activeSection = {
    rightSection1: false,
    rightSection2: false,
    rightSection3: false,
  }
  modalRef: BsModalRef;

  // Observable string sources
  private showToasterSource = new Subject<any>();
  // Observable string streams
  onShowToaster$ = this.showToasterSource.asObservable();

   // Observable string sources
   private deviceProductListSource = new Subject<any>();
   // Observable string streams
   $deviceProductListSource = this.deviceProductListSource.asObservable();

  private sectionTitleTextSource = new BehaviorSubject(this.sectionTitles)
  sectionTitleText$ = this.sectionTitleTextSource.asObservable()

  private activeSectionSource = new BehaviorSubject(this.activeSection)
  $activeSection = this.activeSectionSource.asObservable()

  constructor(private modalService: BsModalService) { }

  setSectionTiles(leftSectionTitle, rightSectionTitle1, rightSectionTitle2, rightSectionTitle3) {

    leftSectionTitle != '' ? this.sectionTitles.leftSectionTitle = leftSectionTitle : ''
    rightSectionTitle1 != '' ? this.sectionTitles.rightSectionTitle1 = rightSectionTitle1 : ''
    rightSectionTitle2 != '' ? this.sectionTitles.rightSectionTitle2 = rightSectionTitle2 : ''
    rightSectionTitle3 != '' ? this.sectionTitles.rightSectionTitle3 = rightSectionTitle3 : ''

    this.onChangeSection(this.sectionTitles)
  }

  setActiveSection(rightSection1: boolean, rightSection2: boolean, rightSection3: boolean) {
    this.activeSection.rightSection1 = rightSection1
    this.activeSection.rightSection2 = rightSection2
    this.activeSection.rightSection3 = rightSection3

    this.onChangeActiceSection(this.activeSection)
  }

  getSectionTitles() {
    return this.sectionTitles
  }

  // Service message commands
  showToaster(valueArray: any) {
    this.showToasterSource.next(valueArray);
  }

  onChangeActiceSection(activeSection = this.activeSection) {
    this.activeSectionSource.next(activeSection)
  }

  onChangeSection(sectionTitles = this.sectionTitles) {
    this.sectionTitleTextSource.next(sectionTitles)
  }

  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
  }
  closeModel() {
    this.modalRef.hide();
  }
  
  isObjectEmpty(Obj) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2)
  }

  getDeviceProductAndService(deviceId,is_product){
    this.deviceProductListSource.next([deviceId,is_product])
  }


}
