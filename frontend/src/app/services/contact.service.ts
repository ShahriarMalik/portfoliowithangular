import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactFormData } from '../interfaces/contact-form-data.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { ContactResponse } from '../interfaces/contact-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl =
    'http://16.171.140.69/portfolio/backend/endpoints/create_submission.php';
  constructor(private http: HttpClient) {}

  sendMessage(data: ContactFormData): Observable<ContactResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('name', data.name)
      .set('email', data.email)
      .set('message', data.message);

    return this.http
      .post<ContactResponse>(this.apiUrl, body.toString(), {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'An error occured'));
  }
}
