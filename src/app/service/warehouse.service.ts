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

  createWarehouse(warehouse: Warehouse){
    return this.http.post(this.URL+`api/addWarehouse`, warehouse);
  }

  deleteWarehouse(id: number){
    return this.http.delete(this.URL+`api/deleteWarehouse/${id}`)
  }

  updateWarehouse(id: number, value:any){
    return this.http.put(this.URL+`api/updateWarehouse/${id}`, value)
  }
}
