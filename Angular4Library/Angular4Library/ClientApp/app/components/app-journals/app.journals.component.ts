import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { JournalsService } from '../../journals.service';
import {Router} from '@angular/router';

@Component({
	selector:'app-journals',
	templateUrl: './app.journals.component.html',
	styleUrls: ['./app.journals.component.min.css']
})
export class AppJournalsComponent {
    
    journals = [];

    idToRemove:any = -1;

    currentUser = {};

    constructor(private accountService: AccountService, private journalsService: JournalsService, private router: Router) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;
            console.log("journals");
        });

        this.journalsService.tryGetJournals().subscribe(journals => this.journals = journals);
    }


    public editJournalForm(id:any) {
        this.router.navigate(['/journals/put',id]);
    }

    public tryRemoveJournal(id: any) {
        this.idToRemove = id;
        this.journalsService.tryRemoveJournal(id).subscribe(resp => {
            if (resp.ok) {
                this.journals.forEach((value:any, index, array) => {
                    if (value.id === id) {
                        this.journals.splice(index,1);
                    }
                });
            }
        });
    }
}