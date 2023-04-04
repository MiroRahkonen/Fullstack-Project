import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  registerUser(user: any){
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/register',user,{headers: headers})
      .pipe(map(res=> res))
  }

  authenticateUser(loginData: any){
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/authenticate',loginData,{headers: headers})
      .pipe(map(res=> res))
  }

  storeLoginData(token: any,user: any){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  checkIfLoggedIn(){
    return (!this.jwtHelper.isTokenExpired());
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile(): Observable<any>{
    this.authToken = localStorage.getItem('id_token');

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',this.authToken);

    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .pipe(map(res=> res))
  }
}
