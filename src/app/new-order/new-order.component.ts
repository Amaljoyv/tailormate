import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  // newOrderForm! :FormGroup;
  allOrders:any=[]
  id:any
  addingOrder:boolean=false
  orderSuccessMessage:any
  formIncompleteMessage:Boolean=false
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}

 

  ngOnInit(): void {
    this.api.getAllOrders()
    .subscribe((result:any)=>{
      console.log(result);
      this.allOrders=result.allorders
      console.log(this.allOrders);
      this.id=this.allOrders.length+1 
      console.log(this.id);
      //  this.initializeForm()
      
    })
  }
//   initializeForm() {
//     this.newOrderForm = this.fb.group({
//     date: ['', Validators.required],
//     name: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
//     mobile: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
//     status: ['', Validators.required,Validators.pattern('[a-z]*')],
//     amount: ['',[Validators.required,Validators.pattern('[0-9]*')]]
//   });
// }

  newOrderForm = this.fb.group({
        date: ['', Validators.required],
        time: ['', Validators.required],
        name: ['',[Validators.required]],
        mobile: ['', [Validators.required]],
        status: ['', Validators.required],
        amount: ['',[Validators.required]]
      });

  submitForm(){
    let id = this.id
    let date = this.newOrderForm.value.date
    let time = this.newOrderForm.value.time
    let name = this.newOrderForm.value.name
    let mobile = this.newOrderForm.value.mobile
    let status = this.newOrderForm.value.status
    let amount = this.newOrderForm.value.amount
    console.log(date);
    console.log(name);
    console.log(mobile);
    console.log(status);
    console.log(amount);
    console.log(time);
    
    
    
    if (this.newOrderForm.valid) {
      this.api.addOrders(id,date,time,name,mobile,status,amount)
      .subscribe((result:any)=>{
        this.addingOrder=true
        this.formIncompleteMessage=false
        setTimeout(() => {
          this.addingOrder=false
          this.orderSuccessMessage=result
          this.newOrderForm.reset()
        }, 3000);
        this.orderSuccessMessage=''
        // this.router.navigateByUrl('/order')
      },(result:any)=>{
        // alert(result.error)
      })


    } else {
      this.formIncompleteMessage=true
    }
  }
 

  // .subscribe((result:any)=>{
  //   setTimeout(()=>{
  //     alert("success")
  //     this.router.navigateByUrl('/order')
  //   }, 3000);
  // },
  // (result:any)=>{
  //   alert('success')
  //   this.newOrderForm.reset()
  // }
  // )

  // validateDateFormat(control:any) {
  //   const validDatePattern = /^\d{2}-\d{2}-\d{4}$/;
  //   if (control.value && !validDatePattern.test(control.value)) {
  //     return { invalidDateFormat: true };
  //   }
  //   return null;
  // }

}
