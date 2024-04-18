import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  allOrders:any=[]
  // id:any
  itemTable:any=[]
  // selectedFile!: File;
  totalAMount:any
  addingOrder:boolean=false
  orderSuccessMessage:any
  formIncompleteMessage:Boolean=false
//  image
// Array of image options
imageOptions: string[] = [
  'https://images.pexels.com/photos/6461250/pexels-photo-6461250.jpeg',
  'https://images.pexels.com/photos/6461250/pexels-photo-6461250.jpeg',
  'https://images.pexels.com/photos/6461250/pexels-photo-6461250.jpeg'
]; // Add your image paths here

// Property to store the selected image
selectedImage: string = '';

// Function to handle image selection
selectImage(image: string) {
  this.selectedImage = image;
}





  constructor(private fb:FormBuilder,private api:ApiService,private router:Router,private http:HttpClient){}

  

  ngOnInit(): void {

    

    // this.http.get('src/assets/images/images.json').subscribe((result:any)=>{
    //   console.log(result);
      
    // })
    this.getAllOrders()
    // this.fetchImageList()
  }

  // image work
  // fetchImageList() {
    
  //   this.http.get<any[]>('src/assets/images/images.json').subscribe(images => {
  //     console.log(images);
      
  //     this.imageList = images;
  //     console.log(this.imageList);
      
  //   });
  // }
  // image work

    getAllOrders(){
      this.api.getAllOrders()
    .subscribe((result:any)=>{
      console.log(result);
      this.allOrders=result.allorders
      console.log(this.allOrders);
      // this.id=this.allOrders.length+1 
      // console.log(this.id);
      if(result.length==0){
        localStorage.setItem('id', '0');

      }
    })
    }

    

  newOrderForm = this.fb.group({
        date: ['', Validators.required],
        time: ['', Validators.required],
        paymentMode: ['', Validators.required],
        name: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        mobile: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],

        // items: this.fb.array([]),
        address: ['', Validators.required],
        deliveryDate: ['', Validators.required],
        reqWorkingDays: ['', Validators.required],
        trialDate: ['', Validators.required],

        item: ['', Validators.required],
        amount: ['',[Validators.required,Validators.pattern('[0-9]*')]],
        quantity: ['',[Validators.required,Validators.pattern('[0-9]*')]],
        itemImage:[]
      });

      // get items(): FormArray {
      //   return this.newOrderForm.get('items') as FormArray;
      // }
      

      

      addItem() {  
        let item = this.newOrderForm.value.item;
        let amount = this.newOrderForm.value.amount;
        let quantity = this.newOrderForm.value.quantity;
        // console.log(item,amount,quantity);
        
        const itemEntry = {
          item,
          amount,
          quantity
        };
        // console.log(itemEntry);
        
        this.itemTable.push(itemEntry); 
        // console.log(this.itemTable);
        // this.newOrderForm.get('item')?.reset()
        // this.newOrderForm.get('quantity')?.reset()
        // this.newOrderForm.get('amount')?.reset()
        // this.newOrderForm.get('itemImage')?.reset()
        // console.log(this.newOrderForm.value);

        
       this.updateSubtotalAmount()
      

        
      }

      updateSubtotalAmount() {
        this.totalAMount = 0;
        for (const entry of this.itemTable) {
          this.totalAMount += Number(entry.amount) * Number(entry.quantity);
        }
        console.log('Total Amount:', this.totalAMount);
      }


      removeItem(item:any){
        const index = this.itemTable.indexOf(item);
        if (index !== -1) {
          this.itemTable.splice(index, 1);
        }
        this.updateSubtotalAmount()
      }

      calculateTotalAmount() {

        // if (this.newOrderForm && this.newOrderForm.valid) {
        //     let amountInput = this.newOrderForm.value.amount;
        //     let quantityInput = this.newOrderForm.value.quantity;
    
        //     let amount = typeof amountInput === 'string' ? parseFloat(amountInput) : undefined;
        //     let quantity = typeof quantityInput === 'string' ? parseFloat(quantityInput) : undefined;
    
        //     if (typeof amount === 'number' && typeof quantity === 'number' && !isNaN(amount) && !isNaN(quantity)) {
        //         this.totalAMount = amount * quantity;
        //     } else {
        //         console.error('Invalid input for amount or quantity.');
        //     }
        // } else {
        //   this.formIncompleteMessage=true
        // }
    }
    

    // onFileSelected(event:any) {
    //   this.selectedFile = event.target.files[0];
    // }

    
      


  submitForm(){
    
    
    
    let date = this.newOrderForm.value.date
    let time = this.newOrderForm.value.time
    let paymentMode = this.newOrderForm.value.paymentMode
    let name = this.newOrderForm.value.name
    let mobile = this.newOrderForm.value.mobile
    let address = this.newOrderForm.value.address
    let deliveryDate = this.newOrderForm.value.deliveryDate
    let reqWorkingDays = this.newOrderForm.value.reqWorkingDays
    let trialDate = this.newOrderForm.value.trialDate
    let items = this.itemTable.concat();
    // console.log(items);
    let orderStatus = "Order Placed"
    // console.log(date);
    // console.log(paymentMode);
    
    // console.log(name);
    // console.log(mobile);
    // console.log(time);
    // console.log(orderStatus);
    
    let id = localStorage.getItem('id');
    if (!id) {
        id = '1'; 
    } else {
        id = (parseInt(id) + 1).toString(); 
    }
    localStorage.setItem('id', id);
    
    
    if (this.newOrderForm.valid) {
      this.api.addOrders(id,date,paymentMode,time,name,mobile,address,deliveryDate,reqWorkingDays,trialDate,items,orderStatus)
      .subscribe((result:any)=>{
        // console.log(result);
        
        this.addingOrder=true
        this.getAllOrders()
        this.formIncompleteMessage=false
        setTimeout(() => {
          this.addingOrder=false
          this.orderSuccessMessage=result
          this.newOrderForm.reset()
          this.totalAMount=0
          setTimeout(() => {
            this.orderSuccessMessage = null;
            
              this.router.navigateByUrl("order")
            
          }, 2000);
        }, 1500);
        this.orderSuccessMessage=''
      },(result:any)=>{

      })


    } else {
      this.formIncompleteMessage=true
    }
  }

  

}
