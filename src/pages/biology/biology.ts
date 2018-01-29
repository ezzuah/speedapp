import { DigestionPage } from './../digestion/digestion';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DentitionPage } from '../dentition/dentition';
import { RespirationPage } from '../respiration/respiration';
import { ReproductionMammalsPage } from '../reproduction-mammals/reproduction-mammals';
import { GrowthMammalsPage } from '../growth-mammals/growth-mammals';
import { TransportMammalsPage } from '../transport-mammals/transport-mammals';
import { EndocrineSystemPage } from '../endocrine-system/endocrine-system';
import { SketalSystemPage } from '../sketal-system/sketal-system';
import { GeneticsPage } from '../genetics/genetics';
import { BioTechnologyPage } from '../bio-technology/bio-technology';
import { EcosystemPage } from './../ecosystem/ecosystem';
import { SensesPage } from './../senses/senses';
import { NervousSystemPage } from './../nervous-system/nervous-system';
import { ExcretionPage } from './../excretion/excretion';
import { ReproductionPlantsPage } from './../reproduction-plants/reproduction-plants';
import { PhotosynthesisPage } from './../photosynthesis/photosynthesis';
import { TransportPlantsPage } from './../transport-plants/transport-plants';
import { CellStructurePage } from './../cell-structure/cell-structure';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-biology',
  templateUrl: 'biology.html',
})
export class BiologyPage {

  topics:any;
  showSearchbar:boolean;
  topicSave:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sqlite: SQLite,
              public toastCtrl: ToastController) {
    this.initializeItems();
  }

  initializeItems() {
    this.topics=[
 
      {
          "topic": "Cell Structure",
          "tip": 'All organisms are composed of self reproducing units called cells',
          "url":CellStructurePage,
          "icon":'assets/imgs/icons_biology/cell.png'
      },
      {
          "topic": "Transport in Plant",
          "tip": 'Each cell is itself a living thing. A cell has a boundary which separates it from neighboring cells',
          "url":TransportPlantsPage,
          "icon":'assets/imgs/icons_biology/plant.png'
      },
      {
          "topic": "Photosynthesis",
          "tip": 'Do plants have alimentary canal like humans? Howdo they get food?',
          "url":PhotosynthesisPage,
          "icon":'assets/imgs/icons_biology/biology.png'
      },
      {
          "topic": "Reproduction in Plants",
          "tip": 'We have been seeing our mangoes, oranges,plantains, etc still in existence and of the same characteristics',
          "url":ReproductionPlantsPage,
          "icon":'assets/imgs/icons_biology/plant2.png'
      },
      {
          "topic": "Dentition",
          "tip": 'Each of us has got some set of teeth. At your age, I know you are aware that these teeth help us to break most of the food we take in down',
          "url":DentitionPage,
          "icon":'assets/imgs/icons_biology/dentiton.png'
      },

      {
        "topic": "Digestion",
        "tip": 'Sometimes we eat mainly because our bellies are light',
        "url":DigestionPage,
        "icon":'assets/imgs/icons_biology/digestion.png'
    },

      {
          "topic": "Respiration",
          "tip": 'Breathe in, breathe out&rsquo; was an exercise you may have partook when you were in the primary school',
          "url":RespirationPage,
          "icon":'assets/imgs/icons_biology/biology.png'
      },
      {
          "topic": "Excretion",
          "tip": 'The body takes the essential materials it will need from the food and water we take in',
          "url":ExcretionPage,
          "icon":'assets/imgs/icons_biology/biology.png'
      },
      {
          "topic": "Reproduction in Mammals",
          "tip": 'How did I come into the world? Mostly we seem not to get answers to this and many other mind puzzling questions like this one',
          "url":ReproductionMammalsPage,
          "icon":'assets/imgs/icons_biology/mammals.png'
      },
      {
          "topic": "Growth in Mammals",
          "tip": 'We learnt in the previous lesson the reproductive systems of the female and male human',
          "url":GrowthMammalsPage,
          "icon":'assets/imgs/icons_biology/mammals2.png'
      },
      {
        "topic": "Transport in Mammals",
        "tip": 'Many organisms have systems which transport materials throughout their bodies',
        "url":TransportMammalsPage,
        "icon":'assets/imgs/icons_biology/mammals3.png'
        },
        {
          "topic": "Nervous System",
          "tip": 'The picture you see here is a human brain and the spinal cord. Believe it or not you are a proud owner of one',
          "url":NervousSystemPage,
          "icon":'assets/imgs/icons_biology/biology.png'
      },
      {
        "topic": "Endocrine System",
        "tip": 'Kofi wakes up in the morning. He notices a change: slight growth of hair on his upper lip and chin',
        "url":EndocrineSystemPage,
        "icon":'assets/imgs/icons_biology/biology.png'
    },
    {
      "topic": "Sketal System",
      "tip": 'Without some kind of support, an organism would be little more than a jellylike mass',
      "url":SketalSystemPage,
      "icon":'assets/imgs/icons_biology/sketal.png'
    },
    {
      "topic": "Senses",
      "tip": 'We perceive the world around us through our sense organs. Our sense organs include the ear, eye, nose, tongue and skin',
      "url":SensesPage,
      "icon":'assets/imgs/icons_biology/biology.png'
    },
    {
      "topic": "Ecosystem",
      "tip": 'Every organism does not live alone but rather lives in a unit belonging to the same species',
      "url":EcosystemPage,
      "icon":'assets/imgs/icons_biology/biology.png'
    },
    {
      "topic": "Genetics",
      "tip": 'One common sense observation which people have known for many years is that living things inherit traits ',
      "url":GeneticsPage,
      "icon":'assets/imgs/icons_biology/biology.png'
    },
    {
      "topic": "BioTechnology",
      "tip": 'Biotechnology is technology based on biology, especially when used in agriculture, food science, and medicine',
      "url":BioTechnologyPage,
      "icon":'assets/imgs/icons_biology/biology.png'
    }
  ]

  }

  dynamicLink(item){
    console.log(item.url)
    this.navCtrl.push(item.url)

  }

  bookmarkTopic(item){
    this.topicSave = item.topic;
    this.sqlite.create({
      name: 'speedapp_int_science.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
      //data insert section
      db.executeSql('INSERT INTO bookmarks(topic,subject,url) VALUES(?,?,?)', 
      [this.topicSave,'Biology',item.url]).then((data)=> {
        console.log("INSERTED: " + JSON.stringify(data));
      }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
      });
      let toast = this.toastCtrl.create({
          message:'Saved successfully in your Bookmarks',
          duration:3000,
              position:'bottom'
          });
      toast.present();
  
          })
     }

  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
  }

  searchTopics(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.topics = this.topics.filter((item) => {
        return (item.topic.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  

}
