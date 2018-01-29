import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, ModalController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ChangePasswordPage } from './../change-password/change-password';
import {Camera, PictureSourceType} from '@ionic-native/camera';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  default_switch:any;
  fname:any;
  lname:any;
  school:any;
  username:any;
  scoresheet:any;
  highest:any;
  lowest:any;
  total_test:any;
  total_score:any;
  competitions:any;
  user_photo:any;
  device_id:any;
 
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public camera:Camera,
              public Transfer: FileTransfer,
              public file: File,
              public toastcontroller: ToastController) {

    this.default_switch = "account";

    this.fname = localStorage.getItem('fname');
    this.lname = localStorage.getItem('lname');
    this.school = localStorage.getItem('school');
    this.username = localStorage.getItem('speedapp_username');
    this.user_photo = localStorage.getItem('user_photo');
    this.device_id = localStorage.getItem('device_id');
   


    this.http.post('http://speedapp.ididev.com/apps/scripts/update_device_id.php',{'username':this.username,'device_id':this.device_id})
    .map(res => res.json()).subscribe(data=>{
      console.log(JSON.stringify(data));
    })
  }

  ionViewWillEnter(){
    this.http.get('http://speedapp.ididev.com/apps/user/scoresheet.php?username='+this.username).map(res => res.json()).subscribe(data=>{
      //console.log(JSON.stringify(data));
      this.scoresheet=data;

      this.http.get('http://speedapp.ididev.com/apps/user/score_highest.php?username='+this.username).map(res => res.json()).subscribe(data=>{
        //console.log(JSON.stringify(data[0].high));
        this.highest=data[0].high;

        this.http.get('http://speedapp.ididev.com/apps/user/score_lowest.php?username='+this.username).map(res => res.json()).subscribe(data=>{
          console.log(JSON.stringify(data));
          this.lowest=data[0].low;

          this.http.get('http://speedapp.ididev.com/apps/user/score_total.php?username='+this.username).map(res => res.json()).subscribe(data=>{
            //console.log(JSON.stringify(data));
            this.total_score=data[0].total_score;

            })
          })
        })
    })

  }

  goto_password_change(){
    let myModal = this.modalCtrl.create(ChangePasswordPage);
    myModal.present();
    }


    change_photo() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Change Photo',
        buttons: [
          {
            text: 'Use Camera',
            //icon: 'camera',
            handler: () => {
            let options = {
                quality: 90,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 800,
                sourceType:this.camera.PictureSourceType.CAMERA
                      };
                      this.camera.getPicture(options).then((imageData) => {
                     const fileTransfer: FileTransferObject = this.Transfer.create();
      
                    var options1 = {
                         fileKey: 'file',
                         fileName: 'name.jpg',
                         headers: {}
                      }
                  fileTransfer.upload(imageData,'http://speedapp.ididev.com/apps/user/upload_photo.php', options1)
                   .then((data) => { 
                     this.http.post('http://speedapp.ididev.com/apps/user/change_photo.php',{
                       'username':this.username,
                       'photo':data.response}).map(res=>res.json()).subscribe(data=>{
                     })
                     localStorage.setItem('user_photo','http://testplay.ididev.com/apps/user_photos/'+data.response);
                     this.user_photo.push('http://speedapp.ididev.com/apps/user_photos'+data.response);
                   }, (err) => {
                    let alert = this.alertCtrl.create({
                      title: 'Error!',
                      subTitle: 'Sorry, There was an error uploading photo',
                      buttons: ['Try Again']
                    });
                  alert.present();
                   });
    
                    });
                
                    }
                },{
            text: 'Choose From Gallery',
            //icon: 'image',
            handler: () => {
              let options = {
                quality: 90,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 800,
                sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
                      };
                      this.camera.getPicture(options).then((imageData) => {
                     const fileTransfer: FileTransferObject = this.Transfer.create();
      
                    var options1 = {
                         fileKey: 'file',
                         fileName: 'name.jpg',
                         headers: {}
                      }
                  fileTransfer.upload(imageData,'http://speedapp.ididev.com/apps/user/upload_photo.php', options1)
                   .then((data) => { 
                     this.http.post('http://speedapp.ididev.com/apps/user/update_photo.php',{
                       'username':this.username,
                       'photo':data.response}).map(res=>res.json()).subscribe(data=>{
                     })
                     localStorage.setItem('user_photo','http://speedapp.ididev.com/apps/user_photos/'+data.response);
                     this.user_photo.push('http://speedapp.ididev.com/apps/user_photos'+data.response);

                   }, (err) => {
                    let alert = this.alertCtrl.create({
                      title: 'Error!',
                      subTitle: 'Sorry, There was an error uploading photo',
                      buttons: ['Try Again']
                    });
                  alert.present();
                   });
                
                    });
             
            }
                 },{
            text: 'Cancel',
            //icon: 'close-circle',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
    

}
