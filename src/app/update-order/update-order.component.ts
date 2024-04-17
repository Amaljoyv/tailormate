import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from "src/models/order";

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit{
  newOrderForm!: FormGroup;
// order: Order;
  orderDetails:any
  allOrders:any=[]
  deliveredOrder:any=[]
  processingOrder:any=[]
  processingCount:any
  deliveryCount:any
  totalOrder:any
  totalAmount:any
  id:any
// update

totalAMount:Number=0
updatingorder:boolean=false
orderSuccessMessage:any
formIncompleteMessage:Boolean=false
dateControl:any
dataBeforeUpdate:any
// update

// get id
  orderId:any
  orderNo:any
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data:any)=>{
      console.log(data);
      this.orderId = data.id
      console.log(this.orderId);
           
    })
    this.api.getOneOrder(this.orderId)
    .subscribe((result:any)=>{
      this.orderDetails= result
      console.log(this.orderDetails);
      console.log(this.orderDetails.orderStatus);
      this.orderNo=this.orderDetails.id
      console.log(this.orderNo);
            
    },(result:any)=>{
      console.log(result.error);
      
    })
    

    this.newOrderForm = this.fb.group({
      id: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      mobile: ['', [Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      // item: ['', Validators.required],
      // amount: ['', [Validators.required,Validators.pattern('[0-9]*')]],
      // quantity: ['', [Validators.required,Validators.pattern('[0-9]*')]],
      orderStatus: ['', Validators.required],
    });

  
    this.api.getOneOrder(this.orderId).subscribe(order => {
      this.orderDetails = order;
      this.newOrderForm.patchValue({
        id: this.orderDetails.id,
        date: this.orderDetails.date,
        time: this.orderDetails.time,
        name: this.orderDetails.name,
        mobile: this.orderDetails.mobile,
        item: this.orderDetails.item,
        amount: this.orderDetails.amount,
        quantity: this.orderDetails.quantity,
        orderStatus: this.orderDetails.orderStatus
        
      });
    });


  }
  // getOneOrder(){
    
  // }
  constructor(private api:ApiService,private fb:FormBuilder,private router:Router,private activatedRoute:ActivatedRoute){}

  // updateOrder(order: any) {
  //   this.dataBeforeUpdate = order;
  //   console.log(this.dataBeforeUpdate);
  
    
  //   this.newOrderForm = this.fb.group({
  //     date: [this.dataBeforeUpdate.date, Validators.required],
  //     time: ['', Validators.required],
  //     name: [this.orderDetails.name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  //     mobile: [this.dataBeforeUpdate.mobile, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
  //     item: [this.dataBeforeUpdate.item, Validators.required],
  //     amount: [this.dataBeforeUpdate.amount, [Validators.required, Validators.pattern('[0-9]*')]],
  //     quantity: [this.dataBeforeUpdate.quantity, [Validators.required, Validators.pattern('[0-9]*')]]
  //   });
  //   console.log(this.dataBeforeUpdate.name);
    
  // }
 

  submitForm(){
    // this.getOneOrder()
    let id = this.orderNo
    let date = this.newOrderForm.value.date
    let time = this.newOrderForm.value.time
    let name = this.newOrderForm.value.name
    let mobile = this.newOrderForm.value.mobile
    let item = this.newOrderForm.value.item
    let amount = this.newOrderForm.value.amount
    let quantity = this.newOrderForm.value.quantity
    let orderStatus = this.newOrderForm.value.orderStatus
    let orderData = {
      id: this.orderNo,
      date: this.newOrderForm.value.date,
      time: this.newOrderForm.value.time,
      name: this.newOrderForm.value.name,
      mobile: this.newOrderForm.value.mobile,
      item: this.newOrderForm.value.item,
      amount: this.newOrderForm.value.amount,
      quantity: this.newOrderForm.value.quantity,
      orderStatus: this.newOrderForm.value.orderStatus
    };
    console.log(id);
    console.log(date);
    console.log(name);
    console.log(mobile);
    console.log(item);
    console.log(amount);
    console.log(time);
    console.log(quantity);
    console.log(orderStatus);
    
    // let id = localStorage.getItem('id');
    // if (!id) {
    //     id = '1'; // Initial ID
    // } else {
    //     id = (parseInt(id) + 1).toString(); // Increment ID
    // }
    // localStorage.setItem('id', id);
    
    
    if (this.newOrderForm.valid) {
      this.api.updateOrder(this.orderId,orderData)
      .subscribe((result:any)=>{
        this.updatingorder=true
        this.formIncompleteMessage=false
        setTimeout(() => {
          this.updatingorder=false
          this.orderSuccessMessage=result.message
          console.log(this.orderSuccessMessage);
          
          this.newOrderForm.reset()
          this.totalAMount=0
          setTimeout(() => {
            this.orderSuccessMessage = null;
            
              this.router.navigateByUrl("order")
            
          }, 2000);
        }, 1500);
        this.orderSuccessMessage=''
        // this.router.navigateByUrl('/order')
      },(result:any)=>{
        // alert(result.error)
      })


    } else {
      this.formIncompleteMessage=true
    }
  }
  calculateTotalAmount() {

    if (this.newOrderForm && this.newOrderForm.valid) {
        let amountInput = this.newOrderForm.value.amount;
        let quantityInput = this.newOrderForm.value.quantity;

        // Ensure that input values are strings before parsing
        let amount = typeof amountInput === 'string' ? parseFloat(amountInput) : undefined;
        let quantity = typeof quantityInput === 'string' ? parseFloat(quantityInput) : undefined;

        // Check if both amount and quantity are valid numbers
        if (typeof amount === 'number' && typeof quantity === 'number' && !isNaN(amount) && !isNaN(quantity)) {
            this.totalAMount = amount * quantity;
        } else {
            console.error('Invalid input for amount or quantity.');
        }
    } else {
      this.formIncompleteMessage=true
        // console.error('Form is not valid or not initialized properly.');
    }
}

}
