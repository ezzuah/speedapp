import { DigestionPage } from './../digestion/digestion';
import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BiologicalProcessesRuminantsPage } from './../biological-processes-ruminants/biological-processes-ruminants';
import { LivestockManagementPage } from './../livestock-management/livestock-management';
import { PoultryPage } from './../poultry/poultry';
import { StemTubersPage } from './../stem-tubers/stem-tubers';
import { FruitsPage } from './../fruits/fruits';
import { CerealsPage } from './../cereals/cereals';
import { SoilDegradationManagementPage } from './../soil-degradation-management/soil-degradation-management';
import { SoilFormationPage } from '../soil-formation/soil-formation';
import { SoilProfilePage } from '../soil-profile/soil-profile';
import { SoilNutrientsPage } from '../soil-nutrients/soil-nutrients';
import { LegumesPage } from '../legumes/legumes';
import { BiologicalProcessesPoultryPage } from '../biological-processes-poultry/biological-processes-poultry';
import { RuminantsPage } from '../ruminants/ruminants';
import { FishFarmingPage } from '../fish-farming/fish-farming';
import { ManagementPracticesPoultryPage } from '../management-practices-poultry/management-practices-poultry';
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
import { ClimaticChangesPage } from './../climatic-changes/climatic-changes';
import { WavesPage } from './../waves/waves';
import { MotionPage } from './../motion/motion';
import { ElectricityPage } from './../electricity/electricity';
import { ChangeOfStatePage } from './../change-of-state/change-of-state';
import { MachinesPage } from './../machines/machines';
import { ForceMotionPage } from './../force-motion/force-motion';
import { LightPage } from './../light/light';
import { PhysicalPropertiesMatterPage } from './../physical-properties-matter/physical-properties-matter';
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
import { VegetablesPage } from '../vegetables/vegetables';
import { UnitMeasurementsPage } from '../unit-measurements/unit-measurements';
import { RefractionPage } from '../refraction/refraction';

@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage {

  bookmarks:any;
  parse:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sqlite: SQLite) {

  }

  ionViewDidLoad(){

    this.sqlite.create({
    name: 'speedapp_int_science.db',
    location: 'default'
    })
    .then((db: SQLiteObject) => {
    db.executeSql('select * from bookmarks ORDER BY id DESC', {}).then((data) => {
      this.bookmarks = [];
      if(data.rows.length > 0) {
      for(var i = 0; i < data.rows.length; i++) {
      this.bookmarks.push({id: data.rows.item(i).id, 
                      topic: data.rows.item(i).topic,
                      subject: data.rows.item(i).subject,
                      url: data.rows.item(i).url});
        //alert(JSON.stringify(this.verse));
      }
      }
  
      }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });
    })

    

    }

    deleteBookmark(item){

      this.sqlite.create({
        name: 'speedapp_int_science.db',
        location: 'default'
        })
        .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM bookmarks WHERE id='+item.id, {}).then((data) => {
          for(var i = 0; i < this.bookmarks.length; i++) {
 
            if(this.bookmarks[i] == item){
              this.bookmarks.splice(i, 1);
            }
          }
          }, (err) => {
          alert('Unable to execute sql: '+JSON.stringify(err));
          });

    })
  }

  readNotes(item){
if(item.topic=='Soil Formation'){
this.navCtrl.push(SoilFormationPage);
}else{
if(item.topic=='Soil Profile'){
this.navCtrl.push(SoilProfilePage);
}else{
if(item.topic=='Soil Nutrients'){
this.navCtrl.push(SoilNutrientsPage);
}else{
if(item.topic=='Soil Degradation and Management'){
this.navCtrl.push(SoilDegradationManagementPage);
}else{
if(item.topic=='Cereals'){
this.navCtrl.push(CerealsPage);
}else{
if(item.topic=='Fruits'){
this.navCtrl.push(FruitsPage);
}else{
if(item.topic=='Legumes'){
this.navCtrl.push(LegumesPage);
}else{
if(item.topic=='Vegetables'){
this.navCtrl.push(VegetablesPage);
}else{
if(item.topic=='Stem and Tubers'){
this.navCtrl.push(StemTubersPage);
}else{
if(item.topic=='Poultry'){
this.navCtrl.push(PoultryPage);
}else{
if(item.topic=='Management Practices In Poultry'){
this.navCtrl.push(ManagementPracticesPoultryPage);
}else{
if(item.topic=='Biological Processes In Ruminants'){
this.navCtrl.push(BiologicalProcessesRuminantsPage);
}else{
if(item.topic=='Ruminants'){
this.navCtrl.push(RuminantsPage);
}else{
if(item.topic=='Livestock Management Practices'){
this.navCtrl.push(LivestockManagementPage);
}else{
if(item.topic=='Biological Processes in Poultry'){
this.navCtrl.push(BiologicalProcessesRuminantsPage);
}else{
if(item.topic=='Fish Farming'){
  this.navCtrl.push(FishFarmingPage);
}else{
if(item.topic=='Cell Structure'){
this.navCtrl.push(CellStructurePage);
}else{
if(item.topic=='Transport in Plants'){
this.navCtrl.push(TransportPlantsPage);
}else{
if(item.topic=='Photosynthesis'){
this.navCtrl.push(PhotosynthesisPage);
}else{
if(item.topic=='Reproduction in Plants'){
this.navCtrl.push(ReproductionPlantsPage);
}else{
if(item.topic=='Dentition'){
this.navCtrl.push(DentitionPage);
}else{
if(item.topic=='Digestion'){
this.navCtrl.push(DigestionPage);
}else{
if(item.topic=='Respiration'){
this.navCtrl.push(RespirationPage);
}else{
if(item.topic=='Excretion'){
this.navCtrl.push(ExcretionPage);
}else{
if(item.topic=='Reproduction in Mammals'){
this.navCtrl.push(ReproductionMammalsPage);
}else{
if(item.topic=='Transport in Mammals'){
this.navCtrl.push(TransportMammalsPage);
}else{
if(item.topic=='Nervous System'){
this.navCtrl.push(NervousSystemPage);
}else{
if(item.topic=='Endocrine System'){
this.navCtrl.push(EndocrineSystemPage);
}else{
if(item.topic=='Sketal System'){
this.navCtrl.push(SketalSystemPage);
}else{
if(item.topic=='Senses'){
this.navCtrl.push(SensesPage);
}else{
if(item.topic=='Ecosystem'){
this.navCtrl.push(EcosystemPage);
}else{
if(item.topic=='Genetics'){
this.navCtrl.push(GeneticsPage);
}else{
if(item.topic=='BioTechnology'){
this.navCtrl.push(BioTechnologyPage);
}else{
if(item.topic=='Atomic Structure'){
this.navCtrl.push(AtomicSturcturePage);
}else{
if(item.topic=='Chemical Bond'){
this.navCtrl.push(ChemicalBondPage);
}else{
if(item.topic=='Mixture and Compound'){
this.navCtrl.push(MixturesCompoundsPage);
}else{
if(item.topic=='State of Matter'){
this.navCtrl.push(StateOfMatterPage);
}else{
if(item.topic=='Chemical Forumulation and IUPAC Naming'){
this.navCtrl.push(ChemicalFormulationUpacPage);
}else{
if(item.topic=='Chemical Equation and Reaction'){
this.navCtrl.push(ChemicalEquationReactionPage);
}else{
if(item.topic=='Mole Concept'){
this.navCtrl.push(MoleConceptsPage);
}else{
if(item.topic=='Acids'){
this.navCtrl.push(AcidsPage);
}else{
if(item.topic=='Bases'){
this.navCtrl.push(BasesPage);
}else{
if(item.topic=='Salts'){
this.navCtrl.push(SaltsPage);
}else{
if(item.topic=='pH Indicators'){
this.navCtrl.push(PhIndicatorsPage);
}else{
if(item.topic=='Solution'){
this.navCtrl.push(SolutionPage);
}else{
if(item.topic=='Radioactivity'){
this.navCtrl.push(RadioactivityPage);
}else{
if(item.topic=='Water'){
this.navCtrl.push(WaterPage);
}else{
if(item.topic=='Hydrological Cycle'){
this.navCtrl.push(HydrologicalCyclePage);
}else{
if(item.topic=='Indigenous Technology'){
this.navCtrl.push(IndigenousTechnologyPage);
}else{
if(item.topic=='Alkanes'){
this.navCtrl.push(AlkanesPage);
}else{
if(item.topic=='Alkynes'){
this.navCtrl.push(AlkynesPage);
}else{
if(item.topic=='Alkanos'){
this.navCtrl.push(AlkanoicAcidsPage);
}else{
if(item.topic=='Alkanoic Acids'){
this.navCtrl.push(AlkanoicAcidsPage);
}else{
if(item.topic=='Esters'){
this.navCtrl.push(EstersPage);
}else{
if(item.topic=='Unit and Measurement'){
this.navCtrl.push(UnitMeasurementsPage);
}else{
if(item.topic=='Physical Properties of Matter'){
this.navCtrl.push(PhysicalPropertiesMatterPage);
}else{
if(item.topic=='Light'){
this.navCtrl.push(LightPage);
}
if(item.topic=='Reflection'){
this.navCtrl.push(ReflectionPage);
}else{
if(item.topic=='Refraction'){
this.navCtrl.push(RefractionPage);
}else{
if(item.topic=='Eqillibrium and Stability'){
this.navCtrl.push(EquillibriumStabilityPage);
}else{
if(item.topic=='Force'){
this.navCtrl.push(ForceMotionPage);
}else{
if(item.topic=='Force and Motion'){
this.navCtrl.push(ForceMotionPage);
}else{
if(item.topic=='Work'){
this.navCtrl.push(WorkPage);
}else{
if(item.topic=='Work,Energy and Power'){
this.navCtrl.push(EnergyPowerPage);
}else{
if(item.topic=='Machines'){
this.navCtrl.push(MachinesPage);
}else{
if(item.topic=='Pressure'){
this.navCtrl.push(PressurePage);
}else{
if(item.topic=='Temperature'){
this.navCtrl.push(TemperaturePage);
}else{
if(item.topic=='Heat'){
this.navCtrl.push(HeatPage);
}else{
if(item.topic=='Change of State'){
this.navCtrl.push(ChangeOfStatePage);
}else{
if(item.topic=='Electricity'){
this.navCtrl.push(ElectricityPage);
}else{
if(item.topic=='Logic Gate'){
this.navCtrl.push(LogicGatePage);
}
if(item.topic=='Magnetisim'){
this.navCtrl.push(MagnetismPage);
}else{
if(item.topic=='Motion'){
this.navCtrl.push(MotionPage);
}else{
if(item.topic=='Waves'){
this.navCtrl.push(WavesPage);
}else{
if(item.topic=='Sound'){
this.navCtrl.push(SoundPage);
}else{
if(item.topic=='Climatic Change'){
this.navCtrl.push(ClimaticChangesPage);
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
