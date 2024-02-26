import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { AddShiftComponent } from './Pages/add-shift/add-shift.component';
import { MyShiftsComponent } from './Pages/my-shifts/my-shifts.component';
import { EditPageComponent } from './Pages/edit-page/edit-page.component';





@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    HomePageComponent,
    MyShiftsComponent,
    AddShiftComponent,
    EditPageComponent,
    EditProfileComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
