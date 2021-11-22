import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LunaGuardService } from 'src/app/guard/luna-guard.service';
import * as index from './index';

const routes: Routes = [
  {path: '', component: index.DirectoryComponent, canActivate: [LunaGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoryRouting { }
