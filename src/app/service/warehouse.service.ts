import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Warehouse } from '../Warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
URL: string= "http://localhost:8080/"
  constructor(
    private http: HttpClient
  ) { }

  getWarehouses(){
    return this.http.get(this.URL+'api/warehouses')
  }
  getWarehouseById(id: number){
    return this.http.get(this.URL+`api/warehouseById/${id}`)
  }
}
