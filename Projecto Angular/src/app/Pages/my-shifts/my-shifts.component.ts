import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { ShiftDTO } from 'src/app/interfaces/User-Worker';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserWorkerDTO } from 'src/app/interfaces/User-Worker';

@Component({
  selector: 'app-my-shifts',
  templateUrl: './my-shifts.component.html',
  styleUrls: ['./my-shifts.component.css']
})
export class MyShiftsComponent {

  shifts: ShiftDTO[] = [];

  displayedColumns: string[] = ['date', 'startTime', 'endTime', 'pricePerHour', 'place', 'name', 'comments', 'userWorkerId', 'totalProfit', "btnEdit"];
  dataSource: any[] = [];
  dataSource2: any;
  data: any;
  searchForm: FormGroup = new FormGroup({});


  constructor(private shiftService: ShiftsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.shiftService.getShifts()
      .subscribe(res => {
        this.shifts = res;
        this.shifts.forEach(s => s.totalProfit = this.calculateTotalProfit(s));
        this.dataSource = this.shifts;
        this.dataSource2 = this.getLoggedUser().id == 1 ? new MatTableDataSource(this.dataSource) : new MatTableDataSource(this.dataSource
          .filter((shift) => shift.userWorkerId == this.getLoggedUser().id));

      });

    this.searchForm = this.fb.group({
      start: [''], // Define the 'start' form control
      end: [''] // Define the 'end' form control
    });



  }

  calculateTotalProfit(shift: ShiftDTO): number {
    return (shift.pricePerHour * this.calculateHours(shift.date, shift.startTime, shift.endTime));
    
  }

  calculateHours(date: string, startTime: string, endTime: string): number {
    let start = new Date(date.substring(0, date.indexOf('T') + 1) + startTime + ":00.000Z");
    let end = new Date(date.substring(0, date.indexOf('T') + 1) + endTime + ":00.000Z");
    let hours = Math.abs(end.getTime() - start.getTime()) / 36e5;
    return hours;
  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filterPredicate = function (dataSource2: ShiftDTO, filter: string): boolean {
      return dataSource2.date.toLowerCase().includes(filter) || dataSource2.place.toLowerCase().includes(filter);
    }
  }


  getLoggedUser(): UserWorkerDTO {
    return JSON.parse(localStorage.getItem("loggedUser") ?? "");
  }



  showTable() {
    
    this.data = this.searchForm.value;

    this.shiftService.getShifts()
      .subscribe(res => {
        this.shifts = res;
        this.shifts.forEach(s => s.totalProfit = this.calculateTotalProfit(s));

        if (this.data.start != "" && this.data.end != "") {
          this.dataSource = this.shifts
          .filter((shift) => 
            { 
              return new Date(shift.date) >= this.data.start && new Date(shift.date) <= this.data.end;
            }
          );
        }
        else {
          this.dataSource = this.shifts;
        }

        this.dataSource2 = this.getLoggedUser() == null ? new MatTableDataSource(this.dataSource) : new MatTableDataSource(this.dataSource
          .filter((shift) => shift.userWorkerId == this.getLoggedUser().id));
      });



  }

} 
