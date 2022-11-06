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

  getProductById(id: String): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseUrl}//getOneProduct/${id}`);
  }

  productStartWith(name: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseUrl}/getProductsStartsWith`, {
      params: new HttpParams().set('startsWith', name),
    });
  }

  likeDislike(slug: string): Observable<Product[]> {
    return this._http.post<Product[]>(`${this.baseUrl}/${slug}/like`, {}, {
      headers: new HttpHeaders().set('authorization', `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZTc0ZmNiM2YtMDgwYS00NDMxLWJjYzktOWMwZWNhY2VlNWEzIiwidXNlcm5hbWUiOiJnZm1vaXMxMyIsImV4cCI6MTY3MjkxMzU3NSwiaWF0IjoxNjY3NzI5NTc1fQ.yLR--vTgexWYHUtv7YXvGMm6MRejG64TRc924JzWKo4`)
    })
  }
}
