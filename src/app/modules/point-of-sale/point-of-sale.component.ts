import { Component, OnInit } from '@angular/core';
import { Orders } from '../Globals/order'

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css'],
})
export class PointofsaleComponent implements OnInit {
  allOrders = []
  existingIds = 0
  minimizeOrders = {
    orderId: '',
    items: []
  }

  constructor(private orders: Orders) { }

  ngOnInit() {
  }
  
  miniMizeorder(or,cname) {
    let id = this.getId()
    this.minimizeOrders['orderId'] = id
    this.minimizeOrders['CustomerName'] = cname
    this.minimizeOrders['items'] = or
    this.allOrders.push(JSON.parse(JSON.stringify(this.minimizeOrders)))
    this.minimizeOrders = {
      orderId: '',
      items: []
    }
    this.existingIds = this.existingIds + 1
    console.log('headererere', this.allOrders);
  }

  getId() {
    let id = this.existingIds + 1
    if (id < 10) {
      return '#Order-00000' + id
    }
    else if (id >= 10 && id < 100) {
      return '#Order-0000' + id
    }
    else if (id >= 100 && id < 1000) {
      return '#Order-000' + id
    }
    else if (id >= 1000 && id < 10000) {
      return '#Order-00' + id
    }
    else if (id >= 10000 && id < 100000) {
      return '#Order-0' + id
    }
    else if (id >= 100000) {
      return '#Order-' + id
    }
    // return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }

  retriveOrder(order) {
    debugger
    this.orders.retrieveOrder(order)
  }

}
