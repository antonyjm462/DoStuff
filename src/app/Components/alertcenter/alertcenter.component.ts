import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { LocalstorageService } from '../../Services/localstorage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-alertcenter',
  templateUrl: './alertcenter.component.html',
  styleUrls: ['./alertcenter.component.css']
})
export class AlertcenterComponent implements OnInit {
  user: any;
  all: any;

  constructor(private router: Router,@Inject(LOCAL_STORAGE) private storage: StorageService , private localstorage: LocalstorageService , public database: DatabaseService) {
    this.user = this.storage.get(STORAGE_KEY);
    this.user = this.storage.get(STORAGE_KEY);
    console.log(this.user);
    this.readAll();
  }

  ngOnInit() {
  }


  readAll() {
    this.database.readAll().subscribe((data: any) => {
      this.all = data;
      console.log(this.all);
    });
  }

  profile()
{
    this.router.navigate(['profile']);
}
}
