import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { DetailModule } from './detail/detail.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './utility/modules/shared.module';
import { AppDataService } from './utility/services/app-data.service';
import { DataManipulateService } from './utility/services/data-manipulate-service';
import { FrequentDataService } from './utility/services/frequent-data.service';
import { RestApiConnectorService } from './utility/services/restapi-connector.service';

const routes: Routes = [
  {
    path: 'input',
    component: HomeComponent
  },
  {
    path: 'detail/:storeId/:itemId/:referralCode',
    component: DetailComponent
  },
  {
    path: 'detail/:storeId/:itemId',
    component: DetailComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HomeModule,
    DetailModule,
    HttpClientModule,
    HttpModule,

  ],
  providers: [
    RestApiConnectorService,
    AppDataService,
    FrequentDataService,
    DataManipulateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
