import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {ProfileEditPage} from "../profile-edit/profile-edit";
import {Subscription} from "rxjs";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    userName: string;
    userBio: string;
    userInfo: any;
    isMe: boolean;

    infoSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        let profileParam: string = "";
        this.isMe = true;
        if (typeof navParams.data == "string")
        {
            profileParam = this.navParams.data;
            this.isMe = false;
        }
        this.infoSubscription = this.userDatabase.profileInfo$.subscribe(
            info => {
                this.userInfo = info;
                this.userName = info.userName;
                this.userBio = info.userBio;
            }
        );
        this.userDatabase.getProfile(profileParam);
    }

    ionViewDidLoad(): void {

    }

    EditProfile() {
        this.navCtrl.push(ProfileEditPage, {
            username: this.userName,
            bio: this.userBio
        });
    }
}
