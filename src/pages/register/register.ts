import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController, Nav, ToastController} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {FeedPage} from "../feed/feed";


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    @ViewChild(Nav) nav: Nav;

    email: string;
    password: string;
    passwordConfirm: string;
    userName: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private userDatabase: UserDatabase, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
    }

    registerEmail(): void {
        if ((this.email && this.password && this.userName) && (this.password == this.passwordConfirm)) {
            this.userDatabase.emailRegister(this.email, this.password)
                .then(() => {
                    this.signUpSuccess();
                    this.dismiss();
                })
                .catch(error => this.signUpFailed(error));
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

        if (!this.email) {
            errorText += "Please enter a valid email address. "
        }

        if (!this.password) {
            errorText += "Please enter your password."
        }

        if (!this.userName) {
            errorText += "Please enter your name"
        }

        if (this.password != this.passwordConfirm) {
            errorText += "Passwords do not match"
        }
        let alert = this.alertCtrl.create({
            title: "Invalid Login Information",
            subTitle: errorText,
            buttons: ["Okay"]
        });
        alert.present()
    }

    private signUpSuccess(): void {
        this.userDatabase.emailLogin(this.email, this.password)
            .then(() => {
                this.userDatabase.createUser(this.userName);
                this.navCtrl.setRoot(FeedPage);
                let toast = this.toastCtrl.create({
                    message: "Sign up successful!",
                    duration: 2000
                });
                toast.present();
            });

    }

    private signUpFailed(error: any): void {
        let alert = this.alertCtrl.create({
            title: "Unable to complete sign up",
            subTitle: error.message,
            buttons: ["Okay"]
        });
        alert.present()
    }
}
