import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { ContactFormData } from '../interfaces/contact-form-data.interface';
import { ContactResponse } from '../interfaces/contact-response.interface';
import { HttpParams } from '@angular/common/http';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService],
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a message', () => {
    const testData: ContactFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hello, this is a test message.',
    };

    const testResponse: ContactResponse = {
      message: 'Message sent successfully.',
    };

    service.sendMessage(testData).subscribe({
      next: (response) => {
        expect(response).toEqual(testResponse);
      },
      error: (error) => {
        throw new Error(`Expected success but got an error: ${error.message}`);
      },
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe(
      'application/x-www-form-urlencoded'
    );

    const expectedBody = new HttpParams()
      .set('name', testData.name)
      .set('email', testData.email)
      .set('message', testData.message)
      .toString();

    expect(req.request.body).toBe(expectedBody);

    req.flush(testResponse);
  });

  it('should handle errors', () => {
    const testData: ContactFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hello, this is a test message.',
    };

    const errorMessage = 'An error occurred';

    service.sendMessage(testData).subscribe({
      next: () => {
        throw new Error('Expected an error, not a response');
      },
      error: (error) => {
        expect(error.message).toContain(errorMessage);
      },
    });

    const req = httpMock.expectOne(service['apiUrl']);

    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
