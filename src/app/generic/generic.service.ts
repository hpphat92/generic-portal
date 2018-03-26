import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { AuthService } from '../shared/services/auth';

@Injectable()
export class GenericService {

  private static _config: any = [];

  public static get config() {
    return this._config;
  }

  public static set config(val) {
    this._config = val;
  }

  private static getModuleServiceName(name, postfix = 'Service') {

    return name.replace(/\b\w/g, l => l.toUpperCase()) + postfix;
  }

  constructor(public injector: Injector,
              public authService: AuthService) {

  }

  public getColumns(config, removeReadOnly?) {
    return _.filter(_.sortBy(_.toPairs(config.model), (r: any) => {
      return r[1].displayOrder;
    }), (o) => {
      if (removeReadOnly) {
        return !o[1].readOnly;
      }
      return true;
    });
  }

  private getServiceInstance(moduleName) {
    let instance = null;
    try {
      instance = this.injector.get(GenericService.getModuleServiceName(moduleName));
    } catch (e) {
      instance = this.injector.get(GenericService.getModuleServiceName(moduleName, 'sService'));
    }
    return instance;
  }

  public getInstance(moduleName) {
    let instance = this.getServiceInstance(moduleName);
    let functions = _.keysIn(instance);

    const GET_ALL = 'getall';
    const DELETE = 'delete';
    const PATCH = 'patch';
    const POST = 'post';
    const GET_DETAIL = 'get' + moduleName;
    let findingFunction = {
      getList: _.find(functions, (o) => {
        return o.toLowerCase().indexOf(GET_ALL) >= 0;
      }),
      deleteItem: _.find(functions, (o) => {
        return o.toLowerCase().indexOf(DELETE) >= 0;
      }),
      patchItem: _.find(functions, (o) => {
        return o.toLowerCase().indexOf(PATCH) >= 0;
      }),
      postItem: _.find(functions, (o) => {
        return o.toLowerCase().indexOf(POST) >= 0;
      }),
      getDetailItem: _.find(functions, (o) => {
        return o.toLowerCase().indexOf(GET_DETAIL) >= 0;
      }),
    };
    let moreArgs = ['2.0.0', `${this.authService.userToken.accessToken}`];

    function buildFunction(item) {
      return {
        [item]: (...args) => {
          let fn = instance[findingFunction[item]];
          if (fn.length - args.length - 2 > 0) {
            return fn.call(instance, ...args, ...moreArgs);
          } else {
            return fn.call(instance, ...args);
          }
        }
      }
    }

    return {
      ...buildFunction('getList'),
      ...buildFunction('deleteItem'),
      ...buildFunction('patchItem'),
      ...buildFunction('postItem'),
      ...buildFunction('getDetailItem'),
    }
  }

  public static getProvideInjectKeyFromModuleName(moduleName, postfix) {
    return `generic_${moduleName}_${postfix}`;
  }
}
