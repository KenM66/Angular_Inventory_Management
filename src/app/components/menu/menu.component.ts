import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BasicAuthenticationService } from 'src/app/service/basic-authentication.service';
import { User } from 'src/app/User';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() user= LoginComponent.userLoggedIn;
  

  constructor(
    public basicAuthenticationService: BasicAuthenticationService 
    ) { 
      
    }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes);

 }

  ngOnInit(): void {
   
    
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
     LoginComponent.companyNum= companyNumber;
     LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
    
     this.user= LoginComponent.userLoggedIn;
     
    console.log(this.user);

    
  }


  

}
