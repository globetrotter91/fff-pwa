import { Team } from './team';
export interface TeamRank {
    team: Team;
    rank:  number;
    points: number;
    games: number;
    goalDifference: number;
}
