import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { User } from '../../model/user';
import { DatabaseService } from '../../Services/database.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  UserForm: FormGroup;
  User: any;
  user: any;

  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Designation: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService, private formBuilder: FormBuilder, private database: DatabaseService) {
    this.user = this.storage.get(STORAGE_KEY);
   }


login() {
    this.router.navigate(['']);
}

  CreateUser(userData) {
    console.warn('Your order has been submitted', userData);
    this.User = this.UserForm.value;
    this.database.createuser(this.UserForm.value).subscribe((user: any) => {
      console.log('User created', user);
    });
    this.UserForm.reset();
  }
}
