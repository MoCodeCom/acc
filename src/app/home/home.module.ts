import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule, NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    [NgbPaginationModule, NgbAlertModule],
    FormsModule,
    NgbDatepickerModule,
    RouterModule,
    
  ],
  exports:[
    HomeComponent,
    DashboardComponent
  ]
})
export class HomeModule { }
