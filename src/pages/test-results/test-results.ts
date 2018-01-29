import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-test-results',
  templateUrl: 'test-results.html',
})
export class TestResultsPage {

  results:any;
  loader:any;  username:any;
  test_subject:any;
  test_year:any;
  status:any;
  total:any;
  school:any;
  test_date:any;
  test_count:any;
  test_type:any;
  total_questions:any;
  comp_id:any;
  check_date:any;
  done_competitors:any;
  done_total_users:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public LoadingController: LoadingController,
              public admob: AdMobFree,
              public alertCtrl: AlertController) {

              this.username =localStorage.getItem('speedapp_username');
              this.school = localStorage.getItem('school');
              this.test_type = localStorage.getItem('test_type');
              this.comp_id = localStorage.getItem('comp_id');

              this.showInterstitial();

            
  }

  showInterstitial() {
    let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-3806419127795788/7240772373'
    };

    this.admob.interstitial.config(bannerConfig);

    this.admob.interstitial.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
}

  ionViewDidLoad() {
  this.test_count = localStorage.getItem('test_count')
   localStorage.setItem('check_date',new Date().toISOString().slice(0,10));
    this.test_count=parseFloat(this.test_count)+1
    localStorage.setItem('test_count',this.test_count)
    
    let loader = this.LoadingController.create({
      content: 'Loading Results...'
      });
      loader.present().then(()=>{
    this.http.get('http://speedapp.ididev.com/apps/scripts/results.php?username='+this.username).map(res => res.json()).subscribe(data=>{
      console.log(JSON.stringify(data))
      this.results = data;
      this.total = data[0].total;
      this.test_date = data[0].rdate_test;
      this.test_subject = data[0].subject;
      this.test_year = data[0].quest_year;
      this.total_questions= data.length;
      loader.dismiss();

      this.http.post('http://speedapp.ididev.com/apps/scripts/save_score_script.php',{
        'username':this.username,
        'subject':this.test_subject,
        'score':this.total,
        'school':this.school,
        'sch_level':'SHS',
        'rdate_test':this.test_date
      }).subscribe(data =>{
        console.log(data);
      },err=>{
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Please check your Internet Connectivity',
          buttons: ['OK']
        });
      alert.present();
    })
        })
      })
}
}
