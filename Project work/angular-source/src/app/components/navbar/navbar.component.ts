import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  alertMessage: any;
  showError: boolean = false;

  constructor(
    protected authService: AuthService,
    private router: Router){}
  onLogOutClick(){
    this.showError = true;
    this.alertMessage = 'You have been logged out';
    setTimeout(() => {this.showError = false},3000);
    this.authService.logOut();
    this.router.navigate(['login']);
    return false;
  }
}
