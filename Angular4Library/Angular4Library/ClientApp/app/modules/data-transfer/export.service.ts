import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Location } from '@angular/common';
import * as FileSaver from 'file-saver';
@Injectable()
export class ExportService {

    constructor(private http: Http, private location: Location) { }

    tryExportItems(type: any, ids: any, isXml:any) {
        return this.http.post(this.location.prepareExternalUrl("api/Export/TryExport"),
            { type: type, idsArray: ids, isXml: isXml },
            { responseType: ResponseContentType.Blob }).subscribe((data: any) => {
            const blob = new Blob([data._body], { type: data.headers.get('Content-Type') });
            const contentDispositionHeader = data.headers.get('Content-Disposition');
            if (contentDispositionHeader !== null) {
                const contentDispositionHeaderResult = contentDispositionHeader.split(';')[1].trim().split('=')[1];
                const contentDispositionFileName = contentDispositionHeaderResult.replace(/"/g, '');
                FileSaver.saveAs(blob, contentDispositionFileName);
            }
        });
    }
}