import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ContactFormData } from '../interfaces/contact-form-data.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm!: FormGroup;

  submissionSuccess: boolean = false;
  submissionError: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData: ContactFormData = this.contactForm.value;
      this.contactService.sendMessage(formData).subscribe({
        next: (response) => {
          console.log('Message sent successfully', response.message);
          this.successMessage = response.message;
          this.contactForm.reset();
          this.submissionSuccess = true;
          setTimeout(() => {
            this.submissionSuccess = false;
            this.successMessage = '';
          }, 5000);
        },
        error: (error) => {
          console.error('Error sending message', error.message);
          this.errorMessage = error.message;
          this.submissionError = true;
          setTimeout(() => {
            this.submissionError = false;
            this.errorMessage = '';
          }, 5000);
        },
      });
    }
  }
}
