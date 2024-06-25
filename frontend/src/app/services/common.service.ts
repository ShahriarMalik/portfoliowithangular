import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { StyleConfig } from '../interfaces/style-config';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  applyStylesBasedOnWindowSize(configs: StyleConfig[]) {
    const isMobile = window.matchMedia('(max-width: 480px)').matches;
    const isTablet = window.matchMedia(
      '(min-width: 481px) and (max-width: 768px)'
    ).matches;

    configs.forEach((config) => {
      const elements = document.querySelectorAll(config.selector);

      elements.forEach((element) => {
        if (isMobile && config.styles['mobile']) {
          this.applyStyles(element, config.styles['mobile']);
        } else if (isTablet && config.styles['tablet']) {
          this.applyStyles(element, config.styles['tablet']);
        } else if (config.styles['desktop']) {
          this.applyStyles(element, config.styles['desktop']);
        }
      });
    });
  }

  private applyStyles(element: Element, styles: { [key: string]: string }) {
    if (!styles) {
      return;
    }
    Object.keys(styles).forEach((style) => {
      this.renderer.setStyle(element, style, styles[style]);
    });
  }
}
