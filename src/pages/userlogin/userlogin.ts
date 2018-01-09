import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminPage } from '../admin/admin';

import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { MywebthreeProvider } from '../../providers/mywebthree/mywebthree';
import { CryptoProvider } from '../../providers/crypto/crypto';
/**
 * Generated class for the UserloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import * as Web3 from 'web3';
import * as ethers from "ethers";
import * as Tx from 'ethereumjs-tx';
import { UserhomePage } from '../userhome/userhome';
import { UsertabPage } from '../usertab/usertab';
var web3;

@IonicPage()
@Component({
  selector: 'page-userlogin',
  templateUrl: 'userlogin.html',
})
export class UserloginPage {

  address:any;
  privatekey:any;
  loadController:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public viewCtrl:ViewController,
    public myweb:MywebthreeProvider,
    public loadCtrl:LoadingController,
    public cryptoProvider:CryptoProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserloginPage');

    // console.log(this.myweb);

    

  }

  ionViewWillEnter(){
    console.log("i printed ");
    let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
    let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");

    if(addressLocal == "" || addressLocal == null || pkeyLocal == "" || pkeyLocal == null){
      console.log("dont append")
    }else{
      this.address = addressLocal;
      this.privatekey = pkeyLocal;
    }
  }

  auth(){
    this.navCtrl.push(AdminPage,{});
  }

  submit(){
    if( this.address == "" || this.address == null ){
      this.toastCtrl.create({
        message:"Address is required",
        duration:1500,
        position:'top'
      }).present();
    }else if( this.privatekey == "" || this.privatekey == null ){
      this.toastCtrl.create({
        message:"Private key is required",
        duration:1500,
        position:'top'
      }).present();
    }else{
      this.loadController = this.loadCtrl.create({
        content:"Loading...",
        duration:1500
      });
      this.loadController.present();
      this.myweb.letmein(this.address,this.privatekey)
      .then(
        d=>{
          this.loadController.dismiss();
          console.log(d)
          let dt = JSON.parse(JSON.stringify(d));
          if(dt.status=="ok"){
            //transfer
            this.cryptoProvider.saveToLocal("P2PINSURANCESavedAuthentication","YES");
            let auth = this.cryptoProvider.retrieveFromLocal("P2PINSURANCESavedAuthentication");
            this.navCtrl.setRoot(UsertabPage,{"auth":auth});
            // this.myweb.loadHomeDataForUser() 
            // .then(
            //   d=>{
            //     console.log(d)
            //   },
            //   e=>{
            //     console.log(e)
            //   }
            // )
            // .catch(
            //   e=>{
            //     console.log(e)
            //   }
            // );
          }else{
            this.toastCtrl.create({
              message:"Login failed!",duration:1500,position:'top'
            }).present();  
          }
        },
        e=>{
          this.loadController.dismiss();
          this.toastCtrl.create({
            message:"Login failed!",duration:1500,position:'top'
          }).present();
        }
      ).catch(
        e=>{
          this.loadController.dismiss();
          this.toastCtrl.create({
            message:"Login failed",duration:1500,position:'top'
          }).present();
        }
      );
    }
  }

}
