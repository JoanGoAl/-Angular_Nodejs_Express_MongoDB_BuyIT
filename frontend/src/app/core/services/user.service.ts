import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from "rxjs";

@Inject({
  provideInt: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private _http: HttpClient) { }

  getUserLikes(uuid: string): Observable<String[]> {
    return this._http.get<String[]>(`${this.baseUrl}/getUserLikes`, {
      params: new HttpParams().set('uuid', uuid)
    })
  }
}
