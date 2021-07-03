import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bin } from 'src/app/Bin';
import { BinService } from 'src/app/service/bin.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Warehouse } from 'src/app/Warehouse';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-create-new-bin',
  templateUrl: './create-new-bin.component.html',
  styleUrls: ['./create-new-bin.component.css']
})
export class CreateNewBinComponent implements OnInit {
     warehouses: Warehouse[]|any;
     warehouse!: any;
     bin: Bin|any;
     id!: number|number;

  constructor(
    private warehouseService: WarehouseService,
    private binService: BinService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bin= new Bin();
    this.warehouse= new Warehouse();
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    this.retrieveWarehouses();

    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 
  }

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
  selectWarehouse(id:number){
      this.warehouseService.getWarehouseById(id).subscribe(
      response=>{
        console.log(response);
        this.warehouse= response;
        console.log(this.warehouse);
      }
    )
    
    document.getElementById("add-bin-form")!.style.visibility="visible";
    
    
  }
 addBin(){
   this.bin.warehouse= this.warehouse;
   this.bin.warehouseNum= this.warehouse.id;
   console.log(this.bin);
   this.binService.createNewBin(this.bin).subscribe(
     data=>(
      console.log(data)
      )) 
      
      console.log(this.bin.warehouseNum);
  }
}
