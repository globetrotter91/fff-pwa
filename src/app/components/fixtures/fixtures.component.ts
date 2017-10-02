import { Component, OnInit } from '@angular/core';

/**
 * @name FixturesComponent
 * @description
 * This is the fixtures page of the application
 * Here the user can select one of his favorite leagues
 * and can view the latest upcoming or finished fixtures
 * This component acts as a container for selector component and actual fixtures list.
 */
@Component({
	templateUrl: './fixtures.component.html',
	// style url is not here because not scoped styling was done for this component
})
export class FixturesComponent implements OnInit {

	leagueCompetitionId: number;		// this prop is passed to the child component
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
