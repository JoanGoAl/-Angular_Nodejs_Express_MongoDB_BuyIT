import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = '/api/categories';

  constructor(private _http: HttpClient) {}

  getCategories(count: number = 0, offset: number = 0): Observable<Category[]> {
    count = typeof count == 'number' ? count : -1;
    offset = typeof offset == 'number' ? offset : -1;

    let params = new HttpParams().set('count', count).set('offset', offset);

    return this._http.get<Category[]>(`${this.baseUrl}/getCategories`, {
      params,
    });
  }

  getCategoryInfo(catsArr: String[]): Observable<any[]> {
    return this._http.get<any[]>(`${this.baseUrl}/getCategoryInfo`, {
      params: new HttpParams().set('categories', JSON.stringify(catsArr))
    });
  }
}
