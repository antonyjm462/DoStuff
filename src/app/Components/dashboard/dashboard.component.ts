import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../../Models/user';
import { DatabaseService } from '../../Services/database.service';

const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  user: any;
  currentuser: User;
  all: any;
  projectlist: any;
  percent: any;
  completed: any;
  pending: number;
  notstarted: number;
  users: User[];
  member: number;

  constructor(public database: DatabaseService,private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.user = this.storage.get(STORAGE_KEY);
    this.readmessages();
    this.readProject();
    this.readUser();
    this.completed = this.pending = this.notstarted = 0;
    setTimeout(() => {
      // tslint:disable-next-line: prefer-for-of
      for(let i=0;i <this.projectlist.length;i++){
        this.projectlist[i].precentage = this.findprecent(this.projectlist[i]);
        if(this.projectlist[i].Project_Status_id === '4'){
          this.completed = this.completed + 1;
        } else if(this.projectlist[i].Project_Status_id !== '0'){
          this.pending = this.pending + 1;
        } else{
          this.notstarted = this.notstarted + 1;
        }
      }
      console.log(this.projectlist);
      this.member = this.users.length;
    }, 1000);
  }

  ngOnInit() {
  }

  readmessages() {
    this.database.readMessages().subscribe((data: any) => {
      this.all = data;
      console.log(this.all);
    });
  }

  readProject() {
    this.database.readProject().subscribe((project: any) => {
      this.projectlist = project;
      console.log(this.projectlist);
    });
  }

  readUser() {
    this.database.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  findprecent(data){
    this.percent = data.Project_Status_id * 25;
    this.percent = this.percent.toString() +'%';
    return this.percent;
  }

dashboard() {
  this.router.navigate(['']);
}

profile() {
    this.router.navigate(['profile']);
}

spaces() {
    this.router.navigate(['spaces']);
}

members() {
    this.router.navigate(['members']);
}

Logout() {
  this.storage.remove(STORAGE_KEY);
  this.router.navigate(['logout']);
}

}
