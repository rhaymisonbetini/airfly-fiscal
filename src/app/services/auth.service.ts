import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private api: UrlService
  ) { }

  login(data) {
    return this.http.post(this.api.url + 'login-fiscal', data);
  }

}
