
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/Item';
import { ItemService } from 'src/app/service/item.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-create-new-item',
  templateUrl: './create-new-item.component.html',
  styleUrls: ['./create-new-item.component.css']
})
export class CreateNewItemComponent implements OnInit {

  item: Item|any;
  
  id!: number|number;
  items!: Item[]|any;
  itemName!: String;
  itemDescription!:String;
  itemChecked: boolean= false;

  tempItemString!: string;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 
    this.id= this.route.snapshot.params['id'];
  
    this.itemService.getItemsByCompanyNum(LoginComponent.companyNum).
     subscribe(
       response=>{
         this.items=response;

         for(let i=0; i<this.items.length; i++ ){
          
           if(this.id==this.items[i].id){
             this.itemName= this.items[i].name;
             this.itemDescription= this.items[i].description;
             this.tempItemString= this.items[i].name
             console.log('this loop works');
           }
         }
       }

     

     )

    
    this.item= new Item();
    if(this.id==undefined){
    this.itemName='';
    this.itemDescription='';
    }
    
    
    this.item.id= this.id;
    if(this.id!=undefined){
      this.itemService.getItemById(this.id)
      .subscribe(
        data=>{
          this.item=data;
        }
      )
    }
  }

onSubmit(){
  
  var itemStringReceived= localStorage.getItem('itemStringKey');
  var itemDescriptionStringReceived= localStorage.getItem('itemDescriptionKey');

  this.item.name= itemStringReceived;
  this.item.description= itemDescriptionStringReceived;
  //This ^ gets the values from local storage as they are null by the time this method is called. 
    if(this.id===undefined){
        console.log(this.itemChecked);
        if(this.itemChecked===true){
          return;
        }
        
       
        this.item.companyNum= LoginComponent.companyNum;
        this.itemService.createItem(this.item).subscribe(
           data=> (console.log(data)
            )
         );
        alert("Item created");
        
        this.item= new Item();
      }

      else{
        if(this.itemChecked===true){
          return;
        }
        console.log(this.item);
        this.itemName= this.item.name;
        this.itemDescription= this.item.description;
        console.log(this.item.name);
        this.itemService.updateItem(this.id, this.item).subscribe(
          data=>{
            console.log(data)
            this.router.navigate(['edit-delete-item']);
          }
        )
      }
  }
  checkIfItemExists(){
    this.itemChecked= false;
   
   
      var itemString= this.itemName.toString();
      localStorage.setItem('itemStringKey', itemString);
      var itemDescriptionString= this.itemDescription.toString();
      localStorage.setItem('itemDescriptionKey', itemDescriptionString);
    
      this.itemService.getItemsByCompanyNum(LoginComponent.companyNum).
      subscribe(
        response=>{

        this.items=response;
         var itemStringReceived= localStorage.getItem('itemStringKey');
         
        for(let i=0; i<this.items.length; i++){
          console.log(itemStringReceived+" "+ this.items[i].name);
          
          if(itemStringReceived!.toUpperCase().trim()=== this.items[i].name.toUpperCase().trim()){
            if(itemStringReceived?.toUpperCase().trim()=== this.tempItemString.toUpperCase().trim()){
              break;
            }
            alert("You already have an item named "+itemStringReceived+".")
            this.itemChecked=true;
            return;
         }
           
         }
         this.onSubmit();
        }
      )
      
   }
}
