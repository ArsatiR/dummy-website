import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../utility/modules/shared.module';

@NgModule({
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
