import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { JournalsService } from '../../journals.service';
import {Router} from '@angular/router';
import { SellService } from '../../sell.service';
import { ExportService } from '../../export.service';
@Component({
	selector:'app-journals',
	templateUrl: './app.journals.component.html',
	styleUrls: ['./app.journals.component.min.css']
})
export class AppJournalsComponent {
    
    journals = [];

    busyId:any = -1;

    currentUser = {};

    exportMode: boolean = false;
    isXml: boolean = false;    

    constructor(private accountService: AccountService, private journalsService: JournalsService, private router: Router, private sellService:SellService, private exportService:ExportService) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;            
        });

        this.journalsService.tryGetJournals().subscribe(journals => this.journals = journals);
    }


    public editJournalForm(id:any) {
        this.router.navigate(['/journals/put',id]);
    }

    public tryRemoveJournal(id: any) {
        this.busyId = id;
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
    public addToBasket(id: any) {
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 2).subscribe(resp => {
            if (resp.ok) {
                this.busyId = -1;
            }
        });
    }

    public switchExportMode() {
        this.exportMode = !this.exportMode;
    }

    public tryExport() {
        var ids: any[] = [];
        this.journals.forEach((value: any, index, array) => {
            if (value.selected) {
                ids.push(value.id);
            }
        });
        this.exportService.tryExportItems(2, ids, this.isXml);
    }
}