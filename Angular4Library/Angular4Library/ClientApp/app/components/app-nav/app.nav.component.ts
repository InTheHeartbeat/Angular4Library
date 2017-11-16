import {Component, Input} from '@angular/core';

@Component({
	selector:'app-nav',
	templateUrl: './app.nav.component.html',
	styleUrls: ['./app.nav.component.min.css']
})
export class AppNavComponent {
	@Input() currentUser: any;
}