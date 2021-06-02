import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { AppDataService } from './app-data.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataManipulateService } from './data-manipulate-service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


/**
 * Core Service for RESTFUL API ,
 * Provide all http method function for connect to backend API / services.
 * Use for all services that required access to backend API / Services and maintan their access.
 */
@Injectable()
export class RestApiConnectorService {

    /**
     * Access token key identifier
     */
    protected _accessToken = 'accessToken';

    /**
     * IP backend API / Services
     */

    protected ip: string = "https://affiliatemarketplace.herokuapp.com/";


    /**
     * Contains current user access token value.
     */
    public accessToken = '';

    /**
     * File upload management backend API / Services url.
     */
    protected fileUploadManagement = 'file/upload';

    /**
     * Backend API client id identifier
     */
    protected clientId = '';

    /**
     * Backend API client secret identifier
     */
    protected clientSecret = '';

    /**
     * Flagging date query convert to UTC / GMT + 0 or not.
     */
    protected isUTCDateTimeQuery = true;

    /**
     *
     * @param manipulateService Service provide process / manipulate data for facilitate other services.
     * @param snackBar Service to dispatch Material Design snack bar messages.
     * @param cookieService service provide cookies service for stored and retrieve any data from web cookies.
     * @param appService Service provide check valid current user access token, control in app data for user profile and saved current user profile data.
     * @param http Performs http requests using XMLHttpRequest as the default backend.
     */
    constructor(protected manipulateService: DataManipulateService, protected snackBar: MatSnackBar,
        protected cookieService: CookieService, protected appService: AppDataService, protected http: Http){

    }

    /**
     * Get current Backend / API base url
     * @param partUrl
     */
    getUrl(partUrl: string){
        return this.ip + partUrl;
    }

    /**
     * Check access token is exists and assign when is expired / not exists
     */
    // protected checkAndAssignAccessToken(){
    //     if (this.cookieService.check(this._accessToken)) {
    //         this.accessToken = 'access_token=' + this.cookieService.get(this._accessToken);
    //     }
    // }

    /**
     * Set header param type
     */
    protected setHeadersParam(): Headers {
        const headersConfig = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        return new Headers(headersConfig);
    }

    /**
     * Set form data headers.
     */
    protected setHeadersFormData(): Headers {
        const headersConfig = {
            'Content-Type': 'form-data',
            'Access-Control-Allow-Origin': '*'
        };

        return new Headers(headersConfig);
    }

    /**
     * Set headers form data and client identifiers
     */
    protected setHeadersFormDataWithClientIdentifier(): Headers {
        const headersConfig = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        };
        // console.log(headersConfig);
        return new Headers(headersConfig);
    }

    /**
     * Set default headers
     */
    protected setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        return new Headers(headersConfig);
    }



    // observable return errors
    protected formatErrors(error: any) {
        return Observable.throw(
            error.json()
        );
    }

    /**
     * Error handler from server / services
     * @param error error object data
     */
    protected errHandler(error: any): void {
        console.log(error);
        this.snackBar.open('Oops.. Tidak dapat terhubung ke server, mohon mencoba kembali.', 'Ok', {
            verticalPosition: 'top',
            duration: 5000
        });
    }

    // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

    /**
     * Performs a request with get http method and access token to current backend API.
     * @param path base service path
     * @param extraParam extra query param string
     */
    get(path: string, extraParam = ''): Observable<any> {
        const a = this.ip;
        // this.checkAndAssignAccessToken();

        if (this.isUTCDateTimeQuery && extraParam !== '' && (extraParam.indexOf('dateStart') !== -1 || extraParam.indexOf('dateEnd') !== -1)) {
            extraParam = this.manipulateService.proccessDateQueryStringNeutralTimezone('dateStart', 'dateEnd', extraParam);
        }

        return this.http.get(`${a}${path}?` + extraParam).pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    /**
     * Performs a request with post http method and access token to current backend API.
     * @param path base service path
     * @param body request object body
     * @param paramType header param type
     * @param headersCustom custom header object (paramType must 'customHeaders')
     */
    post(path: string, body: any, paramType = 'noForm', headersCustom = {}): Observable<any> {
        const a = this.ip;
        let headers: any;
        if (paramType === 'form'){
            headers = this.setHeadersParam();
        }else if (paramType === 'clientIdentifier'){
            headers = this.setHeadersFormDataWithClientIdentifier();
        }else if (paramType === 'customHeaders') {
            headers = headersCustom;
        }
        else{
            headers = this.setHeaders();
        }

        // this.checkAndAssignAccessToken();

        let url = `${a}${path}`;


        return this.http.post(url, body, { headers: headers }).pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    /**
     * Performs a request with post http method and access token to external API / Services (API / Services other than already set).
     * @param path full API/Services path
     * @param body request object body
     * @param paramType header param type
     */
    postExternalAPI(path: string, body: any, paramType = 'noForm'): Observable<any> {
        const a = this.ip;
        let headers: any;
        if (paramType === 'form') {
            headers = this.setHeadersParam();
        } else if (paramType === 'clientIdentifier') {
            headers = this.setHeadersFormDataWithClientIdentifier();
        }
        else {
            headers = this.setHeaders();
        }

        return this.http.post(path, body, { headers: headers }).pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    /**
     * Performs a request with get http method, promise method (Represents the completion of an asynchronous operation) and access token to current backend API.
     * @param path base service path
     * @param extraParam extra query param string
     */
    async getWithPromise(path: string, extraParam = ''): Promise <any> {
        const a = this.ip;
        // this.checkAndAssignAccessToken();

        if (this.isUTCDateTimeQuery && extraParam !== '' && (extraParam.indexOf('dateStart') !== -1 || extraParam.indexOf('dateEnd') !== -1)) {
            extraParam = this.manipulateService.proccessDateQueryStringNeutralTimezone('dateStart', 'dateEnd', extraParam);
        }

        const response = await this.http.get(`${a}${path}?` + extraParam)
                       .toPromise();
        if(response['_body']=="") response['_body']='[]'
        return response.json();
    }

    /**
     * Performs a request with get http method, promise method (Represents the completion of an asynchronous operation) and access token to current backend API.
     * @param path base service path
     * @param extraParam extra query param string
     */
     async getFileWithPromise(path: string, extraParam = ''): Promise <any> {
        const a = this.ip;
        // this.checkAndAssignAccessToken();

        if (this.isUTCDateTimeQuery && extraParam !== '' && (extraParam.indexOf('dateStart') !== -1 || extraParam.indexOf('dateEnd') !== -1)) {
            extraParam = this.manipulateService.proccessDateQueryStringNeutralTimezone('dateStart', 'dateEnd', extraParam);
        }

        const response = await this.http.get(`${a}${path}?` + extraParam, {
            responseType : ResponseContentType.Blob,
        })
                    .toPromise();
        if(response['_body']=="") response['_body']='[]'
        return response.blob();
    }

    /**
     * Performs a request with post http method, promise method (Represents the completion of an asynchronous operation) and access token to current backend API.
     * @param path base service path
     * @param body request object body
     * @param paramType header param type
     */
    async postWithPromise(path: string, body: any, paramType = 'noForm'): Promise<any> {
        const a = this.ip;
        let headers: any;
        if (paramType === 'form') {
            headers = this.setHeadersParam();
        } else if (paramType === 'clientIdentifier') {
            headers = this.setHeadersFormDataWithClientIdentifier();
        }
        else {
            headers = this.setHeaders();
        }

        // this.checkAndAssignAccessToken();

        let url = `${a}${path}`;

        const response = await this.http.post(url, body, { headers: headers }).toPromise();
        return response.json();
    }

    /**
     * Performs a request with put http method and access token to current backend API.
     * @param path base service path
     * @param body request object body
     * @param paramType header param type
     */
    put(path: string, body: Object = {}, paramType = 'noForm'): Observable<any> {
        const a = this.ip;
        let headers: any;
        if (paramType === 'form') {
            headers = this.setHeadersParam();
        } else if (paramType === 'clientIdentifier') {
            headers = this.setHeadersFormDataWithClientIdentifier();
        }
        else {
            headers = this.setHeaders();
        }

        // this.checkAndAssignAccessToken();

        let url = `${a}${path}`;


        return this.http.put(url, body, { headers: headers }).pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    /**
     * Performs a request with delete http method and access token to current backend API.
     * @param path base service path
     * @param extraParam extra query param string
     */
    delete(path: string, extraParam= ''): Observable<any> {
        const a = this.ip;

        // this.checkAndAssignAccessToken();

        return this.http.delete(`${a}${path}?` + extraParam).pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    /**
     * Performs a request with get http method and access token to current backend API with callback response.
     * @param items extra headers data
     * @param url base service url / path
     * @param extraParam extra query param string
     * @param alert alert object for handle response
     * @param callback callback function
     */
    httpGetCallback(items, url, extraParam, alert, callback: (n: any) => void) {
        // this.checkAndAssignAccessToken();

        if (this.isUTCDateTimeQuery && extraParam !== '' && (extraParam.indexOf('dateStart') !== -1 || extraParam.indexOf('dateEnd') !== -1)) {
            extraParam = this.manipulateService.proccessDateQueryStringNeutralTimezone('dateStart', 'dateEnd', extraParam);
        }

        this.http.get(this.ip + url + '?' + extraParam, items)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
            .subscribe(
            tt => {
                callback(tt);
            },
            error => {
                console.log(error);
            });
    }

    /**
     * Insert file / image data with callback responses
     * @param event upload event contains file information data.
     * @param type upload data type.
     * @param callback callback function
     */
    insertFileWithCallback(event, type, callback: (n: any) => void) {
        const fileList: FileList = event.target.files;
        // this.checkAndAssignAccessToken();

        if (fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();

            formData.append('type', type);
            formData.append('file', file, file.name);

            const headers = new Headers({ 'Content-Type': 'form-data' });
            const options = new RequestOptions({ headers: this.setHeadersFormData() });

            this.http.post(this.ip + this.fileUploadManagement , formData)
            .pipe(
              retry(1),
              catchError(this.handleError)
            )
                .subscribe(
                result => {
                    callback(result);
                    return result;
                },
                error => console.log(error)
                );
        }
    }

}
