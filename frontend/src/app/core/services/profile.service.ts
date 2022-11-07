import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Profile } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/profile'

  constructor(private _http: HttpClient, private _apiService: ApiService) { }

  getNProducts(user: string): Observable<string> {
    return this._http.get<string>(`${this.baseUrl}/${user}/nproducts`)
  }

  follow(username: string): Observable<Profile> {
    return this._apiService.post(`/profile/${username}/follow`)
  }

  unfollow(username: string): Observable<Profile> {
    return this._apiService.delete(`/profile/${username}/follow`)
  }
}
