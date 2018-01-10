import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { HomePage } from '../home/home';
import { MywebthreeProvider } from '../../providers/mywebthree/mywebthree';
import * as Web3 from 'web3';
import * as ethers from "ethers";
import * as Tx from 'ethereumjs-tx';
import { PopoverController } from 'ionic-angular';
import { MypopverPage } from '../mypopver/mypopver';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the UserhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({  
  selector: 'page-userhome',
  templateUrl: 'userhome.html',
})
export class UserhomePage {

  web3;
 
  myaddress:any;
  userdata:any = [];
  loadController:any;

  @ViewChild('popoverContent', { read: MypopverPage }) content: MypopverPage;
  @ViewChild('popoverText', { read: MypopverPage }) text: MypopverPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cryptoProvider:CryptoProvider,
    public myweb:MywebthreeProvider,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public toastCtrl:ToastController,
    public loadCtrl:LoadingController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserhomePage');
    
  }

  ionViewWillEnter(){
    let auth = this.cryptoProvider.retrieveFromLocal("P2PINSURANCESavedAuthentication");
    if(auth == "" || auth == null || auth == "NO" || !auth || auth == undefined){
      this.navCtrl.setRoot(HomePage);
    }else{
      this.loadDataForUser();
    }
    let address = this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
    this.myaddress = address;
    let privatekey = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
    console.log("address,privatekey",address,privatekey);

    // this.loadContract();
    this.myweb.getPeerCounts();
  }

  loadContract(){
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(Web3.currentProvider);
    } else {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://139.59.213.205:7007"));
    }
    var flag = true;
    var iter = 0;
    let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
    let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
      
    var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
    const abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimApprovers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Peers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Claim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Claims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Settled","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LastClaimed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"claiming_user","type":"address"}],"name":"getClaimAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"approval_address","type":"address"}],"name":"ApproveAtomic","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"claiming_user","type":"address"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reimbursing_address","type":"address"},{"indexed":false,"name":"claim_amount","type":"uint256"}],"name":"Reimbursed","type":"event"}];
    var contract =   this.web3.eth.contract(abi).at(cont_address);
    while (flag){
      console.log("flagwhlle1",flag)
      if (contract.Peers(iter) == "0x") {
        flag = false;
        console.log("flagfalse",flag)
      }
      else{
        iter++;
        console.log("flagitr",flag,iter)
      }
      console.log("flagwhlle",flag)
    }

    console.info(JSON.stringify({
      peer:iter,
      add_bal:this.web3.fromWei(this.web3.eth.getBalance(addressLocal)) + ' ethers',
      total:this.web3.fromWei(contract.totalFund()) + ' ethers',
      premium:this.web3.fromWei(contract.Balance(addressLocal)) + ' ethers',
      claim:this.web3.fromWei(contract.getClaimAmount(addressLocal)) + ' ethers',
      claim_status:contract.Claims(addressLocal),
      claim_approvers:contract.ClaimApprovers(addressLocal),
      claim_votes:contract.ClaimVotes(addressLocal)
    }))
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
 
  loadDataForUser(){
    let web3 = this.myweb.reinit();
    // console.log("connected "+ web3.isConnected()+" ",web3);

    this.myweb.loadHomeDataForUser() 
    .then(
      d=>{
        console.log(d)
        let dt = JSON.parse(JSON.stringify(d));
        if(dt.status == "ok"){
          this.userdata = dt.data;
        }else{
          console.log("No data");
        }
      },
      e=>{
        // console.log(e)
      }
    )
    .catch(
      e=>{
        // console.log(e)
      }
    );
  }

  claimd(){
    let confirm = this.alertCtrl.create({
      title: 'Claim',
      message: 'Sure want to claim for disability?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // console.log('Disagree clicked');
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
            this.myweb.claimsForDisability()
            .then(
              d=>{
                this.loadController.dismiss();
                console.info(d)
                let dt = JSON.parse(JSON.stringify(d));
                if(dt.status == "ok"){
                  let alert = this.alertCtrl.create({
                    title: 'Claim for disability',
                    subTitle: dt.message,
                    buttons: ['Fine']
                  });
                  alert.present();
                }else{
                  let alert = this.alertCtrl.create({
                    title: 'Claim for disability',
                    subTitle: dt.message,
                    buttons: ['OK']
                  });
                  alert.present();
                }
              },
              e=>{
                this.loadController.dismiss();
                console.warn(e)
                this.toastCtrl.create({
                  message:"Claiming failed",
                  duration:1500,
                  position:'top'
                }).present();
              }
            ).catch( 
              e=>{
                this.loadController.dismiss();
                console.error(e)
                this.toastCtrl.create({
                  message:"Claiming failed",
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
}
