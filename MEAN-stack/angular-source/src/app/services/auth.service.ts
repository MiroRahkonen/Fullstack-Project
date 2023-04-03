import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: object = {};

  constructor(private http: HttpClient) { }

  registerUser(user: object){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/register',user,{headers: headers})
      .pipe(map(res=> res))
  }
}
