import { PrivacyPage } from './../privacy/privacy';
import { UserPage } from './../user/user';
import { Component, ViewChild } from '@angular/core';
import {  NavController, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalAPI} from '../../pages/global';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  firstname:any;
  lastname:any;
  gender:any;
  country:any;
  school:any;
  phone_number:any;
  username:any;
  password:any;
  response:any;
  device_id:any;
  level:any;

  public regis_form : FormGroup;

  constructor(public navCtrl: NavController, 
              public formBuilder: FormBuilder,
              public LoadingController: LoadingController,
              public toastcontroller: ToastController,
              public alertCtrl: AlertController,
              public http: Http,
              public global: GlobalAPI,
              public viewCtrl: ViewController) {


    this.regis_form = this.formBuilder.group({
      firstname: ['', Validators.required],
       lastname: ['', Validators.required],
       gender: [''],
       country: [''],
       school: [''],
       username: ['', Validators.required],
       password: ['', Validators.required]
    });
    this.device_id = localStorage.getItem('device_id');
    this.level = localStorage.getItem('level')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){

            let loader = this.LoadingController.create({
              content: 'Please Wait'
              });
              loader.present().then(()=>{
  
            this.http.post("http://speedapp.ididev.com/apps/scripts/register.php",{ 
              'fname': this.firstname, 
              'lname': this.lastname, 
              'gender': this.gender, 
              'country': this.country,
              'school':this.school,
              'device_id':this.device_id,
              'username':this.username,
              'level': this.level,
              'password':this.password}).map(res => res.json()) .subscribe(data => {
              console.log(JSON.stringify(data));
              this.response=data.message;
              loader.dismiss();
              if(this.response=='Username is Already Taken'){
                let alert = this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: 'Username is Already Taken',
                  buttons: ['Try Again']
                });
              alert.present();

              }else{
                this.global.menu_status= true;
                localStorage.setItem('fname',this.firstname);
                localStorage.setItem('lname',this.lastname);
                localStorage.setItem('school',this.school);
                localStorage.setItem('catchapp_username',this.username);
                localStorage.setItem('user_photo','http://speedapp.ididev.com/apps/user_photos/null')
             
              //loader.dismiss();
                let toast = this.toastcontroller.create({
                  message:'Registration was successful',
                  duration:3000,
                  position:'bottom'
                });
                this.navCtrl.push(UserPage).then(() => {
                  // first we find the index of the current view controller:
                  const index = this.viewCtrl.index;
                  // then we remove it from the navigation stack
                  this.navCtrl.remove(index);
                });
            toast.present();
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
          })

    }
    privacy(){
      this.navCtrl.push(PrivacyPage)
    }
}
