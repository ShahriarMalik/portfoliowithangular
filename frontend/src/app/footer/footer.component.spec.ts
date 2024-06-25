import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { MatIconModule } from '@angular/material/icon';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year', () => {
    const yearSpan = fixture.nativeElement.querySelector('.main-footer span');
    const currentYear = new Date().getFullYear();
    expect(yearSpan.textContent).toContain(currentYear.toString());
  });

  it('should render GitHub link correctly', () => {
    const compiled = fixture.nativeElement;
    const gitHubLink = compiled.querySelector('a[aria-label="GitHub"]');
    expect(gitHubLink).toBeTruthy();
    expect(gitHubLink.href).toBe('https://github.com/ShahriarMalik');
  });

  it('should render LinkedIn link correctly', () => {
    const compiled = fixture.nativeElement;
    const linkedIn = compiled.querySelector('a[aria-label="LinkedIn"]');
    expect(linkedIn).toBeTruthy();
    expect(linkedIn.href).toBe(
      'https://www.linkedin.com/in/shahriar-malik-46a09411a/'
    );
  });

  it('should render Xing link correctly', () => {
    const compiled = fixture.nativeElement;
    const xingLink = compiled.querySelector('a[aria-label="Xing"]');
    expect(xingLink).toBeTruthy();
    expect(xingLink.href).toBe(
      'https://www.xing.com/profile/Shahriar_Malik/web_profiles'
    );
  });
});
