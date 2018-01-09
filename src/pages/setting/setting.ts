import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { MywebthreeProvider } from '../../providers/mywebthree/mywebthree';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController, 
    public myweb:MywebthreeProvider,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
 
  logout(){
    this.myweb.logout();
    this.navCtrl.setRoot(HomePage);
  }

  back(ev){
    this.navCtrl.pop();
  }

  about(){

  }
}
