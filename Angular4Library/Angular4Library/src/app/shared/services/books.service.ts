import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class BooksService {

    constructor(private http: Http, private location: Location) {}

    tryGetBook(id: number): Observable<Book> {
        return this.http.get(this.location.prepareExternalUrl('api/Books/GetBook/' + id)).map(book => book.json());
    }
    tryGetAuthors(id: any): Observable<Author[]> {
        return this.http.get(this.location.prepareExternalUrl('api/Authors/GetAuthors/' + id)).map(author => author.json());
    }
    tryGetBooks(): Observable<Book[]> {
        return this.http.get(this.location.prepareExternalUrl('api/Books/GetBooks')).map(books => books.json());
    }

    tryAddBook(book: any): Observable<Response> {
        return this.http.post(this.location.prepareExternalUrl('api/Books/AddBook'), book);
    }
    tryRemoveBook(id: any): Observable<Response> {
        return this.http.delete(this.location.prepareExternalUrl('api/Books/DeleteBook/' + id));
    }
    tryEditBook(book: any): Observable<Response> {
        return this.http.put(this.location.prepareExternalUrl('api/Books/EditBook'), book);
    }
    
    uploadPhoto(formData: any): Observable<ImageModel>  {        
        return this.http.post(this.location.prepareExternalUrl("api/Books/UploadPhoto"),formData).map(resp=>resp.json());
    }
}


