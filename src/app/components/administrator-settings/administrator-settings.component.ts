import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/Company';
import { CompanyService } from 'src/app/service/company.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-administrator-settings',
  templateUrl: './administrator-settings.component.html',
  styleUrls: ['./administrator-settings.component.css']
})
export class AdministratorSettingsComponent implements OnInit {
   users: User[]|any;
   user: User|any;
   password1: String|any;
   password2: String|any;
   userLoggedIn: User|any;

   
   
  
   registrationForm: FormGroup | any
  

  constructor(
    private userService: UserService,
    
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user= new User();
    this.userLoggedIn= new User();
    this.userLoggedIn= LoginComponent.userLoggedIn;
    var companyNum= localStorage.getItem("companyStringNumKey");
    var companyNumber= Number(companyNum);
    LoginComponent.companyNum= companyNumber;
    this.initializeForm();
    //var loggedInUser= localStorage.getItem("userLoggedInStringKey");
     LoginComponent.userLoggedIn= JSON.parse(localStorage.getItem("userLoggedInStringKey")!);
     console.log(LoginComponent.userLoggedIn); 

     if(LoginComponent.userLoggedIn.admin===false){
          this.router.navigate(['']);
     }
     

  }
 createUser(){
   var username= this.user.username;
   var password= this.user.password;
   var admin= this.user.admin
if(this.user.username!=null && this.user.password!=null){
    this.userService.getAllUsers().subscribe(
      data=>{
        this.users=data;
        console.log(data);
          
        if(password===this.password2){

            this.users.forEach((element:any, index:any, arr:any)=>
              {
                console.log('loop is working')
                this.user.username= username;

                if(element.username===this.user.username){
                
                  alert("Username already exists!");
                  return;
                }
                else{
                  
                  this.user.companyNum= LoginComponent.companyNum;
                  this.user.password= password;
                
                  this.user.admin= admin;
                  
                  this.userService.addUser(this.user).subscribe(
                      data=>{console.log(data);
                        this.initializeUserList();
                        this.registrationForm.reset();
                        
                        alert("User successfully created!")
                        
                 
                      }
                    
                  )
                        arr.length= index+1;
                }
              } 
            );
            

        }
        else{
          alert("Passwords do not match!")
        }
      }
    );
   
}
else{
  alert("Please enter all fields!")
}
   
 }

 showUserForm(){
  document.getElementById('userList')!.style.visibility="hidden";
   document.getElementById('registrationForm')!.style.visibility="visible";
 }
 cancelForm(){
   document.getElementById('registrationForm')!.style.visibility="hidden";
 }
 initializeForm(): void{
   this.registrationForm= new FormGroup({
     username: new FormControl(),
     password: new FormControl(),
     password2: new FormControl(),
     userType: this.formBuilder.group({
       userType:[
       '',Validators.required]
     })
   })
 }
 showUsers(){
   document.getElementById('userList')!.style.visibility="visible";
   this.initializeUserList();
 }
 makeAdmin(user: User){
     user.admin=true;
     this.userService.updateUser(user.id, user).subscribe(
       data=>console.log(data)
     );
 }
 makeStandard(user: User){
     user.admin=false;
     this.userService.updateUser(user.id, user).subscribe(
       data=>console.log(data)
     );
 }
 initializeUserList(){
  document.getElementById('registrationForm')!.style.visibility="hidden";
  this.userService.getUsersByCompanyNum().subscribe(
    data=>{
      this.users=data;

      for(let i=0; i<this.users.length; i++){
            console.log(this.users[i]);
            if(this.users[i].username===this.userLoggedIn.username){
              console.log("this is working!");
              this.users.splice(i,1);
            }
      }
      
      
      console.log(this.users);
    
    }
  )

 }
 deleteUser(user: User){
   if(window.confirm("This will delete user "+ user.username+ "from the database.  Are you sure?")){
     this.userService.deleteUser(user.id).subscribe(
       data=>{console.log(data)
       this.initializeUserList()}
     );
     
   }
 }
}
