import { error } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { ActivityService } from '../activity.service';
import { IActivity } from '../types';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit,OnDestroy {


  activityDetail:Observable<IActivity>

  constructor(
    private activityService:ActivityService,
    private acivatedRoute:ActivatedRoute,
    private modaController:ModalController,
    public navCtrl: NavController,
    private socialShare: SocialSharing,
    ) { 

    }


  ngOnInit() {
    const activityID = this.acivatedRoute.snapshot.params['activityID'];
    this.activityDetail = this.activityService.getActivity(activityID)
  }

  async openModal(){
    const videoModal = await this.modaController.create({
      component: ActivityVideoPage
    });
    return await this.activityDetail.subscribe(
      (activity)=>{
        videoModal.componentProps = {
          video_url: activity.video_url
        }
        return  videoModal.present()
      })
  }

  share(){
    this.activityDetail.subscribe(
      (activity)=>{
        this.socialShare.share(
          activity.name,
          'This is the subject',
          " ",
          activity.cropped
        ).then(


        )
      }
    )
  }

  ngOnDestroy(): void {
 
  }

}
