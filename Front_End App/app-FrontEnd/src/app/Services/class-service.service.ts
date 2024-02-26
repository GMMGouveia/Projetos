import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassDTO } from '../interfaces/Classes';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {

  URL = "http://localhost:3000/api";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private router: Router) { }


  getAllClass(): Observable<ClassDTO[]> {
    return this.http.get<ClassDTO[]>(`${this.URL}/classes`, this.httpOptions);
  }

  getClassById(id: string): Observable<ClassDTO> {
    return this.http.get<ClassDTO>(`${this.URL}/classes/${id}`, this.httpOptions);
  }

  addClass(Class: ClassDTO): Observable<ClassDTO> {
    return this.http.post<ClassDTO>(`${this.URL}/classes`, Class, this.httpOptions);
  }

  deleteClass(id:number): Observable<ClassDTO> {
    return this.http.delete<ClassDTO>(`${this.URL}/classes/${id}`, this.httpOptions);
  }

  updateClass(Class: ClassDTO): Observable<ClassDTO> {
    return this.http.put<ClassDTO>(`${this.URL}/classes/${Class._id}`, Class, this.httpOptions);
  }

  getStudentsWithOutClass(){
    return this.http.get<ClassDTO[]>(`${this.URL}/students/withoutclass`, this.httpOptions);
  }

  getTeachersWithoutClass(){
    return this.http.get<ClassDTO[]>(`${this.URL}/teachers/teacherswithoutclass`, this.httpOptions);
  } 
  

}
