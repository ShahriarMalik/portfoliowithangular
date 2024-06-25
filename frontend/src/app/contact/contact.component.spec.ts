import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ContactComponent } from './contact.component';
import { ContactService } from '../services/contact.service';

class MockContactService {
  sendMessage = jest.fn();
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: MockContactService;

  beforeEach(async () => {
    contactService = new MockContactService();

    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: ContactService, useValue: contactService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values and required validators', () => {
    const form = component.contactForm;
    expect(form).toBeTruthy();
    expect(form.get('name')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('message')?.value).toBe('');
    expect(form.get('name')?.hasValidator(Validators.required)).toBeTruthy();
    expect(form.get('email')?.hasValidator(Validators.required)).toBeTruthy();
    expect(form.get('email')?.hasValidator(Validators.email)).toBeTruthy();
    expect(form.get('message')?.hasValidator(Validators.required)).toBeTruthy();
  });

  it('should display error messages for invalid form fields', () => {
    const nameControl = component.contactForm.get('name');
    const emailControl = component.contactForm.get('email');
    const messageControl = component.contactForm.get('message');

    // Trigger validation errors by marking controls as touched and dirty
    nameControl?.markAsTouched();
    nameControl?.markAsDirty();
    emailControl?.markAsTouched();
    emailControl?.markAsDirty();
    messageControl?.markAsTouched();
    messageControl?.markAsDirty();

    fixture.detectChanges();

    // Check for name error
    const nameError = fixture.nativeElement.querySelector(
      '[data-test="name-error"]'
    );
    expect(nameError).not.toBeNull();
    expect(nameError.textContent).toContain('Name is required');

    // Check for email error (required)
    const emailRequiredError = fixture.nativeElement.querySelector(
      '[data-test="email-required-error"]'
    );
    expect(emailRequiredError).not.toBeNull();
    expect(emailRequiredError.textContent).toContain('Email is required');

    // Check for email error (invalid email)
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    emailControl?.markAsDirty();
    fixture.detectChanges();

    const emailInvalidError = fixture.nativeElement.querySelector(
      '[data-test="email-invalid-error"]'
    );
    expect(emailInvalidError).not.toBeNull();
    expect(emailInvalidError.textContent).toContain('Enter a valid email');

    // Check for message error
    const messageError = fixture.nativeElement.querySelector(
      '[data-test="message-error"]'
    );
    expect(messageError).not.toBeNull();
    expect(messageError.textContent).toContain('Message is required');
  });

  it('should call sendMessage on form submit', () => {
    const formData = {
      name: 'Shahriar Malik',
      email: 'shariar@example.com',
      message: 'Hello from Hamburg',
    };

    component.contactForm.setValue(formData);
    contactService.sendMessage.mockReturnValue(
      of({ message: 'Message sent successfully' })
    );

    component.onSubmit();
    expect(contactService.sendMessage).toHaveBeenCalledWith(formData);
    expect(component.successMessage).toBe('Message sent successfully');
    expect(component.submissionSuccess).toBeTruthy();
  });

  it('should handle form submission errors', () => {
    const formData = {
      name: 'Shahriar Malik',
      email: 'shariar@example.com',
      message: 'Hello from Hamburg',
    };
    component.contactForm.setValue(formData);
    contactService.sendMessage.mockReturnValue(
      throwError(() => new Error('Error sending message'))
    );
    component.onSubmit();

    expect(contactService.sendMessage).toHaveBeenCalledWith(formData);
    expect(component.errorMessage).toBe('Error sending message');
    expect(component.submissionError).toBeTruthy();
  });

  it('should render the success message card after successful submission', () => {
    component.submissionSuccess = true;
    fixture.detectChanges();

    const successCard = fixture.nativeElement.querySelector('.success-card');
    expect(successCard).toBeTruthy();
    expect(successCard.textContent).toContain(
      'Thank you for getting in touch with us.'
    );
  });

  it('should render the error message card after failed submission', () => {
    component.submissionError = true;
    fixture.detectChanges();

    const errorCard = fixture.nativeElement.querySelector('.error-card');
    expect(errorCard).toBeTruthy();
    expect(errorCard.textContent).toContain(
      'There was an error sending your message.'
    );
  });
});
