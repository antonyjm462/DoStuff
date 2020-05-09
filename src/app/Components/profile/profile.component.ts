import { DatabaseService } from '../../Services/database.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../../Models/user';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Task } from '../../Models/task';
import { List } from '../../Models/list';
import { Project } from '../../Models/project';
const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  lists: any;
  tasklist: any;
  projectlist: any;
  all: any;
  status: any;
  new_task: Task;
  description: any;
  comments: any;
  priority_id: any;
  date: any;
  uid: any;
  Task: Task;
  List: any;
  users: User[];
  @ViewChild('descriptionTemplate', { static: true }) descriptionTemplate: TemplateRef<any>;
  bottomSheetRef: any;
  taskForm: FormGroup;
  spaceForm: FormGroup;
  prioritylist: any[] = [
    {priority_id: '1', priority: 'Low'},
    {priority_id: '2', priority: 'Medium'},
    {priority_id: '3', priority: 'High'}
  ];

  [x: string]: any;
  time: string[] = [];
  ListForm: FormGroup;
  TaskForm: FormGroup;
  data: any;
  precent: any;
  task_assgined: any;
  assgined: any;
  today: any;
  duetask: any;
  closed: any;
  totaltask: any;
  task: any[] = [];


  // tslint:disable-next-line: max-line-length
  constructor(private database: DatabaseService, private bottomSheet: MatBottomSheet, private formBuilder: FormBuilder, private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.user = this.storage.get(STORAGE_KEY);
    console.log(this.user);
    this.readAll();
    this.readProject();
    this.readList();
    this.readTask();
    this.totaltask = this.assgined = this.duetask = this.closed = 0;
  }

  ngOnInit() {
    this.TaskForm = this.formBuilder.group({
      Task_Description: ['', Validators.required],
      Task_Name: ['', Validators.required],
      Task_Comment: ['', Validators.required],
      Task_Priority: ['', Validators.required],
      Task_Duedate: ['', Validators.required],
      Task_Status_id: ['', Validators.required],
      Lid: ['', Validators.required],
    });
  }
  getTaskAssigned() {
    this.task = [];
    this.all.forEach(task => {
      if (task.Task_Assigned === this.user.EmpId) {
        this.task.push(task)
      }
      console.log(this.task);
      this.totaltask = (this.task.length);
    });
  }

  getAssigned() {
    var i;
    this.task_assgined = 0;
    for (i = 0; i < this.task.length; i++) {
      if(this.task[i].Task_Status_id === '1' ){
        this.assgined = this.assgined + 1;
      }
    }
  }

  getDue() {
    var i;
    // tslint:disable-next-line: prefer-const
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    this.today = mm + '/' + dd + '/' + yyyy;
    var day_now = Date.parse(this.today);
    console.log(day_now);
    console.log(this.today);
    this.duetask = 0;
    for (i = 0; i < this.task.length; i++) {
      var date = new Date(Date.parse(this.task[i].Task_Duedate));
      console.log(date);
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0');
      var yyyy = date.getFullYear();
      var mon = mm + '/' + dd + '/' + yyyy;
      var date_next  = Date.parse(mon);
      console.log(mon);
      if(day_now >= date_next){
        this.duetask = this.duetask + 1;
      }
    }
  }


  getclosed() {
    var i;
    this.closed = 0;
    for (i = 0; i < this.task.length; i++) {
      if(this.task[i].Task_Status_id == '4' ){
        this.closed = this.closed + 1;
      }
    }
  }


  readAll() {
    this.database.readAll().subscribe((data: any) => {
      this.all = data;
      console.log(this.all);
      this.getTaskAssigned();
      this.getAssigned();
      this.getDue();
      this.getclosed();
    });
  }


  readProject() {
    this.database.readProject().subscribe((project: any) => {
      this.projectlist = project;
      console.log(this.projectlist);
    });
  }

   readList() {
    this.database.readList().subscribe((list: any) => {
      this.lists = list;
      console.log(this.lists);
    });
  }

   readTask() {
    this.database.readTask().subscribe((task: any) => {
      this.tasklist = task;
      console.log(this.tasklist);
    });
  }

  newTask(TaskForm) {
    this.Task = TaskForm.value;
    this.Task.Task_Created = null;
    this.Task.Task_Updated = null;
    this.Task.Task_Assigned = null;
    if(this.Task.Lid === undefined){
      this.Task.Lid = 1;
    }
    if(this.Task.Task_Assigned === null){
      this.Task.Task_Assigned = '';
    }
    if(this.Task.Task_Priority === ""){
      this.Task.Task_Priority = '';
    }
    this.database.createtask(this.Task).subscribe((task: any) => {
      console.log('task created', task);
    });
    console.log(this.Task);
    setTimeout(() => {
      this.readTask();
      this.readAll();
      }, 1000);
  }


  readUser() {
    this.database.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }


  openDescription(task): void {
    this.new_task  = task;
    console.log(this.new_task);
    this.bottomSheetRef = this.bottomSheet.open(this.descriptionTemplate);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event);
    this.time.push(`${event.value}`);
  }

  onSubmit() {
    this.description = this.TaskForm.get('Task_Description').value ;
    this.comments = this.TaskForm.get('Task_Comment').value ;
    // tslint:disable-next-line: variable-name
    let task_desc  = new Task();
    task_desc = this.new_task;
    task_desc.Task_Description = this.description;
    task_desc.Task_Comment = this.comments;
    console.log(task_desc);
    this.database.updateTask(task_desc).subscribe((task: any) => {
      console.log('task created', task);
    });
    console.log(this.Task);
    setTimeout(() => {
      this.readTask();
      this.readAll();
      }, 1000);
  }

  selectionChange(stepper) {
    console.log(stepper.selectedIndex);
    this.status = stepper.selectedIndex + 1;
    this.Updatetask();
  }

  Updatetask() {
    // tslint:disable-next-line: variable-name
    let task_desc  = new Task();
    task_desc = this.new_task;
    if (this.description != undefined) {
      task_desc.Task_Description = this.description;
    }
    if (this.comments != undefined) {
      task_desc.Task_Comment = this.comments;
    }
    if (this.priority_id != undefined) {
      task_desc.Task_Priority = this.priority_id;
    }
    if (this.date != undefined) {
      task_desc.Task_Duedate = this.date;
    }
    if (status != undefined) {
      task_desc.Task_Status_id = this.status;
    }
    if (this.uid != undefined) {
      task_desc.Task_Assigned = this.uid;
    }
    console.log(task_desc);
    this.database.updateTask(task_desc).subscribe((task: any) => {
      console.log('task created',task);
    });
    setTimeout(() => {
      this.readTask();
      this.readAll();
      }, 1000);
}

onKeydown(event) {
  if (event.key === 'Enter') {
    console.log(event);
    this.Updatetask();
  }
}

onDelTask(task){
  console.log(task.Tid);
  this.database.deleteTask(task.Tid).subscribe((task: any) => {
    console.log('Task deleted');
  });
  setTimeout(() => {
    this.readTask();
    this.readAll();
    }, 1000);
}

onDelList(list) {
  this.database.deleteList(list.Lid).subscribe((list: any) => {
    console.log('List deleted');
  });
  setTimeout(() => {
    this.readList();
    this.readAll();
    }, 1000);
}

dashboard()
{
  this.router.navigate(['']);
}

profile()
{
    this.router.navigate(['profile']);
}

spaces()
{
    this.router.navigate(['spaces']);
}

members()
{
    this.router.navigate(['members']);
}
Logout() {
  this.storage.remove(STORAGE_KEY);
  this.router.navigate(['logout']);
}
}
