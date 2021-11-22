import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleCartComponent } from './sale-cart/sale-cart.component'
import { LunaGuardService } from 'src/app/guard/luna-guard.service';

import { CreateSaleComponent } from './create-sale/create-sale.component'
import { ProductListComponent } from './product-list/product-list.component'
import { DeviceListComponent } from './device-list/device-list.component';

import { CustomerListingComponent } from '../customers/customer-listing/customer-listing.component'
import { CustomerAddComponent } from '../customers/customer-add/customer-add.component'
import { DeviceCheckinComponent } from './device-checkin/device-checkin.component'
import { AddCustomerDeviceComponent } from '../customers/add-customer-device/add-customer-device.component';
import { DeviceHistoryComponent } from '../customers/device-history/device-history.component';


const routes: Routes = [
  {
    path: 'Order',
    component: CreateSaleComponent,
    canActivate: [LunaGuardService],
    data: { navigationSource: 'createSale' },
    children: [
      {
        path: '',
        component: SaleCartComponent,
      },
      {
        path: '',
        component: CustomerListingComponent,
        outlet: 'right-panel'
      },
      {
        path:':orderId',
        component: SaleCartComponent
      },
      {
        path: 'CustomerList',
        component: CustomerListingComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
      {
        path: 'DeviceList/:customerId',
        component: DeviceListComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
      {
        path: 'AddCustomer',
        component: CustomerAddComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
      {
        path: 'ProductList',
        component: ProductListComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
      {
        path: 'ProductList/:DeviceID',
        component: ProductListComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
      {
        path: 'EditCustomer/:customerId',
        component: CustomerAddComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
      {
        path: 'Device-History/:DeviceId',
        component: DeviceHistoryComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
      {
        path:'Add-Customer-Device/:customerId',
        component: AddCustomerDeviceComponent,
        outlet: 'Modal',
        data: { navigationSource: 'createSale' },
      },
      {
        path:'Edit-Customer-Device/:deviceId',
        component: AddCustomerDeviceComponent,
        outlet: 'Modal',
        data: { navigationSource: 'createSale' },
      },
      {
        path: 'Device/Check-In/:deviceId',
        component: DeviceCheckinComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'createSale' },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSaleRoutingModule { }
