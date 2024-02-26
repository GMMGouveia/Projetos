import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';
import { TutorDTO } from 'src/app/interfaces/Tutor';
import { TeacherDTO } from 'src/app/interfaces/Teacher';
import { AuthData, AuthResponseData } from 'src/app/interfaces/AuthData';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm= this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })


  constructor(private fb:FormBuilder, private http:DataService, private router: Router){

 }
 ngOnInit(): void {}


 async signIn() {
    if (this.loginForm.valid) {
      let user = this.loginForm.value as any as TutorDTO | TeacherDTO;
      const email = user.email;
      const password = user.password;
        (await this.http.login(email, password)).subscribe((res: AuthResponseData) => {
        this.http.redirectLoggedUser()
      });
       
    }
  }

  signUp(){
    this.router.navigate(['/signup']);
  }


}
