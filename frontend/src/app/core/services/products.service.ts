import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from "rxjs";
import { Product } from "../models";


@Injectable({
    providedIn: "root"
})
export class ProductService {
    private baseUrl = 'http://localhost:3000/products'

    constructor(
        private _http: HttpClient
    ) { }

    getProducts(): Observable<Product[]> {
        return this._http.get<Product[]>(`${this.baseUrl}/getProducts`)
    }

    getRandomProduct(name: string): Observable<Product[]> {
      let params = new HttpHeaders().set('title', name)

      return this._http.get<Product[]>(`${this.baseUrl}/getOneProduct`, {
        headers: params
      })
    }

}
