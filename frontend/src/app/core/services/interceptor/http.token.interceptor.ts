import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "../jwt.service";

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerConfigs = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ''
    }

    const token = this.jwtService.getToken()

    if (token) headerConfigs['Authorization'] = `Token ${token}`;

    const request = req.clone({ setHeaders: headerConfigs })
    return next.handle(request)
  }
}
