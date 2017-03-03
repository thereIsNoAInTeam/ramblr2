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

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private userDatabase: UserDatabase, private alertCtrl: AlertController) {
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
                title: "We want to know more!",
                subTitle: "Please be more open about who you are, at least 200 characters worth",
                buttons: ["You're right; everyone should know me!"]
            });
            alert.present();
        }
        else {
            this.userDatabase.updateProfile(this.username, this.bio);
            this.navCtrl.pop();
        }

    }

}
/**/
