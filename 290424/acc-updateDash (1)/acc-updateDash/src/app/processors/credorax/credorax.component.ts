import { Component, OnInit, inject, Input } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ProcessorsService } from '../processors.service';
import { HttpClient } from '@angular/common/http';
import { throwError} from 'rxjs';
import { CredoraxService } from '../../services/processor/credorax.service';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-credorax',
  templateUrl: './credorax.component.html',
  styleUrl: './credorax.component.css'
})
export class CredoraxComponent implements OnInit{
	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
	/*----------------- statement list ------------------*/
    register_statement_list = 'Registered Statement';
	statement_list:any = null;
	/*---------------------------------------------------*/
	currency='GBP';
	currencies = ['USD', 'GBP', 'CAD','SAR', 'EUR']
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
	reconciliationMessage:any = [];

	/*----------------------- reconciliation-----------------------------*/


	public countProcessorData = this.processorsService.countProcessorBehaveior;
    public countSystemData = this.processorsService.countSystemBehaveior;

	// Table

	/*------------------------- register -----------------------------------*/
	sum_payment:any[] = [];
	sum_fee:any[]=[] //'[fixed,discount,interchange,card,acquiring]'
	sum_fee_total=null;
	/*----------------------------------------------------------------------*/


	constructor(
		private processorsService:ProcessorsService,
		private http:HttpClient,
		private serviceCredorax:CredoraxService,
		private apiService:ApiService
  ){}
	ngOnInit(): void {
    this.count();
	this.onGetPayments();
	this.onGetSumPayment();
	this.onGetSumFees();
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
			const upload$ = this.http.post("http://localhost:9000/processor/credorax/uploadcredorex", formData);
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
			const upload$ = this.http.post("http://localhost:9000/processor/credorax/uploadcpcredorex", formData);
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
		await this.getMatchAuto();
		setTimeout(async()=>{
			await this.http.get('http://localhost:9000/processor/credorax/reconcredorex').subscribe(result =>{
				console.log(result);
			this.reconciliationMessage = result;
		})
		setTimeout(() => {
			this.reconciliationMessage = null;
            window.location.reload();
		}, 2000);
		}, 10);
	}

	async getMatchAuto(){
		await this.http.delete('http://localhost:9000/processor/credorax/deleterowreconcredorexauto').subscribe(result =>{
			console.log(result);
		})
	}

  /*
	async deleteAllData():Promise<any>{
		return await this.http.delete('http://localhost:9000/deleteallreconcredorex').subscribe(result =>{
			console.log(result['message']);
		})
	}*/

  async count(){

      this.countProcessorData = await this.processorsService.countProcessorBehaveior;
      this.countSystemData = await this.processorsService.countSystemBehaveior;
  }


  refresh_data(){
    //this.serviceCredorax.delete_row_auto();
	//this.reconciliationMessage = 'Is done!';//this.serviceCredorax.Subjec_message;
  }

  async onClearReconCredorex(){
	await this.apiService.deleteAllData('recon_credorex');
	window.location.reload();
  }

  async onGetPayments(){
	await this.serviceCredorax.get_Payments('credorax')
	.then(() =>{
		this.statement_list = this.serviceCredorax.Subject_statement_list;
	}).catch(error =>{console.log(error);});
  }

  async onGetSumPayment(){
	this.sum_payment = [];
	for(let i = 0;i<this.currencies.length;i++){
		const c = this.currencies[i];
		await this.serviceCredorax.get_sum_payment('credorax',this.currencies[i])
		.then((result)=>{
			const isCurrencyExistthis = this.serviceCredorax.Subject_sum_payment.value;
			if(isCurrencyExistthis['res']['total_sum'] !== null){
				this.sum_payment.push(isCurrencyExistthis)
			}
		})
		.catch(error =>{
			console.log(error);
		});
	}
  }

  async onGetSumFees(){
	const feesType = ['fixed_transaction_fee','discount_rate','interchange','card_scheme_fees','acquiring_fee'];
	this.sum_fee = [];
	this.sum_fee_total = 0;

	for(let i =0;i<feesType.length;i++){
		await this.serviceCredorax.get_sum_fee('credorex','EUR',feesType[i])
		.then(()=>{
			this.sum_fee.push(this.serviceCredorax.Subject_sum_fee.value);
		})
		.catch(error => console.log(error));
	}

	console.log(this.sum_fee);
	this.sum_fee_total = this.sum_fee.reduce((accum,current) =>accum + parseFloat(current['res']['total_sum']), 0);
	console.log(this.sum_fee_total);
  }



}
