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
import { NewslistComponent } from './components/newslist/newslist.component';
import { NewsitemComponent } from './components/newsitem/newsitem.component';
import { SectionSelectorComponent } from './components/section-selector/section-selector.component';
import { ApiService } from './services/api.service';
import { FixturesListComponent } from './components/fixtures-list/fixtures-list.component';
import { FixtureItemComponent } from './components/fixture-item/fixture-item.component';
import { LeagueTableComponent } from './components/league-table/league-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FixturesComponent,
    StandingsComponent,
    SettingsComponent,
    NewslistComponent,
    NewsitemComponent,
    SectionSelectorComponent,
    FixturesListComponent,
    FixtureItemComponent,
    LeagueTableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'fixtures', component: FixturesComponent },
      { path: 'standings', component: StandingsComponent },
      { path: 'settings', component: SettingsComponent }
    ])
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
