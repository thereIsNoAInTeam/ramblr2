import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";
import {HomePage} from "../home/home";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

    userName: string;
    userBio: string;
    userInfo: any;
    userSubscription: Subscription;

    constructor(public navCtrl: NavController, private userDatabase: UserDatabase) {
        this.userSubscription = this.userDatabase.myUsers$.subscribe( userInfo => {
            this.userInfo = userInfo;
            if(this.userInfo) {
                this.userInfo.forEach(item => {
                    this.userName = item.userName;
                    console.log(this.userName);
                    this.userBio = item.userBio;
                })
            }
        });
    }

    ngOnInit(): void {
        if(this.userDatabase.authenticated) {
            this.userInfo = this.userDatabase.users;
            this.userInfo.forEach(item => {
                this.userName = item.userName;
                console.log(this.userName);
                this.userBio = item.userBio;
            });
        }
        else {
            this.userInfo = null;
        }
    }

    // setting things like this would be in the service, but I'm just testing
    setUserName(): void {
        this.userDatabase.users.update({userName: this.userName});
        this.userName = "";
    }

    signOut(): void {
        this.userInfo = null;
        this.userName = null;
        this.userDatabase.googleLogout();
        this.navCtrl.setRoot(HomePage).catch(() => {});
    }

    updateProfile(): void {
        this.userDatabase.updateProfile(this.userName, this.userBio);
    }
}
