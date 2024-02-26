import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShiftDTO, UserWorkerDTO } from '../interfaces/User-Worker';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL = "http://localhost:3000";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) { }

  getUserWorkerDTO() {
    return this.http.get('http://localhost:3000/UserWorkerDTO');
  }


  getUserWorker(email: string, password: string): Observable<UserWorkerDTO[]> {
    return this.http.get<UserWorkerDTO[]>(this.URL + '/users?email=' + email + '&password=' + password, this.httpOptions);
  }

  addUserWorker(userWorkerDTO: UserWorkerDTO): Observable<UserWorkerDTO> {
    return this.http.post<UserWorkerDTO>(this.URL + '/users', userWorkerDTO, this.httpOptions);
  }

  deleteUserWorker(id: number): Observable<UserWorkerDTO> {
    return this.http.delete<UserWorkerDTO>(this.URL + '/users/' + id, this.httpOptions);
  }


  updateUserWorker(userWorkerDTO: UserWorkerDTO): Observable<UserWorkerDTO> {
    return this.http.put<UserWorkerDTO>(this.URL + '/users/' + userWorkerDTO.id, userWorkerDTO, this.httpOptions);
  }


  getLoggedUser(): UserWorkerDTO {
    let userString = localStorage.getItem("loggedUser");
    if (userString != null) {
      let loggedUserJSON = JSON.parse(userString);
      let loggedUsera = loggedUserJSON as UserWorkerDTO;
      if (loggedUsera) {
        if (loggedUserJSON.expired) {
          this.router.navigate(['/login']);
          return {} as UserWorkerDTO;
        } else {
          return loggedUsera!;
        }
      }
      else {
        return {} as UserWorkerDTO;
      }
    }
    return {} as UserWorkerDTO;
  }



}