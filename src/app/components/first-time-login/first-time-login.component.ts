import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/basic-authentication.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-first-time-login',
  templateUrl: './first-time-login.component.html',
  styleUrls: ['./first-time-login.component.css']
})
export class FirstTimeLoginComponent implements OnInit {

  user!: User;
  securityQuestion!:string;
  securityAnswer!:string;
  password1!: string;
  password2!: string;
  companyNum!: number;



  constructor(
    private router: Router,
    private userService: UserService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.user= new User();
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
     LoginComponent.companyNum= companyNumber;
     LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
    
     this.user= LoginComponent.userLoggedIn;
  }

  update(){
    if(this.password1===this.password2){
      this.user.password= this.password1;
      this.user.securityQuestion= this.securityQuestion;
      this.user.securityAnswer= this.securityAnswer;
      this.user.companyNum= LoginComponent.companyNum;
      this.userService.updateUser(this.user.id, this.user).subscribe(
        data=>{
          console.log(data);
          alert("Information updated succesfully.  Please login with your new credentials!");
          this.basicAuthenticationService.logout();
          this.router.navigate(['login']);
        }
      );
    }
    else{
      alert("Passwords do not match!");
    }
  }

}
