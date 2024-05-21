import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, input } from '@angular/core';
import { ProcessorsService } from '../../processors.service';
import { MatchService } from '../../../services/processor/match.service';
import { ShareService } from '../../../services/processor/share.service';
import { Console } from 'console';
import { CredoraxService } from '../../../services/processor/credorax.service';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrl: './processor.component.css'
})
export class ProcessorComponent implements OnInit{

  constructor(
    private http:HttpClient,
    private serviceProcessor:ProcessorsService,
    private serviceMatch:MatchService,
    private serviceShare:ShareService,
    private serviceCredorex:CredoraxService,
  ){}

  ngOnInit(): void {
    this.getReconData();

    //this.getReconData2();
   // this.onGetReconData();
  }
/*----------------------- reconciliation-----------------------------*/
//reconProcessorData:any[] =[];
//reconData:any[] = [];
//reconProcessorsTblData:any[] = [];
//countProcessorData = 0;
//-------------------- Pagenation for processors table------------------//
POSTS2:any[]=[];
pageProcessor:number = 1;
countProcessor:number = 0;
tableSizeProcessor:number = 10;
//-------------- Spinners ---------------------------//
spinner_system = false;
//-------------- Search ------------------------------//
search_value:string = null;

//-------------- Table pagination -------------------//

//-------------- Calender --------------------------//
model2: string;



onTableDataChangeProcessor(event:any):void{
  this.tableSizeProcessor =10;
  this.pageProcessor = event;
}
// matching
async onMatch_credorex(id){//-----------> work
  this.spinner_system = true;
  setTimeout(async() => {
    await this.serviceMatch.get_match(id,'credorex_recon').then(result =>{
      window.location.reload();
      this.spinner_system = false;
    })
    .catch(error =>{
      console.log(error);
    });
  }, 1000);

}

  //To get data from reconcilation database about processor table

//=============================> plan 2
async getReconData(){ //----------------> work
  this.POSTS2 = [];
  this.spinner_system = true;
  await this.serviceMatch.get_recon('credorex_recon')
  .then(result =>{
    setTimeout(() => {
      const data:any[] = this.serviceMatch.subject_get_recon_data.value;
      for(let i=0;i<data.length;i++){
      if(data[i]['transaction_type'].trim().toLowerCase() !== 'payment'){
        this.POSTS2.push(data[i]);
      }
    }
      this.spinner_system = false;
    }, 1000);
  })
  .catch(error =>{
    console.log(error);
  });
}


// To search in the processor recon column data.
async search(search_value){
  if(search_value === null || search_value === ''){
    this.getReconData();
  }else{
    await this.serviceMatch.search_recon_processor(search_value, 'credorex_recon');
    setTimeout(() => {
      this.POSTS2 = this.serviceMatch.subject_search_processor.value['result'][0];
    }, 1000);
    
  }
}


//To get data according to selected date.
async getDataByDate(model2){
    const date = model2['year']+'-'+model2['month']+'-'+model2['day'];
    const d = this.serviceMatch.formatDate(date);
    //console.log(d);
    await this.serviceMatch.getReconDataOnDate(d,'processor')
    .then(()=>{
      setTimeout(() => {
        this.POSTS2 = this.serviceMatch.subject_message.value[0];
      }, 1000);
      
  });
}

}
