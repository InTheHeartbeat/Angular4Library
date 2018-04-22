import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common'

@Injectable()
export class NewspapersService {

    constructor(private http: Http, private location: Location) {}

    tryGetNewspaper(id:any){return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspaper/'+id)).map(newspaper => newspaper.json());}

    tryGetNewspapers() {
        return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspapers')).map(newspapers => newspapers.json());
    }

    tryAddNewspaper(newspaper: any) {
        return this.http.post(this.location.prepareExternalUrl('api/Newspapers/AddNewspaper'), newspaper);
    }

    tryRemoveNewspaper(id: any) {
        return this.http.delete(this.location.prepareExternalUrl('api/Newspapers/DeleteNewspaper/' + id));
    }
    tryEditNewspaper(newspaper: any) {
        return this.http.put(this.location.prepareExternalUrl('api/Newspapers/EditNewspaper'), newspaper);
    }
    
    uploadPhoto(formData: any) {        
        return this.http.post(this.location.prepareExternalUrl("api/Newspapers/UploadPhoto"),formData).map(resp=>resp.json());
    }
}


