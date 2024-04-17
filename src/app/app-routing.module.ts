import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { CustomerComponent } from './customer/customer.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {
  //   path:'',component:HomeComponent
  // },
  {
    path:'',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'order',component:OrderComponent
  },
  {
    path:'order/newOrder',component:NewOrderComponent
  },
  {
    path:'order/update-order/:id',component:UpdateOrderComponent
  }
  // ,
  // {
  //   path:'**',component:UpdateOrderComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
