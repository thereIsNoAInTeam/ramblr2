import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";
import {ProfilePage} from "../profile/profile";

@Component({
    selector: 'page-findfriends',
    templateUrl: 'findfriends.html'
})
export class FindfriendsPage {

    searchQuery: string = '';
    users: any[];
    searching: boolean = false;
    fullList: any[];
    usersSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        // this.initializeItems();
        this.usersSubscription = this.userDatabase.myUsers$.subscribe(users => {
            this.fullList = users;
        });
        this.userDatabase.getUsers();
        this.initializeItems();
    }

    initializeItems() {
        this.users = this.fullList;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.searching = true;
            this.users = this.users.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
        else {
            this.searching = false;

        }
    }

    goToProfile(userID: string): void {
        this.navCtrl.setRoot(ProfilePage, {uid: userID, isFriend: false});
    }

}
