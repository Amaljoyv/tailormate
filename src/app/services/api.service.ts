import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http:HttpClient) { }

  getAllOrders(){
    //api call asynchronous
   return this.http.get('http://localhost:3000/get-all-orders')
  }

  getOneOrder(id:any){
    return this.http.get(`http://localhost:3000/get-one-order/${id}`)
  }

  addOrders(id:any,date:any,time:any,name:any,mobile:any,items:any,orderStatus:any){
    const body={
      id,
      date,
      time,
      name,
      mobile,
      items,
      orderStatus
    }
    return this.http.post('http://localhost:3000/add-new-order',body)
  }


  updateOrder(id:any,order:any){
    return this.http.put(`http://localhost:3000/order/update-order/${id}`,order)
  }

  removeOrder(id:any){
    return this.http.delete(`http://localhost:3000/order/remove-order/${id}`)
  }

}
