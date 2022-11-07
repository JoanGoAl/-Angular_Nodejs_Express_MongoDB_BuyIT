import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/profile'

  constructor(private _http: HttpClient) { }

  getNProducts(user: string): Observable<string> {
    return this._http.get<string>(`${this.baseUrl}/${user}/nproducts`)
  }
}
