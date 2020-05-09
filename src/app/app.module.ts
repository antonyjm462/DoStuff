import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MembersComponent } from './Components/members/members.component';
import { SpacesComponent } from './Components/spaces/spaces.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { RegisterComponent } from './Components/register/register.component';
import { StopParentDirective } from './Directives/stop-parent.directive';
import { ChatappComponent } from './Components/chatapp/chatapp.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AvatarComponent } from './Components/avatar/avatar.component';
import { ProjectComponent } from './Components/project/project.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { 
  MatStepperModule,
  MatInputModule,
  MatButtonModule, 
  MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertcenterComponent } from './Components/alertcenter/alertcenter.component';

const COMPONENTS = [
  AppComponent,
    DashboardComponent,
    MembersComponent,
    SpacesComponent,
    ProfileComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ChatappComponent,
    ForgotpasswordComponent,
    AvatarComponent,
    ProjectComponent,
    AlertcenterComponent,
];

const PIPES = [];

const DIRECTIVES = [
  StopParentDirective
];

const SERVICES = [];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  StorageServiceModule,
  MatCardModule,
  BrowserAnimationsModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatListModule,
  MatBottomSheetModule,
  MatExpansionModule,
  MatStepperModule,
  MatInputModule,
  MatButtonModule, 
  MatNativeDateModule,
  MatDatepickerModule,
  MatChipsModule,
  MatIconModule,
  MatSelectModule,
  MatProgressBarModule
];



@NgModule({
  declarations: [...COMPONENTS,...PIPES,...SERVICES],
  imports: [...MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
