import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";
import { Category } from "../models";


@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/categories'

  constructor(
    private _http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${this.baseUrl}/getCategories`)
  }

}
