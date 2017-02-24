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
    bio: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private userDatabase: UserDatabase) {
        this.info = navParams.data;
        this.username = this.info.username;
        if(this.info.bio) {
            this.bio = this.info.bio
        }
    }

    ionViewDidLoad() {
    }

    submitChanges(): void {
        this.userDatabase.updateProfile(this.username, this.bio);
        console.log(this.bio);
        this.navCtrl.pop();
    }

}
