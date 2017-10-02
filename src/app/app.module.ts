import { IndexedDbService } from './services/indexed-db.service';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FixturesComponent } from './components/fixtures/fixtures.component';
import { StandingsComponent } from './components/standings/standings.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SectionSelectorComponent } from './components/section-selector/section-selector.component';
import { ApiService } from './services/api.service';
import { FixturesListComponent } from './components/fixtures-list/fixtures-list.component';
import { LeagueTableComponent } from './components/league-table/league-table.component';

/*
  appRoutes define the routes of the application.
  This can be exported to another file if the routes are too many.
*/
const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'fixtures', component: FixturesComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'settings', component: SettingsComponent }
];
/**
 * Defining the module for the application.
 */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FixturesComponent,
    StandingsComponent,
    SettingsComponent,
    SectionSelectorComponent,
    FixturesListComponent,
    LeagueTableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService,
    DataService,
    IndexedDbService
  ],
  bootstrap: [AppComponent]     // bootstraping the app component
})
export class AppModule { }
