import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/Item';
import { ItemService } from 'src/app/service/item.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-edit-delete-item',
  templateUrl: './edit-delete-item.component.html',
  styleUrls: ['./edit-delete-item.component.css']
})
export class EditDeleteItemComponent implements OnInit {
  items: Item[]|any
  sortedData: Item[]|any
  itemName!: string;

  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    this.refreshItems();
  }

  refreshItems(){
    this.itemService.getItemsByCompanyNum(LoginComponent.companyNum).subscribe(
      response=>{
        this.items= response;
        this.sortAlphabetically();
      }
    )
  }
  refreshNumerically(){
    this.itemService.getItemsByCompanyNum(LoginComponent.companyNum).subscribe(
      response=>{
        this.items=response;
        
        this.sortNumerically();
        console.log(this.items);
      }
    )
  }

  sortAlphabetically(){
    this.items.sort(function(a:Item,b:Item){
      if(a.name<b.name){return -1;}
      if(a.name>b.name){ return 1;}
      return 0;
    })
 }

 sortNumerically(){
   this.items.sort(function(a:Item, b:Item){
     if(a.id<b.id){return -1;}
     if(a.id>b.id){return 1;}
     return 0;
   }
   )
 }
 
 refineSearchByName(name: string){
   if(name==""){
     this.refreshItems();
     return;
   }
    this.itemService.getItemsByName(name).subscribe(
      response=>{
        this.items=response;
      }
    )
 }
  
deleteItem(id: number, item: Item){
  if(item.quantity===0){
     if(window.confirm("This will delete "+item.name+ " from the database.  Click Ok to confirm!")){
       this.itemService.deleteItemById(id).subscribe(
         response=>{
           console.log(response);
           this.refreshItems();

         }
       )
     }
  }
  else{
    alert("You cannot delete an item that is still stored in a bin!  Please clear item out of all bins before deleting!");
  }
  
}

updateItem(id: number){
  this.router.navigate(['new-item', id]);
}

}
function compare(a: string | number,b: string | number, isAsc: boolean){
  return (a<b?-1:1)*(isAsc?1:-1);
}