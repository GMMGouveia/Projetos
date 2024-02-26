
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassDTO } from 'src/app/interfaces/Classes';
import { ClassServiceService } from 'src/app/Services/class-service.service';
import { TeacherDTO } from 'src/app/interfaces/Teacher';
import { StudentDTO } from 'src/app/interfaces/Student';
import{MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

  constructor(private Service : ClassServiceService ,private router:Router){}


  ngOnInit(): void {
    this.getClasses();
  }


  class : ClassDTO [] = [];
  dataSource : ClassDTO [] = [];
  displayedColumns: string[] = ['id', 'name', 'year','delete','edit'];



  addClass(){
    this.router.navigate(['add-class']);
  }

  editClass(_id:string){
    this.router.navigate(['edit-class',_id]);
  }


  getClasses(){
  this.Service.getAllClass().subscribe((res : any)=>{
    console.log(res);
    return this.dataSource = res.data;
    });
  
  }

  deleteClass(id:number){
    this.Service.deleteClass(id).subscribe((res : any)=>{
      console.log(res);
      this.getClasses();
    });
  }

}
