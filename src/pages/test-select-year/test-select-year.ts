import { Component, ViewChild } from '@angular/core';
import {  NavController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { RandomTestPage } from '../random-test/random-test';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { TestPage } from '../test/test';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-test-select-year',
  templateUrl: 'test-select-year.html',
})
export class TestSelectYearPage {

  years:any;
  test_count:any;
  username:any;

  constructor(public navCtrl: NavController, 
    public LoadingController: LoadingController,
    public http: Http,
    public navparams: NavParams,
    public alertCtrl: AlertController,
    public admob: AdMobFree
     ) {

    this.test_count= localStorage.getItem('test_count');
    this.username = localStorage.getItem('speedapp_username');
  }


  ionViewDidLoad(){
    let loader = this.LoadingController.create({
    content: 'Please Wait...'
    });
    loader.present().then(()=>{
    this.http.post('http://speedapp.ididev.com/apps/scripts/year.php',{'test':'test'}).map(res => res.json()).subscribe(data =>{
            console.log(JSON.stringify(data));
            this.years= data;
            loader.dismiss();
        },err=>{
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Please check your Internet Connectivity',
            buttons: ['OK']
          });
        alert.present();
      })
    });
  }

  randomTest(){
    if(this.username==undefined ||  this.username==null){
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please Login first',
        buttons: ['OK']
      });
    alert.present();
      this.navCtrl.push(LoginPage);
    }else{
      this.navCtrl.push(RandomTestPage);
    }
 
  }

  writeTest($event,item){
    if(this.test_count==3){
      let confirm = this.alertCtrl.create({
        title: 'Alert',
        message: 'You have reached the maximum number of tests for a day. Watch an Ad to continue?',
        buttons: [
          {
            text: 'No, Later',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Yes,Watch Ad',
            handler: () => {

              let bannerConfig: AdMobFreeBannerConfig = {
                isTesting: false, // Remove in production
                autoShow: true,
                id: 'ca-app-pub-3806419127795788/8606303861'
            };
            this.admob.rewardVideo.config(bannerConfig);
            this.admob.rewardVideo.prepare().then(() => {
              this.admob.rewardVideo.show();
              this.navCtrl.push(TestPage,item)
              localStorage.setItem('test_year',item.Quest_Year)
            }).catch(e => console.log(e));
            }
          }
        ]
      });
      confirm.present();
    }else{
      this.navCtrl.push(TestPage,item)
      localStorage.setItem('test_year',item.Quest_Year)
    }
 
  }

}
