import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Bin } from 'src/app/Bin';
import { BinService } from 'src/app/service/bin.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Warehouse } from 'src/app/Warehouse';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-manage-warehouses',
  templateUrl: './manage-warehouses.component.html',
  styleUrls: ['./manage-warehouses.component.css']
})
export class ManageWarehousesComponent implements OnInit {
  bins: Bin[]|any;
  bin!: Bin;
  warehouses: Warehouse[]|any;
  warehouse: Warehouse|any;
  warehouseId!: number;

  constructor(
    private warehouseService: WarehouseService,
    private binService: BinService
  ) { }

  retrieveWarehouses() {
    this.warehouseService.getWarehouses().subscribe(
      response=>{
        console.log(response);
        this.warehouses=response;
        for(let i=0; i<this.warehouses.length; i++){
          if(this.warehouses[i].company.id !=LoginComponent.companyNum){
            this.warehouses.splice([i]);
            console.log('this works!');
          }
        }
        console.log(this.warehouses);
      }
    )
  }

  ngOnInit(): void {
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 
    this.retrieveWarehouses();
  }

  showUpdateForm(warehouse: Warehouse){
    this.warehouse= warehouse;
    document.getElementById('update-form')!.style.visibility= "visible";

  }

  editWarehouseName(id: number, warehouse: Warehouse){
    this.warehouseService.updateWarehouse(id, warehouse).subscribe(
      data=>{
        console.log(data);

      }
    );
    document.getElementById('update-form')!.style.visibility="hidden";

  }

  deleteWarehouse(id: number, warehouse: Warehouse){
    let binsExist: boolean;
    this.binService.getBins().subscribe(
      data=>{
        this.bins= data;
        this.bins.forEach((element: any)=>
        {
          if(element.warehouseNum=== warehouse.id){
              binsExist=true;
            
          }
        });

        if (binsExist===true){
          alert("You cannot delete a warehouse that has bins stored in it!");
        }
        else{
           this.warehouseService.deleteWarehouse(id).subscribe(
              data=>{
                console.log(data)
                this.warehouses.splice(warehouse);
                this.retrieveWarehouses();
              }
           )
        }
      }
    );

  }

}
