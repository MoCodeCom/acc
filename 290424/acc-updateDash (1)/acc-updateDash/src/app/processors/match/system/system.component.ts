import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProcessorsService } from '../../processors.service';
import { MatchService } from '../../../services/processor/match.service';
import { ShareService } from '../../../services/processor/share.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent implements OnInit{
  constructor(
    private http:HttpClient,
    private serviceProcessor:ProcessorsService,
    private serviceMatch:MatchService,
    private serviceShare:ShareService,
    private serviceApi:ApiService
  ){}
  ngOnInit(): void {
    this.getReconData();
    //this.getReconData2();
    this.messge_register = null;
    this.getCountProcess();
  }

  /*----------------------- reconciliation-----------------------------*/
	reconProcessorData:any =[];
	reconData:any = [];
	reconSystemTblData:any[] = [];
	countSystemData = 0;

//--------------------- Pagenation for System table --------------------//
POSTS:any[]=[];
pageSystem:number = 1;
countSystem:number=0;
countData = null; //for count system rows

tableSizeSystem:number=10;

//-------------- Spinners ---------------------------//
spinner_system = false;
spinner_register = false;
//-------------- Searching --------------------------//
search_value:string = null;

//-------------- Table pagination -------------------//

//-------------- calender ---------------------------//

//-------------- register --------------------------//
messge_register = null;
model2: string;

onTableDataChangeSystem(event:any):void{
  this.tableSizeSystem =10;
  this.pageSystem = event;
}


// matching
async onMatch_system(id){ //----------------> work
  this.spinner_system = true;
  setTimeout(async() => {
    await this.serviceMatch.get_match(id,'system_recon').then(result =>{
      window.location.reload();
      this.spinner_system = false;
    })
    .catch(error =>{
      console.log(error);
    });
  }, 500);

}

  //To get data from reconcilation database about system table

  //=============================> plan 2
async getReconData(){ //--------------------> work
  this.POSTS = [];
  this.spinner_system = true;
  await this.serviceMatch.get_recon('system_recon')
  .then(result =>{
    
    setTimeout(() => {
      const data:any[] = this.serviceMatch.subject_get_recon_system.value;
      for(let i=0;i<data.length;i++){
        this.POSTS.push(data[i]);
      /*if(data[i]['status'].trim().toLowerCase() !== 'payment'){
        
      }*/
    }
    
      this.spinner_system = false;
    }, 1000);
    
    
  })
  .catch(error =>{
    console.log(error);
  });
}


  //To Search on the recon table on system column
  // To search in the processor recon column data.
  async search(search_value){ //-----------------> work
    if(search_value === null || search_value === ''){
      this.getReconData();
    }else{
      setTimeout(async() => {
        await this.serviceMatch.search_recon_processor(search_value, 'system_recon');
        this.POSTS = this.serviceMatch.subject_search_system.value['result'][0];
      }, 1000);
      
    }
  }

  //To refresh data
  

  //To get data according to selected date.
  async getDataByDate(model2){
    const date = model2['year']+'-'+model2['month']+'-'+model2['day'];
    const d = this.serviceMatch.formatDate(date);

    await this.serviceMatch.getReconDataOnDate(d,'system')
    .then(()=>{
      setTimeout(() => {
        this.POSTS = this.serviceMatch.subject_message.value[0];
      }, 1000);

    });
  }

  async onRegister(){
    this.spinner_register = true;
    await setTimeout(() => {
      this.serviceShare.register('credorax');
      this.messge_register = this.serviceShare.Subject_message.value['message'];
    }, 500);
    
    setTimeout(() => {
      this.messge_register = null;
      this.serviceApi.deleteAllData('credorextbl');
      window.location.reload();
      this.spinner_register = false;
    }, 1500);
  }


  getCountProcess(){
    setTimeout(() => {
      this.serviceShare.count_table('credorex','recon_credorex')
      .then(result => {
        
        this.countData = this.serviceShare.Subject_count.value['res']-1;
        //console.log(this.countData)
      })
      .catch(error =>{
        console.log(error);
      });
    }, 500);
  }

}
