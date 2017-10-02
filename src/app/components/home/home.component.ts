import { Component, OnInit } from '@angular/core';

/**
 * @name HomeComponent
 * @description
 * This is the home page of the application
 * This will soon have api driven news for selected leagues.
 */
@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	noLeagueSelected: boolean;

	constructor() {
		this.noLeagueSelected = false;
	}

	ngOnInit() {
		// the selected leagues by the user are save in local storage as string.
		const selectedLeagues: string = localStorage.getItem('selectedLeagues');
		if (!selectedLeagues) {
			this.noLeagueSelected = true;
		}
	}

}
