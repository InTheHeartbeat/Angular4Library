import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { ExportService } from '../../export.service';
import { BooksService } from '../../books.service';
import { SellService } from '../../sell.service';
import { ImportService } from '../../import.service';
import {Router} from '@angular/router';

@Component({
	selector:'app-books',
	templateUrl: './app.books.component.html',
	styleUrls: ['./app.books.component.min.css']
})
export class AppBooksComponent {
    
    books = [];
    currentUser = {};

    busyId:any = -1;
    exportMode: boolean = false;
    isXml: boolean = false;    

    constructor(private accountService: AccountService, private booksService: BooksService,
        private router: Router, private sellService: SellService,
        private exportService: ExportService, private importService:ImportService) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }        
        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;            
        });

        this.booksService.tryGetBooks().subscribe(books => this.books = books);
    }

    
    public editBookForm(id:any) {
        this.router.navigate(['/books/put',id]);
    }

    public tryRemoveBook(id: any) {
        this.busyId = id;
        this.booksService.tryRemoveBook(id).subscribe(resp => {
            if (resp.ok) {
                this.books.forEach((value:any, index, array) => {
                    if (value.id === id) {
                        this.books.splice(index,1);
                    }
                });
            }
        });
    }

    public addToBasket(id: any) {
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 1).subscribe(resp => {
            if (resp.ok) {
                this.busyId = -1;
            }
        });
    }

    public switchExportMode() {        
        this.exportMode = !this.exportMode;        
    }

    public tryExportBooks() {
        var ids:any[] = [];

        this.books.forEach((value: any, index, array) => {
            if (value.selected) {
                ids.push(value.id);
            }
        });

        this.exportService.tryExportItems(1, ids, this.isXml);
    }

    public importChange(files: any) {        
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("import", files[0]);
            this.importService.tryImport(formData).subscribe(res => {
                this.booksService.tryGetBooks().subscribe(books => this.books = books);
                alert("Import " + res.status);                
            });
        }        
    }
}