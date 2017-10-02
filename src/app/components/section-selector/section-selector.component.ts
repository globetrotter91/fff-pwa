import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { League } from './../../models/league';
import { DataService } from './../../services/data.service';

/**
 * @name SectionSelectorComponent
 * @description
 * This is the reusable component can be used in various places
 * Used to select one of the favorite leagues already saved in localStorage
 * The component uses the output property to fire a event whenever the league is changed
 */
@Component({
	selector: 'app-section-selector',	// recognized by this tag in html files
	templateUrl: './section-selector.component.html',
	// style url is not here because not scoped styling was done for this component
})
export class SectionSelectorComponent implements OnInit {

	@Output() userChangedLeague = new EventEmitter();	// Output Property
	private selectedLeague: number;
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.getSelectedLeagues();
		this.selectedLeague = this.dataService.defaultLeagueCompetitionId;
	}

	// this function is called when a league is selected
	// this emits a event with the data as the id of the selected league
	leagueSelectionChanged() {
		this.userChangedLeague.emit(this.selectedLeague);
	}

}
