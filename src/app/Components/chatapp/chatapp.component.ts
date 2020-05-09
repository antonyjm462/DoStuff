import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { LocalstorageService } from '../../Services/localstorage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Message } from '../../Models/message';
import { User } from '../../Models/user';
import { all } from 'q';

const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {
  message: any;
  all: any;
  user: any;
  MessageData: Message;
  users: any[];
  recipent: any;
  current: any[] = [];
  interval: any;

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService , private localstorage: LocalstorageService , public database: DatabaseService) {
    this.user = this.storage.get(STORAGE_KEY);
    console.log(this.user);
    this.readmessages();
    this.readUser();
    if (this.recipent === undefined) {
      this.recipent = {Avatar : 'https://c1.staticflickr.com/9/8046/8082447203_14ec1579b4_z.jpg'};
    }
  }

  ngOnInit() {
  }

  readUser() {
    this.database.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  readmessages() {
    this.database.readMessages().subscribe((data: any) => {
      this.all = data;
      console.log(this.all);
    });
  }

  setuser(user){
    this.interval = true;
    this.current = [];
    const i = 0;
    this.recipent  = user;
    console.log('set user', this.recipent);
    this.readmessages();
    setTimeout(() => {
      console.log(this.recipent,this.user.EmpId);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.all.length; i++) {
        // tslint:disable-next-line: max-line-length
        if (( (this.all[i].EmpId == this.user.EmpId) && (this.all[i].Recipient == this.recipent.EmpId)) || ( (this.all[i].EmpId == this.recipent.EmpId ) && ( this.all[i].Recipient == this.user.EmpId ))) {
          this.current.push(this.all[i]);
        }
      }
      console.log(this.current);
    }, 100);
  }

  sent() {
    // tslint:disable-next-line: max-line-length
    this.MessageData = {uid: this.user.EmpId , Recipient: this.recipent.EmpId, Firstname: this.user.FirstName, Lastname: this.user.LastName
      , data: this.message};
    console.log(this.MessageData);
    this.database.createmessage(this.MessageData).subscribe((data: any) => {
      console.log('message created');
    });
    setTimeout(() => {
      this.setuser(this.recipent);
    }, 200);
  }

}
