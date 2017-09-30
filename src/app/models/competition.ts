import { League } from './league';
import { ApiService } from './../services/api.service';

export class Competition {
    constructor(
        private _id: number,
        private _caption: string,
        private _league: League,
        private _year: number,
        private _numberOfMatchdays: number,
        private _numberOfTeams: number,
        private _numberOfGames: number,
        private apiService: ApiService
    ) {}

    public getFixtures() {
        return this.apiService.getCompetitionFixtures(this._id);
    }

    public getTeams() {
        return this.apiService.getCompetitionTeams(this._id);
    }

    public getStandings() {
        return this.apiService.getCompetitionTable(this._id);
    }
}


export interface LeageCompetition {
    id: number;
    league: League;
}
