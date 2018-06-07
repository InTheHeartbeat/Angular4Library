import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { SellService } from '../../../../shared/services/sell.service';

@Component({
	selector:'app-basket',
	templateUrl: './app.basket.component.html',
	styleUrls: ['./app.basket.component.min.css']
})
export class AppBasketComponent {        

    basket:Basket;
    recordBusyId: number = -1;

    constructor(private sellService: SellService, private router:Router) { }

    ngOnInit() { 
        this.sellService.tryGetBasket().subscribe(basket => { this.basket = basket; console.log(basket); });        
    }

    tryRemoveFromOrder(id: number): void {
        this.recordBusyId = id;
        this.sellService.tryRemoveFromBasket(id).subscribe(resp => {
            if (resp.ok) {
                this.recordBusyId = -1;
                this.sellService.tryGetBasket().subscribe(basket => this.basket = basket);        
            }
        });
    }   

    tryAcceptOrder(): void {
        this.sellService.tryAcceptOrder(this.basket.OrderId).subscribe(resp => {
            if (resp.ok) {
                this.router.navigateByUrl("/");
            }
        });
    }
    private joinAuthors(authors: Author[]): string {
        return authors.map(author => author.Fullname).join(", ");
    }

}
