import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/basic-authentication.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';

interface UserRecord{
  id: number;
  username: string;
  password: string;
  companyNum: number;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   static companyNum: number;
   static user: string;
   static pass: string;

   username=''
   password=''

   errorMessage='Invalid Credentials'
   invalidLogin=false;
   
   
 
   user: User= new User();

  constructor(
    public router: Router,
    private userService: UserService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.user= new User();
    
  }

  storeUserDetails(){
    this.userService.getUserByUsername(this.username)
      .subscribe(data=>{
        const user= data as UserRecord;
        console.log(user.companyNum);
        LoginComponent.companyNum= user.companyNum;
        console.log(LoginComponent.companyNum);
        var companyStringNum= LoginComponent.companyNum.toString();
        localStorage.setItem("companyStringNumKey", companyStringNum);

        this.user.username= user.username;
        this.user.password= user.password;
        console.log(this.user.username);
        console.log(this.username);
        console.log(this.password);

        this.handleLogin();

      }

      )
  }

  handleLogin(){
    console.log(this.user.password);
    console.log(this.password);
    if(this.username=== this.user.username && this.password=== this.user.password){
      this.username= LoginComponent.user;
      this.password= LoginComponent.pass;
    if(this.basicAuthenticationService.authenticate(this.username, this.password)){
      this.router.navigate([''])
      this.invalidLogin= false
    }
   

}else{
  this.invalidLogin=true;
console.log("this didn't work");
}
}
}