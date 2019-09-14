import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './com/concretio/weather/login/login.component';
import { RegisterComponent } from './com/concretio/weather/register/register.component';
import { WeatherDetailsComponent } from './com/concretio/weather/weather-details/weather-details.component';
import { AuthGuard } from './com/concretio/commons/guards/auth-guard.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'weatherdetails',
    component: WeatherDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/weatherdetails'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
