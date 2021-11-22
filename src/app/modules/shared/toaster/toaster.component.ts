import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { EnvironmentUrl } from 'src/environments/environment-url';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  subscription: Subscription;
  @Input() hideToster: boolean;
  @Input() toasterMsg: string;
  @Input() toasterType: string;
  @Output() closeToaster: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    const source = interval(EnvironmentUrl.CloseTosterTime);
    this.subscription = source.subscribe(val => this.closetoster());
  }

  closetoster() {
    this.closeToaster.emit()
  }

  autoCloseToaster() {
    // let timer = Observable.timer(1000, 0);
  }

}
