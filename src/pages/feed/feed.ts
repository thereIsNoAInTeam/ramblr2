import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {PostPage} from "../post/post";
import {UserDatabase} from "../../providers/user-database";



@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html'
})
export class FeedPage {
    postAbout: string;
    postDate: string;
    postComments: string;
    postPic: any;

    feedArray: any[] = [
        {name: "Fred Jones", post: "Hey hey kids!", time: "Feb 28th, 2017"},
        {name: "Joe Gatto", post: "Larry!!!!!!", time: "Feb 28th, 2017"},
        {name: "James S. Murray", post: "I want my mommy!", time: "Feb 28th, 2017"},
        {name: "Sal Volcano", post: "I will never forgive you!!", time: "Feb 28th, 2017"},
        {name: "Brian Quinn", post: "Hey moustache, what's up?", time: "Feb 28th, 2017"},
        {name: "Impractical Jokers", post: "Prepare for something amazing!!", time: "Feb 28th, 2017"}
    ];

    constructor(public navCtrl: NavController, private userDatabase: UserDatabase) {

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
