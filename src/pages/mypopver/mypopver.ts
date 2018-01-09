import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingPage } from '../setting/setting';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the MypopverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mypopver',
  templateUrl: 'mypopver.html',
})
export class MypopverPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypopverPage');
  }

  about(){

  }
 
  setting(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(SettingPage);
  }
}
