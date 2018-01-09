import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserviewsPage } from './userviews';

@NgModule({
  declarations: [
    UserviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserviewsPage),
  ],
})
export class UserviewsPageModule {}
