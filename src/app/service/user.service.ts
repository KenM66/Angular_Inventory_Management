import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../User';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string= 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<any>{
     return this.http.get(this.URL+`api/userByUsername/${username}`)
  }
  
  addUser(user:User){
    return this.http.post(this.URL+`api/addUser`, user)
  }

  getAllUsers(){
    return this.http.get(this.URL+`api/users`)
  }
  getUsersByCompanyNum(){
    return this.http.get(this.URL+`api/usersByCompanyNum/${LoginComponent.companyNum}`)
  }

  updateUser(id: number, user: User){
    return this.http.put(this.URL+`api/updateUser/${id}`, user);
  }
  deleteUser(id:number){
    return this.http.delete(this.URL+`api/deleteUser/${id}`);
  }

}
