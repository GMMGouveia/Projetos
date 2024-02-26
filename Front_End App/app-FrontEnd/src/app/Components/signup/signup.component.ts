import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { TutorDTO } from 'src/app/interfaces/Tutor';
import { TeacherDTO } from 'src/app/interfaces/Teacher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  registerForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    firstName:['',[Validators.required,Validators.minLength(3)]],
    lastName:['',[Validators.required,Validators.minLength(3)]],
    birthDate:['',[Validators.required]],
    address:['',[Validators.required,Validators.minLength(3)]],
    permissions:['',[Validators.required]],
    subject:['',]
  })


  constructor( private fb: FormBuilder,private http: DataService ,private router: Router) { }


  ngOnInit(): void {}




  addUser(user : TutorDTO | TeacherDTO) {
    this.http.addUser(user).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/login']);
    });
  }


  signup(){
    if(this.registerForm.valid){
      var user = this.registerForm.value as any as TutorDTO | TeacherDTO;
      
      this.addUser(user);
    }
  }

}

    
    

 










