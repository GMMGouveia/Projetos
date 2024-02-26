import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassServiceService } from 'src/app/Services/class-service.service';
import { DataService } from 'src/app/Services/data.service';
import { StudentsDataService } from 'src/app/Services/students-data.service';
import { ClassDTO } from 'src/app/interfaces/Classes';
import { StudentDTO } from 'src/app/interfaces/Student';
import { TeacherDTO } from 'src/app/interfaces/Teacher';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit{

  id? : string;
  class : ClassDTO = {} as ClassDTO;

  studentsWithOutClass : StudentDTO[] = [];
  allTeachers : TeacherDTO[] = [];
  
  editForm = this.fb.group({
    name: ['', Validators.required],
    year: [0, Validators.required],
  });

  constructor(private route : ActivatedRoute,
    private classService : ClassServiceService,
    private studentsService : StudentsDataService,
    private dataService : DataService,
    private fb : FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? "";
    
    this.classService.getClassById(this.id).subscribe((res : any) => {
      this.class = res.data;
      this.editForm.patchValue(this.class);
      this.getStudentsWithOutClass();
      this.getAllTeachers();
    });
  }

  updateClass(){
    console.log(this.class);
    
    this.classService.updateClass(this.class).subscribe((res : any) => {
      this.class = res.data;
      this.router.navigate(['/home']);
    });

  }

  addStudentToClass(event : boolean, student: StudentDTO){
    if(event){
      this.class.students = [...this.class.students, student] as StudentDTO[];
      this.studentsWithOutClass = this.studentsWithOutClass.filter(s =>
        s._id !== student._id) as StudentDTO[];
    } else {
      this.class.students = this.students.filter(s => s._id !== student._id) as StudentDTO[];
      this.studentsWithOutClass = [...this.studentsWithOutClass, student] as StudentDTO[];
    }
  }
  
  getStudentsWithOutClass(){
    this.studentsService.getStudentsWithOutClass().subscribe((res: any) => {
      this.studentsWithOutClass = res.data;
    });
  }

  addTeacherToClass(event : boolean, teacher: TeacherDTO){
    if(event){
      this.class.teachers = [...this.class.teachers, teacher] as TeacherDTO[];
    } else {
      this.class.teachers = this.teachers.filter(t => t._id !== teacher._id) as TeacherDTO[];
    }
  }

  getAllTeachers(){
    this.dataService.getAllTeachers().subscribe((res: any) => {
      this.allTeachers = res.data;
    });
  }

  isTeacherInClass(teacher: TeacherDTO){
    return this.teachers.some(t => t._id === teacher._id);
  }

  get students(){
    return this.class.students as StudentDTO[];
  }

  get teachers(){
    return this.class.teachers as TeacherDTO[];
  }



  
}
