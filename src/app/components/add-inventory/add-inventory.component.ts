import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bin } from 'src/app/Bin';
import { Item } from 'src/app/Item';
import { BinService } from 'src/app/service/bin.service';
import { ItemService } from 'src/app/service/item.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Warehouse } from 'src/app/Warehouse';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
    warehouses: Warehouse[]|any
    warehouse!: Warehouse;
    bin!: Bin;
    bins: Bin[] | undefined
    itemName!: string;
    binNumber!: number;
    items: Item[]| any
    item!: any;


  constructor(
    private warehouseService: WarehouseService,
    private binService: BinService,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    this.retrieveWarehouses();

    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 
  }

retrieveWarehouses(){
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
   document.getElementById('item-search')!.style.visibility="hidden";
     
}
selectBin(id: number){
    this.bin= new Bin();
    this.bin.id= id;
    this.binService.getBinById(id).subscribe(
      response=>{
        console.log(response);
        this.binNumber= this.bin.id;
        console.log(this.binNumber);

      }
    )
   
  document.getElementById('item-search')!.style.visibility="visible";
}
searchItems(name: string){
   this.itemService.getItemsByName(name).subscribe(
     response=>{
       console.log(response);
       this.items= response;
     }
   )

  document.getElementById('item-table')!.style.visibility="visible";

}
addItemToBin(itemId: number){
  this.binService.addToBin(this.binNumber, itemId, this.bin).subscribe(
     response=>{
         console.log(response);
         }
    
  )

}
getItem(itemId: number){
  this.itemService.getItemById(itemId).subscribe(
    data=>{
      console.log(data);
      this.item= data;
      this.item.quantity= this.item.quantity+1;
      this.itemService.updateItem(this.item.id, this.item).subscribe(
        data=>{
          console.log(data);
        }
      )
      this.addItemToBin(this.item.id);
      alert("Item Added Successfully!")
      
    }
  )
}
}
