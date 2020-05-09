import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../../Models/user';

import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Project } from '../../Models/project';
import { DatabaseService } from '../../Services/database.service';
import { LocalstorageService } from '../../Services/localstorage.service';

const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit {
  user: any;
  ProjectForm: any;
  Project: Project;
  all: any[];
  projectlist: any[];
  notstarted: any;
  inprogress: any;
  onhold: any;
  completed: any;

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService ,private localstorage: LocalstorageService , public database: DatabaseService, private router: Router, private formBuilder: FormBuilder) {
    this.user = this.storage.get(STORAGE_KEY);
    this.readAll();
    this.readProject();
    console.log(this.all);
    this.notstarted = this.onhold = this.completed = this.inprogress =0;
   }

  ngOnInit() {
    this.ProjectForm = this.formBuilder.group({
      Project_Status_id: ['', Validators.required],
      Project_Name: ['', Validators.required],
      Project_Description: ['', Validators.required],
      Project_Duedate: ['', Validators.required],
    });
  }

  readAll() {
    this.database.readAll().subscribe((data: any) => {
      this.all = data;
      console.log(this.all);
    });
  }

  readProject() {
    this.database.readProject().subscribe((project: any) => {
      this.projectlist = project;
      console.log(this.projectlist);
      for(let i=0;i<this.projectlist.length;i++){
        if(this.projectlist[i].Project_Status_id === "1"){
          this.notstarted = this.notstarted + 1;
        } else if(this.projectlist[i].Project_Status_id === "2"){
          this.inprogress = this.inprogress + 1;
        } else if(this.projectlist[i].Project_Status_id === "3"){
          this.onhold = this.onhold + 1;
        } else if(this.projectlist[i].Project_Status_id === "4"){
          this.completed = this.completed + 1;
        }
      }
      console.log(this.notstarted);
      console.log(this.inprogress);
      console.log(this.onhold);
      console.log(this.completed);
    });
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

project(data) {
  this.localstorage.storeData(data);
  this.router.navigate(['project']);
}

newProject(ProjectForm) {
  this.Project = ProjectForm.value;
  this.Project.Project_Created = null;
  this.Project.Project_Updated = null;
  this.database.createproject(this.Project).subscribe((project: any) => {
    console.log('Project created', project);
  });
  this.ProjectForm.reset();
  console.log(this.Project);
  setTimeout(() => {
  this.readProject();
  }, 1000);
}

}
