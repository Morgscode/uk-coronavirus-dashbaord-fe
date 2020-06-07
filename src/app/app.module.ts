import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CovidMortalityTotalComponent } from './components/covid-mortality-total/covid-mortality-total.component';
import { CovidStatisticsService } from './services/covid-statistics.service';
import { NHSConditionMetaService } from './services/nhs-condition-meta.service';
import { DateConversionService } from './services/date-conversion.service';
import { ChartDataService } from './services/chart-data.service';
import { CovidMortalityDailyTotalComponent } from './components/covid-mortality-daily-total/covid-mortality-daily-total.component';
import { CovidCasesTotalComponent } from './components/covid-cases-daily-total/covid-cases-total/covid-cases-total.component';
import { CovidCasesDailyTotalComponent } from './components/covid-cases-daily-total/covid-cases-daily-total.component';
import { NHSCovidInfoComponent } from './components/nhs-covid-info/nhs-covid-info.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TablesComponent } from './components/pages/tables/tables.component';
import { TableControlsComponent } from './components/table-controls/table-controls.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import { CasesTableComponent } from './components/cases-table/cases-table.component';
import { DeathsTableComponent } from './components/deaths-table/deaths-table.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartsComponent } from './components/pages/charts/charts.component';
import { ChartControlsComponent } from './components/chart-controls/chart-controls.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

@NgModule({ 
  declarations: [ 
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CovidMortalityTotalComponent,
    CovidMortalityDailyTotalComponent,
    CovidCasesTotalComponent,
    CovidCasesDailyTotalComponent,
    NHSCovidInfoComponent,
    HeaderComponent,
    AboutComponent,
    TablesComponent,
    TableControlsComponent,
    TableWrapperComponent,
    CasesTableComponent,
    DeathsTableComponent,
    ChartComponent,
    ChartsComponent,
    ChartControlsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [CovidStatisticsService, NHSConditionMetaService, DateConversionService, HttpClient, ChartDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
