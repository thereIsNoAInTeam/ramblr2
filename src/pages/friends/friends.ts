import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-findfriends',
    templateUrl: 'friends.html'
})
export class FriendsPage {

    searchQuery: string = '';
    items: string[];
    searching: boolean = false;


    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.initializeItems();
    }

    initializeItems() {
        this.items = [
            "BillGates",
            "Johnny Fawkes",
            "Bill Nye",
            "Lady GoGo",
            "Miley Cyrus"
        ];
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.searching = true;
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
        else {
            this.searching = false;

        }
    }


}
