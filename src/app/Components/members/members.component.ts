import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { User } from '../../Models/user';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users: User[];
  user: any;
  userdata: User;
  UserForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService,private database: DatabaseService,private formBuilder: FormBuilder) {
    this.user = this.storage.get(STORAGE_KEY);
  }

  ngOnInit() {
    this.readUser();
    this.UserForm = this.formBuilder.group({
      EmpId: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Designation: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  readUser() {
    this.database.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
  updateUser(form) {
      form = this.userdata;
      this.database.updateUser(form.value).subscribe((user: any) => {
        console.log('User updated', user);
      });
      this.readUser();
  }

  deleteUser(id) {
    this.database.deleteUser(id).subscribe((user: User) => {
      console.log('User deleted', User);
    });
    this.readUser();
  }

  onSubmit(data) {
    this.userdata = data;
    console.log('data stored');
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
