import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { RestApiConnectorService } from 'src/app/utility/services/restapi-connector.service';


@Injectable()
export class HomeService implements Resolve<any>  {
  data: any;
  message: any;
  onDataChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onMessageChanged: BehaviorSubject<any> = new BehaviorSubject({});
  storeId: any;
  _classUrl = "apis/item/";

  constructor(
    private http: HttpClient,
    private restApiConnector: RestApiConnectorService,
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

add(data:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.restApiConnector
      .post(this._classUrl + "add", data)
      .subscribe((response: any) => {
        this.message = response;
        this.onMessageChanged.next(this.message);
        resolve(response);
      }, reject);
  });
}
getStore(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.restApiConnector
      .get("apis/store/" + "getAllIdAndName")
      .subscribe((response: any) => {
        this.message = response;
        this.onMessageChanged.next(this.message);
        resolve(response);
      }, reject);
  });
}
}
