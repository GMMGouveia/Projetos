import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  @Output() public sidenavToggle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }


}
