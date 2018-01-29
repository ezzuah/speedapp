import { UnitMeasurementsPage } from './../unit-measurements/unit-measurements';
import { ClimaticChangesPage } from './../climatic-changes/climatic-changes';
import { WavesPage } from './../waves/waves';
import { MotionPage } from './../motion/motion';
import { ElectricityPage } from './../electricity/electricity';
import { ChangeOfStatePage } from './../change-of-state/change-of-state';
import { MachinesPage } from './../machines/machines';
import { ForceMotionPage } from './../force-motion/force-motion';
import { LightPage } from './../light/light';
import { PhysicalPropertiesMatterPage } from './../physical-properties-matter/physical-properties-matter';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ReflectionPage } from '../reflection/reflection';
import { EquillibriumStabilityPage } from '../equillibrium-stability/equillibrium-stability';
import { ForcePage } from '../force/force';
import { WorkPage } from '../work/work';
import { EnergyPowerPage } from '../energy-power/energy-power';
import { PressurePage } from '../pressure/pressure';
import { TemperaturePage } from '../temperature/temperature';
import { HeatPage } from '../heat/heat';
import { LogicGatePage } from '../logic-gate/logic-gate';
import { MagnetismPage } from '../magnetism/magnetism';
import { SoundPage } from '../sound/sound';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { RefractionPage } from '../refraction/refraction';


@Component({
  selector: 'page-chemistry',
  templateUrl: 'physics.html',
})
export class PhysicsPage {

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
        "topic": "Units and Measurement",
        "tip": 'In physics and engineering, measurement is the activity of comparing',
        "url":UnitMeasurementsPage,
        "icon":'assets/imgs/icons_physics/measurements.png'
        
    },
 
      {
          "topic": "Physical Properties of Matter",
          "tip": 'Matter is defined as any substance that has mass and occupies space (volume)',
          "url":PhysicalPropertiesMatterPage,
          "icon":'assets/imgs/icons_physics/physics.png'
          
      },
      {
          "topic": "Light",
          "tip": 'Until the early part of the 19th century, the nature of light was explained by two conflicting theories',
          "url":LightPage,
          "icon":'assets/imgs/icons_physics/light.png'
      },
      {
          "topic": "Reflection",
          "tip": 'One of these three phenomena is likely to happen when light rays hit a surface',
          "url":ReflectionPage,
          "icon":'assets/imgs/icons_physics/reflection.png'
      },

      {
        "topic": "Refraction",
        "tip": 'We said in the earlier chapters of light, that light travels in a straight line',
        "url":RefractionPage,
        "icon":'assets/imgs/icons_physics/refraction.png'
    },

      {
          "topic": "Eqillibrium and Stability",
          "tip": 'is it possible to tie a string to the middle part of a wooden rod,lift it and still have the rod in its horizontal position?',
          "url":EquillibriumStabilityPage,
          "icon":'assets/imgs/icons_physics/physics.png'
      },
      {
          "topic": "Force",
          "tip": 'The role of forces in everyday life is a familiar one. Pushes and pulls of all sorts',
          "url":ForcePage,
          "icon":'assets/imgs/icons_physics/force.png'
      },
      {
          "topic": "Force and Motion",
          "tip": 'We discussed Force and Motion in the last two chapters. In this chapter we shall consider the relationship between force and motion',
          "url":ForceMotionPage,
          "icon":'assets/imgs/icons_physics/motion.png'
      },
      {
          "topic": "Work",
          "tip": '',
          "url":WorkPage,
          "icon":'assets/imgs/icons_physics/work.png'
      },
      {
          "topic": "Work,Energy and Power",
          "tip": '',
          "url":EnergyPowerPage,
          "icon":'assets/imgs/icons_physics/energy.png'
      },
      {
          "topic": "Machines",
          "tip": 'How easy do you think it will be if you are to uncork a mineral or nail a wood with your bare hands?',
          "url":MachinesPage,
          "icon":'assets/imgs/icons_physics/machine.png'
      },
      {
        "topic": "Pressure",
        "tip": 'When you are hit with the edge of a ruler, it hurts more than the flat side',
        "url":PressurePage,
        "icon":'assets/imgs/icons_physics/pressure.png'
        },
        {
          "topic": "Temperature",
          "tip": 'We know from experience that heat and temperature are related',
          "url":TemperaturePage,
          "icon":'assets/imgs/icons_physics/temperature.png'
      },
      {
        "topic": "Heat",
        "tip": 'Before the middle of the nineteenth century, heat was thought to be an invisible, weightless substance called',
        "url":HeatPage,
        "icon":'assets/imgs/icons_physics/heat.png'
    },
    {
      "topic": "Change of State",
      "tip": 'The molecular formula for ice block, liquid water and water vapour is',
      "url":ChangeOfStatePage,
      "icon":'assets/imgs/icons_physics/physics.png'
    },
    {
      "topic": "Electricity",
      "tip": 'The slight crackling sound that is heard when a dry hair is brushed and the tendencies of thin sheets',
      "url":ElectricityPage,
      "icon":'assets/imgs/icons_physics/electricity.png'
    },
    {
      "topic": "Logic Gate",
      "tip": 'Old time radios used the vacuum tube small light bulb sized electronic tube with glowing filaments',
      "url":LogicGatePage,
      "icon":'assets/imgs/icons_physics/physics.png'
    },
    {
      "topic": "Magnetism",
      "tip": 'A transformer that increases the voltage of an a.c. source is called a step up transformer',
      "url":MagnetismPage,
      "icon":'assets/imgs/icons_physics/magnet.png'
    },
    {
      "topic": "Motion",
      "tip": 'If you leave your house or dormitory to the school computer lab, you have covered some distance',
      "url":MotionPage,
      "icon":'assets/imgs/icons_physics/motion.png'
    },
    {
      "topic": "Waves",
      "tip": 'If a stone is dropped into a quiet pool of water, the spot where the stone enters the water is disturbed',
      "url":WavesPage,
      "icon":'assets/imgs/icons_physics/waves.png'
    },
    {
      "topic": "Sound",
      "tip": 'We all have experience of some sound involving activities; music from a loud speaker',
      "url":SoundPage,
      "icon":'assets/imgs/icons_physics/sound.png'
    },
    {
      "topic": "Climatic Change",
      "tip": 'Whenever you hear the word atmosphere what meaning do you give to it? You may understand the',
      "url":ClimaticChangesPage,
      "icon":'assets/imgs/icons_physics/climate.png'
    }
  ]

  }

  dynamicLink(item){
    console.log(item.url)
    this.navCtrl.push(item.url)
  }

  bookmarkTopic(item){
    this.topicSave = item.Verse;
    this.sqlite.create({
      name: 'speedapp_int_science.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
      //data insert section
      db.executeSql('INSERT INTO bookmarks(topic,subject) VALUES(?,?,?)', 
      [this.topicSave,'Physics',item.url]).then((data)=> {
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
