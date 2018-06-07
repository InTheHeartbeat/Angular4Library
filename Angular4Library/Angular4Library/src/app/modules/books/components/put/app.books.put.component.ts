import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { BooksService } from '../../../../shared/services/books.service';

import { SelectDropDownModule } from 'ngx-select-dropdown';

@Component({
    selector: 'app-books-put',
    templateUrl: './app.books.put.component.html',
    styleUrls: ['./app.books.put.component.min.css']
})
export class AppBooksPutComponent {

    public photoUploaded: boolean = true;
    public currentPhotoPath: string = "/Upload/Images/no-photo-e.png";
    public authors: Author[] = [];

    private idSubscriber: any;

    isEdit: boolean;
    idForEdit: number;


    dropdownConfig = {
        displayKey: "fullName",
        search: true,
    };

    public currentBook: Book = {
        Id: -1,        
        Title: '',
        Authors: [],
        Genre: '',
        Year: '',
        Pages: '',
        Amount: '',
        Price: '',
        PhotoPath: '',
    };

    constructor(private booksService: BooksService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.idSubscriber = this.route.params.subscribe(params => {
            this.idForEdit = +params['id'];
            if (this.idForEdit && this.idForEdit > -1) {
                this.isEdit = true;
                this.booksService.tryGetBook(this.idForEdit).subscribe(book => {
                this.currentBook = book;
                    this.currentPhotoPath = book.PhotoPath;
                });
            } else {
                this.isEdit = false;
            }
            this.booksService.tryGetAuthors(this.idForEdit).subscribe(authors => { this.authors = authors; console.log(this.authors); });

        });
    }

    public uploadPhotoChange(files: any): void {
        this.photoUploaded = false;
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("image", files[0]);
            this.booksService.uploadPhoto(formData).subscribe(res => {
                this.currentPhotoPath = res.Path;
                this.currentBook.PhotoPath = res.Path;                
                this.photoUploaded = true;
            });
        }
        else { this.photoUploaded = true; }
    }
    public tryAddBook(): void {
        if (this.currentBook.Authors.length > 0) {
             this.booksService.tryAddBook(this.currentBook).subscribe(resp => {
                if (resp.ok) {
                    this.router.navigateByUrl('/books');
                }
            });
        }
    }
    public tryEditBook(): void {
        if (this.currentBook.Authors.length > 0) {
            this.booksService.tryEditBook(this.currentBook).subscribe(resp => {
                if (resp.ok) {
                    this.router.navigateByUrl('/books');
                }
            });
        }
    }
}
