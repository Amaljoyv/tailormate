import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private fb:FormBuilder,private router:Router){}

  loginForm = this.fb.group({
    firstname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password:['',Validators.required]
  })

  login(){
    let fname = this.loginForm.value.firstname
    let pswd = this.loginForm.value.password
    if(this.loginForm.valid){
      
        alert('Login Success')
        this.router.navigateByUrl('dashboard')
    }
    else{
      alert("invalid form")
    }
  }

}
