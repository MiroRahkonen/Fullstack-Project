import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

interface response {
  success?: boolean,
  message?: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router){}

  showDangerAlert: boolean = false;
  alertMessage: String = '';
  name: String | undefined;
  username: String | undefined;
  email: String | undefined;
  password: String | undefined;
  onSubmit(){
    const userdata = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    // Validating the form data
    if(!this.validateService.validateRegister(userdata)){
      //All fields aren't filled
      this.showDangerAlert = true;
      this.alertMessage = 'Please fill in all fields'
      return false;
    }
    if(!this.validateService.validateEmail(userdata.email)){
      //Email isn't valid
      this.showDangerAlert = true;
      this.alertMessage = 'E-mail is invalid';
      return false;
    }
    else{
      this.showDangerAlert = false;
    }

    //Registering the account
    this.authService.registerUser(userdata).subscribe((data: response)=>{
      if(data.success){
        this.router.navigate(['/login']);
      }
      else{
        console.log('False')
        this.showDangerAlert = true;
        this.alertMessage = 'Register failed, username already in use'
      }
    })

    //
    return;
  }

  
}
