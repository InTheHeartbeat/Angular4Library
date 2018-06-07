import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class SellService {    

    constructor(private http: Http, private location: Location) {}

    public tryAddToBasket(productId: number, productType: number): Observable<Response> {
        return this.http.post(this.location.prepareExternalUrl('api/Sell/AddToBasket'),
            { ProductId: productId, ProductType: productType });
    }
    public tryRemoveFromBasket(recordId: number): Observable<Response> {        
        return this.http.get(this.location.prepareExternalUrl('api/Sell/RemoveFromBasket/' + recordId));
    }
    public tryAcceptOrder(orderId: number): Observable<Response> {
        return this.http.get(this.location.prepareExternalUrl('api/Sell/AcceptOrder/' + orderId));
    }

    public tryGetBasket(): Observable<Basket> {
        return this.http.get(this.location.prepareExternalUrl('api/Sell/GetBasket')).map(basket => basket.json());
    }    
}
