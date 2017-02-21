import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController, ModalController, Nav} from 'ionic-angular';
import {Subscription} from "rxjs";

import {UserDatabase} from "../../providers/user-database";
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {FirebaseListObservable} from "angularfire2";
import {ProfilePage} from "../profile/profile";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav;

    loggedIn: boolean;
    loggedInSubscription: Subscription;
    usersSubscription: Subscription;
    email: string;
    password: string;
    users: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController, private userDatabase: UserDatabase, private toastCtrl: ToastController, private modalCtrl: ModalController) {

    }

    ionViewDidLoad(): void {
        this.loggedInSubscription = this.userDatabase.amLoggedIn$.subscribe(
            loggedStatus => {
                this.loggedIn = loggedStatus;
                if (this.loggedIn) {
                    this.navCtrl.setRoot(ProfilePage);
                }
            }
        );
        // this.usersSubscription = this.userDatabase.myUsers$.subscribe(
        //     myUsers => this.users = myUsers
        // )
    }

    loginToGoogle(): void {
        this.userDatabase.googleLogin()
            .then(() => this.signInSuccess())
            .catch(() => this.signInFailed());
    }

    // use for sign out regardless of sign in method...
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

    private signInSuccess(): void {
        this.userDatabase.createUser();
        this.navCtrl.setRoot(ProfilePage);
        let toast = this.toastCtrl.create({
            message: "Sign in successful!",
            duration: 2000
        });
        toast.present();
    }

    private signInFailed(): void {
        let toast = this.toastCtrl.create({
            message: "Sign in failed!",
            duration: 2000
        });
        toast.present();
    }
}
