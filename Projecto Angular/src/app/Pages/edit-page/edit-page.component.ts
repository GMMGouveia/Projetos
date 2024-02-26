import { Component,OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { ShiftDTO } from 'src/app/interfaces/User-Worker';
import { FormBuilder,FormGroup } from '@angular/forms';




@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {


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
  
  
    id: number = 0;




  constructor(private fb: FormBuilder, private shiftService: ShiftsService, private router: Router, private route: ActivatedRoute) { }
   
  ngOnInit() {
     var idFromRoute = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if (idFromRoute != null) {
      this.id =   parseInt(idFromRoute);
    }

   this.shiftService.getShiftById(this.id).subscribe(res => {
    console.log(res);
    this.shift=res[0];
  })

  }
  saving(){
    
    this.shiftService.updateUserShift(this.shift).subscribe(res => {
      console.log(res);
      this.router.navigate(['/myShifts']);
    
    })
  }





}
