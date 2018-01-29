import { Component, ViewChild } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  privacy:any;

  constructor(public navCtrl: NavController,
              public http: Http) {
  }

  ionViewDidLoad() {
    this.http.post('http://speedapp.ididev.com/apps/privacy/privacy.php',{'test':'test'}).map(res=> res.json()).subscribe(data=>{
    this.privacy=data[0].privacy;
    })
  }

}
