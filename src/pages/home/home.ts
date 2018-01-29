import { LeaderboardPage } from './../leaderboard/leaderboard';
import { PhysicsPage } from './../physics/physics';
import { AgriculturePage } from './../agriculture/agriculture';
import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, AlertController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BiologyPage } from '../biology/biology';
import { ChemistryPage } from '../chemistry/chemistry';

import { AppRate } from '@ionic-native/app-rate';
import {GlobalAPI} from '../../pages/global';
import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  speedapp_username:any;
  installedVersion:any;
  check_date:any;
  curr_date:any;
  test_count:any;

  constructor(public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public global: GlobalAPI,
              public appRate: AppRate,
              public http: Http,
              public alertCtrl: AlertController,
              public platform: Platform,
              public iab: InAppBrowser) {

             this.speedapp_username = localStorage.getItem('speedapp_username');
             this.check_date = localStorage.getItem('check_date')
             this.test_count =  localStorage.getItem('test_count')
             this.curr_date=new Date().toISOString().slice(0,10);
             this.installedVersion = localStorage.getItem('app_version')

             if(this.speedapp_username!=undefined){
              this.global.menu_status= true;
            }

             if(this.test_count==null){
              localStorage.setItem('test_count','0')
            }
             
              if(this.curr_date > this.check_date){
                localStorage.setItem('test_count','0')
              }

                this.appRate.preferences = {
                  inAppReview: true,
                  displayAppName: 'SpeedApp Integrated Science',
                  usesUntilPrompt: 7,
                  promptAgainForEachNewVersion: false,
                  storeAppURL: {
                    ios: '1216856883',
                    android: 'https://play.google.com/store/apps/details?id=com.SpeedAppScience.com'
                  },
                  customLocale: {
                    title: 'Do you enjoy %@?',
                    message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
                    cancelButtonLabel: 'No, Thanks',
                    laterButtonLabel: 'Remind Me Later',
                    rateButtonLabel: 'Rate It Now'
                  },
                  callbacks: {
                    onRateDialogShow: function(callback){
                      console.log('rate dialog shown!');
                    },
                    onButtonClicked: function(buttonIndex){
                      console.log('Selected index: -> ' + buttonIndex);
                    }
                  }
                };
           
                //Opens the rating immediately no matter what preferences you set
                this.appRate.promptForRating(false);
              
            
  }

  ionViewDidLoad(){
    this.http.post('http://speedapp.ididev.com/apps/scripts/version.php',{'test':'test'}).map(res=>res.json()).subscribe(data=>{
    console.log(data.version)
    if(data.version > this.installedVersion){
      let confirm = this.alertCtrl.create({
        title: 'Attention',
        message: 'The version of SpeedApp Int. Science you are using is out of date. Download the latest to enjoy better experience',
        buttons: [
          {
            text: 'No',
            handler: () => {
              this.platform.ready().then(() => {
                //this.platform.registerBackButtonAction(() => {
                    navigator['app'].exitApp();                
                //});
            });
            }
          },
          {
            text: 'Yes',
            handler: () => {
              const browser = this.iab.create('https://play.google.com/store/apps/details?id=com.SpeedAppScience.com','_self',{location:'no'}); 
            }
          }
        ]
      });
      confirm.present();
  
    }else{
      console.log('your version is up to date')
    }
    })
  }


 goTouserAccount(){
   console.log(this.speedapp_username);
   if(this.speedapp_username!=undefined || this.speedapp_username!=null){
     this.navCtrl.push(UserPage)
   }else{
    this.navCtrl.push(LoginPage)
   }
 }

  agriculture(){
    this.navCtrl.push(AgriculturePage)
  }

  biology(){
    this.navCtrl.push(BiologyPage)
  }

  chemistry(){
    this.navCtrl.push(ChemistryPage)
  }

  physics(){
    this.navCtrl.push(PhysicsPage);
  }

}
