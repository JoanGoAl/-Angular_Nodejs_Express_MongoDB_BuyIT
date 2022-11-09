import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseUrl}/getProducts`);
  }

  getRandomProduct(name: string): Observable<String[]> {
    let params = new HttpHeaders().set('title', name);

    return this._http
      .get<Product[]>(`${this.baseUrl}/getOneProduct`, {
        headers: params,
      })
      .pipe(map((product: Product[]) => product.map((img) => img.imgUrl[0])));
  }

  getProductById(id: String): Observable<Product> {
    return this._http.get<Product>(`${this.baseUrl}/getOneProduct/${id}`);
  }

  productStartWith(name: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseUrl}/getProductsStartsWith`, {
      params: new HttpParams().set('startsWith', name),
    });
  }

  toggleLike(slug: string): Observable<boolean> {
    return this._http.post<boolean>(`${this.baseUrl}/${slug}/like`, {})
  }
}
