import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface loginData {
  success?: boolean,
  token?: any,
  user?: any,
  message?: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;
  showError: boolean = false;
  alertMessage: any;

  constructor(
    private authService: AuthService,
    private router: Router){}

  onLoginSubmit(){
    const loginData = {
      username: this.username,
      password: this.password
    }
    if(!this.username || !this.password){
      this.showError = true;
      this.alertMessage = 'Input both username and password';
      setTimeout(()=>{this.showError = false},3000);
      return;
    }
    this.authService.authenticateUser(loginData).subscribe((data: loginData)=>{
      if(!data.success){
        this.showError = true;
        this.alertMessage = data.message;
        setTimeout(() => {this.showError = false}, 3000);
        return this.router.navigate(['login']);
      }
      this.authService.storeLoginData(data.token,data.user);
      return this.router.navigate(['dashboard']);
    })
  }
}
