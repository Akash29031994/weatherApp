import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _weatherService: WeatherService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean {
        let authenticateFlag: boolean = false;
        authenticateFlag = this._weatherService.validateToken();
        if (authenticateFlag) {
            return authenticateFlag;
        } else {
            this._weatherService.navigate('../login');
        }
        return authenticateFlag;
    }

}