import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product, Comment } from "../models";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  private baseUrl = '/api/comments';

  constructor(private _http: HttpClient) {}

  getUserComments(uuid: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this.baseUrl}/user/${uuid}`)
  }

  getProductComments(product_id: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this.baseUrl}/product/${product_id}`)
  }

  setProductComment(comment_info: any): Observable<Comment> {
    return this._http.post<Comment>(`${this.baseUrl}/setProductCommentary`, comment_info)
  }

  deleteProductComment(_id: string): Observable<Comment> {
    return this._http.delete<Comment>(`${this.baseUrl}/deleteProductCommentary/${_id}`)
  }
}
