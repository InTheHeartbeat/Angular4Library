import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common'

import 'rxjs/add/operator/map'

@Injectable()
export class AccountService {
	
	constructor(private http: Http, private location: Location){}
	
	getCurrentUser() {
		return this.http.get(this.location.prepareExternalUrl('api/Account/GetCurrentUser'))
			.map(response => response.json());
	}
}