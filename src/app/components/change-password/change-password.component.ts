
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user!: User; 
  currentPassword: string | undefined;
  password1!: string
  password2!: string

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user= new User();
    this.user= LoginComponent.userLoggedIn;
    console.log(this.user);
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
    console.log(LoginComponent.userLoggedIn); 
  }

  updatePassword(){
    
    if(this.currentPassword===this.user.password){
      if(this.password1===this.password2){
        this.user.password= this.password1;
        
        console.log(this.user.id);
        this.userService.updateUser(this.user.id, this.user).subscribe(
           response=>{
             console.log(response);
             alert("Password Change Successful!  Please re-login with your new password.")
             this.router.navigate(['logout']);

           }
        )

      }
      else{
        alert("New passwords do not match!")
      }
        
    }
    else{
      alert("Current password is incorrect!");
    }
  }

}
