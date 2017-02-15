import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AngularFireModule} from "angularfire2";

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {UserDatabase} from "../providers/user-database";


export const firebaseConfig = {
    apiKey: "AIzaSyBMmwh7KX7inBR-KBsMmd1DQ739KJoh_7Q",
    authDomain: "ramblr-rambles.firebaseapp.com",
    databaseURL: "https://ramblr-rambles.firebaseio.com",
    storageBucket: "ramblr-rambles.appspot.com",
    messagingSenderId: "704311251869"
}

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserDatabase
    ]
})
export class AppModule {
}
