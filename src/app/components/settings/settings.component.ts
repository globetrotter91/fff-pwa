import { Component, OnInit } from '@angular/core';

import { DataService } from './../../services/data.service';
import { League } from './../../models/league';

/**
 * @name SettingsComponent
 * @description
 * This is the settings page of the application
 * Here the user can select his favorite leagues
 * The ids of the leagues selected are saved in the localStorage
 * as a comma separated string
 */
@Component({
	templateUrl: './settings.component.html'
	// style url is not here because not scoped styling was done for this component
})
export class SettingsComponent implements OnInit {

	private allLeagues: League[];
	countries: Array<string> = [];
	selectedCountry: string;
	leaguesToDisplay: League[] = [];

	// DataService is injected in order to fetch
	// the leagues' data from the indexedDB of the browser.
	constructor(private dataService: DataService) {	}

	ngOnInit() {
		const selectedLeagues: string = localStorage.getItem('selectedLeagues');
		this.dataService.getAllLeagues().subscribe(
			res => {
				this.allLeagues = res;
				this.allLeagues.forEach((league) => {
					if (this.countries.indexOf(league.country) === -1)	{
						this.countries.push(league.country);
					}
					if (selectedLeagues && league.competitionId && selectedLeagues.indexOf(league.competitionId.toString()) !== -1) {
						league.isSelected = true;
					}
				});
				this.leaguesToDisplay = this.allLeagues.filter((league) => league.competitionId);
			},
			err => {}
		);
	}
	// this function is called to filter the given leagues by country
	countrySelected() {
		this.leaguesToDisplay = [];
		const selectedLeagues: string = localStorage.getItem('selectedLeagues');
		this.allLeagues.forEach((league) => {
			if (league.country === this.selectedCountry && league.competitionId) {
				if (selectedLeagues && selectedLeagues.indexOf(league.competitionId.toString()) !== -1) {
					league.isSelected = true;
				}
				this.leaguesToDisplay.push(league);
			}
		});
	}
	// when the user selects a league this method is called.
	// saving the selected leagues to localStorage
	leagueSelected(league: League) {
		let selectedLeagues: string = localStorage.getItem('selectedLeagues');
		if (!selectedLeagues) {
			selectedLeagues = `${league.competitionId.toString()},`;
		}else if (selectedLeagues.indexOf(league.competitionId.toString()) === -1) {
			selectedLeagues = `${selectedLeagues}${league.competitionId.toString()},`;
		}else {
			selectedLeagues = selectedLeagues.split(`${league.competitionId.toString()},`).join('');
		}

		localStorage.setItem('selectedLeagues', selectedLeagues);

		// tslint:disable-next-line:no-shadowed-variable
		this.leaguesToDisplay.forEach((league) => {
			if (selectedLeagues.indexOf(league.competitionId.toString()) !== -1) {
				league.isSelected = true;
				// this.dataService.addTeamsForCompetition(league.competitionId);
			}else {
				league.isSelected = false;
			}
		});
	}
}

