interface Score {
    goalsHomeTeam: number;
    goalsAwayTeam: number;
}
export interface GameResult {
    finalScore: Score;
    halfTimeScore?: Score;
    extraTimeScore?: Score;
    penaltyShootout?: Score;
}
