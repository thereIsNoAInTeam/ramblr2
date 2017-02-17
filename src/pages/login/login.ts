import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController, ToastController} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    email: string;
    password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private userDatabase: UserDatabase, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    loginEmail(): void {
        if(this.email && this.password) {
            this.userDatabase.emailLogin(this.email, this.password)
                .then(() => this.signInSuccess());
            this.dismiss();
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
        alert.present()
    }

    private signInSuccess(): void {
        let toast = this.toastCtrl.create({
            message: "Sign in successful!",
            duration: 2000
        });
        toast.present();
    }
}
