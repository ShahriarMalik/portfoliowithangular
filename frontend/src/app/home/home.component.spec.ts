import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonService } from '../services/common.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

class MockCommonService {
  applyStylesBasedOnWindowSize = jest.fn();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let commonService: MockCommonService;

  beforeEach(async () => {
    commonService = new MockCommonService();

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, SafeUrlPipe],
      imports: [
        MatCardModule,
        MatIconModule,
        MatChipsModule,
        MatTooltipModule,
        MatExpansionModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: CommonService, useValue: commonService }],
      schemas: [NO_ERRORS_SCHEMA], // To ignore other Angular components like routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the introduction content', () => {
    const compiled = fixture.nativeElement;
    const introductionTitle = compiled.querySelector(
      '.introduction-area .title'
    ).textContent;
    const introductionContent = compiled.querySelector(
      '.introduction-area mat-card-content'
    ).textContent;

    expect(introductionTitle).toContain('Welcome to My Portfolio');
    expect(introductionContent).toContain(
      "Moin! I'm Shahriar Malik, a passionate software developer based in Hamburg, Germany."
    );
    expect(introductionContent).toContain(
      'My journey into software development began during my undergraduate studies in Electrical and Electronic Engineering at Leading University, Bangladesh.'
    );
    expect(introductionContent).toContain(
      'I hold a Master of Science in Information and Communication Systems, specializing in Secure and Dependable IT Systems, from Technische Universität Hamburg.'
    );
  });

  it('should display the skills content', () => {
    const compiled = fixture.nativeElement;
    const skillsTitle = compiled.querySelector(
      '.skills-area .title'
    ).textContent;

    expect(skillsTitle).toContain('Technical Skills');

    component.skills.forEach((group) => {
      const categoryTitles = compiled.querySelectorAll(
        '.skills-group h3 strong'
      );
      let categoryTitleFound = false;

      categoryTitles.forEach((titleElement: HTMLElement) => {
        if (titleElement.textContent?.includes(group.category)) {
          categoryTitleFound = true;
        }
      });

      expect(categoryTitleFound).toBeTruthy();

      group.skills.forEach((skill) => {
        const skillChips = compiled.querySelectorAll('.skills-list mat-chip');
        let skillChipFound = false;

        skillChips.forEach((chipElement: HTMLElement) => {
          if (
            chipElement.textContent?.includes(`${skill.name} (${skill.level})`)
          ) {
            skillChipFound = true;
          }
        });

        expect(skillChipFound).toBeTruthy();
      });
    });

    const skillsLegendTitle = compiled.querySelector(
      '.skills-legend-card .title'
    ).textContent;
    expect(skillsLegendTitle).toContain('Skill Levels');
  });

  it('should display the projects content', () => {
    const compiled = fixture.nativeElement;
    const projectsTitle = compiled.querySelector(
      '.project-area .title'
    )?.textContent;
    expect(projectsTitle).toContain('Recent Projects');

    component.projects.forEach((project) => {
      const projectPanels = compiled.querySelectorAll(
        '.project-panel .mat-expansion-panel-header'
      );
      let projectPanelFound = false;

      console.log(`Checking panels for project: ${project.name}`);
      projectPanels.forEach((panelElement: HTMLElement) => {
        console.log('Panel element text:', panelElement.textContent);
        if (panelElement.textContent?.includes(project.name)) {
          projectPanelFound = true;
        }
      });

      expect(projectPanelFound).toBeTruthy();

      const projectTechStacks = compiled.querySelectorAll(
        '.project-panel .mat-expansion-panel-header mat-panel-description'
      );
      let projectTechStackFound = false;

      console.log('Checking tech stacks for project:', project.name);
      projectTechStacks.forEach((techStackElement: HTMLElement) => {
        console.log('Tech stack element text:', techStackElement.textContent);
        if (
          techStackElement.textContent?.includes(
            `Tech Stack: ${project.technologies}`
          )
        ) {
          projectTechStackFound = true;
        }
      });

      expect(projectTechStackFound).toBeTruthy();

      if (project.video) {
        const projectVideos = compiled.querySelectorAll(
          '.project-details iframe'
        );
        let projectVideoFound = false;

        projectVideos.forEach((videoElement: HTMLIFrameElement) => {
          console.log('Video element src:', videoElement.src);
          if (videoElement.src.includes(project.video!)) {
            projectVideoFound = true;
          }
        });

        expect(projectVideoFound).toBeTruthy();
      }

      const projectOverviews = compiled.querySelectorAll('.project-details p');
      let projectOverviewFound = false;

      projectOverviews.forEach((overviewElement: HTMLElement) => {
        console.log('Overview element text:', overviewElement.textContent);
        if (overviewElement.textContent?.includes(project.overview)) {
          projectOverviewFound = true;
        }
      });

      expect(projectOverviewFound).toBeTruthy();

      if (project.repo) {
        const projectRepoLinks =
          compiled.querySelectorAll('.project-details a');
        let projectRepoLinkFound = false;

        projectRepoLinks.forEach((repoLinkElement: HTMLAnchorElement) => {
          console.log('Repo link href:', repoLinkElement.href);
          if (repoLinkElement.href === project.repo) {
            projectRepoLinkFound = true;
          }
        });

        expect(projectRepoLinkFound).toBeTruthy();
      }
    });
  });

  it('should apply dynamic styles on window resize', () => {
    const applyDynamicStylesSpy = jest.spyOn(
      component as any,
      'applyDynamicStyles'
    );
    window.dispatchEvent(new Event('resize'));
    expect(applyDynamicStylesSpy).toHaveBeenCalled();
  });

  it('should call applyStylesBasedOnWindowSize with correct config', () => {
    (component as any).applyDynamicStyles();
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
    expect(commonService.applyStylesBasedOnWindowSize).toHaveBeenCalledWith(
      styleConfigs
    );
  });
});
