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
import { DatabaseService } from '../../Services/database.service';
import { List } from '../../Models/list';
import { Project } from '../../Models/project';

const STORAGE_KEY = 'userdata';
const STORAGE_KEY_DATA = 'data';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  [x: string]: any;
  time: string[] = [];
  user: any;
  tasks: any;
  @ViewChild('descriptionTemplate', { static: true }) descriptionTemplate: TemplateRef<any>;
  bottomSheetRef: any;
  taskForm: FormGroup;
  spaceForm: FormGroup;
  prioritylist: any[] = [
    {priority_id: '1', priority: 'Low'},
    {priority_id: '2', priority: 'Medium'},
    {priority_id: '3', priority: 'High'}
  ];
  // tslint:disable-next-line: variable-name
  new_task: any;
  description: any;
  comments: any;
  status: any;
  // tslint:disable-next-line: variable-name
  priority_id: any;
  assigned = [];
  users: User[];
  uid: any;
  date: any;
  ListForm: FormGroup;
  TaskForm: FormGroup;
  Task: Task;
  List: List;
  data: any;
  all: any[];
  projectlist: any[];
  lists: any[];
  tasklist: any[];
  precent: any;



  // tslint:disable-next-line: max-line-length
  constructor(private database: DatabaseService, private bottomSheet: MatBottomSheet, private formBuilder: FormBuilder, private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.user = this.storage.get(STORAGE_KEY);
    this.readAll();
    console.log(this.all);
    this.readProject();
    this.readList();
    this.readTask();
    this.data = this.storage.get(STORAGE_KEY_DATA);
    console.log(this.data);
    this.findprecent();
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
    this.ListForm = this.formBuilder.group({
        List_Description: ['', Validators.required],
        List_Name: ['', Validators.required],
   });
    this.readUser();
    console.log(this.projectlist);
    console.log(this.lists);
    console.log(this.tasklist);
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
    });
  }

  findprecent(){
    this.precent = this.data.Project_Status_id * 25;
    this.precent = this.precent.toString() +"%";
    console.log(this.precent);
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
      }, 1000);
  }

  newList(ListForm) {
    this.List = ListForm.value;
    this.List.List_Created = null;
    this.List.Pid = this.data.Pid;
    this.database.createlist(this.List).subscribe((list: any) => {
      console.log('list created', list);
    });
    console.log(this.List);
    setTimeout(() => {
      this.readList();
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
      }, 1000);
  }

  selectionChange(stepper) {
    console.log(stepper.selectedIndex);
    this.status = stepper.selectedIndex + 1;
    this.Updatetask();
    this.Updateproject();
  }

  selectionprojectChange(stepper){
    console.log(stepper.selectedIndex);
    this.status = stepper.selectedIndex + 2;
    this.Updateproject();
  }

  Updateproject(){
    this.data.Project_Status_id = this.status;
    console.log(this.data);
    this.database.updateProject(this.data).subscribe((data: any) => {
      console.log('project created',data);
    });
    setTimeout(() => {
      this.readProject();
      }, 1000);
    for(let i;i<this.projectlist.length;i++){
      if(this.data.Pid === this.projectlist[i].Pid){
        this.data = this.projectlist[i];
      }
    }
    console.log(this.data);
    setTimeout(() => {
      this.findprecent();
    }, 1000);

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
      }, 1000);
    // this.firebaseService.updatetask(this.new_task.id,task_desc);
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
    }, 1000);
}

onDelList(list) {
  this.database.deleteList(list.Lid).subscribe((list: any) => {
    console.log('List deleted');
  });
  setTimeout(() => {
    this.readList();
    }, 1000);
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
