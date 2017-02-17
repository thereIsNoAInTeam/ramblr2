import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { FeedPage } from '../pages/feed/feed';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = ProfilePage;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.pages = [
      { title: 'My Feed', component: FeedPage },
      { title: 'Profile', component: ProfilePage }
    ];
  }
  openPage(page){
    this.nav.setRoot(page.component);
  }

  signout () {
    console.log("hey I signed out")
  }
}
