import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { isPresent } from '../utils/util';

export interface Registar {
  __registerKey__: string;
}

@Injectable()
export class RegistarProvider {
  private dict: any = {};

  register(obj: any) {
    if (!this.isRegistar(obj)) {
      return;
    }
    this.dict[obj.__registerKey__] = obj;
  }

  unregister(obj: any) {
    if (!this.isRegistar(obj)) {
      return;
    }
    delete this.dict[obj.__registerKey__];
  }

  registers(objs: Array<any>) {
    if (!isPresent(objs)) {
      return;
    }
    objs.forEach(obj => this.register(obj));
  }

  unregisters(objs: Array<any>) {
    if (!isPresent(objs)) {
      return;
    }
    objs.forEach(obj => this.unregister(obj));
  }

  get(key: string): any {
    return this.dict[key];
  }

  private isRegistar(obj: any): boolean {
    return _.has(obj, '__registerKey__');
  }
}