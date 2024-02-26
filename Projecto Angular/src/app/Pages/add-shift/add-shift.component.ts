import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/Services/data.service';
import { ShiftDTO, UserWorkerDTO } from 'src/app/interfaces/User-Worker';
import { Data, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ShiftsService } from 'src/app/Services/shifts.service';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})


export class AddShiftComponent {

  shift: ShiftDTO = {
    id: 0,
    date: '',
    startTime: '',
    endTime: '',
    pricePerHour: 0,
    place: '',
    name: '',
    comments: '',
    userWorkerId: 0
  };

  workplaces = ['Workplace 1', 'Workplace 2', 'Workplace 3'];


  constructor(private fb: FormBuilder, private shiftService: ShiftsService, private userService : DataService, private router: Router) { }


  saving() {
    this.shift.userWorkerId = this.userService.getLoggedUser().id;
    
    this.shiftService.addUserShift(this.shift)
    .subscribe((data) => {
      console.log(data);
      this.router.navigate(['/myShifts'])

    });

  
    

  }




  
}


