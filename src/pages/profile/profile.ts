import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
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

    infoSubscription: Subscription

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase, public modalCtrl: ModalController) {
        this.infoSubscription = this.userDatabase.profileInfo$.subscribe(
            info => {
                this.userInfo = info;
                this.userName = info.userName;
                this.userBio = info.userBio;
            }
        );
        this.userDatabase.getProfile("");
    }

    ionViewDidLoad(): void {

    }

    EditModal() {
        let modal = this.modalCtrl.create(ProfileEditPage, {
            username: this.userName,
            bio: this.userBio

        });
        modal.present();
    }
}
