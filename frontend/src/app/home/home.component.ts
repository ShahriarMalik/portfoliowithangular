import { AfterViewInit, Component, HostListener } from '@angular/core';
import { type Project } from '../interfaces/project';
import { CommonService } from '../services/common.service';
import { StyleConfig } from '../interfaces/style-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class HomeComponent implements AfterViewInit {
  projects: Project[];

  constructor(private commonService: CommonService) {
    this.projects = [
      {
        name: 'Personal Website',
        technologies: 'Angular 16.2.7, Material UI, PHP, SQL, Jest, AWS',
        overview: `Developed a dynamic portfolio website to showcase my skills and projects. The frontend is built using Angular 16.2.7 and Material UI, while the backend is implemented with PHP and SQL, hosted on AWS.`,
        keyFeatures: [
          'Single-page application with a responsive, modern design.',
          'Secure data management with a contact form that sanitizes and validates inputs.',
          'Server-side logic and database management using PHP and PostgreSQL on AWS.',
        ],
        projectHighlights: [
          '41 unit tests with high code coverage (91% statements, 84% branches, 91% functions, 91% lines).',
          'Comprehensive security measures for safe handling of URLs and form data.',
        ],
        video: 'https://www.youtube.com/embed/ENc4fmUhjwM',
        repo: 'https://github.com/ShahriarMalik/portfoliowithangular',
      },
      {
        name: 'Weather Application',
        technologies: 'HTML, CSS, JavaScript',
        overview: 'A web application that provides real-time weather updates.',
        keyFeatures: [''],
        projectHighlights: [''],
        video: 'https://www.youtube.com/embed/L1DWtew3fGI',
        repo: '',
      },
      {
        name: 'Shopping List Application',
        technologies: 'HTML, CSS, JavaScript',
        overview: 'A user-friendly app for managing shopping lists.',
        keyFeatures: [''],
        projectHighlights: [''],
        video: 'https://www.youtube.com/embed/xJHO3wxmZsA',
        repo: '',
      },
    ];
  }

  skills = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 'Expert' },
        { name: 'TypeScript', level: 'Proficient' },
        { name: 'Python', level: 'Proficient' },
        { name: 'PHP', level: 'Proficient' },
        { name: 'Java', level: 'Beginner' },
        { name: 'C', level: 'Prior Experience' },
      ],
    },
    {
      category: 'Web Technologies',
      skills: [
        { name: 'HTML 5', level: 'Expert' },
        { name: 'CSS 3', level: 'Expert' },
        { name: 'Angular 16.2.7', level: 'Proficient' },
        { name: 'Angular Material 16.2.7', level: 'Proficient' },
        { name: 'RxJS', level: 'Proficient' },
        { name: 'Jest', level: 'Proficient' },
        { name: 'Foundation 6', level: 'Proficient' },
        { name: 'Bootstrap 3', level: 'Prior Experience' },
        { name: 'Vue.js', level: 'Prior Experience' },
      ],
    },
    {
      category: 'Tools and Libraries',
      skills: [
        { name: 'Git', level: 'Expert' },
        { name: 'Postman', level: 'Proficient' },
        { name: 'Jira', level: 'Proficient' },
      ],
    },
    {
      category: 'Machine Learning and Data Science',
      skills: [
        { name: 'TensorFlow', level: 'Proficient' },
        { name: 'Pandas', level: 'Proficient' },
        { name: 'Matplotlib', level: 'Proficient' },
        { name: 'OpenAI Gym', level: 'Proficient' },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'SQL', level: 'Intermediate' },
        { name: 'PostgreSQL', level: 'Intermediate' },
      ],
    },
    {
      category: 'Others',
      skills: [{ name: 'MATLAB', level: 'Prior Experience' }],
    },
  ];

  ngAfterViewInit() {
    this.applyDynamicStyles();
  }

  onResize(event: Event) {
    this.applyDynamicStyles();
  }

  private applyDynamicStyles() {
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
          mobile: { height: '6rem', 'overflow-y': 'auto' },
          tablet: { height: '5rem' },
          desktop: {
            height: 'var(--mat-expansion-header-collapsed-state-height)',
          },
        },
      },
    ];

    this.commonService.applyStylesBasedOnWindowSize(styleConfigs);
  }
}
