
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AngularFireModule} from "angularfire2";
import {Bio} from "../pipes/bio";


import {HomePage} from '../pages/home/home';
import {UserDatabase} from "../providers/user-database";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {ProfilePage} from "../pages/profile/profile";
import {FeedPage} from '../pages/feed/feed';
import {FindfriendsPage} from "../pages/findfriends/findfriends";
import {FriendsPage} from "../pages/friends/friends";
import {ProfileEditPage} from "../pages/profile-edit/profile-edit"
import {PostPage} from "../pages/post/post";


export const firebaseConfig = {
    apiKey: "AIzaSyBMmwh7KX7inBR-KBsMmd1DQ739KJoh_7Q",
    authDomain: "ramblr-rambles.firebaseapp.com",
    databaseURL: "https://ramblr-rambles.firebaseio.com",
    storageBucket: "ramblr-rambles.appspot.com",
    messagingSenderId: "704311251869"
};


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RegisterPage,
        LoginPage,
        ProfilePage,
        FriendsPage,
        FeedPage,
        FindfriendsPage,
        ProfileEditPage,
        Bio,
        PostPage,
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RegisterPage,
        LoginPage,
        ProfilePage,
        FriendsPage,
        FeedPage,
        FindfriendsPage,
        ProfileEditPage,
        PostPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserDatabase
    ]

})
export class AppModule {}
