import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { User } from '../../model/user';
import { DatabaseService } from '../../Services/database.service';
import { Userlogin } from '../../model/userlogin';

import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY_DATA = 'data';
const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserForm: FormGroup;
  User: Userlogin;
  user: any;

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,private formBuilder: FormBuilder, private database: DatabaseService, private router: Router) {
    this.user = this.storage.get(STORAGE_KEY);
   }


  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  forgotpassword()
{
    this.router.navigate(['forgotpassword']);
}
   register() {
       this.router.navigate(['register']);
   }
  Login(form) {
    this.User = form.value;
    console.warn('Your user been submitted', this.User);
    console.log(this.User);
    console.log(this.User.Password);
    // for(let i=0;i<("" +this.User.Password).length;i++){
    //   if(this.User.Password[i]==="'"||this.User.Password[i]==='"'){
    //     this.User.Password[i]=" ";
    //   }
    // }
    this.database.login(this.User);
    setTimeout(() => {
      this.router.navigate(['']);
    }, 500);
  }
}
