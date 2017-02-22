import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";
import {ProfileEditPage} from "../profile-edit/profile-edit";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    userName: string;
    userBio: string;
    userInfo: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase, public modalCtrl: ModalController) {
        if (this.userDatabase.authenticated) {
            this.userInfo = this.userDatabase.users;
            console.log(this.userInfo);
            this.userInfo.forEach(item => {
                this.userName = item.userName;
                this.userBio = item.userBio;
                console.log(item.userBio)
            });
        }
    }

    ionViewDidLoad():void {
    }

    EditModal() {
        let modal = this.modalCtrl.create(ProfileEditPage, {
            username: this.userName,
            bio: this.userBio

        });
        modal.present();
    }
}
