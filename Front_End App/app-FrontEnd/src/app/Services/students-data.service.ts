import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentDTO } from '../interfaces/Student';
import { Router } from '@angular/router';
import { TutorDTO } from '../interfaces/Tutor';
import { Result } from '../interfaces/result';









@Injectable({
  providedIn: 'root'
})
export class StudentsDataService {


  URL = "http://localhost:3000/api";

  httpOptions = {
    headers: { 'Content-Type': 'application/json' }
  };

  constructor(private router: Router, private http:HttpClient) { }


  getAllStudents(): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.URL}/students`, this.httpOptions);
  }

  getStudentById(_id: string): Observable<StudentDTO> {
    return this.http.get<StudentDTO>(`${this.URL}/students/${_id}`, this.httpOptions);
  }

  addStudent(student: StudentDTO): Observable<StudentDTO> {
    return this.http.post<StudentDTO>(`${this.URL}/students`, student, this.httpOptions);
  }

  updateStudent(student: StudentDTO): Observable<StudentDTO> {
    return this.http.put<StudentDTO>(`${this.URL}/students/${student._id}`, student, this.httpOptions);
  }

  deleteStudent(student: StudentDTO): Observable<StudentDTO> {
    return this.http.delete<StudentDTO>(`${this.URL}/students/${student._id}`, this.httpOptions);
  }

  
  getStudentsWithOutClass() : Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.URL}/students/get-without-class`, this.httpOptions);
  }

  getStudentsWithTutor(tutorId : string) : Observable<Result<StudentDTO[]>> {
    return this.http.get<Result<StudentDTO[]>>(`${this.URL}/students/get-with-tutor/${tutorId}`, this.httpOptions);
  }

}
