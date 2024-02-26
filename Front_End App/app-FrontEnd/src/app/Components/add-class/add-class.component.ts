import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassDTO } from 'src/app/interfaces/Classes';
import { ClassServiceService } from 'src/app/Services/class-service.service';
import { StudentDTO } from 'src/app/interfaces/Student';
import { StudentsDataService } from 'src/app/Services/students-data.service';
import { TeacherDTO } from 'src/app/interfaces/Teacher';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {

  classForm = this.fb.group({
    name: ['', Validators.required],
    year: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private service: DataService, private http: StudentsDataService, private router: Router,
    private classService: ClassServiceService) { }

  students?: StudentDTO[];
  teachers: TeacherDTO[] = [];

  classStudents: string[] = [];
  classTeachers: string[] = [];

  ngOnInit(): void {
    this.brindStudentsAndTeachersWithOutClass();
    this.getAllTeachers();
  }

  brindStudentsAndTeachersWithOutClass() {
    this.http.getStudentsWithOutClass().subscribe((res: any) => {
      this.students = res.data;
    })

  }

  addStudentToClass(event: boolean, student: StudentDTO) {
    if (event) {
      this.classStudents.push(student._id);
    } else {
      this.classStudents = this.classStudents.filter((id) => id !== student._id);
    }
  }

  addTeacherToClass(event: boolean, teacher: TeacherDTO) {
    if (event) {
      this.classTeachers.push(teacher._id);
    } else {
      this.classTeachers = this.classTeachers.filter((id) => id !== teacher._id);
    }
  }

  isTeacherInClass(teacher: TeacherDTO){
    return this.classTeachers.some(t => t === teacher._id);
  }

  getAllTeachers() {
    this.service.getAllTeachers().subscribe((res: any) => {
      this.teachers = res.data;
    });
  }

  


  submitClass() {
    const classData: ClassDTO = {
      name: this.classForm.get('name')?.value ?? "",
      year: Number.parseInt(this.classForm.get('year')?.value ?? "0"),
      students: this.classStudents,
      teachers: this.classTeachers
    };
    this.classService.addClass(classData).subscribe((res: any) => {
      this.router.navigate(['/home']);
    });
  }

}
