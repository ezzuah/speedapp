import { AlkanoicAcidsPage } from './../alkanoic-acids/alkanoic-acids';
import { AlkynesPage } from './../alkynes/alkynes';
import { HydrologicalCyclePage } from './../hydrological-cycle/hydrological-cycle';
import { WaterPage } from './../water/water';
import { SolutionPage } from './../solution/solution';
import { ChemicalEquationReactionPage } from './../chemical-equation-reaction/chemical-equation-reaction';
import { ChemicalFormulationUpacPage } from './../chemical-formulation-upac/chemical-formulation-upac';
import { StateOfMatterPage } from './../state-of-matter/state-of-matter';
import { PeriodicTablePage } from './../periodic-table/periodic-table';
import { AtomicSturcturePage } from './../atomic-sturcture/atomic-sturcture';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ChemicalBondPage } from '../chemical-bond/chemical-bond';
import { MixturesCompoundsPage } from '../mixtures-compounds/mixtures-compounds';
import { MoleConceptsPage } from '../mole-concepts/mole-concepts';
import { AcidsPage } from '../acids/acids';
import { BasesPage } from '../bases/bases';
import { SaltsPage } from '../salts/salts';
import { PhIndicatorsPage } from '../ph-indicators/ph-indicators';
import { RadioactivityPage } from '../radioactivity/radioactivity';
import { IndigenousTechnologyPage } from '../indigenous-technology/indigenous-technology';
import { AlkanesPage } from '../alkanes/alkanes';
import { AlkanolsPage } from '../alkanols/alkanols';
import { EstersPage } from '../esters/esters';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-chemistry',
  templateUrl: 'chemistry.html',
})
export class ChemistryPage {

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
          "topic": "Atomic Structure",
          "tip": 'There are many materials around us. All these materials are termed matter because they have mass and volume. By definition',
          "url":AtomicSturcturePage,
          "icon":'assets/imgs/icons_chemistry/atom.png'
      },
      {
          "topic": "Chemical Bond",
          "tip": 'In the previous topic, we discussed the atomic structure, and closed the chapter with electron configuration',
          "url":ChemicalBondPage,
          "icon":'assets/imgs/icons_chemistry/chemical.png'
      },
      {
          "topic": "Mixture and Compound",
          "tip": 'Pure substances are made up of the same kind of atoms or molecules whereas impure substances are made up of a mixture of atoms or molecules',
          "url":MixturesCompoundsPage,
          "icon":'assets/imgs/icons_chemistry/chemistry.png'
      },
      {
          "topic": "Perodic Table",
          "tip": 'For example, sodium reacts vigorously with water. Potassium also reacts vigorously with water.',
          "url":PeriodicTablePage,
          "icon":'assets/imgs/icons_chemistry/periodic-table.png'
      },
      {
          "topic": "States of Matter",
          "tip": 'Change is any difference in either the physical or chemical property of a substance',
          "url":StateOfMatterPage,
          "icon":'assets/imgs/icons_chemistry/chemistry.png'
      },
      {
          "topic": "Chemical Forumulation and IUPAC Naming",
          "tip": 'We learnt in the first chapter that, each element has a short hand form of representation known as its chemical symbol',
          "url":ChemicalFormulationUpacPage,
          "icon":'assets/imgs/icons_chemistry/chemistry.png'
      },
      {
          "topic": "Chemical Equation and Reaction",
          "tip": 'What happens to the gas in a gas cylinder when a gas stove is lighted? Chemist analysed the process and realized that the gas contains a substance',
          "url":ChemicalEquationReactionPage,
          "icon":'assets/imgs/icons_chemistry/chemistry.png'
      },
      {
          "topic": "Mole Concept",
          "tip": 'The mole is a number like the dozen. We can say a dozen of eggs, a dozen of oranges',
          "url":MoleConceptsPage,
          "icon":'assets/imgs/icons_chemistry/chemistry.png'
      },
      {
          "topic": "Acids",
          "tip": 'It has long been noticed that aqueous (water) solutions of some solid compounds conducts electricity',
          "url":AcidsPage,
          "icon":'assets/imgs/icons_chemistry/acid.png'
      },
      {
        "topic": "Bases",
        "tip": 'The three theories that define an acid (as stated in the previous chapter) also apply to bases',
        "url":BasesPage,
        "icon":'assets/imgs/icons_chemistry/chemistry.png'
        },
        {
          "topic": "Salts",
          "tip": 'Salt is a substance formed when the hydrogen in an acid is replaced by a cation',
          "url":SaltsPage,
          "icon":'assets/imgs/icons_chemistry/chemistry.png'
      },
      {
        "topic": "pH Indicators",
        "tip": 'pH is a measure of the acidity or alkalinity (Basicity) of a solution',
        "url":PhIndicatorsPage,
        "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Solution",
      "tip": 'A solution is homogeneous mixture of two or more substances. It consists of a solute (dissolved material) and a solvent (dissolving material)',
      "url":SolutionPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Radioactivity",
      "tip": 'We learnt about isotopy in the first chapter, we saw that atoms of some elements may not have the same number of neutrons in their nucleus (isotopes)',
      "url":RadioactivityPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Water",
      "tip": 'Water is a chemical compound made up of one oxygen and two hydrogen atoms',
      "url":WaterPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Hydrological Cycle",
      "tip": 'Water is essential to life. Without it, the biosphere would fail to exist',
      "url":HydrologicalCyclePage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Indigenous Technology",
      "tip": 'Most of the things our grandparents did were based on science. But then, they never bothered about investigating',
      "url":IndigenousTechnologyPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Alkanes",
      "tip": 'You have once had or perhaps seen someone been given a drink in a plastic cup',
      "url":AlkanesPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Alkynes",
      "tip": 'Alkynes are unsaturated hydrocarbons that contain at least a single carbon carbon triple bond',
      "url":AlkynesPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Alkanos",
      "tip": 'Alcohols are made up of the class of organic compounds in which one or more hydrogen atoms of a hydrocarbon have been replaced',
      "url":AlkanolsPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Alkanoic Acids",
      "tip": 'lthough there are other types of organic acids, the most common organic acids belong to a group called the carboxylic acids',
      "url":AlkanoicAcidsPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
    },
    {
      "topic": "Esters",
      "tip": 'It was mentioned earlier under the reactions of alcohols that esters are formed from a reaction between',
      "url":EstersPage,
      "icon":'assets/imgs/icons_chemistry/chemistry.png'
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
      //data insert section
      db.executeSql('INSERT INTO bookmarks(topic,subject,url) VALUES(?,?,?)', 
      [this.topicSave,'Chemistry',item.url]).then((data)=> {
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
