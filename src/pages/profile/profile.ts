import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
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
    isFriend: boolean;

    infoSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase, public modalCtrl: ModalController, private alertCtrl: AlertController) {
        let profileParam = this.navParams.data;
        let profileID:string = "";
        this.isMe = true;
        if (profileParam.uid)
        {
            profileID = profileParam.uid;
            this.isMe = false;
            this.isFriend = profileParam.isFriend;
        }
        this.infoSubscription = this.userDatabase.profileInfo$.subscribe(
            info => {
                this.userInfo = info;
                this.userName = info.userName;
                this.userBio = info.userBio;
            }
        );
        this.userDatabase.getProfile(profileID);
    }

    ionViewDidLoad(): void {

    }

    EditProfile() {
        this.navCtrl.push(ProfileEditPage, {
            username: this.userName,
            bio: this.userBio
        });
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
            let alert = this.alertCtrl.create({
                title: "You are already friends with " + this.userName,
                buttons: ["Oh yeah, I forgot"]
            });
            alert.present()
        }
    }
}
