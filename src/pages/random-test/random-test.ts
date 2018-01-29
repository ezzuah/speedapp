import { Component, ViewChild } from '@angular/core';
import {  NavController, LoadingController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TestResultsPage } from '../test-results/test-results';


@Component({
  selector: 'page-random-test',
  templateUrl: 'random-test.html',
})
export class RandomTestPage {

  username:any;
  test_subject:any;
  test_year:any;
  test:any;
  uanswer:any;
  container:any;
  passage:any;
  started:any;
  time:any;
  default_time:any;

  public regis_form : FormGroup;

  constructor(public navCtrl: NavController, 
              public navparams: NavParams,
              public http: Http,
              public LoadingController: LoadingController,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public toastcontroller: ToastController,
              public viewCtrl: ViewController) {

                this.regis_form = this.formBuilder.group({
                  uanswer: ['', Validators.required],
                  quest_id:['']
                });
    
          this.test_subject= 'Int. Science'
          this.test_year= '-'
          this.username= localStorage.getItem('speedapp_username');
          this.container=[];
          localStorage.setItem('test_type','test');

          this.default_time = 'Fri Nov 01 2000 00:40:00'
          
          this.started = false;
          this.time = new Date(this.default_time);
          this._timerTick();

  }

  ngOnInit(){
    let loader = this.LoadingController.create({
    content: 'Loading Test...'
    });
    loader.present().then(()=>{
    this.http.post('http://speedapp.ididev.com/apps/scripts/random_test.php',{'test':'test'}).map(res => res.json()).subscribe(data =>{
            console.log(JSON.stringify(data));
            this.test= data;
            this.passage=data[0].Passage;
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
  
submit_test(){

  let loader = this.LoadingController.create({
    content: 'Submitting Test...'
    });
    loader.present().then(()=>{

for(var i=0;i<this.test.length;i++) {
  this.container.push({'useranswer':this.test['uanswer'+i],'quest_id':this.test[i].Quest_ID,'ans_letter':this.test[i].Answer_Letter,'ans':this.test[i].Ans,'subject':this.test_subject,'quest_year':this.test_year,'username':this.username});
  } 
  //console.log(JSON.stringify(this.container))
  this.http.post('http://speedapp.ididev.com/apps/scripts/test_insert.php',{'items':(JSON.stringify(this.container))}).subscribe(data =>{
  //console.log(data);
  loader.dismiss();
  this.navCtrl.push(TestResultsPage).then(() => {
    // first we find the index of the current view controller:
    const index = this.viewCtrl.index;
    // then we remove it from the navigation stack
    this.navCtrl.remove(index);
  });


    })
  })
  
}

private _timerTick() {
  
          this.time.setSeconds(this.time.getSeconds(), -1);
          
          if (this.time.getHours() === 0 && this.time.getMinutes() === 0 && this.time.getSeconds() === 0) {
            //console.log('WE ARE DONE!');
            let loader = this.LoadingController.create({
              content: 'Submitting Test...'
              });
              loader.present().then(()=>{
          
          for(var i=0;i<this.test.length;i++) {
            this.container.push({'useranswer':this.test['uanswer'+i],'quest_id':this.test[i].Quest_ID,'ans_letter':this.test[i].Answer_Letter,'ans':this.test[i].Ans,'subject':this.test_subject,'quest_year':this.test_year,'username':this.username});
            } 
            //console.log(JSON.stringify(this.container))
            this.http.post('http://speedapp.ididev.com/apps/scripts/test_insert.php',{'items':(JSON.stringify(this.container))}).subscribe(data =>{
            //console.log(data);
            loader.dismiss();
            this.navCtrl.push(TestResultsPage)
              })
            })
            this.started = false;
          }else{
            if (this.time.getHours() === 0 && this.time.getMinutes() === 5 && this.time.getSeconds() === 0){
              let toast = this.toastcontroller.create({
                message:'You have 5 minutes remaining',
                duration:5000,
                position:'bottom'
              });
            toast.present();
            }
          }
        setTimeout(() => this._timerTick(), 1000);
      }
}
