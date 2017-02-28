import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDatabase} from "../../providers/user-database";
import {Subscription} from "rxjs";

@Component({
    selector: 'page-post',
    templateUrl: 'post.html'
})
export class PostPage {
    post: string = "";
    postArray: any[];
    postSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase) {
        this.postSubscription = this.userDatabase.myPosts$.subscribe(posts => {
            console.log(posts)
            this.postArray = posts;
        });
        this.userDatabase.getPosts();
    }

    ionViewDidLoad() {
    }

    addPost() {
        if (this.postArray) {
            console.log("I'm not empty");
            this.postArray.push({post: this.post, time: Date.now()})
        }
        else {
            this.postArray = [{post: this.post, time: Date.now()}];
            console.log("I am empty");
        }
        this.navCtrl.pop();
        console.log(this.postArray);
        console.log(this.post);
        // this.userDatabase.addNewPost(this.post);
    }

}
