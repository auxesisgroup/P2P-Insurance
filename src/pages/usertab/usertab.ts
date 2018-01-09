import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserhomePage } from '../userhome/userhome';
import { UserpayPage } from '../userpay/userpay';
import { UserviewsPage } from '../userviews/userviews';
/**
 * Generated class for the UsertabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usertab',
  templateUrl: 'usertab.html',
})
export class UsertabPage {

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = UserhomePage;
    // this.tab2 = UserhomePage;
    this.tab3 = UserpayPage;
    this.tab4 = UserviewsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsertabPage');
  }

}
