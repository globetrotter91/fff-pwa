import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-section-selector',
	templateUrl: './section-selector.component.html',
	styleUrls: ['./section-selector.component.scss']
})
export class SectionSelectorComponent implements OnInit {

	constructor() { }
	private selectedLeagues: string[] = [];
	private selectedLeague: string;
	ngOnInit() {
		this.selectedLeagues = localStorage.getItem('selectedLeagues').split(',');
		this.selectedLeagues.pop();
		this.selectedLeague = this.selectedLeagues[0];
	}

	leagueSelectionChanged() {

	}

}
