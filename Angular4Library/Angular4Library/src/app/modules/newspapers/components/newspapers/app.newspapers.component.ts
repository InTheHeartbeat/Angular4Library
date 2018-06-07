import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../../shared/services/account.service';
import { ExportService } from '../../../../shared/services/export.service';
import { SellService } from '../../../../shared/services/sell.service';
import { ImportService } from '../../../../shared/services/import.service';
import { NewspapersService } from '../../../../shared/services/newspapers.service';

@Component({
	selector:'app-newspapers',
	templateUrl: './app.newspapers.component.html',
	styleUrls: ['./app.newspapers.component.min.css']
})
export class AppNewspapersComponent {
    
    newspapers:Newspaper[] = [];
    currentUser:User;

    busyId:number = -1;    
    exportMode: boolean = false;
    isXml: boolean = false;    

    constructor(private accountService: AccountService, private newspapersService: NewspapersService,
        private router: Router, private sellService: SellService,
        private exportService: ExportService, private importService: ImportService) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;            
        });

        this.newspapersService.tryGetNewspapers().subscribe(newspapers => this.newspapers = newspapers);
    }


    public editNewspaperForm(id:number):void {
        this.router.navigate(['/newspapers/put',id]);
    }
    public tryRemoveNewspaper(id: number):void {
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
    public addToBasket(id: number):void {
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 3).subscribe(resp => {
            if (resp.ok) {
                this.busyId = -1;
            }
        });
    }

    public switchExportMode():void {
        this.exportMode = !this.exportMode;
    }

    public tryExport():void {
        var ids: number[] = [];
        this.newspapers.forEach((value: any, index, array) => {
            if (value.selected) {
                ids.push(value.id);
            }
        });
        this.exportService.tryExportItems(2, ids, this.isXml);
    }

    public importChange(files: any):void {
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("import", files[0]);
            this.importService.tryImport(formData).subscribe(res => {
                this.newspapersService.tryGetNewspapers().subscribe(newspapers => this.newspapers = newspapers);
                alert("Import " + res.status);
            });
        }
    }
}
