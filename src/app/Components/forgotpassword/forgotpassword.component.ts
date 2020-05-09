import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { User } from '../../Models/user';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';


const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  Email: any;
  user: any;
  Password: any;
  show: boolean;
  UserForm: FormGroup;
  userChange: any;
  users: any[];

  // tslint:disable-next-line: max-line-length
  constructor(private database: DatabaseService, private formBuilder: FormBuilder, private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.user = null;
    this.UserForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
    this.user = this.storage.get(STORAGE_KEY);
   }

  ngOnInit() {}

  resetPass() {
    this.userChange = this.UserForm.value;
    console.log(this.userChange);
    // tslint:disable-next-line: triple-equals
    if(this.user != undefined){
    if (this.user != null) {
      this.user.Password = this.userChange.Password;
      this.database.updateUser(this.user).subscribe((user: any) => {
        console.log('User updated', user);
      });
    }
    this.readUser();
    }
  }
  CheckEmail() {
    this.user = this.UserForm.value;
    this.user = this.database.checkEmail(this.user);
    setTimeout(() => {
      console.log(this.database.user);
      this.user = this.database.user[0];
    }, 1000);
  }
  readUser() {
    this.database.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
register() {
  this.router.navigate(['register']);
}

login() {
  this.router.navigate(['login']);
}
}
