import { Component, OnInit, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ProcessorsService } from '../processors.service';
import { HttpClient } from '@angular/common/http';
import { throwError} from 'rxjs';


@Component({
  selector: 'app-credorax',
  templateUrl: './credorax.component.html',
  styleUrl: './credorax.component.css'
})
export class CredoraxComponent implements OnInit{
	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
	currency = 'Currency';
	// Date picker
	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

	

	//upload file
	status:"initial" |"uploading"| "success" | "fail" = "initial";
	file:File | null = null;
	/*-------------------- Alert variables ---------------------*/
	uploadSystemMessage:any='';
	uploadCredorxMessage:any='';
	reconciliationMessage:any = null;

	/*----------------------- reconciliation-----------------------------*/
	reconProcessorData:any =[];
	reconData:any = [];
	reconSystemTblData:any[] = [];
	reconProcessorsTblData:any[] = [];

	countSystemData = 0;
	countProcessorData = 0;

	// Table
	//--------------------- Pagenation for System table --------------------//
	POSTS:any[]=null;
	pageSystem:number = 1;
	countSystem:number=0;
	tableSizeSystem:number=10;
	//-------------------- Pagenation for processors table------------------//
	POSTS2:any[]=null;
	pageProcessor:number = 1;
	countProcessor:number=0;
	tableSizeProcessor:number=10;


	constructor(
		private processors:ProcessorsService,
		private http:HttpClient
	    ){}
	ngOnInit(): void {
		this.getReconData();
		
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

	onChangeCurrency(curr){
		if(curr === 'GBP'){
			this.currency = curr;
		}else if(curr === 'EUR'){
			this.currency = 'EUR';
		}else if(curr === 'US'){
			this.currency = 'US';
		}else{
			this.currency = 'Currency';
		}
	}

	//-------------- Table pagination -------------------//
	
	onTableDataChangeSystem(event:any):void{
		this.tableSizeSystem =10;
		this.pageSystem = event;
	}

	onTableDataChangeProcessor(event:any):void{
		this.tableSizeProcessor =10;
		this.pageProcessor = event;
	}


	//------------- input upload file -------------------//

	onChangeCredorex(data:any){
		const File:File = data.target.files[0];
		if(File){
			this.status = "initial";
			this.file = File;
		}
	}

	onUploadCredorex(){
		if(this.file){
			const formData = new FormData();
			formData.append('file', this.file, this.file.name);
			const upload$ = this.http.post("http://localhost:9000/uploadcredorex", formData);
			this.status = 'uploading';
			upload$.subscribe({
				next:(result)=>{
					this.status = 'success';
					this.uploadCredorxMessage = result;
					console.log(result);
				},
				error:(error:any)=>{
					this.status = 'fail';
					return throwError(()=> error)
				}
			})
		}

		
		this.uploadCredorxMessage = '';
		this.uploadSystemMessage = '';
	}

	onUploadCpCredorex(){
		if(this.file){
			const formData = new FormData();
			formData.append('file', this.file, this.file.name);
			const upload$ = this.http.post("http://localhost:9000/uploadcpcredorex", formData);
			this.status = 'uploading';
			upload$.subscribe({
				next:(result)=>{
					this.status = 'success';
					this.uploadSystemMessage = result;
				},
				error:(error:any)=>{
					this.status = 'fail';
					return throwError(()=> error)
				}
			})
		}

		this.uploadCredorxMessage = '';
		this.uploadSystemMessage = '';
	}

	onChangeCpCredorex(data:any){
		const File:File = data.target.files[0];
		if(File){
			this.status = "initial";
			this.file = File;
		}
	}

	async onReconCredorex(){
		//await this.deleteAllData();
		await this.getMatchAuto();
		setTimeout(async()=>{
			await this.http.get('http://localhost:9000/reconcredorex').subscribe(result =>{
			this.reconciliationMessage = result;
			this.getReconData();
		})
		setTimeout(() => {
			this.reconciliationMessage = null;
		}, 4000);
		}, 10);
	}

	async getMatchAuto(){
		await this.http.delete('http://localhost:9000/deleterowreconcredorexauto').subscribe(result =>{
			console.log(result);
		})
	}

	
	async getReconData(){
		this.reconSystemTblData = [];
		this.reconProcessorsTblData = [];

		this.reconData = [];
		await this.http.get('http://localhost:9000/getreconcredorex').subscribe(result =>{
				this.reconData = result['data'][0];
				for(let i = 0;i<this.reconData.length; i++){
					if(this.reconData[i]["ID_system"] != null){
						this.reconSystemTblData.push(this.reconData[i]);
						this.countSystemData++;
					}else{
						this.reconProcessorsTblData.push(this.reconData[i]);
						this.countProcessorData++;
					}
				}
			});
			this.POSTS = this.reconSystemTblData;
			this.POSTS2 = this.reconProcessorsTblData;
			

	}
	

	async deleteAllData():Promise<any>{
		return await this.http.delete('http://localhost:9000/deleteallreconcredorex').subscribe(result =>{
			//console.log(result['message']);
		})
	}


	async onMatch_system(id){

		await this.http.delete(`http://localhost:9000/deleterowreconcredorex/${id}`).subscribe(result =>{
			this.reconciliationMessage = result;
		});
		setTimeout(() => {
			window.location.reload();
			this.reconciliationMessage = null;
		}, 900);
		
	}

	async onMatch_credorex(id){

		await this.http.delete(`http://localhost:9000/deleterowreconcredorex/${id}`).subscribe(result =>{
			this.reconciliationMessage = result;
			
		});
		setTimeout(() => {
			window.location.reload();
			this.reconciliationMessage = null;
		}, 900);
		
	}

	
}
