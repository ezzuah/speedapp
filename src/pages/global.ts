import { Component, Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';




@Injectable()

export class GlobalAPI {

  public menu_status: boolean ;


constructor(public toast: ToastController) 
           {    
            
  }
}