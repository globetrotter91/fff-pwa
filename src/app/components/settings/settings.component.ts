import { Component, OnInit } from '@angular/core';

import { League } from './../../models/league';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	private leaguesWithCountries: League[] = [
		{
			'leagueCode': 'BL1',
			'country': 'Germany',
			'leagueName': '1. Bundesliga'
		},
		{
			'leagueCode': 'BL2',
			'country': 'Germany',
			'leagueName': '2. Bundesliga'
		},
		{
			'leagueCode': 'BL3',
			'country': 'Germany',
			'leagueName': '3. Bundesliga'
		},
		{
			'leagueCode': 'DFB',
			'country': 'Germany',
			'leagueName': 'Dfb-Cup'
		},
		{
			'leagueCode': 'PL',
			'country': 'England',
			'leagueName': 'Premiere League'
		},
		{
			'leagueCode': 'EL1',
			'country': 'England',
			'leagueName': 'League One'
		},
		{
			'leagueCode': 'ELC',
			'country': 'England',
			'leagueName': 'Championship'
		},
		{
			'leagueCode': 'FAC',
			'country': 'England',
			'leagueName': 'FA-Cup'
		},
		{
			'leagueCode': 'SA',
			'country': 'Italy',
			'leagueName': 'Serie A'
		},
		{
			'leagueCode': 'SB',
			'country': 'Italy',
			'leagueName': 'Serie B'
		},
		{
			'leagueCode': 'PD',
			'country': 'Spain',
			'leagueName': 'Primera Division'
		},
		{
			'leagueCode': 'SD',
			'country': 'Spain',
			'leagueName': 'Segunda Division'
		},
		{
			'leagueCode': 'CDR',
			'country': 'Spain',
			'leagueName': 'Copa del Rey'
		},
		{
			'leagueCode': 'FL1',
			'country': 'France',
			'leagueName': 'Ligue 1'
		},
		{
			'leagueCode': 'FL2',
			'country': 'France',
			'leagueName': 'Ligue 2'
		},
		{
			'leagueCode': 'DED',
			'country': 'Netherlands',
			'leagueName': 'Eredivisie'
		},
		{
			'leagueCode': 'PPL',
			'country': 'Portugal',
			'leagueName': 'Primeira Liga'
		},
		{
			'leagueCode': 'GSL',
			'country': 'Greece',
			'leagueName': 'Super League'
		},
		{
			'leagueCode': 'CL',
			'country': 'Europe',
			'leagueName': 'Champions-League'
		},
		{
			'leagueCode': 'EL',
			'country': 'Europe',
			'leagueName': 'UEFA-Cup'
		},
		{
			'leagueCode': 'EC',
			'country': 'Europe',
			'leagueName': 'European-Cup of Nations'
		},
		{
			'leagueCode': 'WC',
			'country': 'World',
			'leagueName': 'World-Cup'
		}
	];

	countries: Array<string> = [];
	selectedCountry: string;
	leaguesToDisplay: League[] = [];

	constructor() { }

	ngOnInit() {
		this.leaguesWithCountries.forEach((league) => {
			if (this.countries.indexOf(league.country) === -1)	{
				this.countries.push(league.country);
			}
		});
	}

	countrySelected() {
		this.leaguesToDisplay = [];
		const selectedLeagues: string = localStorage.getItem('selectedLeagues');
		this.leaguesWithCountries.forEach((league) => {
			if (league.country === this.selectedCountry) {
				if (selectedLeagues.indexOf(league.leagueCode) !== -1) {
					league.isSelected = true;
				}
				this.leaguesToDisplay.push(league);
			}
		});
	}

	leagueSelected(league: League) {
		let selectedLeagues: string = localStorage.getItem('selectedLeagues');
		if (!selectedLeagues) {
			selectedLeagues = `${league.leagueCode},`;
		}else if (selectedLeagues.indexOf(league.leagueCode) === -1) {
			selectedLeagues = `${selectedLeagues}${league.leagueCode},`;
		}else {
			selectedLeagues = selectedLeagues.split(`${league.leagueCode},`).join('');
		}

		localStorage.setItem('selectedLeagues', selectedLeagues);

		// tslint:disable-next-line:no-shadowed-variable
		this.leaguesToDisplay.forEach((league) => {
			if (selectedLeagues.indexOf(league.leagueCode) !== -1) {
				league.isSelected = true;
			}else {
				league.isSelected = false;
			}
		});
	}
}

