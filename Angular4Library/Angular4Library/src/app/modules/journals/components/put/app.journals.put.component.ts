import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { JournalsService } from '../../../../shared/services/journals.service';

@Component({
    selector: 'app-journals-put',
    templateUrl: './app.journals.put.component.html',
    styleUrls: ['./app.journals.put.component.min.css']
})
export class AppJournalsPutComponent {

    public photoUploaded:boolean = true;
    public currentPhotoPath: string = "/Upload/Images/no-photo-e.png";

    private idSubscriber: any;
    
    isEdit:boolean;
    idForEdit: number;

    public currentJournal: Journal = {
        Id: -1,        
        Title: '',
        Date: '',
        Theme: '',
        Periodicity: '',        
        Amount: '',
        Price: '',
        PhotoPath: ''
    };

    constructor(private journalsService: JournalsService, private router: Router, private route: ActivatedRoute) {  }

    ngOnInit() {
        this.idSubscriber=this.route.params.subscribe(params => {
            this.idForEdit = +params['id'];
            if (this.idForEdit && this.idForEdit > -1) {
                this.isEdit = true;
                this.journalsService.tryGetJournal(this.idForEdit).subscribe(journal => { this.currentJournal = journal;
                    this.currentPhotoPath = journal.PhotoPath;
                });
                
            } else {
                this.isEdit = false;
            }
        });        
    }    

    public uploadPhotoChange(files: any): void {
        this.photoUploaded = false;
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("image", files[0]);
            this.journalsService.uploadPhoto(formData).subscribe(res => {
                this.currentPhotoPath = res.Path;
                this.currentJournal.PhotoPath = res.Path;                
                this.photoUploaded = true;
            });  
        }   
        else { this.photoUploaded = true;}
    }

    public tryAddJournal(): void {
        this.journalsService.tryAddJournal(this.currentJournal).subscribe(resp => {
            if (resp.ok) {
                this.router.navigateByUrl('/journals');
            }
        });
    }
    public tryEditJournal(): void {
    this.journalsService.tryEditJournal(this.currentJournal).subscribe(resp => {
        if (resp.ok) {
            this.router.navigateByUrl('/journals');
        }
    });
}
}
