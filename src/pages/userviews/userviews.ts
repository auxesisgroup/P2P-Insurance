import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MywebthreeProvider } from '../../providers/mywebthree/mywebthree';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { MypopverPage } from '../mypopver/mypopver';
import { Element } from '@angular/compiler';

/**
 * Generated class for the UserviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userviews',
  templateUrl: 'userviews.html',
})
export class UserviewsPage {

  addr_list:any = [];
  loadController:any;
  @ViewChild('popoverContent', { read: MypopverPage }) content: MypopverPage;
  @ViewChild('popoverText', { read: MypopverPage }) text: MypopverPage;

  @ViewChild('elem') elem:ElementRef;

  constructor(
    public navCtrl: NavController, 
    public myweb:MywebthreeProvider,
    public navParams: NavParams,
    public cryptoProvider:CryptoProvider,
    public toastCtrl:ToastController,
    public viewCtrl:ViewController,
    public loadCtrl:LoadingController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserviewsPage');
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
    this.myweb.letDataForClaims()
    .then(
      d=>{
        console.log(d);
        let dt = JSON.parse(JSON.stringify(d));
        if(dt.status=="ok"){
          this.addr_list = dt.data.addr_list;
          let i = 0;
          let arr = [];let arr2 = this.addr_list;
          arr2.forEach((value,key) => {
            console.log(value,key)
            i = i+1;
            arr.push({
              rowid:i,
              Address:value.Address,
              Amount:value.Amount,
              Peer:value.Peer,
              TotalFund:value.TotalFund,
              approve:value.apporve,
              status:value.status,
              votes:value.votes
            })
          });
          this.addr_list = arr;
          console.log(this.addr_list)
        }else{
 
        }
      },
      e=>{
        console.log(e)
      }
    );
    // let web3 = this.myweb.reinit();
    // let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
    //   let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
    //   // console.log(addressLocal,pkeyLocal)
    //   if(addressLocal == "" || addressLocal == null || pkeyLocal == "" || pkeyLocal == null){
    //     // reject({status:"failed"})
    //   }else{
    //     var bal = web3.fromWei(web3.eth.getBalance(addressLocal))
    //     var flag = true;
    //     var counter = 1;
    //     let contract = this.myweb.forClaimContract();
    //     var addr_list = [];
        
    //     // var contractll = new web3.eth.Contract(contract, "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC");
    //     // console.log(contractll,contractll.methods)
    //     console.log(contract) 
    //     do{              
    //       console.log("asdasdafs",contract.Peers(2));
    //       // console.log("1",flag,counter,addr_list,contract.Peers(counter))
    //       if(contract.Peers(counter) == "0x"){
    //         console.log(flag)
    //         flag =false;
    //       }
    //       else{
    //         addr_list.push(contract.Peers(counter));
    //         counter++;
    //         console.log(flag,counter,addr_list)
    //       }
    //       console.log("2",flag,counter,addr_list)
    //     }while(flag);
    //     console.log(addr_list)
    //     console.log({
    //       status:"ok",message:"retrieved",
    //       data:{
    //         bal:bal,
    //         addr_list:addr_list
    //       }
    //     });
    //   }
  }

  approve(c){
    console.log(c)
    let confirm = this.alertCtrl.create({
      title: 'Approve',
      message: 'Sure want to apporve?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.loadController = this.loadCtrl.create({
              content:"Loading...",
              duration:1500
            });
            this.loadController.present();
            this.myweb.approveClaims(c)
            .then(
              d=>{
                this.loadController.dismiss();
                console.info(d);
                this.toastCtrl.create({
                  message:"Claimed approved",
                  duration:1500,
                  position:'middle'
                }).present();
              },
              e=>{
                this.loadController.dismiss();
                console.warn(e)
                this.toastCtrl.create({
                  message:"Claimed failed approved",
                  duration:1500,
                  position:'top'
                }).present();
              }
            ).catch(
              e=>{
                this.loadController.dismiss();
                console.error(e)
                this.toastCtrl.create({
                  message:"Claimed failed approved",
                  duration:1500,
                  position:'top'
                }).present();
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

  dofun(c){
    console.log(c)
    let id=c.rowid;
    console.log(id)
  }
}
