import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.Component';
import { HomeComponent } from './home/home.component';
import { AnonymousGuardService } from 'src/app/guard/anonymousguard';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'Home' ,component: HomeComponent,
    canActivate: [AnonymousGuardService]
  },
  {
    path: 'Index', component: AccountComponent,
    canActivate: [ AuthGuardService ]
  },

  {
    path: 'Login', component: LoginComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'Register', component: RegisterComponent,
    canActivate: [ AuthGuardService ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }