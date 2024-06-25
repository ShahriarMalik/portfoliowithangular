import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { CommonService } from '../services/common.service';
import { MaterialModule } from '../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock class for CommonService
class MockCommonService {
  applyStylesBasedOnWindowSize = jest.fn();
}

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let commonService: MockCommonService;

  beforeEach(async () => {
    commonService = new MockCommonService();

    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [{ provide: CommonService, useValue: commonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Check if the component is created successfully
    expect(component).toBeTruthy();
  });

  it('should call applyDynamicStyles in ngAfterViewInit', () => {
    // Spy on applyDynamicStyles method
    const applyDynamicStylesSpy = jest.spyOn(
      component as any,
      'applyDynamicStyles'
    );

    // Simulate window resize to trigger applyDynamicStyles
    window.dispatchEvent(new Event('resize'));
    expect(applyDynamicStylesSpy).toHaveBeenCalled();
  });

  it('should call applyStylesBasedOnWindowSize with correct config', () => {
    // Define the expected style configurations
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
          mobile: { height: '7rem' },
          tablet: { height: '7rem' },
          desktop: {
            height: 'var(--mat-expansion-header-collapsed-state-height)',
          },
        },
      },
    ];

    // Call the method and check if the service method was called with the correct configurations
    (component as any).applyDynamicStyles();
    expect(commonService.applyStylesBasedOnWindowSize).toHaveBeenLastCalledWith(
      styleConfigs
    );
  });

  it('should handle errors from applyStylesBasedOnWindowSize', () => {
    // Mock the method to throw an error
    commonService.applyStylesBasedOnWindowSize = jest.fn(() => {
      throw new Error('Test Error');
    });

    // Check that the method handles the error without throwing
    expect(() => (component as any).applyDynamicStyles()).not.toThrow();
  });

  it('should render the component template correctly', () => {
    fixture.detectChanges();

    // Check if the title is rendered correctly
    const titleElement = fixture.nativeElement.querySelector('.title-icon');
    expect(titleElement.textContent).toContain(
      'Software Developer Crafting Impactful Web Experiences'
    );

    // Check if the correct number of expansion panel headers are rendered
    const matExpansionPanelHeaders = fixture.nativeElement.querySelectorAll(
      '.mat-expansion-panel-header'
    );
    expect(matExpansionPanelHeaders.length).toBe(4);
  });
});
