import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  // Bütün isteklere token ekliyoruz
  // request bizim gösderdiğimiz istek(email,parola vs), next de bir sonraki adımında ne yapacağı
  // her request işleminde headerına tokenımızı eklesin istiyoruz
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    let newRequest : HttpRequest<any>;
    //Kullanıcının yaptığı işlemi klonla
    newRequest = request.clone({
      headers: request.headers.set("Authorization","Bearer " + token)
    })
    return next.handle(newRequest);
  }
}

//Error