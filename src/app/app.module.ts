import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {MenuPage} from "../pages/menu/menu";
import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import {FindfriendsPage} from "../pages/findfriends/findfriends";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MenuPage,
    ProfilePage,
    FeedPage,
    FindfriendsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MenuPage,
    ProfilePage,
    FeedPage,
    FindfriendsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
