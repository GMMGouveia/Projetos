import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AddShiftComponent } from './Pages/add-shift/add-shift.component';
import { MyShiftsComponent } from './Pages/my-shifts/my-shifts.component';
import { EditPageComponent } from './Pages/edit-page/edit-page.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'addShift', component:AddShiftComponent},
  { path: 'myShifts', component:MyShiftsComponent},
  { path: 'editShift/:id', component:EditPageComponent},
  { path: 'editProfile', component: EditProfileComponent},
 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
