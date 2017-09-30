import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-newsitem',
	templateUrl: './newsitem.component.html',
	styleUrls: ['./newsitem.component.scss']
})
export class NewsitemComponent implements OnInit {

	@Input() heading: string;
	@Input() image: string;
	@Input() url: string;

	constructor() { }

	ngOnInit() {
	}

}
