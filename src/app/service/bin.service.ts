import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bin } from '../Bin';

@Injectable({
  providedIn: 'root'
})
export class BinService {
URL: string= 'http://localhost:8080/'
  constructor(
    private http: HttpClient
  ) { }

  getBinById(id: number){
    return this.http.get(this.URL+`api/binById/${id}`)
  }
  addToBin(id: number, itemId:number, value: any){
    return this.http.put(this.URL+`api/addToBin/${id}/${itemId}`, value)
  }
  removeFromBin(id: number, itemId: number, value: any){
    return this.http.put(this.URL+`api/removeFromBin/${id}/${itemId}`, value)
  }
  createNewBin(bin: Bin){
    return this.http.post(this.URL+`api/addBin`, bin)
  }
  getBins(){
    return this.http.get(this.URL+`api/bins`)
  }
  deleteBin(id: number){
    return this.http.delete(this.URL+`api/deleteBin/${id}`)
  }
  updateBin(id: number, value: any){
    return this.http.put(this.URL+`api/updateBin/${id}`, value)
  }
}
