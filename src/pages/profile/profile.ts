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
    friendList: any[];
    userInfo: any;
    isMe: boolean;

    infoSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase, public modalCtrl: ModalController) {
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
                this.friendList = info.friendList;
            }
        );
        this.userDatabase.getProfile(profileParam);
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

    addFriend(): void {
        let userFriends = this.userDatabase.getUserFriends();
        let isFriend = false;
        if(userFriends) {
            for (let i = 0; i < userFriends.length; i++)
            {
                if(userFriends[i].name == this.userName) {
                    isFriend = true;
                    break;
                }
            }
            if(!isFriend) {
                userFriends.push({name: this.userName, uid: this.navParams.data})
            }
        }
        else {
            userFriends = [{name: this.userName, uid: this.navParams.data}];
        }
        if (!isFriend) {
            this.userDatabase.updateFriends(userFriends);
        }
        else {
            console.log("You can't be friends again....")
        }
    }
}
