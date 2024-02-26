import { Component, } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';


import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { UserWorkerDTO } from 'src/app/interfaces/User-Worker';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {

  registerForm = this.fb.group ({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6),Validators.pattern('[a-zA-Z0-9]*!?')]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', [Validators.required, this.ageRangeValidator(6,130)]],
  });

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get birthDate() { return this.registerForm.get('birthDate'); }

  //create me a custom validator for the birthDate, the user needs to be older that 6 years old, the birthDate is a Date type
  ageRangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const year = date.getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - year >= min && currentYear - year <= max) {
        return null;
      } else {
        return { ageRangeValidator: true };
      }
    };
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {

    return (group: any): { [key: string]: any } |null => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if ((password?.value ?? "") !== (confirmPassword.value ?? "")) {
        return {
          mismatchedPasswords: false
        };
      } else {
        return {
          mismatchedPasswords: false
        };;
      }
    }
  }



  constructor(private fb: FormBuilder, private http: DataService, private router: Router) {

  }

  ngOnInit(): void {


  }

  addUser(userWorkerDTO: any) {
    this.http.addUserWorker(userWorkerDTO as UserWorkerDTO)
      .subscribe(res => {
        alert("Sign up successfully");
        this.router.navigate(['/login']);
      })
  }

  signUp() {
    
    if ((this.password?.value ?? "") != (this.registerForm.get('confirmPassword')?.value ?? "")) {
      alert("Passwords don't match");
      return;
    }

    let userWorkerDTO = {
      email: this.email?.value,
      password: this.password?.value,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      birthDate: this.birthDate?.value,
      role: "worker",
    }

    this.addUser(userWorkerDTO);

    
   


  }
}

