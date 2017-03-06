import {Component, OnDestroy} from '@angular/core';

import {NavController} from 'ionic-angular';
import {PostPage} from "../post/post";
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";

@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html'
})
export class FeedPage implements OnDestroy{
    feedArray: any[] = [];
    feedSubscription: Subscription;

    constructor (public navCtrl: NavController, private userDatabase: UserDatabase) {
        this.feedSubscription = this.userDatabase.myFeed$.subscribe(feed => {
            console.log(feed);
            if(feed) {
                this.feedArray = feed;
                this.feedArray.sort(function (a, b) {
                    return b.time - a.time;
                })
            }
        });
        this.userDatabase.getFeed();
    }

    ngOnDestroy(): void {
        this.feedArray = [];
        this.feedSubscription.unsubscribe();
    }

    ionViewDidLeave(): void {
        this.feedArray = [];
        this.feedSubscription.unsubscribe();
    }

    newPost(): void {
        this.navCtrl.push(PostPage);
    }

    showPost(): void {
        console.log("So far, nothing, need another page for a post...will probably need to move the liking or commenting out or figure out a way to stop this from triggering...");
    }

    addComment(): void {
        console.log("Probably want another page or something to add a comment");
    }

    likeMe(): void {
        console.log("Increasing a counter of likes is easy. Checking if I've already liked it, harder")
    }
}
