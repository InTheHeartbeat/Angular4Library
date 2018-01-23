import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common'

@Injectable()
export class JournalsService {

    constructor(private http: Http, private location: Location) {}

    tryGetJournal(id:any){return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournal/'+id)).map(journal => journal.json());}

    tryGetJournals() {
        return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournals')).map(journals => journals.json());
    }

    tryAddJournal(journal: any) {
        return this.http.post(this.location.prepareExternalUrl('api/Journals/AddJournal'), journal);
    }

    tryRemoveJournal(id: any) {
        return this.http.delete(this.location.prepareExternalUrl('api/Journals/DeleteJournal/' + id));
    }
    tryEditJournal(journal: any) {
        return this.http.put(this.location.prepareExternalUrl('api/Journals/EditJournal'), journal);
    }
    
    uploadPhoto(formData: any) {        
        return this.http.post(this.location.prepareExternalUrl("api/Journals/UploadPhoto"),formData).map(resp=>resp.json());
    }
}


