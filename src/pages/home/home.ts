import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {Subscription} from "rxjs";

import {UserDatabase} from "../../providers/user-database";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    loggedIn: boolean;
    loggedInSubscription: Subscription;

    constructor(public navCtrl: NavController, private userDatabase: UserDatabase, private toastCtrl: ToastController) {

    }

    ionViewDidLoad(): void {
        this.loggedInSubscription = this.userDatabase.amLoggedIn$.subscribe(
            loggedStatus => this.loggedIn = loggedStatus
        );
    }

    loginToGoogle(): void {
        this.userDatabase.googleLogin()
            .then(() => this.signInSuccess());
    }

    logoutOfGoogle(): void {
        this.userDatabase.googleLogout();
    }

    loginWithEmail(): void {
        console.log("Email login!");
    }

    logoutOfEmail(): void {
        console.log("Email logout! Probably the same as Google logout!");
    }

    registerEmail(): void {
        console.log("Registration time! Maybe the same as Email login!");
    }

    private signInSuccess(): void {
        let toast = this.toastCtrl.create({
            message: "Sign in successful!",
            duration: 2000
        });
        toast.present();
    }
}
