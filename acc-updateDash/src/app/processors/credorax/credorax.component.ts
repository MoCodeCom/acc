import { Component, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ProcessorsService } from '../processors.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

interface Country {
	id?: number;
	ID: string;
	DATE: string;
	PAID: number;
	CURRENCY: string;
	
}

const COUNTRIES :Country[] = [
	{
	  ID: '1781734',
	  DATE: '02-04-2024',
	  PAID: 176.5,
	  CURRENCY: 'GBP'
	},
	{
		ID: '1781735',
		DATE: '02-04-2024',
		PAID: 300.5,
		CURRENCY: 'GBP'
	},
	{
		ID: '1781736',
		DATE: '03-04-2024',
		PAID: 176.5,
		CURRENCY: 'GBP'
	},
	{
		ID: '1781737',
		DATE: '03-04-2024',
		PAID: 150.5,
		CURRENCY: 'GBP'
	}
  ];


@Component({
  selector: 'app-credorax',
  templateUrl: './credorax.component.html',
  styleUrl: './credorax.component.css'
})
export class CredoraxComponent {
	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
	currency = 'Currency';
	// Date picker
	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

	// Table
	page = 1;
	pageSize = 4;
	collectionSize = COUNTRIES.length;
	countries: Country[];

	//upload file
	status:"initial" |"uploading"| "success" | "fail" = "initial";
	file:File | null = null;

	constructor(
		private processors:ProcessorsService,
		private http:HttpClient
	    ){
		
		this.refreshCountries();

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

	refreshCountries() {
		this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

	//------------- input upload file -------------------//

	onChange(data:any){
		const file:File = data.target.files[0];
		if(file){
			this.status = "initial";
			this.file = file;
		}
	}

	onUploadCredorex(){
		if(this.file){
			const formData = new FormData();
			formData.append('file', this.file, this.file.name);
			const upload$ = this.http.post("https://", formData);
			this.status = 'uploading';
			upload$.subscribe({
				next:()=>{
					this.status = 'success';
				},
				error:(error:any)=>{
					this.status = 'fail';
					return throwError(()=> error)
				}
			})
		}
	}

	onUploadCp(){
		console.log(this.file);
	}

	
}
