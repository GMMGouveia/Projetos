import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { UserWorkerDTO } from 'src/app/interfaces/User-Worker';
import { Router } from '@angular/router';
import { FormBuilder, ValidatorFn, Validators, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  currentUser! : UserWorkerDTO;;

  editProfileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: [''],
  },
    { validator: this.matchingPasswords('password', 'confirmPassword') });



    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      return (group: any): { [key: string]: any } |null => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];
  
        if (password.value !== confirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        } else {
          return null;
        }
      }
    }
  


  get email() { return this.editProfileForm.get('email'); }
  get password() { return this.editProfileForm.get('password'); }
  get firstName() { return this.editProfileForm.get('firstName'); }
  get lastName() { return this.editProfileForm.get('lastName'); }
  get birthDate() { return this.editProfileForm.get('birthDate'); }

  constructor(private fb: FormBuilder, private dataSevice: DataService, private router: Router) {

  }

  ngOnInit(): void {
    this.currentUser = this.dataSevice.getLoggedUser();
    this.editProfileForm.patchValue({
      email: this.currentUser.email,
      password: this.currentUser.password,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      birthDate: this.currentUser.birthDate,
    });
  }


  update(){
    this.currentUser.email = this.email?.value || "";
    this.currentUser.password = this.password?.value|| "";
    this.currentUser.firstName = this.firstName?.value|| "";
    this.currentUser.lastName = this.lastName?.value|| "";
    this.currentUser.birthDate = this.birthDate?.value|| "";


    this.dataSevice.updateUserWorker(this.currentUser).subscribe(res => {
      this.router.navigate(['/home']);
    });


    
  }

}

