import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {FeedPage} from '../pages/feed/feed';
import {ProfilePage} from '../pages/profile/profile';
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
    pages: Array<{title: string, iconname: string, component: any}>;

    constructor(platform: Platform, private userDatabase: UserDatabase) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
        this.pages = [
            {title: 'Profile', iconname: "contact", component: ProfilePage},
            {title: 'Friends', iconname: "contacts", component: FriendsPage}
        ];
        this.loggedInSubscription = this.userDatabase.amLoggedIn$.subscribe(
            loggedStatus => {
                if (loggedStatus) {
                    this.rootPage = FeedPage;
                } else {
                    this.rootPage = HomePage;
                }
            }
        );
    }

    openPage(page) {
        this.nav.push(page.component);
    }

    signout() {
        this.nav.popToRoot();
        this.nav.setRoot(HomePage).then(() => {
            this.userDatabase.googleLogout();
        });
    }
}
