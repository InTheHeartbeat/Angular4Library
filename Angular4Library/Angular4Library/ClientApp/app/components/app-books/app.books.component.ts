import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { BooksService } from '../../books.service';
import { SellService } from '../../sell.service';
import {Router} from '@angular/router';

@Component({
	selector:'app-books',
	templateUrl: './app.books.component.html',
	styleUrls: ['./app.books.component.min.css']
})
export class AppBooksComponent {
    
    books = [];

    busyId:any = -1;

    currentUser = {};

    constructor(private accountService: AccountService, private booksService: BooksService, private router: Router, private sellService:SellService) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;
            console.log("books");
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
}