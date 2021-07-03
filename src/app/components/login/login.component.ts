import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasicAuthenticationService } from 'src/app/service/basic-authentication.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';
import { MenuComponent } from '../menu/menu.component';


interface UserRecord{
  id: number;
  username: string;
  password: string;
  admin: boolean;
  securityQuestion: string;
  securityAnswer: string;
  companyNum: number;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   static companyNum: number;
   static usernm: string;
   static pass: string;
   
   static userLoggedIn: User;

   username=''
   password=''

   errorMessage='Invalid Credentials'
   invalidLogin=false;
   
   
 
   user: User= new User();

  constructor(
    public router: Router,
    private userService: UserService,
    private basicAuthenticationService: BasicAuthenticationService,
    private menuComponent: MenuComponent
  ) { }

  ngOnInit(): void {
    this.user= new User();
    
  }

  storeUserDetails(){



    this.userService.getUserByUsername(this.username)
      .subscribe(data=>{
        const user= data as UserRecord;
        if(user !=null){
        console.log(user.companyNum);
        LoginComponent.companyNum= user.companyNum;
        console.log(LoginComponent.companyNum);
        var companyStringNum= LoginComponent.companyNum.toString();
        localStorage.setItem("companyStringNumKey", companyStringNum);

        
        this.user.id= user.id;
        this.user.username= user.username;
        this.user.password= user.password;
        this.user.admin= user.admin;
        this.user.securityQuestion= user.securityQuestion;
        this.user.securityAnswer= user.securityAnswer;
        this.user.companyNum= user.companyNum;
        console.log(this.user.username);
        console.log(this.username);
        console.log(this.password);

        LoginComponent.userLoggedIn= this.user;

        console.log(LoginComponent.userLoggedIn);
      
        localStorage.setItem("userLoggedInStringKey", JSON.stringify(LoginComponent.userLoggedIn));


        this.handleLogin();
        }
        else{
          this.invalidLogin=true;
        }
      }

      )
  }

  handleLogin(){

   

    console.log(this.user.password);
    console.log(this.password);
    if(this.username.toUpperCase()=== this.user.username.toUpperCase() && this.password=== this.user.password){
      this.username= LoginComponent.usernm;
      this.password= LoginComponent.pass;
    if(this.basicAuthenticationService.authenticate(this.username, this.password)){
      console.log(LoginComponent.userLoggedIn);
      

     

      this.menuComponent.ngOnInit();
      if(this.user.securityQuestion!=null){
      this.router.navigate(['']);
      }
      else{
        this.router.navigate(['first-time-login']);
      }

      this.invalidLogin= false
    }
   

}else{
  this.invalidLogin=true;
console.log("this didn't work");
}
}

}