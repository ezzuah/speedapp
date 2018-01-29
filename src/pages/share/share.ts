import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  constructor(public navCtrl: NavController, 
              public viewctrl:ViewController, 
              public social:SocialSharing, 
              public toastcontroller: ToastController) {

  }
    closeModal() {
    this.viewctrl.dismiss();
  }


 
  share_whatsapp(){
    this.social.canShareVia('whatsapp').then(()=>{
      this.social.shareViaWhatsApp("Check this out, get Integrated Science notEs on your phone. Its handy,convenient, with simplified notes, well illustrated 3D diagrams, in-built scientific-word search tools, sample examinable questions and many more all for free on your android device. Learn in style.", null /*Image*/,  "https://play.google.com/store/apps/details?id=com.SpeedAppScience.com" /* url */)
    },()=>{
      let toast = this.toastcontroller.create({
        message:'WhatsApp Messenger is not installed on your device',
        duration:3000,
        position:'bottom'
      });
      toast.present();

    })
 
  }

  share_twiiter(){
    this.social.canShareVia('twitter').then(()=>{
      this.social.shareViaTwitter("Check this out, get Integrated Science notEs on your phone. Its handy,convenient, with simplified notes, well illustrated 3D diagrams, in-built scientific-word search tools, sample examinable questions and many more all for free on your android device. Learn in style.", null /*Image*/,  "https://play.google.com/store/apps/details?id=com.SpeedAppScience.com" /* url */)
    },()=>{
      let toast = this.toastcontroller.create({
        message:'Twitter is not installed on your device',
        duration:3000,
        position:'bottom'
      });
      toast.present();

    })
 
  }
 
  share_facebook(){
    this.social.canShareVia('facebook').then(()=>{
      this.social.shareViaFacebookWithPasteMessageHint("Check this out, get Integrated Science notEs on your phone. Its handy,convenient, with simplified notes, well illustrated 3D diagrams, in-built scientific-word search tools, sample examinable questions and many more all for free on your android device. Learn in style.", null /*Image*/,  "https://play.google.com/store/apps/details?id=com.SpeedAppScience.com" /* url */)
    },()=>{
      let toast = this.toastcontroller.create({
        message:'Facebook is not installed on your device',
        duration:3000,
        position:'bottom'
      });
      toast.present();

    })
 
  }

}
