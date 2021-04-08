import { Component, OnInit } from '@angular/core';
import { Bin } from 'src/app/Bin';
import { Item } from 'src/app/Item';
import { BinService } from 'src/app/service/bin.service';
import { ItemService } from 'src/app/service/item.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Warehouse } from 'src/app/Warehouse';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-look-up-item',
  templateUrl: './look-up-item.component.html',
  styleUrls: ['./look-up-item.component.css']
})
export class LookUpItemComponent implements OnInit {

  bins!: Bin[]|any;
  items!: Item[]| any;
  item!: Item|any;
  name: string='';
  id!: number;
  bins2: Bin[]=[];
  warehouses: Warehouse[]|any;


  constructor(
    private binService: BinService,
    private itemService: ItemService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
    
    this.item=new Item();
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    this.searchAllBins();
    this.setWarehouseList();
    
  }
  setWarehouseList(){
    this.warehouseService.getWarehouses()
    .subscribe(
      response=>{
         this.warehouses=response;
         
      }
    )
     
  }

  searchAllBins(){
    this.binService.getBins().subscribe(
      response=>{
        console.log(response);
        this.bins=response;
      }
    )
  }
  searchItemsByName(name: string){
    document.getElementById('location-table')!.style.visibility= "hidden";
    this.items=[];
     this.itemService.getItemsByName(name)
     .subscribe(
       data=>{
         console.log(data);
         this.items=data;
         this.items.forEach((element:Item, index: any)=>{
         if(element.companyNum!=LoginComponent.companyNum){
           this.items.splice(index, 1);
         
           
         }
         document.getElementById('select-buttons')!.style.visibility="visible";
        });
       })
  }

  searchItemById(id: number){
    this.items=[];
    
    this.itemService.getItemById(id)
    .subscribe(
      data=>{
        this.item=data;
        if(this.item.companyNum!=LoginComponent.companyNum){
          alert("Item Not Found!");
          return;
        }
        
        this.checkIfBinContainsItem(this.item);
        
      }
    )
    
  }

  checkIfBinContainsItem(item: Item){
    
    this.bins2=[];
   
      for(let bin of this.bins){
          
            for(let i=0; i<bin.items.length; i++){
              if(bin.items[i].id=== item.id){
                //bin.tempBinString= item.name;
                this.bins2.push(bin);
                
              }
            }
        }
        document.getElementById('location-table')!.style.visibility="visible";
        console.log(this.bins2);
     }

  

}
