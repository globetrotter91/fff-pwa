import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

	constructor(private http: Http) { }
	private getHeaders(): RequestOptions {
		const headers = new Headers({
			'X-Response-Control': 'full',
			'X-Auth-Token': '1b2f74715c7f418b81ed2b67fb051093'
		});
		return new RequestOptions({ headers: headers });
	}

	public getCompetitionsList() {
		const url = `http://api.football-data.org/v1/competitions`;
		console.log(url);
		return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}

	public getCompetitionTeams(competitionId: number) {
		// 	http://api.football-data.org/v1/competitions/${leagueId}/teams
	}

	public getCompetitionTable(competitionId: number) {
		 const url = `http://api.football-data.org/v1/competitions/${competitionId}/leagueTable`;
		 console.log(url);
		 return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}

	public getCompetitionFixtures(competitionId: number) {
		// 	http://api.football-data.org/v1/competitions/${leagueId}/fixtures
	}

	public getFixturesForLeague(leagueCodes: string, timeFrame?: string) {
		const url = `http://api.football-data.org/v1/fixtures?league=${leagueCodes}`;
		console.log(url);
		return this.http.get(url, this.getHeaders()).map((response: Response) => response.json());
	}

	public getFixture(fixtureId: number) {
		// 	http://api.football-data.org/v1/fixtures/${fixtureId}
		/**
		 * filter by
		 *  matchday
		 */
	}

	public getTeamFixtures(teamId: number) {
		// 	http://api.football-data.org/v1/teams/${teamId}/fixtures
		/**
		 * filter by
		 *  season=/\d\d\d\d/
			timeFrame=/p|n[1-9]{1,2}/
			venue=/home|away/
		 */
	}

	public getTeam(teamId: number) {
		// 	http://api.football-data.org/v1/teams/${teamId}
	}

	public getTeamPlayers(teamId: number) {
		// 	http://api.football-data.org/v1/teams/${teamId}/players
	}
}
