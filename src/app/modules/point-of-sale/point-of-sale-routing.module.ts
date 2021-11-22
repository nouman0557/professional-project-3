import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointofsaleComponent } from './point-of-sale.component';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './tickets/tickets.component';
import { StockComponent } from './stock/stock.component';
import { ReportsComponent } from './reports-old/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { LunaGuardService } from 'src/app/guard/luna-guard.service';
import { DiscountsComponent } from './discounts/discounts.component';
import { FranchiseComponent } from './franchise/franchise.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TechbarAiComponent } from './techbar-ai/techbar-ai.component';

const routes: Routes = [
  {
    path: 'Pointofsale', component: PointofsaleComponent,
    canActivate: [LunaGuardService],
    children: [
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'TechbarAI', component: TechbarAiComponent
      },
      {
        path: 'Home', component: HomeComponent
      },
      {
        path: 'Checkout/:order', component: CheckoutComponent
      },
      
      {
        path: 'Tickets', component: TicketsComponent
      },
      {
        path: 'Tickets/:id', component: TicketsComponent
      },
      {
        path: 'CreateSale',
        loadChildren: () => import('./create-sale/create-sale.module').then(m => m.CreateSaleModule),
        canActivate: [LunaGuardService]
      },
      {
        path: 'Customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
        canActivate: [LunaGuardService]
      },
      {
        path: 'RepairRoom',
        loadChildren: () => import('./repair-room/repair-room.module').then(m => m.RepairRoomModule),
        canActivate: [LunaGuardService]
      },
      {
        path: 'Stock', component: StockComponent
      },
      {
        path: 'Reports', component: ReportsComponent
      },
      {
        path: 'Settings', component: SettingsComponent
      },
      {
        path: 'Discounts', component: DiscountsComponent
      },
      {
        path: 'Franchise', component: FranchiseComponent
      },
      {
        path: 'Directory',
        loadChildren: () => import('./directory/directory.module').then(m => m.DirectoryModule),
        canActivate: [LunaGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PointofsaleRoutingModule { }
