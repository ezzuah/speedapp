import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DefinitionsPage } from '../definitions/definitions';
@Component({
  selector: 'page-climatic-changes',
  templateUrl: 'climatic-changes.html',
})
export class ClimaticChangesPage {

  @ViewChild(Content) content: Content;
  showSearchbar:boolean;
  search:any;
  results:any;
  loader:any;
  constructor(public navCtrl: NavController,
    public http: Http,
    public modalCtrl: ModalController) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClimaticChangesPage');
  }

  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
    this.content.scrollToTop();
  }

  searchDefinition(){
    this.loader=true;
    this.http.get('http://speedapp.ididev.com/apps/scripts/definitions.php?search='+this.search).map(res=>res.json()).subscribe(data=>{
      console.log(JSON.stringify(data));
      this.results=data;
      this.loader=false;
    })

  }

  goToDefinition($event,item){
    let myModal = this.modalCtrl.create(DefinitionsPage,{'title':item.term,'definition':item.details});
    myModal.present();
    this.search='';
    }



}
