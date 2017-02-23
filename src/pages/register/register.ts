import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController, Nav, ToastController} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {ProfilePage} from "../profile/profile";
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

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private userDatabase: UserDatabase, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    // probably will change this to use more of a promise to deal with invalid emails/passwords according to firebase
    registerEmail(): void {
        if ((this.email && this.password) && (this.password == this.passwordConfirm)) {
            this.userDatabase.emailRegister(this.email, this.password)
                .then(() => this.signUpSuccess())
                .catch(error => console.log(error));
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

        if (!this.email) {
            errorText += "Please enter a valid email address. "
        }

        if (!this.password) {
            errorText += "Please enter your password."
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
                this.userDatabase.createUser();
                this.navCtrl.setRoot(FeedPage);
                this.navCtrl.push(ProfilePage);
                let toast = this.toastCtrl.create({
                    message: "Sign up successful!",
                    duration: 2000
                });
                toast.present();
            });

    }
}
