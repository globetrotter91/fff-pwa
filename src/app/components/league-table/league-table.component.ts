import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

import { DataService } from './../../services/data.service';
import { ApiService } from './../../services/api.service';

/**
 * @name LeagueTableComponent
 * @description
 * This component displays the league table of the league selected
 * The component uses the input property to receive the leagueId
 * ngOnChanges is used instaed of ngOnInit to reflect the changes from parent component
 * @param ApiService is used for making API calls.
 * @param DataService is mid like level layer between the application and the indexedDB of the browser
 */
@Component({
	selector: 'app-league-table',		// recognized by this tag in html files
	templateUrl: './league-table.component.html',
	// style url is not here because not scoped styling was done for this component
})
export class LeagueTableComponent implements OnChanges {

	@Input() competitionId: number;		// input property for id of the league selected
	rankings: Array<any> = [];

	constructor(private apiService: ApiService, private dataService: DataService) { }

	// this is used to reflect the changes with the change in the
	// `competitionId` input property of the component
	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if (changes.competitionId && changes.competitionId.currentValue) {
			this.fetchLeagueTable(changes.competitionId.currentValue);
		}else {
			this.fetchLeagueTable(this.dataService.defaultLeagueCompetitionId);
		}
	}

	// this function takes the league id and returns an observable
	// with the standing of the passed league id.
	fetchLeagueTable(compId: number) {
		this.apiService.getCompetitionTable(compId).subscribe(
			res => this.rankings = res.standing,
			err => { console.log(err); }
		);
	}
}
