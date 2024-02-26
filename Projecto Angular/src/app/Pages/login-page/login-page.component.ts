import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/Services/data.service';
import { UserWorkerDTO } from 'src/app/interfaces/User-Worker';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private http: DataService, private router: Router) {

  }

 

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  signIn() {
    let email = this.email?.value ?? "";
    let password = this.password?.value ?? "";

    this.http.getUserWorker(email, password)
      .subscribe(res => {
        console.log(res);
        if (res[0]) {
          alert("Login successfully");
          let loggedUser = res[0];
          loggedUser.password = "";
          let anyUser = loggedUser as any;
          //expireda after 60 minutes
          anyUser.expired = new Date(new Date().getTime() * 3600  * 1000);
          let userJSON = JSON.stringify(anyUser);
          localStorage.setItem("loggedUser", userJSON);
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });;
        } else {
          alert("User not found");
        }
      })

  }


  clearPassword() {
    this.password?.setValue("");
  }


   
}


