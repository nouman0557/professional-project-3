import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginauthService } from './loginauth.service';
import { Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class LunaGuardService implements CanActivate {

    constructor(private router: Router, private auth: LoginauthService) { }
    canActivate(): boolean {
        console.log(this.auth.lunaVerifyUser())
        if (this.auth.lunaVerifyUser()) {
            return true;
        }
        else {
            this.router.navigate(['Login']);
            return false;
        }
    }
}
