import {Component, Input} from '@angular/core';
import { AccountService } from '../../account.service';
import { NewspapersService } from '../../newspapers.service';
import {Router} from '@angular/router';
import { SellService } from '../../sell.service';
@Component({
	selector:'app-newspapers',
	templateUrl: './app.newspapers.component.html',
	styleUrls: ['./app.newspapers.component.min.css']
})
export class AppNewspapersComponent {
    
    newspapers = [];

    busyId:any = -1;

    currentUser = {};

    constructor(private accountService: AccountService, private newspapersService: NewspapersService, private router: Router, private sellService:SellService) { }

    ngOnInit() {
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }

        this.accountService.currentUser$.subscribe(user => {
            this.currentUser = user;
            console.log("newspapers");
        });

        this.newspapersService.tryGetNewspapers().subscribe(newspapers => this.newspapers = newspapers);
    }


    public editNewspaperForm(id:any) {
        this.router.navigate(['/newspapers/put',id]);
    }

    public tryRemoveNewspaper(id: any) {
        this.busyId = id;
        this.newspapersService.tryRemoveNewspaper(id).subscribe(resp => {
            if (resp.ok) {
                this.newspapers.forEach((value:any, index, array) => {
                    if (value.id === id) {
                        this.newspapers.splice(index,1);
                    }
                });
            }
        });
    }

    public addToBasket(id: any) {
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 3).subscribe(resp => {
            if (resp.ok) {
                this.busyId = -1;
            }
        });
    }
}