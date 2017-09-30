import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-fixtures-list',
	templateUrl: './fixtures-list.component.html',
	styleUrls: ['./fixtures-list.component.scss']
})
export class FixturesListComponent implements OnInit {

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		/*
		this.apiService.getFixturesForLeague('PL,PD').subscribe(
			res => {
				console.log(res);
			},
			err => {
				console.log(err);
			}
		);*/
	}

}
