import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LunaGuardService } from 'src/app/guard/luna-guard.service';


import { CustomersComponent } from './customers/customers.component'
import { CustomerListingComponent } from './customer-listing/customer-listing.component'
import { CustomerDetailsComponent } from './customer-details/customer-details.component'
import { CustomerAddComponent } from './customer-add/customer-add.component'
import { AddCustomerDeviceComponent } from './add-customer-device/add-customer-device.component';
import { DeviceHistoryComponent } from './device-history/device-history.component';
export class EmptyComponent { }
const routes: Routes = [
  {
    path: 'Listing',
    component: CustomersComponent,
    canActivate: [LunaGuardService],
    data: { navigationSource: 'customer' },
    children: [
      {
        path: '',
        component: CustomerListingComponent,
      },
      {
        path: '',
        component: CustomerDetailsComponent,
        outlet: 'right-panel'
      },
      {
        path: ':customerId',
        children: [
          { path: '', component: CustomerListingComponent },
          {
            path: '',
            redirectTo: "detail/:customerId",
            pathMatch: "full"
          },
        ]
      },
      {
        path: 'detail/:customerId',
        component: CustomerDetailsComponent,
        outlet: 'right-panel',
      },
      {
        path: 'Add',
        component: CustomerAddComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'customer' },
      },
      {
        path: 'edit/:customerId',
        component: CustomerAddComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'customer' },
      },
      {
        path: 'Device-History/:DeviceId',
        component: DeviceHistoryComponent,
        outlet: 'right-panel',
        data: { navigationSource: 'customer' },
      },
      {
        path:'Add-Customer-Device/:customerId',
        component: AddCustomerDeviceComponent,
        outlet: 'Modal',
        data: { navigationSource: 'customer' },
      },
      {
        path:'Edit-Customer-Device/:deviceId',
        component: AddCustomerDeviceComponent,
        outlet: 'Modal',
        data: { navigationSource: 'customer' },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
