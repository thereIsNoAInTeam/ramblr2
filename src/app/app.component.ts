import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { FeedPage } from '../pages/feed/feed';
import { ProfilePage } from '../pages/profile/profile';
import {FindfriendsPage} from "../pages/findfriends/findfriends";
import {FriendsPage} from "../pages/friends/friends";
import {HomePage} from "../pages/home/home";
import {UserDatabase} from "../providers/user-database";
import {Subscription} from "rxjs";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;
  loggedInSubscription: Subscription;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, private userDatabase: UserDatabase) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.pages = [
      { title: 'My Feed', component: FeedPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Find Friends', component: FindfriendsPage},
      { title: 'Friends', component: FriendsPage }
    ];
      this.loggedInSubscription = this.userDatabase.amLoggedIn$.subscribe(
          loggedStatus => {
              if (loggedStatus) {
                  this.rootPage = ProfilePage;
              }else{
                  this.rootPage = HomePage;
              }
          }
      );
  }
  openPage(page){
    this.nav.setRoot(page.component);
  }

  signout () {
    this.userDatabase.googleLogout();
    this.nav.setRoot(HomePage);
  }
}
