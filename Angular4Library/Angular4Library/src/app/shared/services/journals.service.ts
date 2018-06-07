import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class JournalsService {

    constructor(private http: Http, private location: Location) {}

    tryGetJournal(id: number): Observable<Journal>  {
        return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournal/' + id)).map(journal => journal.json());
    }
    tryGetJournals(): Observable<Journal[]> {
        return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournals')).map(journals => journals.json());
    }

    tryAddJournal(journal: Journal): Observable<Response> {
        return this.http.post(this.location.prepareExternalUrl('api/Journals/AddJournal'), journal);
    }
    tryRemoveJournal(id: number): Observable<Response> {
        return this.http.delete(this.location.prepareExternalUrl('api/Journals/DeleteJournal/' + id));
    }
    tryEditJournal(journal: Journal): Observable<Response> {
        return this.http.put(this.location.prepareExternalUrl('api/Journals/EditJournal'), journal);
    }

    uploadPhoto(formData: any): Observable<ImageModel> {        
        return this.http.post(this.location.prepareExternalUrl("api/Journals/UploadPhoto"),formData).map(resp=>resp.json());
    }
}


