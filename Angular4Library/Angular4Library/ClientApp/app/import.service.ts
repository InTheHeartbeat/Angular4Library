import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';

@Injectable()
export class ImportService {

    constructor(private http: Http, private location: Location) { }

    tryImport(formData: any) {
        return this.http.post(this.location.prepareExternalUrl("api/Import/TryImport"), formData);
    }
}
