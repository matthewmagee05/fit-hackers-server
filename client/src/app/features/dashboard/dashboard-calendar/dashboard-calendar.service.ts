import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardCalendarService {
  baseUrl: string = 'http://localhost:3000/api';

  header = {
    headers: new HttpHeaders().set('Authorization', `Basic YWRtaW46YWRtaW4=`),
  };
  constructor(private http: HttpClient) {}

  getClasses() {
    return this.http.get(`${this.baseUrl}/classes`, this.header);
  }
}
