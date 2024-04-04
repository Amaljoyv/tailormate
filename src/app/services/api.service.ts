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

  addOrders(id:any,date:any,name:any,mobile:any,status:any,amount:any){
    const body={
      id,
      date,
      name,
      mobile,
      status,
      amount
    }
    return this.http.post('http://localhost:3000/add-new-order',body)
  }

  removeOrder(id:any){
    return this.http.delete(`http://localhost:3000/remove-order/${id}`)
  }

}
