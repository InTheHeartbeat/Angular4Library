import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { AccountService } from '../../../../shared/services/account.service';
import { JournalsService } from '../../../../shared/services/journals.service';
import { ImportService } from '../../../../shared/services/import.service';
import { SellService } from '../../../../shared/services/sell.service';
import { ExportService } from '../../../../shared/services/export.service';

@Component({
	selector:'app-journals',
	templateUrl: './app.journals.component.html',
	styleUrls: ['./app.journals.component.min.css']
})
export class AppJournalsComponent {
    
    journals: Journal[] = [];

    busyId:number = -1;

    currentUser:User;

    exportMode: boolean = false;
    isXml: boolean = false;    

    constructor(private accountService: AccountService, private journalsService: JournalsService,
        private router: Router, private sellService: SellService,
        private exportService: ExportService, private importService: ImportService) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;            
        });

        this.journalsService.tryGetJournals().subscribe(journals => { this.journals = journals;});
    }

    public editJournalForm(id:number): void {
        this.router.navigate(['/journals/put',id]);
    }
    public tryRemoveJournal(id: number): void {
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
    public addToBasket(id: number): void {
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 2).subscribe(resp => {
            if (resp.ok) {
                this.busyId = -1;
            }
        });
    }

    public switchExportMode(): void {
        this.exportMode = !this.exportMode;
    }

    public tryExport(): void {
        var ids: number[] = [];
        this.journals.forEach((value: any, index, array) => {
            if (value.selected) {
                ids.push(value.id);
            }
        });
        this.exportService.tryExportItems(2, ids, this.isXml);
    }

    public importChange(files: any): void {
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("import", files[0]);
            this.importService.tryImport(formData).subscribe(res => {
                this.journalsService.tryGetJournals().subscribe(journals => this.journals = journals);
                alert("Import " + res.status);                
            });
        }
    }
}
