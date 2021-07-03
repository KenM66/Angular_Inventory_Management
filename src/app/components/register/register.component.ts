import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/Company';
import { CompanyService } from 'src/app/service/company.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  company!: Company|any;
  user!: User;
  companyName!: string;
  username!: string;
  password1!: string;
  password2!: string;
  securityQuestion!: string;
  securityAnswer!: string;

  registrationForm!: FormGroup;
  

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user= new User();
    this.company= new Company();
    this.initializeForm();

  

  }

  registerCompany(companyName: string, username: string, password1: string, password2: string, securityQuestion: string, securityAnswer: string){
    this.company.companyName= companyName;
    
    if(password1===password2){
        this.companyService.registerCompany(this.company).subscribe(
          data=>{
            this.company=data;
            this.user.username= username;
            this.user.password= password1;
            this.user.companyNum= this.company.id;
            this.user.securityQuestion= securityQuestion;
            this.user.securityAnswer= securityAnswer;


            console.log(data)
            this.userService.addUser(this.user).subscribe(
              data=>{console.log(data);
                alert("Company: "+ companyName+ " registered succesfully!  Please login with your credentials!")
                this.router.navigate(['login']);
              }

            )
          }
        )
    }
    else{
      alert("Passwords do not match!");
    }

  }

 

  initializeForm(): void{
    this.registrationForm= new FormGroup({
     companyName: new FormControl(),
     username: new FormControl(),
     password1: new FormControl(),
     password2: new FormControl(),
     securityQuestion: new FormControl(),
     securityAnswer: new FormControl()

    }
    )
  }

  setValues(){
   
    
    this.companyName= this.registrationForm.value['companyName'];
    this.username= this.registrationForm.value['username'];
    this.password1= this.registrationForm.value['password1'];
    this.password2= this.registrationForm.value['password2'];
    this.securityQuestion= this.registrationForm.value['securityQuestion'];
    this.securityAnswer= this.registrationForm.value['securityAnswer'];


    this.registerCompany(this.companyName, this.username, this.password1, this.password2, this.securityQuestion, this.securityAnswer);
   
    
  }


}