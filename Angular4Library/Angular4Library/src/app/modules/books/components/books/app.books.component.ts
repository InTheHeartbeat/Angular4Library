import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../../../shared/services/books.service';
import { AccountService } from '../../../../shared/services/account.service';
import { ImportService } from '../../../../shared/services/import.service';
import { ExportService } from '../../../../shared/services/export.service';
import { SellService } from '../../../../shared/services/sell.service';




@Component({
	selector:'app-books',
	templateUrl: './app.books.component.html',
	styleUrls: ['./app.books.component.scss']
})
export class AppBooksComponent {
    
    books: Book[];
    currentUser: User;

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

    public editBookForm(id: number): void {
        this.router.navigate(['books/put',id]);
    }

    public tryRemoveBook(id: number):void {
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
    public addToBasket(id: any):void {
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 1).subscribe(resp => {
            if (resp.ok) {
                this.busyId = -1;
            }
        });
    }
    public switchExportMode():void {        
        this.exportMode = !this.exportMode;        
    }

    public tryExportBooks():void {
        var ids:number[] = [];

        this.books.forEach((value: any, index, array) => {
            if (value.selected) {
                ids.push(value.id);
            }
        });

        this.exportService.tryExportItems(1, ids, this.isXml);
    }

    public importChange(files: any):void {        
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("import", files[0]);
            this.importService.tryImport(formData).subscribe(res => {
                this.booksService.tryGetBooks().subscribe(books => this.books = books);
                alert("Import " + res.status);                
            });
        }        
    }

    private joinAuthors(authors: any) {
        return authors.map(author => author.fullName).join(", ");
    }
}
