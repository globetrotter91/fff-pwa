import { GameResult } from './game-result';
import { Team } from './team';

export class Fixture {
    constructor(
        private _date: Date,
        private _status: string,
        private _homeTeamName: string,
        private _awayTeamName: string,
        private _result: GameResult
    ) {}
/*
    public getHomeTeam():Team {

    }
    public getAwayTeam():Team {

    }*/
}
