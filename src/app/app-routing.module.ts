import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './Components/profile/profile.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MembersComponent } from './Components/members/members.component';
import { SpacesComponent } from './Components/spaces/spaces.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { AuthGuard } from './Guards/auth.guard';
import { ProjectComponent } from './Components/project/project.component';



const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', component: DashboardComponent,  canActivate: [AuthGuard]},
  { path: 'members', component: MembersComponent },
  { path: 'spaces', component: SpacesComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'project', component: ProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
