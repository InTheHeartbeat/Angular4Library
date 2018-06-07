import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class NewspapersService {

    constructor(private http: Http, private location: Location) {}

    tryGetNewspaper(id: number): Observable<Newspaper> {
        return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspaper/' + id)).map(newspaper => newspaper.json());
    }
    tryGetNewspapers(): Observable<Newspaper[]> {
        return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspapers')).map(newspapers => newspapers.json());
    }

    tryAddNewspaper(newspaper: Newspaper): Observable<Response> {
        return this.http.post(this.location.prepareExternalUrl('api/Newspapers/AddNewspaper'), newspaper);
    }
    tryRemoveNewspaper(id: number): Observable<Response> {
        return this.http.delete(this.location.prepareExternalUrl('api/Newspapers/DeleteNewspaper/' + id));
    }
    tryEditNewspaper(newspaper: Newspaper): Observable<Response> {
        return this.http.put(this.location.prepareExternalUrl('api/Newspapers/EditNewspaper'), newspaper);
    }

    uploadPhoto(formData: any): Observable<ImageModel> {        
        return this.http.post(this.location.prepareExternalUrl("api/Newspapers/UploadPhoto"),formData).map(resp=>resp.json());
    }
}


