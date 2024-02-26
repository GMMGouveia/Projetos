import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { StudentsDataService } from 'src/app/Services/students-data.service';
import { StudentDTO } from 'src/app/interfaces/Student';
import{MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home-tutor',
  templateUrl: './home-tutor.component.html',
  styleUrls: ['./home-tutor.component.css']
})
export class HomeTutorComponent {

  students: StudentDTO[] = [];

  childrenInfo : StudentDTO[] = [];
  displayedColumns: string[] = ['_id', 'firstName','lastName','birthDate' ];



  constructor(private studentService: StudentsDataService,
    private dataService : DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
    
  }

  getStudents() {
    let user = this.dataService.getLoggedInUser();
    this.studentService.getStudentsWithTutor(user?._id!)
    .subscribe((data) => {
      this.students = data.data;
      this.childrenInfo = this.students;
    });
  }










}
