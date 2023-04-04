import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AlertboxComponent } from './components/alertbox/alertbox.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';

export function getAuthToken(){
  return localStorage.getItem('id_token');
}

const appRoutes: Routes = [
  {path:'',component: HomeComponent},
  {path:'register',component: RegisterComponent},
  {path:'login',component: LoginComponent},
  {path:'dashboard',component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'profile',component: ProfileComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AlertboxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getAuthToken
      }
    })
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
