import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, AlertController, ToastController, Nav} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {FeedPage} from "../feed/feed";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    @ViewChild(Nav) nav: Nav;

    email: string;
    password: string;

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController, private alertCtrl: AlertController,
                private userDatabase: UserDatabase, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
    }

    loginEmail(): void {
        if(this.email && this.password) {
            this.userDatabase.emailLogin(this.email, this.password)
                .then(() => this.signInSuccess());
        }
        else {
            this.errorPopup();
        }

    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    errorPopup(): void {
        let errorText: string = "";

        if(!this.email) {
            errorText += "Please enter a valid email address. "
        }

        if(!this.password) {
            errorText += "Please enter your password."
        }
        let alert = this.alertCtrl.create({
            title: "Invalid Login Information",
            subTitle: errorText,
            buttons: ["Okay"]
        });
        alert.present();
    }

    private signInSuccess(): void {
        this.navCtrl.popToRoot();
        this.navCtrl.setRoot(FeedPage);
        let toast = this.toastCtrl.create({
            message: "Sign in successful!",
            duration: 2000
        });
        toast.present();
    }
}
