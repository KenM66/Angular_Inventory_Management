import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  URL: string= 'http://localhost:8080/'
  constructor(
    private http: HttpClient
  ) { }

  createItem(item: Item){
    return this.http.post(
      this.URL+`api/addItem`, item
    );
  }
  getItemsByCompanyNum(id: number){
    return this.http.get(this.URL+`api/itemsByCompanyNum/${id}`)
  }

  updateItem(id: number, value:any): Observable<Object>{
    return this.http.put(`http://localhost:8080/api/updateItem/${id}`, value)
  }
  getItemsByName(name: string){
    return this.http.get(this.URL+`api/itemByName/${name}`)
  }
  getItemById(id: number){
    return this.http.get(this.URL+`api/itemById/${id}`)
  }
  deleteItemById(id: number){
    return this.http.delete(this.URL+`api/deleteItem/${id}`)
  }
}
