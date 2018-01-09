import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserhomePage } from './userhome';

@NgModule({
  declarations: [
    UserhomePage,
  ],
  imports: [
    IonicPageModule.forChild(UserhomePage),
  ],
})
export class UserhomePageModule {}
