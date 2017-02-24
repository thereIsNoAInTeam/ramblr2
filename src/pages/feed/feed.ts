import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {
    postAbout: string;
    postDate: string;
    postComments: string;
    postPic: any;


  constructor(public navCtrl: NavController) {
      //Camera.getPicture(C).then((imageData) => {

          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
      //    let base64Image = 'data:image/jpeg;base64,' + imageData;
      //}, (err) => {
          // Handle error
      //});
  }




}
