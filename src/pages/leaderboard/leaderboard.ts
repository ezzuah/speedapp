import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

display:any;
overall:any;
subjects:any;
posts = [];
page=0;
itemsdisplayed=0
numofposts=0
play:any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public LoadingController: LoadingController,
              public alertCtrl: AlertController) {
              this.display='overall';
              this.play=true;

              
  }

 
  loadData(infiniteScroll?: any): void {
    let loader = this.LoadingController.create({
        content: 'Please Wait'
    });

    loader.present().then(()=>{
 this.http.get('http://speedapp.ididev.com/apps/leaderboard/overall.php?page='+this.page).map(res => res.json()).subscribe(data=>{
   console.log(JSON.stringify(data));
  this.numofposts=this.numofposts+data.length;
  this.itemsdisplayed = this.itemsdisplayed + 9;

  if(this.itemsdisplayed > this.numofposts) {
    // Hide the infiniteScroll if there's no more data
    this.play = false;
}

setTimeout(() => {
  for(var i=0;i<data.length;i++) {
      this.numofposts = data.length;
      this.posts.push(data[i]);
  }
        // Check if it's not null/undefined before calling the complete method
        if(infiniteScroll) {
            infiniteScroll.complete();
        }

      }, 500);
      },err=>{
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Please check your Internet Connectivity',
          buttons: ['OK']
        });
        alert.present();
      });

      this.page=this.page+1;
      loader.dismiss();

   //console.log(JSON.stringify(data));
   //this.overall=data;
  })
}


  ionViewDidLoad(infiniteScroll) {
    this.loadData();
  }
}
