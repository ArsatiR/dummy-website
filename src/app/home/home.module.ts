import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../utility/modules/shared.module';
import { HomeService } from './home.service';

@NgModule({
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

  ],
  declarations: [HomeComponent],
  providers:[
    HomeService
  ]
})
export class HomeModule { }
