import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { SharedModule } from '../utility/modules/shared.module';

@NgModule({
  exports: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
