import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { HomeTutorComponent } from './Components/home-tutor/home-tutor.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { AddClassComponent } from './Components/add-class/add-class.component';
import { EditClassComponent } from './Components/edit-class/edit-class.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component: HomeComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'home-tutor',component:HomeTutorComponent},
  {path:'add-student',component:AddStudentComponent},
  {path:'add-class',component:AddClassComponent},
  {path:'edit-class',component:EditClassComponent},
  {path:'edit-class/:id',component:EditClassComponent}
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
