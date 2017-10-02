import { DataService } from './../../services/data.service';
import { Fixture } from './../../models/fixture';
import { ApiService } from './../../services/api.service';
import { Component, OnChanges, SimpleChange, Input } from '@angular/core';

/**
 * @name FixturesListComponent
 * @description
 * This component displays the list of fixtures of the league selected
 * The component uses the input property to receive the leagueId
 * ngOnChanges is used instaed of ngOnInit to reflect the changes from parent component
 * @param ApiService is used for making API calls.
 * @param DataService is mid like level layer between the application and the indexedDB of the browser
 */
@Component({
	selector: 'app-fixtures-list',		// recognized by this tag in html files
	templateUrl: './fixtures-list.component.html',
	// style url is not here because not scoped styling was done for this component
})
export class FixturesListComponent implements OnChanges {

	@Input() competitionId: number;		// input property for id of the league selected
	scheduledfixtures: Fixture[];
	finishedFixtures: Fixture[];
	selectedPane: string;			// for tracking the selected tab (scheduled/finished)

	constructor(private apiService: ApiService, private dataService: DataService) {
		this.selectedPane = 'scheduled';
		this.scheduledfixtures = [];
		this.finishedFixtures = [];
	}

	// this is used to reflect the changes with the change in the
	// `competitionId` input property of the component
	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if (changes.competitionId && changes.competitionId.currentValue) {
            this.fetchFixturesList(changes.competitionId.currentValue);
		}else {
			this.fetchFixturesList(this.dataService.defaultLeagueCompetitionId);
		}
	}

	// this function takes the league id and returns an observable
	// with the fixtures of the passed league id.
	// further divided in 2 arrays of scheduled or finished based on the status
	fetchFixturesList(compId: number) {
		this.scheduledfixtures = [];
		this.finishedFixtures = [];
		this.apiService.getCompetitionFixtures(compId).subscribe(
			res => {
				res.fixtures.forEach((fixture) => {
					if (fixture.status === 'IN_PLAY' || fixture.status === 'TIMED' || fixture.status === 'SCHEDULED') {
						this.scheduledfixtures.push(fixture);
					}else {
						this.finishedFixtures.push(fixture);
					}
				});
			},
			err => { console.log(err); }
		);
	}
}
