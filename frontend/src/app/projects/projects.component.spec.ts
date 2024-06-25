import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonService } from '../services/common.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

class MockCommonService {
  applyStylesBasedOnWindowSize = jest.fn();
}

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let commonService: MockCommonService;

  beforeEach(async () => {
    commonService = new MockCommonService();

    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent, SafeUrlPipe],
      imports: [
        MatCardModule,
        MatIconModule,
        MatChipsModule,
        MatTooltipModule,
        MatExpansionModule,
        NoopAnimationsModule,
        BrowserModule,
      ],
      providers: [{ provide: CommonService, useValue: commonService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render project categories and projects', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.project-section').length).toBe(
      component.projectCategories.length
    );
  });

  it('should call applyDynamicStyles on AfterViewInit', () => {
    const applyDynamicStylesSpy = jest.spyOn(
      component as any,
      'applyDynamicStyles'
    );
    component.ngAfterViewInit();
    expect(applyDynamicStylesSpy).toHaveBeenCalled();
  });

  it('should call applyDynamicStyles on window resize', () => {
    const applyDynamicStylesSpy = jest.spyOn(
      component as any,
      'applyDynamicStyles'
    );
    window.dispatchEvent(new Event('resize'));
    expect(applyDynamicStylesSpy).toHaveBeenCalled();
  });

  it('should apply dynamic styles using CommonService', () => {
    const styleConfigs = [
      {
        selector: '.mat-content',
        styles: {
          mobile: { 'flex-direction': 'column' },
          tablet: { 'flex-direction': 'column' },
          desktop: { 'flex-direction': 'row' },
        },
      },
      {
        selector: '.mat-expansion-panel-header',
        styles: {
          mobile: { height: '6rem', 'overflow-y': 'auto' },
          tablet: { height: '5rem' },
          desktop: {
            height: 'var(--mat-expansion-header-collapsed-state-height)',
          },
        },
      },
    ];
    component.ngAfterViewInit();
    expect(commonService.applyStylesBasedOnWindowSize).toHaveBeenCalledWith(
      styleConfigs
    );
  });
});
