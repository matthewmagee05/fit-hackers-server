import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  baseUrl: string = 'http://localhost:3000/api';

  header = {
    headers: new HttpHeaders().set('Authorization', `Basic YWRtaW46YWRtaW4=`),
  };
  constructor(private http: HttpClient) {}

  getInstructors() {
    return this.http.get(`${this.baseUrl}/instructors`, this.header);
  }
}
