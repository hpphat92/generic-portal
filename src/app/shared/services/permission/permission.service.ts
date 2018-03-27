import { Compiler, Injectable, Injector, NgModuleFactoryLoader, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '@angular/router/src/config';
import { UrlSerializer } from '@angular/router/src/url_tree';
import { ChildrenOutletContexts } from '@angular/router/src/router_outlet_context';
import { getMatAutocompleteMissingPanelError } from '@angular/material';


type RoleDescription = string | string[];

export class RoleObject {
  public include?: RoleDescription;
  public exclude?: RoleDescription;
  public all?: RoleDescription;
}

@Injectable()
export class PermissionService {

  public permission$: Subject<any> = new Subject<any>();
  private _permissions = [];

  get permission() {
    return this._permissions;
  }

  set permission(p) {
    this._permissions = p;
    this.permission$.next(p);
  }

  private _intersection(array1, array2) {
    array1 = array1 || [];
    array2 = array2 || [];
    return array1.filter((n) => array2.includes(n))
  }

  private _parseArray(str: RoleDescription = '') {
    let arr = str as string[];
    if ((str as string).split) {
      arr = (str as string).split(',') || [];
    }
    return arr.filter(o => o).map((o) => o.trim());
  }

  constructor() {
  }

  checkPermisison(roleObject: RoleObject) {
    let includeRoles = this._parseArray(roleObject.include);
    let excludeRoles = this._parseArray(roleObject.exclude);
    let allRoles = this._parseArray(roleObject.all);
    if (this._intersection(includeRoles, excludeRoles).length) {
      throw new Error('Invalid Input');
    }
    let errorIncludeRoles = includeRoles.length && !this._intersection(this._permissions, includeRoles).length;
    let errorExcludeRoles = this._intersection(this._permissions, excludeRoles).length;
    let errorAllRoles = this._intersection(this._permissions, allRoles).length !== allRoles.length;
    return !errorIncludeRoles && !errorExcludeRoles && !errorAllRoles;
  }

  observePermisison(roleObject) {
    return new Observable((observer) => {
      observer.next(this.checkPermisison(roleObject));
      this.permission$.subscribe((role) => {
        observer.next(this.checkPermisison(roleObject));
      });
    });
  }

}
