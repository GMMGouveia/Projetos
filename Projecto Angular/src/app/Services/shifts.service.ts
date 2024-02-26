import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShiftDTO } from '../interfaces/User-Worker';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  apiShiftUrl = "http://localhost:3000/";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  getShifts():Observable<ShiftDTO[]>{
    return this.http.get<ShiftDTO[]>('http://localhost:3000/shifts');
  }


  getUserShift(place:string, userWorkerId: number): Observable<ShiftDTO[]> {
    return this.http.get<ShiftDTO[]>(this.apiShiftUrl + 'shifts/?place=' + place + '&userWorkerId' + userWorkerId + this.httpOptions);
  }

  addUserShift(shift: ShiftDTO): Observable<ShiftDTO> {
    return this.http.post<ShiftDTO>(this.apiShiftUrl + 'shifts', JSON.stringify(shift), this.httpOptions);
  }

  updateUserShift(shift: ShiftDTO): Observable<ShiftDTO> {
    return this.http.put<ShiftDTO>(this.apiShiftUrl + 'shifts/' + shift.id, JSON.stringify(shift), this.httpOptions);
  }

  deleteUserShift(shift: ShiftDTO): Observable<ShiftDTO> {
    return this.http.delete<ShiftDTO>(this.apiShiftUrl + 'shifts' + shift.id, this.httpOptions);
  }

  getShiftById(id:number): Observable<ShiftDTO[]> {
    return this.http.get<ShiftDTO[]>(this.apiShiftUrl + 'shifts/?id=' + id);
    // var req = this.apiShiftUrl + 'shifts/?id=' + id + this.httpOptions;
    // console.log(req);
    // var res = this.http.get<ShiftDTO[]>(req);
  }

  getShiftsByUserWorkerId(userWorkerId: number): Observable<ShiftDTO[]> {
    return this.http.get<ShiftDTO[]>(this.apiShiftUrl + 'shifts/?userWorkerId=' + userWorkerId);
  }
}

