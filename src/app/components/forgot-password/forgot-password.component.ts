import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user!: User;
  username!: string;
  securityAnswer!: string;
  password1!:string;
  password2!:string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user= new User();
  }
  
  displayQuestion(username: string){
    this.userService.getUserByUsername(username).subscribe(
      data=>{
        this.user=data;
        if(this.user!=null){
          if(this.user.securityQuestion!=null){
          document.getElementById("display-question")!.style.visibility="visible";
          }
          else{
            alert("Please contact your company administrator for login help.");
          }
      }
      
        else{
          alert("User does not exist!")
        }
      }
    )
  }

  validateAnswer(){
    if(this.securityAnswer===this.user.securityAnswer){
      document.getElementById("new-password")!.style.visibility="visible";
    }
    else{
      alert("Answer was incorrect!")
    }
  }
  updatePassword(){
    if(this.password1===this.password2){
        this.user.password= this.password1;
        this.userService.updateUser(this.user.id, this.user).subscribe(
          data=>{
            console.log(data);
            alert("Password updated successfully!  Please login now!");
            this.router.navigate(['login']);
          }
        )
    }
    else{
      alert("Passwords do not match!");
    }
  }

}
