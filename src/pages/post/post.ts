import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private userDatabase: UserDatabase) {
        this.postSubscription = this.userDatabase.myPosts$.subscribe(posts => {
            this.postArray = posts;
        });
        this.userDatabase.getPosts();
    }

    ionViewDidLoad() {
    }

    addPost() {
        if (this.postArray) {
            this.postArray.push({post: this.post, time: Date.now()})
        }
        else {
            this.postArray = [{post: this.post, time: Date.now()}];
        }
        if (this.post.length < 500) {
            let alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Bio length must be a minimum of 500 characters",
                buttons: ["Got it :)"]
            });
            alert.present()
        }
        else {

            this.navCtrl.pop();
            this.userDatabase.updatePosts(this.postArray)
        }
    }
}



