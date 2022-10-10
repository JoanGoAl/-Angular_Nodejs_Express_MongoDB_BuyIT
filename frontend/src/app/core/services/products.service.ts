import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";
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

    getRandomProduct(): Observable<Product[]> {
      // Modificar getProduct para que si no se le pasa nada devuelva uno random
      return this._http.get<Product[]>(`${this.baseUrl}/getOneProduct`)
    }

}
