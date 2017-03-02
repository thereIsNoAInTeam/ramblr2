import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
//
@Component({
    selector: 'page-profile-edit',
    templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {
    info: any;
    username: string;
    bio: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private userDatabase: UserDatabase) {
        this.info = navParams.data;
        this.username = this.info.username;
        if (this.info.bio) {
            this.bio = this.info.bio
        }
    }

    ionViewDidLoad() {
    }

    submitChanges(): void {
        if (this.bio.length < 200) {

            let alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Bio length must be a minimum of 200 characters",
                buttons: ["Got it :)"]
            });
            alert.present()
        }


        else {
            this.userDatabase.updateProfile(this.username, this.bio);
            this.navCtrl.pop();
        }

    }
}
/**/
