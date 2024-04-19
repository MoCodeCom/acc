import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProcessorsModule } from './processors/processors.module';
import { HomeModule } from './home/home.module';
import { NgbAlertModule, NgbDatepickerModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BanksModule } from './banks/banks.module';
import { ChartsModule } from './charts/charts.module';

import { ReportsModule } from './reports/reports.module';
import { PayoutModule } from './payout/payout.module';
import { SettingsModule } from './settings/settings.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    [NgbPaginationModule, NgbAlertModule],
    NgbDatepickerModule,
    
    HomeModule,
    ProcessorsModule,
    BanksModule,
    PayoutModule,
    ChartsModule,
    ReportsModule,
    SettingsModule,
 
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
