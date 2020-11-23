import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient,
    private api: UrlService
  ) { }


  getUserTicket(code: any) {
    let header: any = {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token'),
        Email: localStorage.getItem('email'),
        id: sessionStorage.getItem('id')
      })
    }
    return this.http.get(this.api.url + `get-user-ticket-by-qrcode/${code}`, header);
  }

  checkTicket(code: any) {
    let header: any = {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token'),
        Email: localStorage.getItem('email'),
        id: sessionStorage.getItem('id')
      })
    }
    return this.http.post(this.api.url + `check-ticket`, { code }, header);
  }


}
