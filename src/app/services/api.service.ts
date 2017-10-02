import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * @name ApiService
 * @description
 * This Service is used for making api calls to `api.football-data.org`
 * @param Http injectable provided by angular for making http calls
 */
@Injectable()
export class ApiService {
	// this will go in env variables
	private API_BASE_URL: string;

	constructor(private http: Http) {
		this.API_BASE_URL = 'http://api.football-data.org/v1';
	}

	// The api requires auth token in the header for CORS prevention
	// This method is used to set the headers for a request and is used for every api call
	private getHeaders(): RequestOptions {
		const headers = new Headers({
			'X-Response-Control': 'full',
			'X-Auth-Token': '1b2f74715c7f418b81ed2b67fb051093'
		});
		return new RequestOptions({ headers: headers });
	}

	// gets the lists of league
	public getCompetitionsList() {
		const url = `${this.API_BASE_URL}/competitions`;
		return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}

	// gets the lists of teams in a league based on the leagueId provided
	public getCompetitionTeams(competitionId: number) {
		const url = `${this.API_BASE_URL}/competitions/${competitionId}/teams`;
		return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}

	// gets the league table of a league based on the leagueId provided
	public getCompetitionTable(competitionId: number) {
		 const url = `${this.API_BASE_URL}/competitions/${competitionId}/leagueTable`;
		 return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}

	// gets the fixtures of a league based on the leagueId provided
	public getCompetitionFixtures(competitionId: number) {
		const url = `${this.API_BASE_URL}/competitions/${competitionId}/fixtures`;
		return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}

	// still working onm this
	// this fetches fixtures for multiple leagues with timeFrame filter
	public getFixturesForLeague(leagueCodes: string, timeFrame?: string) {
		const url = `${this.API_BASE_URL}/fixtures?league=${leagueCodes}`;
		return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}
}
