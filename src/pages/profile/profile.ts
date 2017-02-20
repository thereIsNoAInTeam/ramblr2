import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";

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
    testObject: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
    }

    ionViewDidLoad() {
        this.testObject = this.userDatabase.users;
        this.testObject.forEach(item => {
            console.log(item);
            console.log(item.userName);
            this.userName = item.userName;
        })
    }

    // setting things like this would be in the service, but I'm just testing
    setUserName(): void {
        this.userDatabase.users.update({userName: this.userName});
        this.userName = "";
    }

    signOut(): void {
        this.userDatabase.googleLogout();
    }

    updateProfile(): void {
        this.userDatabase.updateProfile(this.userName, this.userBio);
    }
}
