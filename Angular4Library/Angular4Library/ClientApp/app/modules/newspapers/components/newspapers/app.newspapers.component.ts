import {Component} from '@angular/core';
import { NewspapersService } from '../../newspapers.service';
import {Router} from '@angular/router';
import {AccountService} from "../../../accounting/account.service";
import {SellService} from "../../../basket/sell.service";
import { ExportService } from "../../../data-transfer/export.service";
import { ImportService } from "../../../data-transfer/import.service";
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
        this.newspapers.forEach((value: any, index, array) => {
            if (value.selected) {
                ids.push(value.id);
            }
        });
        this.exportService.tryExportItems(2, ids, this.isXml);
    }

    public importChange(files: any) {
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