import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";
import {HomePage} from "../home/home";

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
            // the error occurs at the for each loop since I think when going back to the sign in page, this page is still loaded
            this.userInfo.forEach(item => {
                console.log("What what!")
                // this.userName = item.userName;
            });
            console.log(this.userDatabase.authenticated);
        }
        else {
            console.log(this.userDatabase.authenticated);
            this.userInfo = null;
            // this.userName = null;
        }
    }

    ionViewDidLoad():void {

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
