import { Component, OnInit, HostListener } from '@angular/core';
import { WeatherService } from '../../commons/services/weather.service';
import { User, UserResponse } from '../../commons/models/user';
import { RequestService } from '../../commons/services/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginPath: string;
  user: User;
  confirmPassword: string;
  weatherDetailsPath: string;
  isDirty = false;
  showMessage = false;
  apiResponseError = false;

  constructor(private _weatherService: WeatherService, private _requestService: RequestService) { }

  ngOnInit() {
    this.showMessage = false;
    this.apiResponseError = false;
    this.user = new User();
    this.user.accessAPIId = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.middleName = '';
    this.user.username = '';
    this.user.password = '';
    this.isDirty = false;
    this.weatherDetailsPath = '../weatherdetails';
    this.loginPath = '../login';
    if (this._weatherService.validateToken()) {
      this._weatherService.navigate(this.weatherDetailsPath);
    }
  }

  @HostListener('window:beforeunload')
  @HostListener('window:pagehide')
  @HostListener('window:unload')
  onUnload() {
    return !this.isDirty;
  }

  hasChanges() {
    return this.isDirty;
  }

  register() {
    this.apiResponseError = false;
    this.showMessage = false;
    if (this.validateForm()) {
      this._requestService.postRequest('register', this.user).subscribe((response: UserResponse) => {
        this.isDirty = false;
        this._weatherService.navigate(this.loginPath);
      }, error => {
        this.apiResponseError = true;
        window.scroll(0, 0);
      });
    } else {
      this.showMessage = true;
      window.scroll(0, 0);
    }
  }

  validateForm(): boolean {
    let flag = true;
    Object.keys(this.user).forEach(key => {
      if (key !== 'middleName') {
        if (!this.user[key] || this.user[key] === undefined || this.user[key] === null || this.user[key] === '') {
          flag = false;
        } else {
          if (key === 'password') {
            if (this.user.password !== this.confirmPassword) {
              flag = false;
            }
          }
        }
      }
    });
    return flag;
  }

  navigate(path: string) {
    this.isDirty = false;
    this._weatherService.navigate(path);
  }

}
