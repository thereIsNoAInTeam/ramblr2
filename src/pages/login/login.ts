import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    email: string;
    password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    loginEmail(): void {

        console.log(this.email);
        console.log(this.password);
        if(this.email && this.password) {
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

}
