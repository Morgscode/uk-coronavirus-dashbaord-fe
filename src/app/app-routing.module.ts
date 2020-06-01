import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TablesComponent } from './components/pages/tables/tables.component';
import { ChartsComponent } from './components/pages/charts/charts.component'; 
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'charts', component: ChartsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
}) 

export class AppRoutingModule { }
