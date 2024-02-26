import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './Services/data.service';
import { UserWorkerDTO } from './interfaces/User-Worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements  OnInit{
  title = 'ShiftBuilder';

  isLogged = false;
  loggedUser? : UserWorkerDTO;
  constructor(private router : Router, private dataService: DataService){

  }

  ngOnInit(): void {
    this.loggedUser = this.dataService.getLoggedUser();
    if(this.loggedUser){
      this.isLogged = true;
    }
  }

  loginClick(){
    this.router.navigate(['/login']);
  }

  registerClick(){
    this.router.navigate(['/register']);
  }

  logoutClick(){
    localStorage.removeItem("loggedUser");
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}
