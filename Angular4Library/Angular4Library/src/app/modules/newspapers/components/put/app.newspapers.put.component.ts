import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NewspapersService } from '../../../../shared/services/newspapers.service';

@Component({
    selector: 'app-newspapers-put',
    templateUrl: './app.newspapers.put.component.html',
    styleUrls: ['./app.newspapers.put.component.min.css']
})
export class AppNewspapersPutComponent {

    public photoUploaded:boolean = true;
    public currentPhotoPath: string = "/Upload/Images/no-photo-e.png";

    private idSubscriber: any;
    
    isEdit:boolean;
    idForEdit: number;

    public currentNewspaper: Newspaper = {
        Id: -1,        
        Title: '',
        Date: '',        
        Periodicity: '',        
        Amount: '',
        Price: '',
        PhotoPath: '',        
    };

    constructor(private newspapersService: NewspapersService, private router: Router, private route: ActivatedRoute) {  }

    ngOnInit() {
        this.idSubscriber=this.route.params.subscribe(params => {
            this.idForEdit = +params['id'];
            if (this.idForEdit && this.idForEdit > -1) {
                this.isEdit = true;
                this.newspapersService.tryGetNewspaper(this.idForEdit).subscribe(newspaper => { this.currentNewspaper = newspaper;
                    this.currentPhotoPath = newspaper.PhotoPath;
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
            this.newspapersService.uploadPhoto(formData).subscribe(res => {
                this.currentPhotoPath = res.Path;
                this.currentNewspaper.PhotoPath = res.Path;                
                this.photoUploaded = true;
            });  
        }   
        else { this.photoUploaded = true;}
    }

    public tryAddNewspaper() {
        this.newspapersService.tryAddNewspaper(this.currentNewspaper).subscribe(resp => {
            if (resp.ok) {
                this.router.navigateByUrl('/newspapers');
            }
        });
    }

    public tryEditNewspaper() {
    this.newspapersService.tryEditNewspaper(this.currentNewspaper).subscribe(resp => {
        if (resp.ok) {
            this.router.navigateByUrl('/newspapers');
        }
    });
}
}
