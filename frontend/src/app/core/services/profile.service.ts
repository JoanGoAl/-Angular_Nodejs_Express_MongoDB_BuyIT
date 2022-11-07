import { HttpClient } from '@angular/common/http';
import { Inject } from "@angular/core";
import { Observable } from 'rxjs';

@Inject({
  provideInt: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/profile'

  constructor(private _http: HttpClient) { }

  getNProducts(user: string): Observable<String> {
    return this._http.get<String>(`${this.baseUrl}/${user}/nproducts`)
  }
}
