import { ApiService } from './api.service';
import { League } from './../models/league';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
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
	private leaguesHashMap: Map<string, League>;
	public readonly selectedLeagues: string[] = [];

	constructor(private apiService: ApiService) {
		this.selectedLeagues = localStorage.getItem('selectedLeagues').split(',');
		this.selectedLeagues.pop();
		this.leaguesHashMap = new Map();
		this.leaguesWithCountries.forEach((league) => {
			if (this.selectedLeagues.indexOf(league.leagueCode) !== -1) {
				this.leaguesHashMap.set(league.leagueCode, league);
			}
		});
	}

	fillCompetitions() {
		this.apiService.getCompetitionsList().subscribe(
			res => {
				console.log(res);
			},
			err => {

			}
		);
	}

}
