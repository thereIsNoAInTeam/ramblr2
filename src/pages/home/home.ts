import {Component} from '@angular/core';
import {NavController, ToastController, ModalController} from 'ionic-angular';
import {Subscription} from "rxjs";

import {UserDatabase} from "../../providers/user-database";
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    loggedIn: boolean;
    loggedInSubscription: Subscription;
    email: string;
    password: string;

    constructor(public navCtrl: NavController, private userDatabase: UserDatabase, private toastCtrl: ToastController, private modalCtrl: ModalController) {

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

    // use for sign out regardless of sign in method
    logoutOfGoogle(): void {
        this.userDatabase.googleLogout();
    }

    registration(): void {
        let modal = this.modalCtrl.create(RegisterPage);
        modal.present();
    }

    emailLogin(): void {
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
    }

    loginWithEmail(): void {
        this.userDatabase.emailLogin(this.email, this.password)
            .then(() => this.signInSuccess());
    }

    registerEmail(): void {
        this.userDatabase.emailRegister(this.email, this.password);
    }

    private signInSuccess(): void {
        let toast = this.toastCtrl.create({
            message: "Sign in successful!",
            duration: 2000
        });
        toast.present();
    }
}
