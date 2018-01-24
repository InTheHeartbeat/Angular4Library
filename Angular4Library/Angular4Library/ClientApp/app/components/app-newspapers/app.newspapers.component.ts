import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { NewspapersService } from '../../newspapers.service';
import {Router} from '@angular/router';

@Component({
	selector:'app-newspapers',
	templateUrl: './app.newspapers.component.html',
	styleUrls: ['./app.newspapers.component.min.css']
})
export class AppNewspapersComponent {
    
    newspapers = [];

    idToRemove:any = -1;

    currentUser = {};

    constructor(private accountService: AccountService, private newspapersService: NewspapersService, private router: Router) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;
            console.log("newspapers");
        });

        this.newspapersService.tryGetNewspapers().subscribe(newspapers => this.newspapers = newspapers);
    }


    public editNewspaperForm(id:any) {
        this.router.navigate(['/newspapers/put',id]);
    }

    public tryRemoveNewspaper(id: any) {
        this.idToRemove = id;
        this.newspapersService.tryRemoveNewspaper(id).subscribe(resp => {
            if (resp.ok) {
                this.newspapers.forEach((value:any, index, array) => {
                    if (value.id === id) {
                        this.newspapers.splice(index,1);
                    }
                });
            }
        });
    }
}