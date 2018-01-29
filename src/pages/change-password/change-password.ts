import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';


@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {

username:any;
password:any;

public change_password_form : FormGroup;


  constructor(public navCtrl: NavController, 
              public http: Http,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public viewctrl: ViewController,
              public LoadingController: LoadingController,
              public alertCtrl: AlertController,
              public toastcontroller: ToastController,
              ) {

    this.change_password_form = this.formBuilder.group({
      password: ['', Validators.required]
    });

    this.username=localStorage.getItem('speedapp_username');
  }

  closeModal() {
    this.viewctrl.dismiss();
  }

 
change_password(){
  let loader = this.LoadingController.create({
    content: 'Please Wait'
    });
    loader.present().then(()=>{

      this.http.post("http://speedapp.ididev.com/apps/scripts/change_password.php", { 'username': this.username, 'password': this.password }).map(res => res.json()) .subscribe(data => {
        console.log(JSON.stringify(data));
        loader.dismiss();

        let toast = this.toastcontroller.create({
          message:'Password has been changed successfully',
          duration:3000,
          position:'bottom'
        });
      toast.present();
      this.closeModal();      
      },error=>{
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please check your Internet Connectivity',
        buttons: ['Try Again']
      });
      alert.present();
    }) 

    })
}

}
