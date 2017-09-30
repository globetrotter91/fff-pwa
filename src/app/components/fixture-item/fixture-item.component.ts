import { Team } from './../../models/team';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-fixture-item',
	templateUrl: './fixture-item.component.html',
	styleUrls: ['./fixture-item.component.scss']
})
export class FixtureItemComponent implements OnInit {

	@Input() homeTeam: Team;
	@Input() awayTeam: Team;
	@Input() venue: string;
	@Input() dateTime: Date;
	@Input() status: string;

	constructor() { }

	ngOnInit() {
	}

}
