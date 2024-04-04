import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  allOrders:any=[]
  deliveredOrder:any=[]
  processingOrder:any=[]
  processingCount:any
  deliveryCount:any
  totalOrder:any

  nameSearch:string=''
  statusSearch:string=''
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllOrders()
  }
  getAllOrders(){
    this.api.getAllOrders()
    .subscribe((result:any)=>{
      console.log(result);
      
      
      
      this.allOrders=result.allorders
      this.deliveredOrder=result.deliveredOrders
      this.processingOrder=result.processingOrders
      console.log(this.deliveredOrder);
      
      console.log(this.allOrders);
      
      this.totalOrder=this.allOrders.length
      this.deliveryCount=this.deliveredOrder.length
      this.processingCount=this.processingOrder.length
      // console.log(this.totalOrder);
      // console.log(this.deliveryCount);
      // console.log(this.processingCount);
      
      
      
    })
  }
  removeOrder(id:any){
    
    this.api.removeOrder(id)
    .subscribe((result:any)=>{
      alert(`clicked${id}`)
      this.allOrders=result
      console.log(this.allOrders);
      
    })
  }

}
