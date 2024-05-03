import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProcessorsService } from '../../processors.service';
import { MatchService } from '../../../services/processor/match.service';
import { ShareService } from '../../../services/processor/share.service';

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
    private serviceShare:ShareService
  ){}
  ngOnInit(): void {
    this.getReconData();
    this.messge_register = null;
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
tableSizeSystem:number=10;

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



  async onMatch_system(id){
    await this.http.delete(`http://localhost:9000/processor/credorax/deleterowreconcredorex/${id}`).subscribe(result =>{
    });
    setTimeout(() => {
      window.location.reload();
    }, 900);

  }

  //To get data from reconcilation database about system table
  async getReconData(){
		this.reconSystemTblData = [];
		this.reconData = [];
		await this.http.get('http://localhost:9000/processor/credorax/getreconcredorex').subscribe(result =>{
				this.reconData = result['data'][0];
				for(let i = 0;i<this.reconData.length; i++){
					if(this.reconData[i]["ID_system"] != null){
						this.reconSystemTblData.push(this.reconData[i]);
						this.countSystemData++;
					}
				}
			});
			this.POSTS = this.reconSystemTblData;
      this.serviceProcessor.countSystem(this.countSystemData);
	}

  //To Search on the recon table on system column
  async search(search_value){
    if(search_value === null || search_value === ''){
      this.getReconData_2();
    }else{
      await this.serviceMatch.search_recon_system(search_value);
      this.POSTS = this.serviceMatch.subject_search_system.value['result'][0];
    }
    
  }

  //To refresh data
  async getReconData_2(){
    this.reconSystemTblData = [];
		this.reconData = [];
		await this.http.get('http://localhost:9000/processor/credorax/getreconcredorex').subscribe(result =>{
				this.reconData = result['data'][0];
				for(let i = 0;i<this.reconData.length; i++){
					if(this.reconData[i]["ID_system"] != null){
						this.reconSystemTblData.push(this.reconData[i]);
						//this.countSystemData++;
					}
				}
			});
			this.POSTS = this.reconSystemTblData;
      this.serviceProcessor.countSystem(this.countSystemData);
  }

  //To get data according to selected date.
  async getDataByDate(model2){
    const date = model2['year']+'-'+model2['month']+'-'+model2['day'];
    const d = this.serviceMatch.formatDate(date);

    await this.serviceMatch.getReconDataOnDate(d,'system')
    .then(()=>{
      this.POSTS = this.serviceMatch.subject_message.value[0];
    });
  }

  async onRegister(){
    await this.serviceShare.register('credorax');
    this.messge_register = await this.serviceShare.Subject_message.value['message'];
    setTimeout(() => {
      this.messge_register = null;

    }, 2000);
  }

}
