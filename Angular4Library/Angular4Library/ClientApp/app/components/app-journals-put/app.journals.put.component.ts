import { Component } from '@angular/core';
import {JournalsService} from "../../journals.service";
import { Router, ActivatedRoute } from '@angular/router'

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

    public currentJournal = {
        id: -1,        
        title: '',
        date: '',
        theme: '',
        periodicity: '',
        pages: '',
        amount: '',
        price: '',
        photoPath: '',        
    };

    constructor(private journalsService: JournalsService, private router: Router, private route: ActivatedRoute) {  }

    ngOnInit() {
        this.idSubscriber=this.route.params.subscribe(params => {
            this.idForEdit = +params['id'];
            if (this.idForEdit && this.idForEdit > -1) {
                this.isEdit = true;
                this.journalsService.tryGetJournal(this.idForEdit).subscribe(journal => { this.currentJournal = journal;
                    this.currentPhotoPath = journal.photoPath;
                });
                
            } else {
                this.isEdit = false;
            }
        });        
    }    

    public uploadPhotoChange(files: any) {
        this.photoUploaded = false;
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("image", files[0]);
            this.journalsService.uploadPhoto(formData).subscribe(res => {
                this.currentPhotoPath = res.path;
                this.currentJournal.photoPath = res.path;                
                this.photoUploaded = true;
            });  
        }   
        else { this.photoUploaded = true;}
    }

    public tryAddJournal() {
        this.journalsService.tryAddJournal(this.currentJournal).subscribe(resp => {
            if (resp.ok) {
                this.router.navigateByUrl('/journals');
            }
        });
    }

    public tryEditJournal() {
    this.journalsService.tryEditJournal(this.currentJournal).subscribe(resp => {
        if (resp.ok) {
            this.router.navigateByUrl('/journals');
        }
    });
}
}