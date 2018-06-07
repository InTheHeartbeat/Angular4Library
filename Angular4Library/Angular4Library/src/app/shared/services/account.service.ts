import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common'

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {    

    private currentUserSource = new Subject<any>();
    private errorSource = new Subject<any>();

    currentUser$ = this.currentUserSource.asObservable();
    error$ = this.errorSource.asObservable();

    currentUser: User;
    
    constructor(private http: Http, private location: Location) {
        this.currentUser$.subscribe(user => {
            if (!user.IsVisitor) {
                this.currentUser = user;
            }
        });
    }

    postTrySignIn(login: string, pass: string): Observable<User> {
        return this.http.post(this.location.prepareExternalUrl('api/Account/TrySignIn'), { Login: login, Password: pass })
            .map(response => response.json());
    }
    postTrySignUp(login: string, pass: string): Observable<User> {
        return this.http
            .post(this.location.prepareExternalUrl('api/Account/TrySignUp'), { Login: login, Password: pass })
            .map(response => response.json());
    }
    postSignOut(): Observable<User> {        
        return this.http.post(this.location.prepareExternalUrl('api/Account/SignOut'),{Token: this.currentUser.Token}).map(response=>response.json());
    }

    getCurrentUser(): Observable<User> {
        return this.http.get(this.location.prepareExternalUrl('api/Account/GetCurrentUser'))
            .map(response => response.json());
    }		

    trySignIn(login: string, pass: string): void {        
        this.postTrySignIn(login,pass).subscribe((result: any) => {
            if (result && result.token) {                
                this.currentUserSource.next(result);                
            }
            if (result && !result.token && result.message) {
                this.errorSource.next(result.message);
            }
        });
	}
    trySignUp(login: string, pass: string): void {
        this.postTrySignUp(login, pass).subscribe((result: any) => {
            if (result && result.token) {
                this.currentUserSource.next(result);
            }
            if (result && !result.token && result.message) {
                this.errorSource.next(result.message);
            }
        });
    }
    trySignOut(): void {
        if (this.currentUser) {
            this.postSignOut().subscribe((result: any) => {
                if (result && result.token) {
                    this.currentUserSource.next(result);
                }
            });
        }
    }
    loadCurrentUser(): void {
        this.getCurrentUser().subscribe((user: any) => {
            this.currentUserSource.next(user);
        });
    }
}
