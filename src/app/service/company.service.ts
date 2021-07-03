import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  URL: string= "http://localhost:8080/"

  constructor(
    private http: HttpClient
  ) { }

  getCompany(id: number){
    return this.http.get(this.URL+`api/getCompanyById/${id}`);
    }
  registerCompany(company: Company){
    return this.http.post(this.URL+`api/addCompany`, company);
  }

}
