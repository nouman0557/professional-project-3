import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadCharts()
  }

  loadCharts(){
    Highcharts.chart('salesChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 12000,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Sales',
        showInLegend: false,
        data: [
          12000, 35000, 23000, 51000, 29000, 17000
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('purchaseChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 17287,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Purchase',
        showInLegend: false,
        data: [
          21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
          10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
          5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('inventoryChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 1436,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Inventory',
        showInLegend: false,
        data: [
          1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
          20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
          26662, 26956, 27912, 28999, 28965, 27826, 25579, 19313, 94113, 19331
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('incomeChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 1005,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Imcome',
        showInLegend: false,
        data: [
            369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
            20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
            26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
            
        ], 
        color: '#5bdcc0'
      }]
    });
    Highcharts.chart('balanceChart', {
      chart: {
        type: 'area',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 230,
        height: 90
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 150,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        shared: true,
          valueSuffix: '$'
      },
      series: [{
        type: 'area',
        name: 'Total Balance',
        showInLegend: false,
        data: [
          5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
          1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
          11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
          30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000
        ], 
        color: '#5bdcc0'
      }]
    });
  }

  openModal(template: TemplateRef<any>, cls) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  closeModel() {
    this.modalService.hide(1);
  }

  reportsMain = true
  reportsDetail = false
  gotoReportDetails() {
    this.reportsMain = false
    this.reportsDetail = true
  }

  gotoReportMain() {
    this.reportsDetail = false
    this.reportsMain = true
    this.loadCharts()
  }


}
