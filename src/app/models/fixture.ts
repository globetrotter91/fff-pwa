import { GameResult } from './game-result';

export interface Fixture {
    date: Date;
    homeTeamName: string;
    awayTeamName: string;
    status: string;
    result: GameResult;
}
