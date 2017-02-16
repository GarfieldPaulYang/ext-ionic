import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { isPresent } from '../utils/util';

export const REGISTAR_KEY: string = '__registerKey__';

@Injectable()
export class RegistarProvider {
  private dict: any = {};

  register(obj: any) {
    if (!this.isRegistar(obj)) {
      return;
    }
    this.dict[obj[REGISTAR_KEY]] = obj;
  }

  unregister(obj: any) {
    if (!this.isRegistar(obj)) {
      return;
    }
    delete this.dict[obj[REGISTAR_KEY]];
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
    return isPresent(obj) && _.has(obj, REGISTAR_KEY);
  }
}