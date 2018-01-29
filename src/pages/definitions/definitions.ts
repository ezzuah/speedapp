import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-definitions',
  templateUrl: 'definitions.html',
})
export class DefinitionsPage {
  title:any;
  definition:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewctrl: ViewController) {
  }

  ionViewDidLoad() {
    this.title= this.navParams.get('title');
     this.definition = this.navParams.get('definition');
  }

  closeModal() {
    this.viewctrl.dismiss();
  }

}
