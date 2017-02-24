import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";
import {ProfilePage} from "../profile/profile";

@Component({
    selector: 'page-friends',
    templateUrl: 'friends.html'
})
export class FriendsPage {

    searchQuery: string = '';
    items: any[];
    searching: boolean = false;
    fullList: any[];
    friendSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        this.friendSubscription = this.userDatabase.myFriends$.subscribe(friends => {
            this.fullList = friends;
            this.items = friends;
        });
        this.userDatabase.getUserFriendsAsync();
        // this.initializeItems();
    }

    initializeItems() {
        this.items = this.fullList;
    }

    getItems(ev: any) {
        if (this.fullList) {
            // Reset items back to all of the items
            this.initializeItems();

            // set val to the value of the search bar
            let val = ev.target.value;

            // if the value is an empty string don't filter the items
            if (val && val.trim() != '') {
                this.searching = true;
                this.items = this.items.filter((item) => {
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
            }
            else {
                this.searching = false;

            }
        }
    }

    goToProfile(userID: string): void {
        this.navCtrl.setRoot(ProfilePage, {uid: userID, isFriend: true});
    }
}
