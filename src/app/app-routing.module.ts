import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/account/login/login.component';
import { PrintLayoutComponent } from './print/print-layout/print-layout.component';
import { InvoiceComponent } from './print/invoice/invoice.component';
import { DevicePrintLabelComponent } from './print/device-print-label/device-print-label.component'

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      {
        path: 'invoice/:invoiceIds', component: InvoiceComponent,

      }, {
        path: 'device-label', component: DevicePrintLabelComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
