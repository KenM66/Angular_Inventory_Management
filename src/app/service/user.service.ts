import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string= 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<any>{
     return this.http.get(this.URL+`api/userByUsername/${username}`)
  }
}
