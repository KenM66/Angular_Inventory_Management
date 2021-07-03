import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  bins: Bin[]|any;
  items!: Item[]| any;
  item!: Item|any;
  name: string='';
  id!: number;
  bins2: Bin[]=[];
  warehouses: Warehouse[]|any;


  constructor(
    private binService: BinService,
    private itemService: ItemService,
    private warehouseService: WarehouseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
    this.item=new Item();
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
    
    this.searchAllBins();
   
    this.id= this.route.snapshot.params['id'];
  
    
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
        this.setWarehouseList();
        if(this.id!=undefined){
     
          this.searchItemById(this.id);
    
        }
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
      if(this.item!=null){
        if(this.item.companyNum!=LoginComponent.companyNum){
          alert("Item Not Found!");
          return;
        }
        
        this.checkIfBinContainsItem(this.item, this.bins);
        
      }
      else{
        alert("Item not found!");
      }
      }
     
    )
    
  }

  checkIfBinContainsItem(item: Item, bins: Bin[]){
    
    this.bins2=[];
  
      
    
      bins.forEach((element:Bin)=>{
        for(let i=0; i<element.items.length; i++){
          if(element.items[i].id=== item.id){
            element.tempBinString= item.name;
            this.bins2.push(element);
          }
        }
      }
      )
        
        document.getElementById('location-table')!.style.visibility="visible";
    
     }

  

}
