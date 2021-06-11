import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { RestApiConnectorService } from 'src/app/utility/services/restapi-connector.service';
import { AppDataService } from 'src/app/utility/services/app-data.service';

@Injectable()
export class DetailService implements Resolve<any>  {
  data: any;
  message: any;
  onDataChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onMessageChanged: BehaviorSubject<any> = new BehaviorSubject({});
  storeId: any;
  _classUrl = "apis/item/";

  constructor(
    private http: HttpClient,
    private restApiConnector: RestApiConnectorService,
    private appDataService: AppDataService
  ) { }

/**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
 resolve(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> | Promise<any> | any {
  return new Promise<void>((resolve, reject) => {
    Promise.all([]).then(() => {
      resolve();
    }, reject);
  });
}

checkPeripheralLink(peripheralLink:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.restApiConnector
      .get("apis/peripheral/" + "checkPeripheralLink", '&peripheralLink=' + peripheralLink)
      .subscribe((response: any) => {
        this.message = response;
        this.onMessageChanged.next(this.message);
        resolve(response);
      }, reject);
  });
}
getById(itemId:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.restApiConnector
      .get(this._classUrl + "getById", '&id=' + itemId)
      .subscribe((response: any) => {
        this.message = response;
        this.onMessageChanged.next(this.message);
        resolve(response);
      }, reject);
  });
}
checkRecurringByCustId(custId:any, itemId:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.restApiConnector
      .getString("apis/commission/" + "checkRecurringByCustId", '&customerId=' + custId + '&itemId=' + itemId)
      .subscribe((response: any) => {
        this.message = response;
        this.onMessageChanged.next(this.message);
        resolve(response);
      }, reject);
  });
}
buyItem(data:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.restApiConnector
      .post("apis/commission/" + "add", data)
      .subscribe((response: any) => {
        this.message = response;
        this.onMessageChanged.next(this.message);
        resolve(response);
      }, reject);
  });
}
calculateQty(data:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.restApiConnector
      .post("apis/commission/" + "calculateQty", data)
      .subscribe((response: any) => {
        this.message = response;
        this.onMessageChanged.next(this.message);
        resolve(response);
      }, reject);
  });
}


}
