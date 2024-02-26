import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorDTO } from '../interfaces/Tutor';
import { TeacherDTO } from '../interfaces/Teacher';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData, AuthResponseData, User, UserDTO } from '../interfaces/AuthData';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL = "http://localhost:3000/api";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) { }

  getAllUsers(): Observable<TutorDTO[] | TeacherDTO[]> {
    return this.http.get<TutorDTO[] | TeacherDTO[]>(`${this.URL}/users`, this.httpOptions);
  }

  getUserById(id: number): Observable<TutorDTO | TeacherDTO> {
    return this.http.get<TutorDTO | TeacherDTO>(`${this.URL}/users/${id}`, this.httpOptions);
  }

  addUser(user: TutorDTO | TeacherDTO): Observable<TutorDTO | TeacherDTO> {
    return this.http.post<TutorDTO | TeacherDTO>(`${this.URL}/users/signup`, user, this.httpOptions);
  }
  updateUser(user: TutorDTO | TeacherDTO): Observable<TutorDTO | TeacherDTO> {
    return this.http.put<TutorDTO | TeacherDTO>(`${this.URL}/users/${user._id}`, user, this.httpOptions);
  }
  deleteUser(user: TutorDTO | TeacherDTO): Observable<TutorDTO | TeacherDTO> {
    return this.http.delete<TutorDTO | TeacherDTO>(`${this.URL}/users/${user}`, this.httpOptions);
  }

  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  async login(email: string, password: string) {
    const AuthData: AuthData = { email: email, password: password };
    console.log(AuthData);
    return await this.http.post<AuthResponseData>(`${this.URL}/users/login`, AuthData, this.httpOptions)
      .pipe(
        tap(resData => {
          const user = <User>({
            _token: resData.token,
            permissions: resData.permissions
          });

          this.user.next(user);
          console.log(this.user.getValue());
          localStorage.setItem('user', JSON.stringify(resData));

        })
      );
  }

  GetToken(): string {
    let user = JSON.parse(localStorage.getItem('user') ?? '{}');

    return user?.token ?? "";
  }


  GetPermissions(): string {
    console.log(this.user.getValue());
    console.log(this.user.getValue()?.permissions);
    return this.user.getValue()?.permissions ?? "";
  }



  getLoggedInUser(): UserDTO | null {
    let userString = localStorage.getItem('user');
    if (userString != null) {
      let loggedUserJSON = JSON.parse(userString);
      let loggedUser = loggedUserJSON.user as UserDTO;
      if (loggedUser) {
        return loggedUser;
      }
      else {
        return null;
      }
    }
    return null;
  }

  redirectLoggedUser() {
      let loggedUser = this.getLoggedInUser();
      if (loggedUser) {
        if (loggedUser.permissions == "teacher") {
          this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
        } else if (loggedUser.permissions == "tutor") {
          this.router.navigate(['/home-tutor']).then(() => {
            window.location.reload();
          });;
        }
      }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }



  teachersWithoutClass() : Observable<TeacherDTO[]>{
    return this.http.get<TeacherDTO[]>(`${this.URL}/teachers/get-teacherWithOutClass`, this.httpOptions);
  }

  getAllTeachers() : Observable<TeacherDTO[]>{ 
    return this.http.get<TeacherDTO[]>(`${this.URL}/teachers`, this.httpOptions);
  }




}