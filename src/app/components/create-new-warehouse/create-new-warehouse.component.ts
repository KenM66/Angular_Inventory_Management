
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Warehouse } from 'src/app/Warehouse';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-create-new-warehouse',
  templateUrl: './create-new-warehouse.component.html',
  styleUrls: ['./create-new-warehouse.component.css']
})
export class CreateNewWarehouseComponent implements OnInit {
  warehouse!: any;

  constructor(
    private warehouseService: WarehouseService,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.warehouse=new Warehouse();
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 
  }

  addWarehouse(){
      
       var name= this.warehouse.name;

       this.companyService.getCompany(LoginComponent.companyNum).subscribe(
            
          data=>{ this.warehouse.company=data 
            console.log(data);
             this.warehouse.name=name;
            this.warehouseService.createWarehouse(this.warehouse).subscribe(
              response=>console.log(response)
               );
            }
          );

          
   alert("Warehouse Created!");
  }

}
