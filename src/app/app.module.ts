import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherDetailsComponent } from './com/concretio/weather/weather-details/weather-details.component';
import { LoginComponent } from './com/concretio/weather/login/login.component';
import { RegisterComponent } from './com/concretio/weather/register/register.component';
import { WeatherService } from './com/concretio/commons/services/weather.service';
import { AuthGuard } from './com/concretio/commons/guards/auth-guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RequestService } from './com/concretio/commons/services/request.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './com/concretio/commons/pipes/filter.pipe';
import { WeatherDetailsTableComponent } from './com/concretio/weather/weather-details-table/weather-details-table.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AgmCoreModule } from '@agm/core';
import { WeatherMapComponent } from './com/concretio/weather/weather-map/weather-map.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe,
    WeatherDetailsTableComponent,
    WeatherMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhyDktSigXO_CMURhh-m4x4_YWyvUvnzM'
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [WeatherService, AuthGuard, HttpClient, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
