import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from './banks.component';
import { ClearComponent } from './clear/clear.component';
import { SantanderComponent } from './santander/santander.component';
import { ReveluteComponent } from './revelute/revelute.component';
import { AktifComponent } from './aktif/aktif.component';
import { ManoComponent } from './mano/mano.component';
import { ConveraComponent } from './convera/convera.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule, NgbDatepickerModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BanksComponent,
    ClearComponent,
    SantanderComponent,
    ReveluteComponent,
    AktifComponent,
    ManoComponent,
    ConveraComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    [NgbPaginationModule, NgbAlertModule,NgbNavModule],
    FormsModule,
    NgbDatepickerModule,
    RouterModule,
  ],
  exports:[
    BanksComponent,
    ClearComponent,
    SantanderComponent,
    ReveluteComponent,
    AktifComponent,
    ManoComponent,
    ConveraComponent
  ]
})
export class BanksModule { }
