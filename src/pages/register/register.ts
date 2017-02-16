import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    email: string;
    password: string;
    passwordConfirm: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    loginEmail(): void {

        console.log(this.email);
        console.log(this.password);
        console.log(this.passwordConfirm);
        if((this.email && this.password) && (this.password == this.passwordConfirm)) {
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

        if(this.password != this.passwordConfirm) {
            errorText += "Passwords do not match"
        }
        let alert = this.alertCtrl.create({
            title: "Invalid Login Information",
            subTitle: errorText,
            buttons: ["Okay"]
        });
        alert.present()
    }

}
