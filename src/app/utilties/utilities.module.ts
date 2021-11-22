import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericUtility } from './generic-utility';
import { AutofocusDirective } from 'src/app/utilties/auto-focus.directive';
import { TabOrderDirective } from 'src/app/utilties/tab-order';
import { NumericDirective } from './numeric-directive.directive';
import { ListFilterPipe } from './Pipe/list-filter.pipe'
import { ListFilterByFieldNamePipe } from './Pipe/list-filter-by-field-name.pipe';
import {OrderPartSupplierPipe} from './Pipe/order-part-supplier-filer'
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { customDateFormatPipe } from './directives/custom-date-format.directive';
import { TwoDigitDecimaNumberDirective } from './directives/TwoDigitDecimaNumberDirective';
import { OnlyNumber } from './directives/only-number.directive';
import { OmitSpecialChar } from './directives/omit-special-char.directive';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { TaskDetailStatusFilterPipe } from './Pipe/task-detail-status-filter.pipe';
import { ModalWithYesNoOptionComponent } from './templates/modals/modal-with-yes-no-option/modal-with-yes-no-option.component'



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GenericUtility
  ],
  declarations: [
    TwoDigitDecimaNumberDirective,
    AutofocusDirective,
    TabOrderDirective,
    customDateFormatPipe,
    NumericDirective,
    ListFilterPipe,
    ListFilterByFieldNamePipe,
    OrderPartSupplierPipe,
    PhoneMaskDirective,
    OnlyNumber,
    OmitSpecialChar,
    ClickStopPropagationDirective,
    TaskDetailStatusFilterPipe,
    ModalWithYesNoOptionComponent
  ],
  exports: [
    TwoDigitDecimaNumberDirective,
    AutofocusDirective,
    TabOrderDirective,
    customDateFormatPipe,
    NumericDirective,
    ListFilterPipe,
    ListFilterByFieldNamePipe,
    PhoneMaskDirective,
    OrderPartSupplierPipe,
    OnlyNumber,
    OmitSpecialChar,
    ClickStopPropagationDirective,
    TaskDetailStatusFilterPipe,
    ModalWithYesNoOptionComponent
  ],
})
export class UtilitiesModule { }
