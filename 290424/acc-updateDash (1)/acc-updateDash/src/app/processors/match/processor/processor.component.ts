import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, input } from '@angular/core';
import { ProcessorsService } from '../../processors.service';
import { MatchService } from '../../../services/processor/match.service';

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

  ){}


  ngOnInit(): void {
    this.getReconData();
  }
/*----------------------- reconciliation-----------------------------*/
reconProcessorData:any[] =[];
reconData:any[] = [];
reconProcessorsTblData:any[] = [];
countProcessorData = 0;
//-------------------- Pagenation for processors table------------------//
POSTS2:any[]=null;
pageProcessor:number = 1;
countProcessor:number=0;
tableSizeProcessor:number=10;
//-------------- Search ------------------------------//
search_value:string = null;

//-------------- Table pagination -------------------//

//-------------- Searching --------------------------//



onTableDataChangeProcessor(event:any):void{
  this.tableSizeProcessor =10;
  this.pageProcessor = event;
}

async onMatch_credorex(id){

    await this.http.delete(`http://localhost:9000/processor/credorax/deleterowreconcredorex/${id}`).subscribe(result =>{

    });
    setTimeout(() => {
      window.location.reload();
    }, 900);

}

  //To get data from reconcilation database about processor table
async getReconData(){
		//this.reconSystemTblData = [];
		this.reconProcessorsTblData = [];

		this.reconData = [];
		await this.http.get('http://localhost:9000/processor/credorax/getreconcredorex').subscribe(result =>{
				this.reconData = result['data'][0];
				for(let i = 0;i<this.reconData.length; i++){
					if(this.reconData[i]["ID_processor"] != null){
						this.reconProcessorsTblData.push(this.reconData[i]);
						this.countProcessorData++;
            //this._InputCountProcessor++;
					}
				}
			});
      //this._InputCountProcessor = this.countProcessorData;
      this.serviceProcessor.countProcessor(this.countProcessorData);
			this.POSTS2 = this.reconProcessorsTblData;


}

async search(search_value){
  if(search_value === null || search_value === ''){
    this.getReconData();
  }else{
    await this.serviceMatch.search_recon_process(search_value);
    this.POSTS2 = this.serviceMatch.subject_search_processor.value['result'][0]
  }
  
}

  


}
