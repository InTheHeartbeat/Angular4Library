import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class ImportService {

    constructor(private http: Http, private location: Location) { }

    tryImport(formData: any): Observable<Response> {
        return this.http.post(this.location.prepareExternalUrl("api/Import/TryImport"), formData);
    }
}
