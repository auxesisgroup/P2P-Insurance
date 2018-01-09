import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { MywebthreeProvider } from '../../providers/mywebthree/mywebthree';
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import * as Web3 from 'web3';
import * as ethers from "ethers";
import * as Tx from 'ethereumjs-tx';
var web3;

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  address:any;
  amount:any;
  privatekey:any;
  loadController:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public viewCtrl:ViewController,
    public myweb:MywebthreeProvider,
    public loadCtrl:LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    // this.loadWeb3();
  }

  

  back(){
    this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(HomePage,{});
  }

  generatekeypair(){

    this.myweb.generatekeypair()
    .then(
      d=>{
        console.log(d)
        let dt = JSON.parse(JSON.stringify(d));
        if(dt.status=="ok"){
          this.address = dt.address;
          this.privatekey = dt.privatekey;
        }else{
          this.toastCtrl.create({
            message:"Amount & Private Key Not Generated",
            duration:1500,
            position:'top'
          }).present();
        }
      },
      e=>{
        console.log(e)
        this.toastCtrl.create({
          message:"Amount & Private Key Not Generated",
          duration:1500,
          position:'top'
        }).present();
      }
    )
    .catch(
      e=>{
        console.log(e)
        this.toastCtrl.create({
          message:"Amount & Private Key Not Generated",duration:1500,position:'top'
        }).present();
      }
    )
  }

  submit(){
    if( this.address == "" || this.address == null ){
      this.toastCtrl.create({
        message:"Address is required",
        duration:1500,
        position:'top'
      }).present();
    }else if( this.amount == "" || this.amount == null ){
      this.toastCtrl.create({
        message:"Amount is required",
        duration:1500,
        position:'top'
      }).present();
    }else{
      console.log(this.address,this.amount);
      this.loadController = this.loadCtrl.create({
        content:"Loading...",
        duration:1500
      });
      this.loadController.present();
      this.myweb.sendEther(this.address,this.amount)
      .then(
        d=>{
          let dt = JSON.parse(JSON.stringify(d));
          this.loadController.dismiss();
          if(dt.status == "ok"){
            this.toastCtrl.create({
              message:"Amount "+this.amount+" payed to \n "+this.address+"",
              duration:1500,
              position:'middle'
            }).present();
          }else{
            this.toastCtrl.create({
              message:"Transaction abondoned!",duration:1500,position:'top'
            }).present();
          }
        },
        e=>{
          this.loadController.dismiss();
          this.toastCtrl.create({
            message:"Transaction abondoned!",duration:1500,position:'top'
          }).present();
        }
      )
      .catch(
        e=>{
          this.loadController.dismiss();
          this.toastCtrl.create({
            message:"Transaction abondoned!",duration:1500,position:'top'
          }).present();
        }
      );
    }
  }

  
}
