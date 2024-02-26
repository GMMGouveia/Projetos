import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './Services/data.service';
import { User, UserDTO } from './interfaces/AuthData';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements  OnInit{
  title = 'Kindergarden-App';

  loggedUser? : UserDTO;
  constructor(private http: DataService ,private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = this.http.getLoggedInUser() ?? undefined;
  }

  get isTutor() : boolean {
    return this.loggedUser?.permissions == "tutor";
  }

  get isTeacher() : boolean {
    return this.loggedUser?.permissions == "teacher";
  }


  logout(){
    this.http.logout();
    this.router.navigate(['login']);
  }
}
