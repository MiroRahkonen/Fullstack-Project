import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user: any;
  note: String = '';
  notelist: any;

  constructor(
    private authService: AuthService,
    private router: Router){}
  
  ngOnInit(){
    this.authService.getProfile().subscribe((response: any)=>{
      this.user = response.user
    },
    err=>{
      console.log(err);
      return false;
    })

    this.authService.getNotes().subscribe((response: any)=>{
      this.notelist = response.notes
    })
  }

  postNote(){
    this.authService.postNote(this.note).subscribe((response: any)=>{
      window.location.reload();
    })
  }

  removeNote(i: number){
    const noteID = this.notelist[i]._id;
    this.authService.removeNote(noteID).subscribe((response: any)=>{
      window.location.reload();
    })
  }
}
