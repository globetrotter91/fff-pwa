import { Component, OnInit, Input } from '@angular/core';

/**
 * @name StandingsComponent
 * @description
 * This is the Standings page of the application
 * Here the user can select one of his favorite leagues
 * and can view the latest league table
 * This component acts as a container for selector component and actual league table.
 */
@Component({
	templateUrl: './standings.component.html',
	// style url is not here because not scoped styling was done for this component
})
export class StandingsComponent implements OnInit {

	leagueCompetitionId: number;	// this prop is passed to the child component
	noLeagueSelected: boolean;
	constructor() { }

	ngOnInit() {
		const selectedLeagues: string = localStorage.getItem('selectedLeagues');
		if (!selectedLeagues) {
		  this.noLeagueSelected = true;
		}
	}
	onLeagueChange(selectedLeagueCompetitionId) {
		this.leagueCompetitionId = selectedLeagueCompetitionId;
	}
}
