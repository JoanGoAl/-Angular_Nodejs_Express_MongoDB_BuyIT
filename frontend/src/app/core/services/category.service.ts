import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";
import { Category } from "../models";


@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private state = new BehaviorSubject<Category[]>([]);
  private baseUrl = 'http://localhost:3000/categories'
  state$ = this.state.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  get categories(): Category[] {
    return this.state.getValue();
  }

  set categories(data: Category[]) {
    this.state.next(data);
  }

  getCategories(): Observable<Category[]>{
    return this._http.get<Category[]>(`${this.baseUrl}/getCategories`)
  }

}
