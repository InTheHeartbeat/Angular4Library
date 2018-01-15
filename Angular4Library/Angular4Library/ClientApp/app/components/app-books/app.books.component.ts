import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { BooksService } from '../../books.service';

@Component({
	selector:'app-books',
	templateUrl: './app.books.component.html',
	styleUrls: ['./app.books.component.min.css']
})
export class AppBooksComponent {
    
    books = [];

    idToRemove:any = -1;

    currentUser = {};

    constructor(private accountService: AccountService, private booksService: BooksService) { }

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


    public tryRemoveBook(id: any) {
        this.idToRemove = id;
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
}