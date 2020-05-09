import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

const STORAGE_KEY = 'userdata';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  user: any;

  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.user = this.storage.get(STORAGE_KEY);
   }

  ngOnInit() {
  }
register() {
    this.router.navigate(['register']);
}

login() {
    this.router.navigate(['']);
}

}
