import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// 3rd modules
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import AppConstant from '../../../app.constant';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import * as _config from '../../../../config.json';

let config = (_config as any);

@Injectable()
export class AuthService {
  private _currentUser;
  private _userToken;
  public currentUser$: Subject<any> = new Subject<any>();
  public showLoading$: Subject<boolean> = new Subject<boolean>();
  private _refreshSubscription: Subscription;

  constructor(private _http: HttpClient,
              private _router: Router,
              private localStorageService: LocalStorageService) {
  }

  get currentUser(): any {

    if (this._currentUser && this._currentUser.id) {

      return this._currentUser;
    }

    this._currentUser = this.localStorageService.get('userInfo');

    if (!this._currentUser) {
      this._currentUser = null;

    }
    return this._currentUser;
  }

  set currentUser(info) {
    this._currentUser = info;
    this.currentUser$.next(info);
    this.localStorageService.set('userInfo', info);
  }

  get userToken() {
    if (this._userToken && this._userToken.accessToken) {
      return this._userToken;
    }

    this._userToken = this.localStorageService.get('userToken');

    if (!this._userToken) {
      this._userToken = {};
    }
    return this._userToken;
  }

  set userToken(token) {
    this._userToken = token;
    this.localStorageService.set('userToken', token);
    this.localStorageService.set('logged-time', new Date().toISOString());
  }

  /**
   * setToken
   */
  public setToken(userToken?): void {
    if (!userToken) {
      this.clear();
    } else {
      this.userToken = userToken;
    }
  }

  /**
   * get token
   */
  public getToken() {
    let userToken = this.localStorageService.get('userToken') as any;
    if (userToken) {
      return userToken.accessToken;
    }

    return '';
  }

  get isAuthenticated(): boolean {
    return !!this.localStorageService.get('userToken') as any;
  }

  /**
   * fillInfo
   * @param obj
   */
  public updateUserInfo(obj: any): void {
    this.currentUser = Object.assign(this.currentUser, obj);
  }

  /**
   * clearInfo
   */
  public clear(): void {
    this.userToken = {};
    this.currentUser = null;
    this.localStorageService.remove('userInfo');
    this.localStorageService.remove('userToken');
    if (this._refreshSubscription) {
      this._refreshSubscription.unsubscribe();
    }
  }

  public login(email: string, password: string): Observable<any> {
    return this._http.post(`${AppConstant.domain}${config.site.apiUrl.login}`, {
      Email: email,
      Password: password
    });
  }

  public signup(model: { Email: string, Password: string }): Observable<any> {
    return this._http.post(`${AppConstant.domain}${config.site.apiUrl.register}`, model, {
      headers: {
        "ZUMO-API-VERSION": "2.0.0"
      }
    });
  }

  public logout(): any {
    return new Promise((resolve, reject) => {
      let gapi = (window as any).gapi;
      this.clear();
      if (!gapi || !gapi.auth2) {
        resolve();
        return;
      }
      if (!gapi || !gapi.auth2) {
        resolve();
        return;
      }
      let inst = gapi.auth2.getAuthInstance();
      inst.signOut().then(() => {
        resolve();
      }, () => {
        resolve();
      });
      inst.disconnect();
    });
  }

  /**
   * get user info
   */
  public getUserInfo() {
    let userToken = this.localStorageService.get('userToken') as any;
    if (userToken) {
      return userToken.userInfo;
    }
    return null;
  }

  public exchangeExpiredAccessToken() {
    // return this.accountService.apiAccountsRefreshTokenPost({
    //   refreshToken: this.userToken.refreshToken
    // });
  }
}
