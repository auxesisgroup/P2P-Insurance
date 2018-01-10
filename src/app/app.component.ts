import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { MywebthreeProvider } from '../providers/mywebthree/mywebthree';
import { ToastController } from 'ionic-angular';
import { CryptoProvider } from '../providers/crypto/crypto';
import { UsertabPage } from '../pages/usertab/usertab';
// import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  
 
  constructor(
    public platform: Platform, 
    statusBar: StatusBar, 
    // nav: NavController, 
    splashScreen: SplashScreen,
    public myweb:MywebthreeProvider,
    public toastCtrl:ToastController,
    public cryptoProvider:CryptoProvider
  ) {

    let auth = this.cryptoProvider.retrieveFromLocal("P2PINSURANCESavedAuthentication");
    if(auth == "" || auth == null || auth == "NO" || !auth || auth == undefined){
      this.rootPage = HomePage;
    }else{
      this.rootPage = UsertabPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString("#011931");
      splashScreen.hide();


      this.myweb.backbtnevent();
      //back button handle
      //Registration of push in Android and Windows Phone
      // var lastTimeBackPress=0;
      // var timePeriodToExit=2000;

      // console.log("routenav:",this.nav) 
      // platform.registerBackButtonAction(() => {
      //   // get current active page
      //   let view = this.nav.getActive();
      //   if(view.component.name=="TabsPage"){
      //     //Double check to exit app                  
      //     if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
      //         this.platform.exitApp(); //Exit from app
      //     }else{
      //         let toast = this.toastCtrl.create({
      //             message: 'Press back again to exit App?',
      //             duration: 3000,
      //             position: 'bottom'
      //           });
      //             toast.present();     
      //             lastTimeBackPress=new Date().getTime();
      //     }
      //   }
      //   // else{
      //   //     // go to previous page
      //   //           this.nav.pop({});
      //   // }
      // });


    });
    this.myweb.init();
  }
}

