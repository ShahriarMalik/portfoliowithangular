import { Component, HostListener } from '@angular/core';
import { StyleConfig } from '../interfaces/style-config';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class AboutComponent {
  constructor(private commonService: CommonService) {}

  ngAfterViewInit() {
    this.applyDynamicStyles();
  }

  onResize(event: Event) {
    this.applyDynamicStyles();
  }

  private applyDynamicStyles() {
    try {
      const styleConfigs: StyleConfig[] = [
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
            mobile: { height: '8rem' },
            tablet: { height: '7rem' },
            desktop: {
              height: 'var(--mat-expansion-header-collapsed-state-height)',
            },
          },
        },
      ];

      this.commonService.applyStylesBasedOnWindowSize(styleConfigs);
    } catch (error) {
      console.log('Error applying styles', error);
    }
  }
}
