import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bin } from 'src/app/Bin';
import { BinService } from 'src/app/service/bin.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Warehouse } from 'src/app/Warehouse';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-manage-bins',
  templateUrl: './manage-bins.component.html',
  styleUrls: ['./manage-bins.component.css']
})
export class ManageBinsComponent implements OnInit {
  warehouses: Warehouse[]|any;
  bins: Bin[]|any;
  warehouse: Warehouse|any;
  warehouseId!: number;
  bin!: Bin;

  constructor(
    private binService: BinService,
    private warehouseService: WarehouseService
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
    this.bin= new Bin();
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 
    this.retrieveWarehouses();

  }


  selectWarehouse(id:number){
    document.getElementById('bin-list')!.style.visibility= "visible";
    this.warehouseService.getWarehouseById(id).subscribe(
    response=>{
      console.log(response);
      this.warehouse= response;
      this.bins= this.warehouse.bins;
      console.log(this.warehouse);
      this.warehouseId= id;
    }
  )
  }

  deleteBin(id: number, bin: Bin){
    if(bin.items.length===0){
      this.binService.deleteBin(id)
      .subscribe(
        data=>{
          console.log(data);
          this.bins.splice(bin);
          this.selectWarehouse(this.warehouseId);

        }
    

    )
      }
      else{
        alert("You cannot delete a bin with items in it!  You must empty bin first!");
      }
  }

  showUpdateForm(bin: Bin){
    this.bin= bin;
    document.getElementById('update-form')!.style.visibility= "visible";
  }

editBin(id: number, bin: Bin){
  
  this.bin.warehouseNum= this.warehouse.id;
  this.binService.updateBin(id, bin)
  .subscribe(
      data=>{
        console.log(data);
        this.selectWarehouse(this.warehouseId);
        document.getElementById('update-form')!.style.visibility="hidden";
      }
  )
}
}
