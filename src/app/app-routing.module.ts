import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent
  },
  {
    path:'order',component:OrderComponent
  },
  {
    path:'order/newOrder',component:NewOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
