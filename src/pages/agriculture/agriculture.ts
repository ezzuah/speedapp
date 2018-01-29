import { VegetablesPage } from './../vegetables/vegetables';
import { BiologicalProcessesRuminantsPage } from './../biological-processes-ruminants/biological-processes-ruminants';
import { LivestockManagementPage } from './../livestock-management/livestock-management';
import { PoultryPage } from './../poultry/poultry';
import { StemTubersPage } from './../stem-tubers/stem-tubers';
import { FruitsPage } from './../fruits/fruits';
import { CerealsPage } from './../cereals/cereals';
import { SoilDegradationManagementPage } from './../soil-degradation-management/soil-degradation-management';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SoilFormationPage } from '../soil-formation/soil-formation';
import { SoilProfilePage } from '../soil-profile/soil-profile';
import { SoilNutrientsPage } from '../soil-nutrients/soil-nutrients';
import { LegumesPage } from '../legumes/legumes';
import { BiologicalProcessesPoultryPage } from '../biological-processes-poultry/biological-processes-poultry';
import { RuminantsPage } from '../ruminants/ruminants';
import { FishFarmingPage } from '../fish-farming/fish-farming';
import { ManagementPracticesPoultryPage } from '../management-practices-poultry/management-practices-poultry';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-agriculture',
  templateUrl: 'agriculture.html',
})
export class AgriculturePage {

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
          "topic": "Soil Formation",
          "tip": 'Soil science deals with soil as a natural resource on the surface of the earth including',
          "url":SoilFormationPage,
          "bookmarkUrl":'SoilFormationPage',
          "icon":'assets/imgs/icons_agric/soil.png'
      },
      {
          "topic": "Soil Profile",
          "tip": 'Soil fertility refers to the ability of a soil to provide enough water, air and nutrients to ensure normal plants growth',
          "url":SoilProfilePage,
          "icon":'assets/imgs/icons_agric/soil3.png'
      },
      {
          "topic": "Soil Nutrients",
          "tip": 'We ended the previous chapter with soil fertility the ability of a soil to provide enough water, air and nutrients to ensure normal plants growth',
          "url":SoilNutrientsPage,
          "icon":'assets/imgs/icons_agric/soil2.png'
          
      },
      {
          "topic": "Soil Degradation and Management",
          "tip": 'From our knowledge in soil formation, it is clear that soil formation starts with a bare rock surface',
          "url":SoilDegradationManagementPage,
          "icon":'assets/imgs/icons_agric/soil.png'
      },
      {
          "topic": "Cereals",
          "tip": 'Cereal or grains are mostly grasses cultivated for their edible grains or fruit seeds. Cereal grains are grown in greater quantities and provide more energy',
          "url":CerealsPage,
          "icon":'assets/imgs/icons_agric/cereal.png'
      },
      {
          "topic": "Fruits",
          "tip": 'The term fruit has many different meanings depending on context',
          "url":FruitsPage,
          "icon":'assets/imgs/icons_agric/fruit.png'
      },
      {
          "topic": "Legumes",
          "tip": ' legume is a plant whose edible part is a simple dry fruit that develops from a simple',
          "url":LegumesPage,
          "icon":'assets/imgs/icons_agric/plant.png'
      },

      {
        "topic": "Vegetables",
        "tip": ' The definition of the word vegetable is traditional rather than scientific',
        "url":VegetablesPage,
        "icon":'assets/imgs/icons_agric/vegetables.png'
    },

      {
          "topic": "Stem and Tubers",
          "tip": 'Tuberous plants are those with their storage organs embedded in the earth crust',
          "url":StemTubersPage,
          "icon":'assets/imgs/icons_agric/tree.png'
      },
      {
          "topic": "Poultry",
          "tip": 'There are different kinds of animals that are seen in the house. Animal production in Agricultural aspects of Integrated Science',
          "url":PoultryPage,
          "icon":'assets/imgs/icons_agric/poultry.png'
      },
      {
        "topic": "Management Practices In Poultry",
        "tip": 'Poultry keeping is a full time business and for that matter a lot of attention and care should be given to the birds',
        "url":ManagementPracticesPoultryPage,
        "icon":'assets/imgs/icons_agric/bird.png'
        },
        {
          "topic": "Biological Processes In Ruminants",
          "tip": 'Female farm animals have sexual cycle similar to the menstrual cycle of a female human being',
          "url":BiologicalProcessesRuminantsPage,
          "icon":'assets/imgs/icons_agric/cow.png'
      },
      {
        "topic": "Ruminants",
        "tip": 'The goat, sheep and cattle are another group of farm animals known as ruminants',
        "url":RuminantsPage,
        "icon":'assets/imgs/icons_agric/cow2.png'
    },
    {
      "topic": "Livestock Management Practices",
      "tip": 'In order for the animals to remain healthy and productive, some management practices should not be overlooked.',
      "url":LivestockManagementPage,
      "icon":'assets/imgs/icons_agric/soil.png'
    },
    {
      "topic": "Biological Processes in Poultry",
      "tip": 'Since birds have no teeth to chew the food they take, slimy saliva helps in the swallowing of the food. The food goes through the',
      "url":BiologicalProcessesRuminantsPage,
      "icon":'assets/imgs/icons_agric/soil.png'
    },
    {
      "topic": "Fish Farming",
      "tip": 'Fish farming also known as aquaculture is the rearing and managing of water animals',
      "url":FishFarmingPage,
      "icon":'assets/imgs/icons_agric/fish.png'
    }
  ]

  }

  dynamicLink(item){
    this.navCtrl.push(item.url)
  }

  bookmarkTopic(item){
    this.topicSave = item.topic;
    this.sqlite.create({
      name: 'speedapp_int_science.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
      
      db.executeSql('INSERT INTO bookmarks(topic,subject,url) VALUES(?,?,?)', 
      [this.topicSave,'Agriculture','SoilFormationPage']).then((data)=> {
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
