import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProcessorsService } from '../../processors.service';
import { MatchService } from '../../../services/processor/match.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent implements OnInit{
  constructor(
    private http:HttpClient,
    private serviceProcessor:ProcessorsService,
    private serviceMatch:MatchService
  ){}
  ngOnInit(): void {
    this.getReconData();
  }

  /*----------------------- reconciliation-----------------------------*/
	reconProcessorData:any =[];
	reconData:any = [];
	reconSystemTblData:any[] = [];


	countSystemData = 0;

//--------------------- Pagenation for System table --------------------//
POSTS:any[]=null;
pageSystem:number = 1;
countSystem:number=0;
tableSizeSystem:number=10;

//-------------- Searching --------------------------//
search_value:string = null;

//-------------- Table pagination -------------------//
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




  async search(search_value){
    if(search_value === null || search_value === ''){
      this.getReconData_2();
    }else{
      await this.serviceMatch.search_recon_system(search_value);
      this.POSTS = this.serviceMatch.subject_search_system.value['result'][0]
    }
    
  }


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

}
