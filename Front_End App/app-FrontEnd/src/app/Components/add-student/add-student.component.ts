import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsDataService } from 'src/app/Services/students-data.service';
import { StudentDTO } from 'src/app/interfaces/Student';


import { FormBuilder, FormGroup,AbstractControl, Validators } from '@angular/forms';
import { TutorDTO } from 'src/app/interfaces/Tutor';







@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  student : StudentDTO = {} as StudentDTO;
  tutor : TutorDTO = {} as TutorDTO;
  tutorId = this.getloggedUser();

  studentForm = this.fb.group({
    
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    birthDate: ['', [Validators.required]]
    
  
  });
  constructor(private fb: FormBuilder, private service: StudentsDataService, private router: Router) { }

    ngOnInit(): void {

    }


  addStudent() {
      let studentForm = this.studentForm.value;
      this.student.firstName = studentForm.firstName ?? "";
      this.student.lastName = studentForm.lastName ?? "";
      this.student.birthDate =new Date(studentForm.birthDate ?? "");
      this.student.tutor = this.tutorId ?? "";


    this.service.addStudent(this.student).subscribe((res: any) => {
      console.log(res);
      
      this.router.navigate(['/home-tutor']);
    });
  }

  
  addChild(){
    if(this.studentForm.valid){
      this.addStudent();
    }
  }

  getloggedUser(){
    var u = localStorage.getItem('id');
    return u;
  }


}
