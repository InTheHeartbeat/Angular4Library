import { Component } from '@angular/core';
import {BooksService} from "../../books.service";
import {Router} from '@angular/router'

@Component({
    selector: 'app-books-put',
    templateUrl: './app.books.put.component.html',
    styleUrls: ['./app.books.put.component.min.css']
})
export class AppBooksPutComponent {

    public photoUploaded:boolean = true;
    public currentPhotoPath: string = "/Upload/Images/no-photo-e.png";

    public currentBook = {
        Id: -1,
        PhotoId: -1,
        Title: '',
        Author: '',
        Genre: '',
        Year: '',
        Pages: '',
        Amount: '',
        Price: '',
        PhotoPath: '',        
    };

    constructor(private booksService: BooksService, private router: Router) {  }

    public uploadPhotoChange(files: any) {
        this.photoUploaded = false;
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("image", files[0]);
            this.booksService.uploadPhoto(formData).subscribe(res => {
                this.currentPhotoPath = res.path;
                this.currentBook.PhotoPath = res.path;
                this.currentBook.PhotoId = res.id;
                this.photoUploaded = true;
            });  
        }      
    }

    public tryAddBook() {
        this.booksService.tryAddBook(this.currentBook).subscribe(resp => {
            if (resp.ok) {
                this.router.navigateByUrl('/');
            }
        });
    }
}