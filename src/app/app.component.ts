import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service';

/**
 * @name AppComponent
 * @description
 * This component acts as a layout component encapsulating
 * all other chile components.
 * @param DataService injected to create and populate the db with static stuff like league codes
 */
@Component({
	selector: 'app-root',		// best practice to have `app-` prefix
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(private dataService: DataService) {}

	ngOnInit() {
		// the initialize method creates a db if not present and upgrades it if present
		this.dataService.initialize();
	}

}
