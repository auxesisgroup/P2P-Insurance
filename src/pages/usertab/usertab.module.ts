import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsertabPage } from './usertab';

@NgModule({
  declarations: [
    UsertabPage,
  ],
  imports: [
    IonicPageModule.forChild(UsertabPage),
  ],
})
export class UsertabPageModule {}
