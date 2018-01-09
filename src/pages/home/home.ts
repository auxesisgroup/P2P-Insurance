import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AdminPage } from '../admin/admin';
import { UserloginPage } from '../userlogin/userlogin';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { UserhomePage } from '../userhome/userhome';
import { UsertabPage } from '../usertab/usertab';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public cryptoProvider:CryptoProvider
  ) {

  }

  ionViewDidLoad(){

    let auth = this.cryptoProvider.retrieveFromLocal("P2PINSURANCESavedAuthentication");
    if(auth == "" || auth == null || auth == "NO" || !auth || auth == undefined){

    }else{
      this.navCtrl.setRoot(UsertabPage);
    } 
  }

  admin(){
    // this.navCtrl.setRoot(AdminPage,{});
    this.navCtrl.push(AdminPage,{});
  }

  user(){
    this.navCtrl.setRoot(UserloginPage,{});
  }

}
