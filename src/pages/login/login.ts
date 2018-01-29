
import { RegisterPage } from './../register/register';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LeaderboardPage } from '../leaderboard/leaderboard';
import { UserPage } from '../user/user';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { GlobalAPI} from '../../pages/global';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  speedapp_username:any;
  username:any;
  password:any;
  response:any;
  device_id:any;

  check_date:any;
  curr_date:any;
  test_count:any;


 login_form : FormGroup;

  constructor(public navCtrl: NavController,
              public http: Http,
              public toastcontroller: ToastController,
              public LoadingController: LoadingController,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public global: GlobalAPI,
              public viewCtrl: ViewController
              ) {

                this.login_form = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required]
                });

    this.speedapp_username = localStorage.getItem('catchapp_username');
    this.check_date = localStorage.getItem('check_date')
    this.test_count =  localStorage.getItem('test_count')
    this.curr_date=new Date().toISOString().slice(0,10);
    this.device_id = localStorage.getItem('device_id');


    if(this.test_count==null){
      localStorage.setItem('test_count','0')
    }
     
      if(this.curr_date > this.check_date){
        localStorage.setItem('test_count','0')
      }

  }

  login(){
    let loader = this.LoadingController.create({
      content: 'Please Wait'
      });
      loader.present().then(()=>{
    this.http.post('http://speedapp.ididev.com/apps/scripts/login.php',{'username':this.username,'password':this.password}).map(res => res.json()).subscribe(data=>{
    console.log(JSON.stringify(data));
    loader.dismiss();
     this.response=data.message;

     if(this.response=='Incorrect Username or Password'){

      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Incorrect Username or Password',
        buttons: ['Try Again']
      });
    alert.present();

     }else{
      this.global.menu_status= true;
       localStorage.setItem('fname',data[0].fname);
       localStorage.setItem('lname',data[0].lname);
       localStorage.setItem('school',data[0].school);
       localStorage.setItem('speedapp_username',data[0].username);
       localStorage.setItem('user_photo','http://speedapp.ididev.com/apps/user_photos/'+data[0].photo)
       this.navCtrl.push(UserPage).then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });
     }

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

  createAccount(){
    this.navCtrl.push(RegisterPage)
  }

  forgotPassword(){

  }

}
