import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import {CameraOptions,Camera} from '@ionic-native/camera/ngx' 
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  myImage;
  myStoredProfileImage: Observable<string>

  constructor(
     private alertController:AlertController,
     private camera:Camera,
     private angularFireStore:AngularFirestore,
     private angularFireAuth:AngularFireAuth,
     public afAuth: AngularFireAuth
     ) {}

  async selectImageSource(){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      targetHeight:200,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.CAMERA
    }

    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      targetHeight:200,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    const alert = await this.alertController.create(
      {
        header: 'Select Source',
        message: 'Pick a source for your image',
        buttons:[
          {
            text:'Camera',
            handler:()=>{
              this.camera.getPicture(cameraOptions).then(
                async (imageData)=>{
                 // this.myImage = "data:image/jpeg;base64" + imageData;
                  const image = "data:image/jpeg;base64" + imageData;
                  this.angularFireStore
                  .collection('users')
                  .doc((await this.angularFireAuth.currentUser).uid)
                  .set({
                    imageSrc:image
                  })
                }
              )
            }
          },
          {
            text:'Gallery',
            handler:()=>{
              this.camera.getPicture(galleryOptions).then(
                async (imageData)=>{
              // this.myImage = "data:image/jpeg;base64" + imageData
                const image = "data:image/jpeg;base64" + imageData;
                this.angularFireStore
                .collection('users')
                .doc((await this.angularFireAuth.currentUser).uid)
                .set({
                     imageSrc:image
                  })
                }
              )
            }
          },
        ]
      });

      await alert.present();
  }

}
