import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule, NgbDatepickerModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataComponent } from './data/data.component';





@NgModule({
  declarations: [
    SettingsComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    [NgbPaginationModule, NgbAlertModule,NgbNavModule],
    FormsModule,
    NgbDatepickerModule,
  ],
  exports:[
    SettingsComponent
  ]
})
export class SettingsModule { }
