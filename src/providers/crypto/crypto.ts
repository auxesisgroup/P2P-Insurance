import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import CryptoJS from 'crypto-js';
import sha512 from 'js-sha512';
/*
  Generated class for the CryptoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CryptoProvider {

  constructor(
    public http: Http,
    public localStore:LocalStorageService,
    public sessionStore:SessionStorageService
  ) {
    console.log('Hello CryptoProvider Provider');
  }

  saveTokenAuth(){
    let str = "P2PINSURANCETOKEN";
    let makestr = "P2PINSURANCETOKEN";
    let token = sha512(makestr);
    this.localStore.store("P2PINSURANCETOKENHANDLER",token);
    // console.log(token)
    let storeStr = (CryptoJS.AES.encrypt(str,token)).toString();
    // console.log(storeStr)
    this.localStore.store(str,storeStr);
  }

  retrieveTokenAuth(){
    let token = this.localStore.retrieve("P2PINSURANCETOKENHANDLER");
    let fromStorage = this.localStore.retrieve("P2PINSURANCETOKEN");
    //console.log(fromStorage) 
    if(fromStorage == "" || fromStorage == null){
      return "";
    }else{
      let getDecrypt = CryptoJS.AES.decrypt(fromStorage,token);
      let finalStr = "";
      finalStr = getDecrypt.toString(CryptoJS.enc.Utf8);
      // console.log(finalStr);
      return finalStr;
    }
  }

  saveToLocal(name,str){
    let token = this.localStore.retrieve("P2PINSURANCETOKENHANDLER");
    //console.log(token)
    let storeStr = (CryptoJS.AES.encrypt(str,token)).toString();
    //console.log(storeStr)
    this.localStore.store(name,storeStr);
  }

  retrieveFromLocal(name):any{
    let token = this.localStore.retrieve("P2PINSURANCETOKENHANDLER");
    let fromStorage = this.localStore.retrieve(name);
    //console.log(fromStorage)
    if(fromStorage == "" || fromStorage == null){
      return "";
    }else{
      let getDecrypt = CryptoJS.AES.decrypt(fromStorage,token);
      let finalStr = "";
      finalStr = getDecrypt.toString(CryptoJS.enc.Utf8);
      return finalStr;
    }
  }
}
