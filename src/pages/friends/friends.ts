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
    items: any[] = [];
    users: any[] = [];
    searching: boolean = false;
    fullList: any[];
    fullUserList: any[];
    friendSubscription: Subscription;
    usersSubscription: Subscription;
    input: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        this.friendSubscription = this.userDatabase.myFriends$.subscribe(friends => {
            this.fullList = friends;
            this.items = friends;
        });
        this.usersSubscription = this.userDatabase.myUsers$.subscribe(users => {
            this.fullUserList = users;
        });
        this.userDatabase.getUsers();
        this.userDatabase.getUserFriendsAsync();
        this.initializeItems();
    }

    initializeItems() {
        this.items = this.fullList;
        this.users = this.fullUserList;
    }

    getItems(ev: any) {
        if (this.fullList && this.fullUserList) {
            // Reset items back to all of the items
            this.initializeItems();

            // set val to the value of the search bar
            let val = ev.target.value;

            this.users=this.users.filter((item) => {
                for(let i = 0; i<this.items.length; i++){
                    console.log(this.items[i].uid);
                    console.log(item.uid);
                    if(this.items[i].uid == item.uid){
                        return false;
                    }else{
                        return true;
                    }
                }
            })

            // if the value is an empty string don't filter the items
            if (val && val.trim() != '') {
                this.searching = true;
                this.items = this.items.filter((item) => {
                    console.log(item);
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
                this.users = this.users.filter((item) => {



                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);

                });

            }
            else {
                this.searching = false;

            }
        }
    }

    goToProfile(userID: string, isFriend: boolean): void {

        this.navCtrl.push(ProfilePage, {uid: userID, isFriend: isFriend}).then(()=>{
            this.input="";
            this.users=[];
            this.items=this.fullList;
        });
    }
}
