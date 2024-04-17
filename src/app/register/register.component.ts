import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],

})
export class RegisterComponent {

  constructor(private fb:FormBuilder,private router:Router){}

  registerForm = this.fb.group({
    firstname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    lastname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    mobile:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
    password:['',Validators.required],
    cpassword:['',Validators.required]
  })

  register(){
    let fname = this.registerForm.value.firstname
    let lname = this.registerForm.value.lastname
    let mobno = this.registerForm.value.mobile
    let pswd = this.registerForm.value.password
    let cpswd = this.registerForm.value.cpassword
    if(this.registerForm.valid){
      if(pswd == cpswd){
        alert('Register Success')
        this.router.navigateByUrl('')
      }
      else{
        alert("invalid form")
      }
    }
    else{
      alert("invalid Form")
    }
  }

}
