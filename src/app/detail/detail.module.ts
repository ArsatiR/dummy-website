import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { SharedModule } from '../utility/modules/shared.module';
import { DetailService } from './detail.service';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component';

@NgModule({
  exports: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
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
