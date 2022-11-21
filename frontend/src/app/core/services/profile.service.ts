import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Profile, User } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/profile'

  constructor(private _http: HttpClient) { }

  getNProducts(user: string): Observable<string> {
    return this._http.get<string>(`${this.baseUrl}/${user}/nproducts`)
  }

  follow(username: string): Observable<boolean> {
    return this._http.post<boolean>(`${this.baseUrl}/${username}/follow`, {})
  }

  getProfile(username: string): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${username}`)
  }

  getProfileById(_id: string): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/user/${_id}`)
  }
}
