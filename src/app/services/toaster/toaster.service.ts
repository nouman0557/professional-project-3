import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title,msg) {
    this.toastr.success(title, msg, {
      timeOut: 3000
    });
  }

  showError(title,msg) {
    this.toastr.error(title, msg, {
      timeOut: 3000
    });
  }

  showWarning(title,msg) {
    this.toastr.warning(title,msg, {
      timeOut: 3000
    });
  }

  showInfo(title,msg) {
    this.toastr.info(title,msg, {
      timeOut: 3000
    });
  }

  showErrorMessageWithTime(title,msg,time) {
    this.toastr.error(title, msg, {
      timeOut: time
    });
  }

}
