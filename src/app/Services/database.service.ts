import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../Models/user';
import { Userlogin } from '../Models/userlogin';
import { LocalstorageService } from './localstorage.service';
import { List } from '../Models/list';
import { Project } from '../Models/project';
import { Task } from '../Models/task';
import { Message } from '../Models/message';

export class Forgot {
  Email: any;
  Password: any;
}


@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  baseUrl = 'http://127.0.0.1:8080';
  users: any;
  userlogin: Userlogin;
  currentuser: Userlogin;
  user: any;


constructor(private http: HttpClient, private localstorage: LocalstorageService) {
  this.http.get(`${this.baseUrl}/api/database.php`);
 }

readUser(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/api/read.php`);
}

readAll(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/readall.php`);
}

readProject(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/readproject.php`);
}

readList(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/readlist.php`);
}


readMessages(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/readmessages.php`);
}


readTask(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/readtask.php`);
}

createuser(user: User): Observable<User>{
  return this.http.post<User>(`${this.baseUrl}/api/create.php`, user);
}

createmessage(data: Message): Observable<Message>{
  return this.http.post<Message>(`${this.baseUrl}/api/createmessage.php`, data);
}

createlist(list: List): Observable<List>{
  return this.http.post<List>(`${this.baseUrl}/api/createlist.php`, list);
}

createproject(project: Project): Observable<Project>{
  return this.http.post<Project>(`${this.baseUrl}/api/createproject.php`, project);
}

createtask(task: Task): Observable<Task>{
  return this.http.post<Task>(`${this.baseUrl}/api/createtask.php`, task);
}

updateUser(user: User) {
  return this.http.put<User>(`${this.baseUrl}/api/update.php`, user);
}
// tslint:disable-next-line: no-shadowed-variable
updateList(List: List) {
  return this.http.put<List>(`${this.baseUrl}/api/updatelist.php`, List);
}
// tslint:disable-next-line: no-shadowed-variable
updateTask(Task: Task) {
  return this.http.put<Task>(`${this.baseUrl}/api/updatetask.php`, Task);
}
// tslint:disable-next-line: no-shadowed-variable
updateProject(Project: Project) {
  return this.http.put<Project>(`${this.baseUrl}/api/updateproject.php`, Project);
}

deleteUser(id: number) {
  return this.http.delete<User>(`${this.baseUrl}/api/delete.php/?id=${id}`);
}

deleteProject(id: number) {
  return this.http.delete<Project>(`${this.baseUrl}/api/deleteproject.php/?id=${id}`);
}

deleteTask(id: number) {
  return this.http.delete<Task>(`${this.baseUrl}/api/deletetask.php/?id=${id}`);
}

deleteList(id: number) {
  return this.http.delete<List>(`${this.baseUrl}/api/deletelist.php/?id=${id}`);
}

login(userlogin: Userlogin) {
  this.http.put<Userlogin>(`${this.baseUrl}/api/checkuser.php`, userlogin).subscribe((user: any) => {
    console.log('User logined', user);
    this.currentuser = user;
    this.localstorage.storeUser(this.currentuser[0]);
    return user;
  });
}

checkEmail(data) {
  this.http.put<Forgot>(`${this.baseUrl}/api/checkemail.php`, data).subscribe((user: any) => {
    console.log('Email', user);
    this.user = user;
    return user;
  });
}


}
