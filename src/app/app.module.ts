import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, Http } from '@angular/http';
import {Ng2Webstorage} from 'ngx-webstorage';

import { MywebthreeProvider } from '../providers/mywebthree/mywebthree';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdminPage } from '../pages/admin/admin';
import { UserloginPage } from '../pages/userlogin/userlogin';
import { CryptoProvider } from '../providers/crypto/crypto';
import { UserhomePage } from '../pages/userhome/userhome';
import { UsertabPage } from '../pages/usertab/usertab';
import { UserpayPage } from '../pages/userpay/userpay';
import { UserviewsPage } from '../pages/userviews/userviews';
import { MypopverPage } from '../pages/mypopver/mypopver';
import { SettingPage } from '../pages/setting/setting';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdminPage,
    UserloginPage,
    UserhomePage,
    UsertabPage,
    UserpayPage,
    UserviewsPage,
    MypopverPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ng2Webstorage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,  
    HomePage,
    AdminPage,
    UserloginPage,
    UserhomePage,
    UsertabPage,
    UserpayPage,
    UserviewsPage,
    MypopverPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MywebthreeProvider,
    CryptoProvider 
  ]
})
export class AppModule {}
