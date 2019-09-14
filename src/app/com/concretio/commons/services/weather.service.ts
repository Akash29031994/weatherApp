import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class WeatherService {
    
    private loginPath: string;

    constructor(private _router: Router) { 
        this.loginPath = '../login';
    }

    validateToken(): boolean {
        let authenticateFlag: boolean = false;
        if (localStorage.getItem('JWTToken') === undefined || localStorage.getItem('JWTToken') === null || localStorage.getItem('JWTToken') === '') {
            authenticateFlag = false;
        } else {
            return true;
        }
        return authenticateFlag;
    }

    navigate(path) {
        this._router.navigate([path]);
    }

    signOut() {
        localStorage.removeItem('JWTToken');
        this.navigate(this.loginPath);
    }
}
