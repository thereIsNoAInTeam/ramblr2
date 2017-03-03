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
    postArray: any[] = [];
    postSubscription: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userDatabase: UserDatabase, private alertCtrl: AlertController) {
        this.postSubscription = this.userDatabase.myPosts$.subscribe(posts => {
            if(posts) {
                this.postArray = posts;
            }
        });
        this.userDatabase.getPosts();
    }

    ionViewDidLoad() {
    }

    addPost() {
        if (this.post.length < 500) {
            let alert = this.alertCtrl.create({
                title: "Hold your horses!",
                subTitle: "You need to have at least 500 characters to post",
                buttons: ["Oh yeah, my bad..."]
            });
            alert.present();
        }
        else {
            this.navCtrl.pop();
            this.postArray.push({post: this.post, time: Date.now()});
            this.userDatabase.updatePosts(this.postArray);
        }
    }
}
