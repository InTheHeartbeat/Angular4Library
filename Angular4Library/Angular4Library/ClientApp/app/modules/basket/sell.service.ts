import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';

@Injectable()
export class SellService {    

    constructor(private http: Http, private location: Location) {}

    public tryAddToBasket(productId: any, productType : any) {
        return this.http.post(this.location.prepareExternalUrl('api/Sell/AddToBasket'),
            { ProductId: productId, ProductType: productType });
    }

    public tryRemoveFromBasket(recordId: any) {
        console.log(recordId);
        return this.http.get(this.location.prepareExternalUrl('api/Sell/RemoveFromBasket/' + recordId));
    }

    public tryGetBasket() {
        return this.http.get(this.location.prepareExternalUrl('api/Sell/GetBasket')).map(basket => basket.json());
    }

    public tryAcceptOrder(orderId: any) {
        return this.http.get(this.location.prepareExternalUrl('api/Sell/AcceptOrder/' + orderId));
    }
}
