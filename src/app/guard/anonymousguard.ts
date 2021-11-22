import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';
import { LoginauthService } from './loginauth.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuardService implements CanActivate{

  constructor(private auth: LoginauthService,private router:Router) { }
  canActivate(): boolean {
    if(!this.auth.verfiedUser()){
     return true;
   }
   else{
      this.router.navigate(['Index']);
      return true
   }
  }
}
