import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import { LoginauthService } from './loginauth.service';
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router,private auth:LoginauthService) { }
  canActivate(): boolean { 
    console.log(this.auth.verfiedUser())
     if (this.auth.verfiedUser()) {
       return true;
     }
     else{
      this.router.navigate(['Home']);
      return false;
     }
   }
}
