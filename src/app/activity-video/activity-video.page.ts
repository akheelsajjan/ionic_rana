import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-activity-video',
  templateUrl: './activity-video.page.html',
  styleUrls: ['./activity-video.page.scss'],
})
export class ActivityVideoPage implements OnInit {

  videosURL:string;

  constructor(private modalController:ModalController,private navParams:NavParams) { }

  ngOnInit() {
    this.videosURL  = this.navParams.get('video_url');
  }

  closeModal(){
    this.modalController.dismiss();

  }

}
