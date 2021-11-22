import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {

  state$: Observable<object>;
  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {


    this.state$ = this.route.paramMap
      .pipe(map(() => window.history.state))

    console.log("State is" + this.state$)

  }

}
