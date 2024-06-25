import { SafeUrlPipe } from './safe-url.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SafeUrlPipe', () => {
  let pipe: SafeUrlPipe;
  let sanitizer: jest.Mocked<DomSanitizer>;

  beforeEach(() => {
    sanitizer = {
      bypassSecurityTrustResourceUrl: jest.fn(),
      sanitize: jest.fn(),
      bypassSecurityTrustHtml: jest.fn(),
      bypassSecurityTrustStyle: jest.fn(),
      bypassSecurityTrustScript: jest.fn(),
      bypassSecurityTrustUrl: jest.fn(),
    } as jest.Mocked<DomSanitizer>;

    TestBed.configureTestingModule({
      providers: [{ provide: DomSanitizer, useValue: sanitizer }],
    });

    pipe = new SafeUrlPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize the URL', () => {
    const url = 'https://example.com';
    const safeUrl = {} as SafeResourceUrl;
    sanitizer.bypassSecurityTrustResourceUrl.mockReturnValue(safeUrl);

    expect(pipe.transform(url)).toBe(safeUrl);
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(url);
  });
});
