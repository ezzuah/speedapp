import { Component, ViewChild } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-push-message',
  templateUrl: 'push-message.html',
})
export class PushMessagePage {

  message:any;

  constructor(public navCtrl: NavController,
              public http: Http) {
  }

  ionViewDidLoad() {
    this.http.post('http://speedapp.ididev.com/apps/push/message.php',{'test':'test'}).map(res=> res.json()).subscribe(data=>{
    this.message=data[0].message;
    })
  }

}
