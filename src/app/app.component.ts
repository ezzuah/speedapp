import { LeaderboardPage } from './../pages/leaderboard/leaderboard';
import { AboutPage } from './../pages/about/about';
import { TestSelectYearPage } from './../pages/test-select-year/test-select-year';
import { BookmarksPage } from './../pages/bookmarks/bookmarks';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { GlobalAPI} from '../pages/global'
import { Network } from '@ionic-native/network';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SharePage } from '../pages/share/share';
import { PushMessagePage } from '../pages/push-message/push-message';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;



  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public sqlite: SQLite,
              public push: Push,
              public admob: AdMobFree,
              public global: GlobalAPI,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public network: Network
              ) {

     this.global.menu_status;
    this.initializeApp();
    this.initPushNotification();

  }

  initializeApp() {
    localStorage.setItem('level','SHS');
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'speedapp_int_science.db',
        location: 'default'
  })
  .then((db: SQLiteObject) => {
  db.executeSql('CREATE TABLE IF NOT EXISTS bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT,subject,topic,url)', {})
  .then(() => console.log('Executed SQL'))
  .catch(e => console.log(e));
  })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-3806419127795788/4447088073'
    };

    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
       // success
    }).catch(e => console.log(e));
    
      localStorage.setItem('app_version','1.0.4');
      let disconnectSub = this.network.onDisconnect().subscribe(() => {
        console.log('you are offline');
        //localStorage.setItem('internet','available');
      });
      
      let connectSub = this.network.onConnect().subscribe(()=> {
        console.log('you are online');
        //localStorage.setItem('internet','not available');
        let toast = this.toastCtrl.create({
          message:'Images and Tests are disabled when your device is offline',
          duration:5000,
          position:'bottom'
        });
      toast.present();
      });
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '689719681778'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      localStorage.setItem('device_id',data.registrationId)
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.coldstart) {
        if(data.additionalData.page=="admin"){
          this.nav.push(PushMessagePage)
        }

      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        //this.nav.push(DetailsPage, { message: data.message });
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToBookmarks(){
    this.nav.push(BookmarksPage);
  }

  goToPastQuestions(){
    this.nav.push(TestSelectYearPage)
  }

  goToLeaderBoard(){
    this.nav.push(LeaderboardPage)
  }

  goToShare(){
    this.nav.push(SharePage)

  }

  goToAbout(){
    this.nav.push(AboutPage)

  }

  goToLogOut(){
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            localStorage.removeItem('catchapp_username');
            localStorage.removeItem('school');
            localStorage.removeItem('fname');
            localStorage.removeItem('lname');
            localStorage.removeItem('test_subject');
            localStorage.removeItem('test_year');
            localStorage.removeItem('user_photo');
            localStorage.removeItem('speedapp_username');
            this.global.menu_status= false;
            this.nav.push(HomePage);
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();

  }
}
