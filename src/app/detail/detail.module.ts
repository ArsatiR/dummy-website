import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { SharedModule } from '../utility/modules/shared.module';
import { DetailService } from './detail.service';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'detail/:storeId/:itemId/:referralCode',
    component: DetailComponent
  },
  {
    path: 'detail/:storeId/:itemId',
    component: DetailComponent
  },
]

@NgModule({
  exports: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailComponent, ConfirmPurchaseComponent],
  providers:[
    DetailService
  ],
  entryComponents:[
    ConfirmPurchaseComponent
  ]
})
export class DetailModule {


 }
