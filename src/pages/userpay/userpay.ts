import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MywebthreeProvider } from '../../providers/mywebthree/mywebthree';

import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { MypopverPage } from '../mypopver/mypopver';
/**
 * Generated class for the UserpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userpay',
  templateUrl: 'userpay.html',
})
export class UserpayPage {
  
  userdatabal:any;t_balance:any;
  amount:any;
  loadController:any;

  @ViewChild('popoverContent', { read: MypopverPage }) content: MypopverPage;
  @ViewChild('popoverText', { read: MypopverPage }) text: MypopverPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public myweb:MywebthreeProvider,
    public toastCtrl:ToastController,
    public viewCtrl:ViewController,
    public loadCtrl:LoadingController,
    public popoverCtrl: PopoverController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserpayPage');
    
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(MypopverPage, {
      contentEle: this.content,
      textEle: this.text
    });
    popover.present({
      ev: ev
    });
  }

  ionViewWillEnter(){
    this.loadPay();
  }

  loadPay(){
    this.myweb.getPayBalance()
    .then(
      d=>{
        console.log(d)
        let dt = JSON.parse(JSON.stringify(d));
        if(dt.status=="ok"){
          this.userdatabal = dt.data.balance;
          this.t_balance = dt.data.t_balance;
           
        }
        else{
          console.log("failed")
        }
      },
      e=>{
        console.log(e)
      }
    )
    .catch(
      e=>{
        console.log(e)
      }
    );
  }

  submit(){
    if(this.amount == "" || this.amount == null || this.amount == 0 || this.amount == "0"){
      this.toastCtrl.create({
        message:"Specific amount is required",
        duration:1500,
        position:'top'
      }).present();
    }else{
      this.loadController = this.loadCtrl.create({
        content:"Loading...",
        duration:1500
      });
      this.loadController.present();
      console.log(this.amount,this.t_balance)
      this.myweb.payPremium(this.amount,this.t_balance)
      .then(
        d=>{
          this.loadController.dismiss();
          console.log(d)
          let dt = JSON.parse(JSON.stringify(d));
          if(dt.status == "ok"){
            let amnt = this.amount;
            this.toastCtrl.create({
              message:"Amount "+amnt+" payed",
              duration:1500,
              position:'middle'
            }).present();
            this.amount = "";
            // this.loadPay();
            setTimeout(()=>{
              this.loadPay();
            },1000)
            
          }else{
            this.amount = "";
            this.toastCtrl.create({
              message:dt.message,
              duration:1500,
              position:'top'
            }).present();
          }
        },
        e=>{
          this.loadController.dismiss();
          console.log(e)
          this.toastCtrl.create({
            message:"Amount to pay failed",
            duration:1500,
            position:'top'
          }).present();
        }
      )
      .catch(
        e=>{
          this.loadController.dismiss();
          console.log(e)
          this.toastCtrl.create({
            message:"Amount to pay failed",
            duration:1500,
            position:'top'
          }).present();
        }
      )
    }
  }

}
