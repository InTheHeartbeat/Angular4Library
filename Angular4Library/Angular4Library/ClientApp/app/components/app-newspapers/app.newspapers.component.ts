import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { NewspapersService } from '../../newspapers.service';
import {Router} from '@angular/router';
import { SellService } from '../../sell.service';
import { ExportService } from '../../export.service';
@Component({
	selector:'app-newspapers',
	templateUrl: './app.newspapers.component.html',
	styleUrls: ['./app.newspapers.component.min.css']
})
export class AppNewspapersComponent {
    
    newspapers = [];
    currentUser = {};

    busyId:any = -1;    
    exportMode: boolean = false;
    isXml: boolean = false;    

    constructor(private accountService: AccountService, private newspapersService: NewspapersService, private router: Router, private sellService:SellService, private exportService:ExportService) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;            
        });

        this.newspapersService.tryGetNewspapers().subscribe(newspapers => this.newspapers = newspapers);
    }


    public editNewspaperForm(id:any) {
        this.router.navigate(['/newspapers/put',id]);
    }

    public tryRemoveNewspaper(id: any) {
        this.busyId = id;
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

    public addToBasket(id: any) {
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 3).subscribe(resp => {
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