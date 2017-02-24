import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController, ModalController, Nav} from 'ionic-angular';

import {UserDatabase} from "../../providers/user-database";
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav;

    constructor(public navCtrl: NavController, private userDatabase: UserDatabase, private toastCtrl: ToastController, private modalCtrl: ModalController) {

    }

    ionViewDidLoad(): void {
    }

    loginToGoogle(): void {
        this.userDatabase.googleLogin()
            .then(() => this.signInSuccess())
            .catch(reason => {
                console.log(reason);
                this.signInFailed();
            });
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
