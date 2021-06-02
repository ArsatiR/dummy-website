import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';


@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
    exports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
    declarations: [],
    providers: [],
})
export class SharedModule { }
