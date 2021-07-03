
import { Component, OnInit } from '@angular/core';
import { Bin } from 'src/app/Bin';
import { Item } from 'src/app/Item';
import { BinService } from 'src/app/service/bin.service';
import { ItemService } from 'src/app/service/item.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Warehouse } from 'src/app/Warehouse';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-remove-inventory',
  templateUrl: './remove-inventory.component.html',
  styleUrls: ['./remove-inventory.component.css']
})
export class RemoveInventoryComponent implements OnInit {
  warehouses: Warehouse[]|any
  warehouse!: Warehouse;
  bin: Bin|any
  bins: Bin[] | undefined
  itemName!: string;
  binNumber!: number;
  items: Item[]| any
  item!: any;

  constructor(
    private warehouseService: WarehouseService,
    private binService: BinService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 
    this.retrieveWarehouses();
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
          else{
            console.log(this.warehouses[i].name+ " was not removed from the list!");
          }
        }
        console.log(this.warehouses);
      }
    )
  }

  selectWarehouse(id: number, name: string, bins: Bin[]){
    this.warehouse=new Warehouse();
    this.warehouse.id= id;
    this.warehouse.name= name;
    this.warehouse.bins=bins;
    this.warehouseService.getWarehouseById(id).subscribe(
     response=>{
       console.log(response);
 
       this.bins= this.warehouse.bins;
       console.log(this.warehouse);
       
     }
    )
 
 
    document.getElementById('bin-table')!.style.visibility="visible";
    document.getElementById('item-table')!.style.visibility="hidden";
 
      
 }
 selectBin(id: number){
  this.bin= new Bin();
  this.bin.id= id;
  this.binService.getBinById(id).subscribe(
    response=>{
      console.log(response);
      this.bin=response;
      this.binNumber= this.bin.id;
      console.log(this.binNumber);
      console.log(this.bin);
      this.items= this.bin.items;
      console.log(this.items);

    }
   
  )
 
  document.getElementById('item-table')!.style.visibility="visible";
}
removeItemFromBin(id: number){
  this.binService.removeFromBin(this.binNumber, id, this.bin).subscribe(
    data=>{
      console.log(data)
      this.selectBin(this.binNumber)
    }
  )
  
  
}
getItem(itemId: number){
  this.itemService.getItemById(itemId).subscribe(
    data=>{
      console.log(data);
      this.item= data;
      this.item.quantity= this.item.quantity-1;
      this.itemService.updateItem(this.item.id, this.item).subscribe(
        data=>{
          console.log(data);
        }
      )
      this.removeItemFromBin(this.item.id);
      
      
    }
  )
}

}
