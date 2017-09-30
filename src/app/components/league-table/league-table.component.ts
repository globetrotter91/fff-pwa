import { Component, OnInit } from '@angular/core';

import { TeamRank } from './../../models/team-rank';

@Component({
	selector: 'app-league-table',
	templateUrl: './league-table.component.html',
	styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit {
	rankings: TeamRank[] = [];

	constructor() {
		this.rankings.push({
			team: {
				id: 1,
				name: 'FC Barcelona',
				code: 'FCB'
			},
			rank: 1,
			points: 20,
			games: 20,
			goalDifference: 10
		});
		this.rankings.push({
			team: {
				id: 2,
				name: 'Real Madrid',
				code: 'RMA'
			},
			rank: 2,
			points: 10,
			games: 20,
			goalDifference: -3
		});
		console.log(this.rankings);
	}

	ngOnInit() { }

}
