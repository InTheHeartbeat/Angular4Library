import { Component } from '@angular/core';
import {BooksService} from "../../books.service";
import { Router, ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-books-put',
    templateUrl: './app.books.put.component.html',
    styleUrls: ['./app.books.put.component.min.css']
})
export class AppBooksPutComponent {

    public photoUploaded:boolean = true;
    public currentPhotoPath: string = "/Upload/Images/no-photo-e.png";

    private idSubscriber: any;
    
    isEdit:boolean;
    idForEdit: number;

    public currentBook = {
        id: -1,
        photoId: -1,
        title: '',
        author: '',
        genre: '',
        year: '',
        pages: '',
        amount: '',
        price: '',
        photoPath: '',        
    };

    constructor(private booksService: BooksService, private router: Router, private route: ActivatedRoute) {  }

    ngOnInit() {
        this.idSubscriber=this.route.params.subscribe(params => {
            this.idForEdit = +params['id'];
            if (this.idForEdit && this.idForEdit > -1) {
                this.isEdit = true;
                this.booksService.tryGetBook(this.idForEdit).subscribe(book => { this.currentBook = book;
                    this.currentPhotoPath = book.photoPath;
                });
                
            } else {
                this.isEdit = false;
            }
        });        
    }    

    public uploadPhotoChange(files: any) {
        this.photoUploaded = false;
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("image", files[0]);
            this.booksService.uploadPhoto(formData).subscribe(res => {
                this.currentPhotoPath = res.path;
                this.currentBook.photoPath = res.path;
                this.currentBook.photoId = res.id;
                this.photoUploaded = true;
            });  
        }   
        else { this.photoUploaded = true;}
    }

    public tryAddBook() {
        this.booksService.tryAddBook(this.currentBook).subscribe(resp => {
            if (resp.ok) {
                this.router.navigateByUrl('/');
            }
        });
    }

    public tryEditBook() {
    this.booksService.tryEditBook(this.currentBook).subscribe(resp => {
        if (resp.ok) {
            this.router.navigateByUrl('/');
        }
    });
}
}