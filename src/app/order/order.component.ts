import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  allOrders:any=[]
  // deliveredOrder:any=[]
  // processingOrder:any=[]
  // count
  processingCount:any
  deliveryCount:any
  manufacturingCount:any
  dispatchCount:any
  placedOrderCount:any
  // count
  totalOrder:any
  totalAmount:any
  id:any
  nameSearch:string=''
  statusSearch:string=''
 
  
  dateSearch:string=''
  currentId:any
  orderToDelete:String=""

  
  constructor(private api:ApiService,private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {
    this.getAllOrders()
    
  }
 
  
  
  getAllOrders(){
    this.api.getAllOrders()
    .subscribe((result:any)=>{
      console.log(result);
      
      
      
      this.allOrders=result.allorders
       .reverse()
      // this.deliveredOrder=result.deliveredOrders
      // this.processingOrder=result.processingOrders
      // console.log(this.deliveredOrder);
      
      console.log(this.allOrders);
      this.id=this.allOrders.length+1
      this.totalOrder=this.allOrders.length
      this.deliveryCount=result.deliveredOrders.length
      this.processingCount=result.processingOrders.length
      this.manufacturingCount=result.manufacturingOrders.length
      this.dispatchCount=result.dispatchOrders.length
      this.placedOrderCount=result.placedOrders.length
      
      console.log(this.totalOrder);
      console.log(this.deliveryCount);
      console.log(this.processingCount);
      console.log(this.manufacturingCount);
      console.log(this.dispatchCount);
      console.log(this.placedOrderCount);
      
      
      
    })
  }

  reverseOrders() {
    this.allOrders.reverse();
  }

  removeOrder(id:String){
    // alert(`remove id: ${id}`)
    this.orderToDelete= id
  }

  delete(id:String  ){
    // alert(id)
    this.api.removeOrder(id)
    .subscribe((result:any)=>{
      this.allOrders=result
      this.getAllOrders()
      console.log(this.allOrders);
      
    })
  }
  

}
