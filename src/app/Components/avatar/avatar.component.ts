import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatabaseService } from '../../Services/database.service';
import { User } from '../../Models/user';
import { LocalstorageService } from '../../Services/localstorage.service';

const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  name: string;
  user: any;
  users: any[];
  firstname: any;
  designation: any;

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService ,private localstorage: LocalstorageService , private database : DatabaseService) {
    this.user = this.storage.get(STORAGE_KEY);
    this.name = 'https://c1.staticflickr.com/9/8046/8082447203_14ec1579b4_z.jpg';
  }

  ngOnInit() {
  }

  setValue() {
    this.name = this.name;
    if(this.name != undefined){
      this.user.Avatar = this.name;
    }
    if(this.firstname != undefined){
      this.user.FirstName = this.firstname;
    }
    if(this.designation != undefined){
      this.user.Designation = this.designation;
    }
    console.log(this.user);
    this.database.updateUser(this.user).subscribe((user: any) => {
      console.log(user);
    });
    this.localstorage.storeUser(this.user);
    this.readUser();
  }
  readUser() {
    this.database.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
