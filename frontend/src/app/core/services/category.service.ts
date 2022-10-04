import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";
import { Category } from "../models";


@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private baseUrl = 'http://192.168.8.159:3000/categories'

  constructor(
    private _http: HttpClient
  ) { }

<<<<<<< HEAD
  get categories(): Category[] {
    return this.state.getValue();
  }

  set categories(data: Category[]) {
    this.state.next(data);
  }

  getCategories(): Observable<Category[]> {
=======
  getCategories(): Observable<Category[]>{
>>>>>>> e852b8a3f535158730c7ec0102b3627b7668decd
    return this._http.get<Category[]>(`${this.baseUrl}/getCategories`)
  }

}
