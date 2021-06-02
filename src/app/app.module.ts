import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { DetailModule } from './detail/detail.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './utility/modules/shared.module';

const routes: Routes = [
  {
    path: 'input',
    component: HomeComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HomeModule,
    DetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
