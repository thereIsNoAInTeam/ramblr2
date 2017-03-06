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
    myFriends: any[];
    users: any[];
    searching: boolean = false;
    fullList: any[];
    fullUserList: any[];
    friendSubscription: Subscription;
    usersSubscription: Subscription;
    input: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        this.friendSubscription = this.userDatabase.myFriends$.subscribe(friends => {
            this.fullList = friends;
            this.myFriends = friends;
        });
        this.usersSubscription = this.userDatabase.myUsers$.subscribe(users => {
            this.fullUserList = users;
        });
        this.userDatabase.getUsers();
        this.userDatabase.getUserFriendsAsync();
        this.initializeItems();
    }

    initializeItems() {
        this.myFriends = this.fullList;
        this.users = this.fullUserList;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the search bar
        let val = ev.target.value;

        this.users = this.users.filter((item) => {
            if(this.myFriends) {
                for (let i = 0; i < this.myFriends.length; i++) {
                    if (this.myFriends[i].uid == item.uid) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        });

        // if the value is an empty string don't filter the items.
        if (val && val.trim() != '') {
            this.searching = true;

            if(this.myFriends) {
                this.myFriends = this.myFriends.filter((item) => {
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
            }
            this.users = this.users.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });

        }
        else {
            this.searching = false;

        }
    }

    goToProfile(userID: string, isFriend: boolean): void {

        this.navCtrl.push(ProfilePage, {uid: userID, isFriend: isFriend}).then(() => {
            this.input = "";
            this.myFriends = this.fullList;
            this.searching = false;
        });
    }
}
