import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";
import {HomePage} from "../home/home";

/*
 Generated class for the Profile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    userName: string;
    userBio: string;
    userInfo: any;
    loggedInSubscription: Subscription;
    loggedIn: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        if (this.userDatabase.authenticated) {
            this.userInfo = this.userDatabase.users;
            console.log(this.userInfo);
            this.userInfo.forEach(item => {
                this.userName = item.userName;
            });
        }
    }

    ionViewDidLoad():void {
        // if (this.userDatabase.authenticated) {
        //     this.userInfo = this.userDatabase.users;
        //     this.userInfo.forEach(item => {
        //         this.userName = item.userName;
        //     });
        // }

    }

    // setting things like this would be in the service, but I'm just testing
    setUserName(): void {
        this.userDatabase.users.update({userName: this.userName});
        this.userName = "";
    }

    signOut(): void {
        this.userDatabase.googleLogout();
        this.userInfo = null;
        this.userName = null;
        this.navCtrl.setRoot(HomePage);
    }

    updateProfile(): void {
        this.userDatabase.updateProfile(this.userName, this.userBio);
    }
}
