import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidenav', () => {
    const toggleSpy = jest.spyOn(component.sidenav, 'toggle');
    const button =
      fixture.debugElement.nativeElement.querySelector('.menu-button');
    button.click();
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should close sidenav when a link is clicked', () => {
    const closeSpy = jest.spyOn(component.sidenav, 'close');
    const links =
      fixture.debugElement.nativeElement.querySelectorAll('a[mat-list-item]');
    links.forEach((link: HTMLAnchorElement) => link.click());
    expect(closeSpy).toHaveBeenCalledTimes(links.length);
  });
});
