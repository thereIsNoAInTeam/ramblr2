import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {PostPage} from "../post/post";
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";

@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html'
})
export class FeedPage {
    postArray: any[];


    constructor(public navCtrl: NavController, private userDatabase: UserDatabase) {

    }

    newPost(): void {
        this.navCtrl.push(PostPage);
    }
}
