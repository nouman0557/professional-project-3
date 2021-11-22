import { Component, OnInit } from '@angular/core';
import { PrintService } from '../print.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-print-label',
  templateUrl: './device-print-label.component.html',
  styleUrls: ['./device-print-label.component.css']
})
export class DevicePrintLabelComponent implements OnInit {
 
  device = null

  constructor(private route: ActivatedRoute,
    private printService: PrintService) {
  }
  ngOnInit() {
    this.route.paramMap
      .subscribe((res) => {
        this.device = window.history.state.data
        console.log('device is here', this.device)
        this.printService.onDataReady()

      })
  }
}
