import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
//
@Component({
    selector: 'page-profile-edit',
    templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {
    info: any;
    username: string;
    bio: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private userDatabase: UserDatabase) {
        this.info = navParams.data;
        this.username = this.info.username;
        this.bio = this.info.bio
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfileEditPage');
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    submitChanges(): void {
        this.userDatabase.updateProfile(this.username, this.bio);
        this.dismiss();
    }

}
