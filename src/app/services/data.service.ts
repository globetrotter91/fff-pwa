import { Injectable } from '@angular/core';

import { IdbSchema } from './../models/idb-schema';
import { IndexedDbService } from './indexed-db.service';
import { ApiService } from './api.service';
import { League } from './../models/league';

/**
 * @name DataService
 * @description
 * This Service acts a middle layer between the components and the indexedDB
 * @param ApiService used for making API calls
 * @param IndexedDbService used for handling indexedDb opertaions like creation and transactions on the db
 */
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
	private storesSchemaAndSeeds: IdbSchema[] = [];
	public readonly gameStatuses: Array<string> = [];
	// full list of leagues that is selected by the user in the settings component
	selectedLeagues: League[] = [];
	defaultLeagueCompetitionId: number;		// this is the default league id

	constructor(private apiService: ApiService, private idbService: IndexedDbService) {
		// schemas for the database
		this.storesSchemaAndSeeds = [
            {
                name: 'leagues',							// store for holding all the
                indexes: ['leagueCode', 'competitionId'],	// leagues available
                seeds: this.leaguesWithCountries
			},
			{
				name: 'teams',								// store for saving data for teams
                indexes: ['teamId', 'name']
			}
		];
		this.gameStatuses = [
			'IN_PLAY',
			'TIMED',
			'SCHEDULED',
			'FINISHED',
			'POSTPONED',
			'CANCELED'
		];													// status that can be there for a fixture
		// setting the default league id as the first selection if localstorage is available.
		if (localStorage.getItem('selectedLeagues')) {
			// tslint:disable-next-line:radix
			this.defaultLeagueCompetitionId = parseInt(localStorage.getItem('selectedLeagues').split(',')[0]);
		}
	}

	initialize() {
		// clear the db
		this.idbService.clear().subscribe((done) => {
				// get the list of leagues from the API
				this.apiService.getCompetitionsList().subscribe(
					response => {
						this.leaguesWithCountries.forEach((league) => {
							response.forEach((comp) => {
								if (comp.league === league.leagueCode) {
									league.competitionId = comp.id;
								}
							});
						});
						// creating the object stores in the db.
						this.idbService.create(this.storesSchemaAndSeeds).subscribe(
							res => {},
							err => {}
						);
					},
					error => {}
				);
		 });
	}

	public getLeaguesWithCountries() {
		return this.leaguesWithCountries;
	}

	// returns the observable with the list of all the leagues available in the db
	getAllLeagues() {
		return this.idbService.all('leagues');
	}

	// TODO: save the team data for further usage like creastUrl in the fixtures page
	addTeamsForCompetition(competitionId: number) {
		return this.apiService.getCompetitionTeams(competitionId).subscribe(
			res => {
				res.teams.forEach((team) => {
					const t = {};
					t['teamId'] = team['_links'].self.href.split('/').pop();
					t['name'] = team.name;
					t['shortName'] = team.shortName ;
					t['crestUrl'] = team.crestUrl ;
					this.idbService.post('teams', t).subscribe(
						result => { console.log('result ', result); },
						err => { console.log(err); }
					);
				});
			}
		);
	}

	// this populates the selectedLeagues array with the data of the leagues
	// present in the localstorage of the browser
	// only runs when there is something in localStorage
	getSelectedLeagues() {
		const selectedLeaguesString = localStorage.getItem('selectedLeagues');
		this.selectedLeagues = [];
		if (selectedLeaguesString) {
			// tslint:disable-next-line:radix
			this.defaultLeagueCompetitionId = parseInt(localStorage.getItem('selectedLeagues').split(',')[0]);
			selectedLeaguesString.substr(0, selectedLeaguesString.length - 1).split(',').forEach((lc, index) => {
				// tslint:disable-next-line:radix
				this.idbService.get('leagues', parseInt(lc), 'competitionId').subscribe(
					league => {
						this.selectedLeagues.push(league);
					},
					err => console.log(err)
				);
			});
		}
	}
}
