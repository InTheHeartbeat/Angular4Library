import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common'

@Injectable()
export class BooksService {

    constructor(private http: Http, private location: Location) {}

    tryGetBooks() {
        return this.http.get(this.location.prepareExternalUrl('api/Books/GetBooks')).map(books => books.json());
    }

    tryAddBook(book: any) {
        return this.http.post(this.location.prepareExternalUrl('api/Books/AddBook'), book);
    }

    tryRemoveBook(id: any) {
        return this.http.delete(this.location.prepareExternalUrl('api/Books/DeleteBook/' + id));
    }


    uploadPhoto(formData: any) {        
        return this.http.post(this.location.prepareExternalUrl("api/Books/UploadPhoto"),formData).map(resp=>resp.json());
    }
}


