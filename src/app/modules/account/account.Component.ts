import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.Component.html',
  styleUrls: ['./account.Component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class AccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleKeyboardEvent(event) {
    if (event.key == 'l' || event.key == 'L') {
      this.router.navigate(['/Login'])
    }
    else if(event.key == 'r' || event.key == 'R') {
      this.router.navigate(['/Register'])
    }
  }

}
