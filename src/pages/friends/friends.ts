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
    friends: any[];
    searching: boolean = false;
    fullList: any[];
    users: any[];
    friendSubscription: Subscription;
    userSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        this.friendSubscription = this.userDatabase.myFriends$.subscribe(friends => {
            this.fullList = friends;
            this.friends = friends;
        });
        this.userSubscription = this.userDatabase.myUsers$.subscribe(user => {
            this.users = user;
        });
        this.userDatabase.getUsers();
        this.userDatabase.getUserFriendsAsync();
    }

    initializeItems() {
        this.friends = this.fullList;
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
                this.friends = this.friends.filter((item) => {
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
            }
            else {
                this.searching = false;

            }
        }
    }

    goToProfile(userID: string, isFriend: boolean): void {
        console.log(userID);
        this.navCtrl.push(ProfilePage, {uid: userID, isFriend: isFriend});
    }
}
