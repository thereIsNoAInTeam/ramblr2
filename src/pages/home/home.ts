import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController, Nav, MenuController} from 'ionic-angular';

import {UserDatabase} from "../../providers/user-database";
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {FeedPage} from "../feed/feed";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav;

    constructor(public navCtrl: NavController, private userDatabase: UserDatabase, private toastCtrl: ToastController,
                public menu: MenuController) {

    }

    ionViewDidLoad(): void {
        this.menu.enable(false);
    }
    ionViewDidLeave(): void{
        this.menu.enable(true);
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
        this.navCtrl.push(RegisterPage)
    }

    emailLogin(): void {
        this.navCtrl.push(LoginPage);
    }

    private signInSuccess(): void {
        this.userDatabase.createUser();
        this.navCtrl.popToRoot();
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
