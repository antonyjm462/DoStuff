import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../Models/user';
// key that is used to access the data in local storage

const STORAGE_KEY = 'userdata';
const STORAGE_KEY_DATA = 'data';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  currentUser: User;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeUser(user) {
   this.storage.set(STORAGE_KEY, user);
   console.log('local storage');
   console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
 }

 public storeData(data) {
  this.storage.set(STORAGE_KEY_DATA, data);
  console.log('local storage');
  console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
}

}
