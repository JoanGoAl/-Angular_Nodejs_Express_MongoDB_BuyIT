import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models";


@Injectable({
    providedIn: "root"
})
export class ProductsXCategoryService {
    private baseUrl = 'http://localhost:3000/productsXcategory'

    constructor(
        private _http: HttpClient
    ) { }

    getPxC(title: String): Observable<Product[]> {
        return this._http.get<Product[]>(`${this.baseUrl}/getProductsByCatTitle/${title}`)
    }

}