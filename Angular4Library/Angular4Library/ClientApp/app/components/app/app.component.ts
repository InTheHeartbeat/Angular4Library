import { Component } from '@angular/core';
import {AccountService} from '../../account.service';
import { CookieService } from 'ngx-cookie-service';

@
Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AccountService, CookieService]
})
export class AppComponent {
	
	currentUser = {};
	
	constructor(private accountService: AccountService, private cookieService: CookieService){}
	
	ngOnInit() {
		this.accountService.getCurrentUser().subscribe(account => {
			this.initCurrentUser(account);
		});		
	}

	private initCurrentUser(account: any) {
		this.currentUser = account;
		console.log(account.isVisitor);
		if (account.isVisitor) {
			if (this.cookieService.check('AT')) {
				this.cookieService.delete('AT');
			}
			this.cookieService.set('VT', account.token);
		}
	}
}
