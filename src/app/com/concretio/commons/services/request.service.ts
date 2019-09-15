import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';

@Injectable()
export class RequestService {
    constructor(private _httpClient: HttpClient, private _weatherService: WeatherService) { }

    public getRequest(endpoint: string) {
        let headers = {};
        if (this._weatherService.validateToken && environment[endpoint] !== environment.login &&
            environment[endpoint] !== environment.register) {
            headers = {
                Authorization:  'Bearer ' + localStorage.getItem('JWTToken')
            };
        }
        const url = environment.host + environment[endpoint];
        return this._httpClient.get(url, {headers});
    }

    public postRequest(endpoint: string, body: any) {
        let headers = {};
        if (this._weatherService.validateToken && environment[endpoint] !== environment.login &&
            environment[endpoint] !== environment.register) {
            headers = {
                Authorization:  'Bearer ' + localStorage.getItem('JWTToken')
            };
        }
        const url = environment.host + environment[endpoint];
        return this._httpClient.post(url, body, {headers});
    }

    public externalGetRequest(url: string) {
        return this._httpClient.get(url);
    }
}
