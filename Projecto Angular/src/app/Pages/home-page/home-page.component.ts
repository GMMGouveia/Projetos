import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShiftDTO } from 'src/app/interfaces/User-Worker';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserWorkerDTO } from 'src/app/interfaces/User-Worker';
import { KeyValue } from '@angular/common';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  shifts: ShiftDTO[] = [];
  upcomingShifts: ShiftDTO[] = [];
  weeksShifts: ShiftDTO[] = [];
  today: Date = new Date();
  nextShift: ShiftDTO = {} as ShiftDTO;

  monthWithMoreEarnings: string = '';

  dataSource3:MatTableDataSource<ShiftDTO> = new MatTableDataSource<ShiftDTO>(); ;
  displayedColumns: string[] = ['date', 'place', 'pricePerHour'];

  constructor(private shiftService: ShiftsService,private router: Router) { }


 
  ngOnInit(): void {
    let loggedUser = this.getLoggedUser();
    this.shiftService.getShiftsByUserWorkerId(loggedUser.id).subscribe(shifts => {
      this.shifts = shifts;
      this.upcomingShifts = this.shifts.filter(s => new Date(s.date) >= this.today);
      this.upcomingShifts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.nextShift = this.upcomingShifts[0];
      this.weeksShifts = this.shifts.filter(s => this.getWeekNumber(new Date(s.date)) == this.getWeekNumber(this.today));

      this.monthWithMoreEarnings = this.getMonthWithMostEarnigs();
    });
  }

  calculateHours(date: string, startTime: string, endTime: string): number {
    let start = new Date(date.substring(0, date.indexOf('T') + 1) + startTime + ":00.000Z");
    let end = new Date(date.substring(0, date.indexOf('T') + 1) + endTime + ":00.000Z");
    let hours = Math.abs(end.getTime() - start.getTime()) / 36e5;
    return hours;
  }


  getLoggedUser(): UserWorkerDTO {
    return JSON.parse(localStorage.getItem("loggedUser") ?? "");
  }

  getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  }

  getMonthName(month: number): string {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
      "Octomber", "November", "December"];
    return months[month];
  }

  getMonthWithMostEarnigs(): string {
    let months: KeyValue<number, number>[] = [];
    this.shifts.forEach(s => {
      let month = new Date(s.date).getMonth();
      if (month != undefined){
        if (months.find(m => m.key == month) == undefined) {
          months.push({ key: month, value: this.calculateTotalProfit(s) });
        }
        else {
          months.find(m => m.key == month)!.value += this.calculateTotalProfit(s);
        }
      }
    });
    console.log(months);
    return this.getMonthName(months.sort((a, b) => b.value - a.value)[0].key) + ' : ' + months.sort((a, b) => b.value - a.value)[0].value.toFixed(2) + '€';
  }

  calculateTotalProfit(shift: ShiftDTO): number {
    return (shift.pricePerHour * this.calculateHours(shift.date, shift.startTime, shift.endTime));
    
  }

}




