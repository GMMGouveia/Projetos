import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './Components/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/authInterceptor';
import { HomeTutorComponent } from './Components/home-tutor/home-tutor.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { AddClassComponent } from './Components/add-class/add-class.component';
import { EditClassComponent } from './Components/edit-class/edit-class.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HomeTutorComponent,
    AddStudentComponent,
    AddClassComponent,
    EditClassComponent
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
