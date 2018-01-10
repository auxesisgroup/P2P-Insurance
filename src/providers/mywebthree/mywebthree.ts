import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import Web3 from 'web3';
import ethers from "ethers";
import Tx from 'ethereumjs-tx';
import EthJS from 'ethjs';
import Buffer from 'buffer';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController, Nav } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import CryptoJS from 'crypto-js';

import { CryptoProvider } from '../crypto/crypto';
import { ToastController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Element } from '@angular/compiler';
import { ElementRef } from '@angular/core';
@Injectable()
export class MywebthreeProvider {
  web3;

  @ViewChild(Nav) public nav:Nav;

  constructor(
    public http: Http,
    // public navCtrl: NavController, 
    public localStore:LocalStorageService,
    public sessionStore:SessionStorageService,
    public platform: Platform, 
    public cryptoProvider:CryptoProvider,
    public toastCtrl:ToastController,
  ) {
    console.log('Hello MywebthreeProvider Provider');
    console.log('nav ',this.nav)
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(Web3.currentProvider);
    } else {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://139.59.213.205:7007"));
    }
  }

  init(){
    console.log("init")
    
    if (!this.web3.isConnected()) {
      // do stuff as usual, even though isConnected is asynchronous
      console.warn("not "+this.web3.isConnected()+" ");
      // if (typeof this.web3 !== 'undefined') {
      //     // web3 = new Web3(web3.currentProvider);  new Web3.providers.HttpProvider
      //     // web3 = new Web3(new Web3.currentProvider);
      //     this.web3 = new Web3(Web3.currentProvider);
      // } else {
      //     // set the provider you want from Web3.providers
      //     // web3 = new Web3(new Web3.providers.HttpProvider("http://139.59.213.205:7007"));
      //     this.web3 = new Web3(new Web3.providers.HttpProvider("http://139.59.213.205:7007"));
      //     console.log(this.web3)
      // }
    }else {
      console.log("connected "+ this.web3.isConnected()+" ",this.web3);
    }
    let auth = this.cryptoProvider.retrieveTokenAuth();
    // console.log("auth",auth)
    if( auth == "" || auth == null || auth == undefined){
      this.cryptoProvider.saveTokenAuth();
      // console.log(this.cryptoProvider.retrieveTokenAuth());
    }else{
      // console.log("already created",this.cryptoProvider.retrieveTokenAuth())
    } 
  }

  getPeerCounts(){
    let pers = this.web3.eth.accounts;
    console.log("pers",pers)
    let ac = this.web3.eth;
    console.log("ac",ac) 

    // var per = this.web3.eth.net.getPeerCount();
    // per.then(
    //   d=>{
    //     console.log(d)
    //   }
    // )
    console.log("per",this.web3.net.peerCount) 
  }

  reinit(){
    return this.web3;
  }

  abiforadmin(){
    var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
    const abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimApprovers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Peers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Claim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Claims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Settled","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LastClaimed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"claiming_user","type":"address"}],"name":"getClaimAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"approval_address","type":"address"}],"name":"ApproveAtomic","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"claiming_user","type":"address"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reimbursing_address","type":"address"},{"indexed":false,"name":"claim_amount","type":"uint256"}],"name":"Reimbursed","type":"event"}];
    var contract =   this.web3.eth.contract(abi).at(cont_address);
    console.log(contract);
  }

  generatekeypair(){
    return new Promise((resolve,reject)=>{
      
      var pk_string = '';
      // this.web3 = this.reinit();
      for(let i=0;i<30;i++){
          let subtring = Math.random()
          pk_string += subtring.toString()
      } 
      console.log(this.web3)
      // alert('pk_string \n'+pk_string)
      var privatekey = this.web3.sha3(pk_string);

      // var pk = new EthJS.Buffer.Buffer(privatekey.slice(2, privatekey.length), 'hex')

      // var generated_address = EthJS.Util.privateToAddress(pk).toString("hex");
      // alert(generated_address)
      var wallet = new ethers.Wallet(privatekey);
      console.info(privatekey,wallet);

      let address = wallet.address;
      if( address==null || privatekey==null ){
        reject({status:"failed"});
      }else{
        this.cryptoProvider.saveToLocal("P2PUserAddress",address);
        this.cryptoProvider.saveToLocal("P2PUserPrivateKey",privatekey);
        // this.abiforadmin();
        resolve({status:"ok",address:address,privatekey:privatekey});
      }
    })

  }

  sendEther(address,amount){
    return new Promise((resolve,reject)=>{  
      let send_address = address;
      let amnt = amount;
      console.log(this.web3.eth.accounts)
      this.web3.personal.unlockAccount(this.web3.eth.accounts[0], "asd", 180);
      var tx = this.web3.eth.sendTransaction({
        from:this.web3.eth.accounts[0], 
        to: send_address, 
        value: this.web3.toHex(this.web3.toWei(amnt))
      });
      if(tx == null || tx == ""){
        tx = null;
        reject({status:"failed"})
      }else{
        tx = tx;
        resolve({status:"ok",tx:tx})
      }
    })
  }


  //for user
  /**
   * For homepage
   */
  abiforuser(){
    var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
    const abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimApprovers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Peers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Claim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Claims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Settled","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LastClaimed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"claiming_user","type":"address"}],"name":"getClaimAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"approval_address","type":"address"}],"name":"ApproveAtomic","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"claiming_user","type":"address"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reimbursing_address","type":"address"},{"indexed":false,"name":"claim_amount","type":"uint256"}],"name":"Reimbursed","type":"event"}];
    var contract =   this.web3.eth.contract(abi).at(cont_address);
    console.log("contract",contract)
    return contract;
  }

  letmein(address,privatekey){
    return new Promise((resolve,reject)=>{
      
      if( address=="" || address==null || privatekey=="" || privatekey==null ){
        reject({status:"failed"});
      }else{
        // localStorage.setItem("dumaddress",address);
        // localStorage.setItem("privatekey",privatekey);
        this.cryptoProvider.saveToLocal("P2PUserAddress",address);
        this.cryptoProvider.saveToLocal("P2PUserPrivateKey",privatekey);
        resolve({
          status:"ok",message:"stored",
          data:{
            address:this.cryptoProvider.retrieveFromLocal("P2PUserAddress"),
            privatekey:this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey")
          }
        });
      }

    })
  }

  loadHomeDataForUser(){
    return new Promise((resolve,reject)=>{
      // this.reinit();
      // console.log("connected "+ this.web3.isConnected()+" ",this.web3.currentProvider);
       
      let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
      let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
      // console.log(addressLocal,pkeyLocal)
      if(addressLocal == "" || addressLocal == null || pkeyLocal == "" || pkeyLocal == null){
        reject({status:"failed"})
      }else{
        var flag = true;
        var iter = 0;
        var contract = this.abiforuser();
        console.log("contract",contract.Peers(1))
        while (flag){
          if (contract.Peers(iter) == "0x") {
            flag = false;
            // console.log("flagfalse",flag)
          }
          else{
            iter++;
            // console.log("flagitr",flag,iter)
          }
          // console.log("flagwhlle",flag)
        }
        
        resolve({
          status:"ok",
          data:{
            peer:iter,
            add_bal:this.web3.fromWei(this.web3.eth.getBalance(addressLocal)) + ' ethers',
            total:this.web3.fromWei(contract.totalFund()) + ' ethers',
            premium:this.web3.fromWei(contract.Balance(addressLocal)) + ' ethers',
            claim:this.web3.fromWei(contract.getClaimAmount(addressLocal)) + ' ethers',
            claim_status:contract.Claims(addressLocal),
            claim_approvers:contract.ClaimApprovers(addressLocal),
            claim_votes:contract.ClaimVotes(addressLocal)
          }
        });
      }
    })
  }

  /**
   * For Paypage
   */
  forPayContract(){
    var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
    const abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimApprovers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Peers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Claim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Claims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Settled","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LastClaimed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"claiming_user","type":"address"}],"name":"getClaimAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"approval_address","type":"address"}],"name":"ApproveAtomic","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"claiming_user","type":"address"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reimbursing_address","type":"address"},{"indexed":false,"name":"claim_amount","type":"uint256"}],"name":"Reimbursed","type":"event"}];
    var contract = this.web3.eth.contract(abi).at(cont_address);
    return contract;
  }

  getPayBalance(){
    return new Promise((resolve,reject)=>{
      let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
      let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
      // var bal = this.web3.fromWei(this.web3.eth.getBalance(addressLocal));
      // var bal1 = this.web3.fromWei(this.web3.eth.getBalance(addressLocal)) + ' ethers';
      // if( bal=="" || bal==null ){
      //   reject({status:"failed"});
      // }else{
        var flag = true;
        var iter = 0;
        var contract = this.forPayContract();
        while (flag){
          if (contract.Peers(iter) == "0x") {
            flag = false;
            // console.log("flagfalse",flag)
          }
          else{
            iter++;
            // console.log("flagitr",flag,iter)
          }
          // console.log("flagwhlle",flag)
        }
        var bal = this.web3.fromWei(this.web3.eth.getBalance(addressLocal));
        var bal1 = bal + ' ethers';
        resolve({
          status:"ok",
          data:{
            balance:bal1,
            addressLocal:addressLocal,
            pkeyLocal:pkeyLocal,
            t_balance:bal,
            homedata:{
              peer:iter,
              add_bal:this.web3.fromWei(this.web3.eth.getBalance(addressLocal)) + ' ethers',
              total:this.web3.fromWei(contract.totalFund()) + ' ethers',
              premium:this.web3.fromWei(contract.Balance(addressLocal)) + ' ethers',
              claim:this.web3.fromWei(contract.getClaimAmount(addressLocal)) + ' ethers',
              claim_status:contract.Claims(addressLocal),
              claim_approvers:contract.ClaimApprovers(addressLocal),
              claim_votes:contract.ClaimVotes(addressLocal)
            }
          }
        })
      // }
    })
  }

  payPremium(premium,t_balance){
    return new Promise((resolve,reject)=>{
      if(premium == null){
        reject({status:"failed",message:"Amount is invalid"});
      }else{
        var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
        let address =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
        let pk = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
        // console.log(t_balance,premium)
        if (t_balance) {
          if (premium > t_balance) {
            reject({status:"failed",message:"insufficient funds!"})
          }
          else{
            // var privateKey = new EthJS.Buffer.Buffer(pk.slice(2, pk.length), 'hex')
            let priv = pk.toString();
            priv = priv.substr(2,priv.length);
            var privateKey = Buffer.Buffer.from(priv,'hex');
            let forvalue = this.web3.toWei(premium);
            let value = this.web3.toHex(forvalue);
            let fornonce = this.web3.eth.getTransactionCount(address);
            let nonce = this.web3.toHex(fornonce);
            let gasLimit = this.web3.toHex(100000);
            let forgp = this.web3.eth.gasPrice;
            // console.log(forgp)
            let gasPrice = this.web3._extend.utils.toHex(forgp);

            let rawtx = {
              from: address,
              to: cont_address,
              value: value,
              nonce: nonce,
              gasLimit: gasLimit,
              gasPrice: gasPrice
            }
            // console.log(rawtx);
            
            var tx = new Tx(rawtx);
            // console.log("tx obj", tx);
            tx.sign(privateKey);
                // reject({status:"failed",message:"transaction failed"});
            let serializedTx = tx.serialize().toString('hex')
            // console.log('serializedTx:', serializedTx);
            var takeHash;
            this.web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'),function (err, hash){
              // console.log("gheredfss");
              if (err) { 
                reject({status:"failed",message:"transaction failed"});
                // console.log(err); 
                return; 
                // takeHash = null;
                // return null; 
              }
              if(hash){
                // console.log('tx hash: ' + hash);
                takeHash = hash;
                // return hash;
                resolve({
                  status:"ok",
                  message:"transaction done",
                  data:{
                    hash:takeHash
                  }
                }) 
              } 
            });
          }
				}
				else{
					reject({status:"failed",message:"Zero balance"})
				}

      }
    })
  }

  /**
   * For claimpage
   */
  forClaimContract(){
    var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
    const abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimApprovers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Peers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Claim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Claims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Settled","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LastClaimed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"claiming_user","type":"address"}],"name":"getClaimAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"approval_address","type":"address"}],"name":"ApproveAtomic","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"claiming_user","type":"address"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reimbursing_address","type":"address"},{"indexed":false,"name":"claim_amount","type":"uint256"}],"name":"Reimbursed","type":"event"}];
    var contract = this.web3.eth.contract(abi).at(cont_address);
    // console.log("contract",contract)
    return contract; 
  }

  letDataForClaims(){
    return new Promise((resolve,reject)=>{
      let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
      let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
      // console.log(addressLocal,pkeyLocal)
      if(addressLocal == "" || addressLocal == null || pkeyLocal == "" || pkeyLocal == null){
        reject({status:"failed"})
      }else{
        var bal = this.web3.fromWei(this.web3.eth.getBalance(addressLocal))
        var flag = true;
        var counter = 1;
        let contract = this.forClaimContract();
        var addr_list = [];
        while(flag){
          if(contract.Peers(counter) == "0x"){
            flag =false;
          }
          else{
          addr_list.push(contract.Peers(counter));
          counter++;
          }
        }
        console.log(addr_list)
        let list = [];
        addr_list = ["0xf5e843d44da76a873dd529e3c6e6af13cc77683d", "0x4e2dcb450493ad0dfd15929bb7b50a0aa68d9171"];
        for(let i=0;i<addr_list.length;i++){
          // if (parseInt(contract.Claims(addr_list[i])) ) {

            console.log(addr_list[i]);
            list.push({
              Address:addr_list[i],
              Amount:this.web3.fromWei(contract.getClaimAmount(addr_list[i])),
              TotalFund:this.web3.fromWei(contract.totalFund()),
              Peer:contract.ClaimApprovers(addr_list[i]),
              votes:contract.ClaimVotes(addr_list[i]),
              approve:"Approve",
              status:contract.Claims(addr_list[i])
            })
          // }
        }
        resolve({
          status:"ok",message:"retrieved",
          data:{
            bal:bal,
            // addr_list:addr_list,
            addr_list:list
          }
        });
      }
    })
  }

  approveClaims(c){
    return new Promise((resolve,reject)=>{
      let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
      let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
      // console.log(addressLocal,pkeyLocal)
      if(addressLocal == "" || addressLocal == null || pkeyLocal == "" || pkeyLocal == null){
        reject({status:"failed"})
      }else{
        let _addr = c.Address;
        var contract = this.forClaimContract();
        var privateKey = Buffer.Buffer(pkeyLocal.slice(2, pkeyLocal.length), 'hex')
        var hexdata = contract.ApproveAtomic.getData(_addr);
        var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
        var gas = 90000;
        console.log("hexdata", hexdata, gas);
        var rawtx = {
          from: addressLocal,
          to: cont_address,
          data: hexdata,
          nonce: this.web3.toHex(this.web3.eth.getTransactionCount(addressLocal)),
          gasLimit: this.web3.toHex(gas),
          // v:"0x41"
        }
        console.log(rawtx);
        var tx = new Tx(rawtx)
        console.log("tx obj", tx);
        tx.sign(privateKey);
        let serializedTx = tx.serialize().toString('hex')
        console.log('serializedTx:', serializedTx);
        this.web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'), function(err, hash){
          if (err) {
            reject({status:"failed",message:"transaction failed"});
            console.log(err); return; 
          }
          if(hash){
            console.log('tx hash: ' + hash);
            resolve({
              status:"ok",message:"transaction completed",
              data:c,hash:hash
            });
          }         
        });
        
      }
    })
  }

  // claim for diability
  claimsForDisability(){
    return new Promise((resolve,reject)=>{
      let addressLocal =  this.cryptoProvider.retrieveFromLocal("P2PUserAddress");
      let pkeyLocal = this.cryptoProvider.retrieveFromLocal("P2PUserPrivateKey");
      // console.log(addressLocal,pkeyLocal)
      if(addressLocal == "" || addressLocal == null || pkeyLocal == "" || pkeyLocal == null){
        reject({status:"failed"})
      }else{
        var cont_address = "0x1878118d8Ca53E7f2c1d876140B1ce300ac877dC";
        const abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimApprovers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Peers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Claim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ClaimVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Claims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Settled","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LastClaimed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"claiming_user","type":"address"}],"name":"getClaimAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"approval_address","type":"address"}],"name":"ApproveAtomic","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"claiming_user","type":"address"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reimbursing_address","type":"address"},{"indexed":false,"name":"claim_amount","type":"uint256"}],"name":"Reimbursed","type":"event"}];
        var contract =   this.web3.eth.contract(abi).at(cont_address);

        var claim_status = parseInt(contract.Claims(addressLocal));
        // console.log("claim status is ", (claim_status));
        if (claim_status) {
          // console.log("Cannot Claim. Claim already pending approval.")
          reject({status:"failed",message:"Cannot Claim. Claim already pending approval."});
        }
        else if(this.web3.fromWei(contract.getClaimAmount(addressLocal)) == 0){
          // console.log('No premium paid')
          reject({status:"failed",message:"No premium paid"});
        }
        else{
          var privateKey = Buffer.Buffer(pkeyLocal.slice(2, pkeyLocal.length), 'hex')
          var hexdata = contract.Claim.getData();
          var gas = 90000;
          // console.log("hexdata", hexdata, gas);
          var rawtx = {
            from: addressLocal,
            to: cont_address,
            data: hexdata,
            nonce: this.web3.toHex(this.web3.eth.getTransactionCount(addressLocal)),
            gasLimit: this.web3.toHex(gas),
            v:"0x41"
          }
          // console.log(rawtx);
          var tx = new Tx(rawtx)
          // console.log("tx obj", tx);
          tx.sign(privateKey);
          let serializedTx = tx.serialize().toString('hex')
          // console.log('serializedTx:', serializedTx);
          this.web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'), function(err, hash){
            if (err) { 
              reject({status:"failed",message:"transaction failed"});
              // console.log(err); 
              return; 
            }
            else{
              resolve({
                status:"ok",message:"Disability claim done",
                hash:hash
              });
              // console.log('tx hash: ' + hash);    
            }
          });
        }
      }
    })
  }
 
  logout(){
    this.localStore.clear();
    let auth = this.cryptoProvider.retrieveTokenAuth();
    // console.log("auth",auth)
    if( auth == "" || auth == null || auth == undefined){
      this.cryptoProvider.saveTokenAuth();
      // console.log(this.cryptoProvider.retrieveTokenAuth());
    }else{
      // console.log("already created",this.cryptoProvider.retrieveTokenAuth())
    } 
  } 


  lastTimeBackPress=0;
  timePeriodToExit=2000;
  backbtnevent(){
 
    console.log("routenav:",this.nav) 
    // this.platform.registerBackButtonAction(() => {
    //   // get current active page
    //   let view = this.navCtrl.getActive();
    //   if(view.component.name=="TabsPage"){
    //     //Double check to exit app                  
    //     if(new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit){
    //         this.platform.exitApp(); //Exit from app
    //     }else{
    //         let toast = this.toastCtrl.create({
    //             message: 'Press back again to exit App?',
    //             duration: 3000,
    //             position: 'bottom'
    //           });
    //             toast.present();     
    //             this.lastTimeBackPress=new Date().getTime();
    //     }
    //   }
    //   // else{
    //   //     // go to previous page
    //   //           this.nav.pop({});
    //   // }
    // });
  }

  // getService(url: string): Observable<any> {
  //   return this.http
  //     .get(url)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
  extractData(res: Response) {
      let body = res.json();
      return body || {};
  }
  handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

}
