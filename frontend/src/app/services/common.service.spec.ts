import { TestBed } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { CommonService } from './common.service';
import { StyleConfig } from '../interfaces/style-config';

describe('CommonService', () => {
  let service: CommonService;
  let rendererFactory: RendererFactory2;
  let renderer: Renderer2;

  beforeEach(() => {
    const rendererFactoryMock = {
      createRenderer: jest.fn().mockReturnValue({
        setStyle: jest.fn(),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        CommonService,
        { provide: RendererFactory2, useValue: rendererFactoryMock },
      ],
    });

    service = TestBed.inject(CommonService);
    rendererFactory = TestBed.inject(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(max-width: 480px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply mobile styles', () => {
    const config: StyleConfig[] = [
      {
        selector: '.test-element',
        styles: {
          mobile: { 'background-color': 'red' },
          tablet: { 'background-color': 'blue' },
          desktop: { 'background-color': 'green' },
        },
      },
    ];

    // Mock window matchMedia to simulate mobile screen
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 480px)',
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    document.body.innerHTML = `<div class="test-element"></div>`;
    service.applyStylesBasedOnWindowSize(config);

    const element = document.querySelector('.test-element');
    expect(renderer.setStyle).toHaveBeenCalledWith(
      element,
      'background-color',
      'red'
    );
  });

  it('should apply tablet styles', () => {
    const config: StyleConfig[] = [
      {
        selector: '.test-element',
        styles: {
          mobile: { 'background-color': 'red' },
          tablet: { 'background-color': 'blue' },
          desktop: { 'background-color': 'green' },
        },
      },
    ];

    // Mock window matchMedia to simulate tablet screen
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 481px) and (max-width: 768px)',
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    document.body.innerHTML = `<div class="test-element"></div>`;
    service.applyStylesBasedOnWindowSize(config);

    const element = document.querySelector('.test-element');
    expect(renderer.setStyle).toHaveBeenCalledWith(
      element,
      'background-color',
      'blue'
    );
  });

  it('should apply desktop styles', () => {
    const config: StyleConfig[] = [
      {
        selector: '.test-element',
        styles: {
          mobile: { 'background-color': 'red' },
          tablet: { 'background-color': 'blue' },
          desktop: { 'background-color': 'green' },
        },
      },
    ];

    // Mock window matchMedia to simulate desktop screen
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 769px)',
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    document.body.innerHTML = `<div class="test-element"></div>`;
    service.applyStylesBasedOnWindowSize(config);

    const element = document.querySelector('.test-element');
    expect(renderer.setStyle).toHaveBeenCalledWith(
      element,
      'background-color',
      'green'
    );
  });

  it('should apply individual styles', () => {
    const element = document.createElement('div');
    const styles: Record<string, string> = {
      color: 'white',
      'font-size': '12px',
    };

    service['applyStyles'](element, styles);

    Object.keys(styles).forEach((style) => {
      expect(renderer.setStyle).toHaveBeenCalledWith(
        element,
        style,
        styles[style]
      );
    });
  });
});
