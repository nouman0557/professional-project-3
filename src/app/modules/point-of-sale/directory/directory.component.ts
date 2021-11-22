import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  directoryState = 'view';
  tabSelected = 'info';

  constructor() { }

  ngOnInit() {
  }

  selectTab(tab) {
    this.tabSelected = tab;
  }

  assignState(e) {
    this.directoryState = e;
  }

}
