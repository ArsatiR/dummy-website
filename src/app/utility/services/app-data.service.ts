
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/**
 * Service provide check valid current user access token, control in app data for user profile and saved current user profile data such as :
 * - User general information
 * - User Access Token
 * - User Menu
 */
@Injectable()
export class AppDataService {

    /**
     * Use for standardize object key for user information that saved in localstorage.
     */
    private _userInfo = 'userInfo';
    /**
    * Use for standardize object key for access token that saved in cookies service.
    */
    private _accessToken = 'accessToken';
    /**
    * Use for standardize object key for user menu that saved in localstorage.
    */
    private _userMenu = 'userMenu';

    /**
     * Called first time before the ngOnInit()
     * @param cookieService service provide cookies service for stored and retrieve any data from web cookies
     */
    constructor(protected cookieService: CookieService) {

    }

    /**
     * Set user menu to localstorage
     * @param userMenu user menu object to set.
     */
    async setUserMenu(userMenu): Promise<void>{
        await localStorage.setItem(this._userMenu, JSON.stringify(userMenu));
    }

    /**
     * Set user info to localstorage
     * @param userInfo user information object to set.
     */
    async setUserInfo(userInfo): Promise<void>{
        await localStorage.setItem(this._userInfo, JSON.stringify(userInfo));
    }

    /**
     * Set access token and expired countdown time for access token in cookies.
     * @param accessToken access token to set in cookies as a keys
     * @param expiresIn The default validity (in seconds) of the access token / expired countdown for the access token as a values from cookies.
     */
    setAccessToken(accessToken, expiresIn){
        this.cookieService.set(this._accessToken, accessToken, expiresIn, '/');
    }

    /**
     * get / retrieve user info from localstorage with promise object data type (Represents the completion of an asynchronous operation)
     */
    async getUserInfoWithPromise(): Promise<any>{
        const userInfo = JSON.parse(localStorage.getItem(this._userInfo));
        return userInfo;
    }

    /**
     * get / retrieve user info from localstorage.
     */
    getUserInfoWithoutPromise(){
        const userInfo = JSON.parse(localStorage.getItem(this._userInfo));
        return userInfo;
    }

    /**
    * get / retrieve user menu from localstorage.
    */
    getUserMenuWithoutPromise(){
        const userMenu = JSON.parse(localStorage.getItem(this._userMenu));
        return userMenu;
    }

    /**
    * get / retrieve user menu from localstorage.
    */
    getAccessToken(){
        return this.cookieService.get(this._accessToken);
    }

    /**
     * Remove all object data in local storage.
     */
    removeAllSessionObjectData(){
        localStorage.clear();
    }

    /**
     * Remove access token data in cookies.
     */
    removeAllSessionCookiesData(){
        this.cookieService.delete(this._accessToken, '/');
    }

    /**
     * Check is token exists in cookies.
     */
    checkIsTokenExists(){
        return this.cookieService.check(this._accessToken);
    }

    /**
     * Check is user exists in cookies.
     */
    checkIsUserExists(){
        return this.cookieService.check(this._userInfo);
    }



}
