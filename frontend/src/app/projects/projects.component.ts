import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { type ProjectCategory } from '../interfaces/project-category';
import { CommonService } from '../services/common.service';
import { StyleConfig } from '../interfaces/style-config';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements AfterViewInit {
  projectCategories: ProjectCategory[] = [
    {
      title: 'Web Development Projects',
      projects: [
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
          name: 'Artist Search',
          technologies: 'VueJS, Vuetify, HTML, JavaScript',
          video: 'https://www.youtube.com/embed/YOm9MfYbIzo',
          overview: `Using the search bar, the user can search for artists. After the search is finished, the results are displayed in a list. Clicking an
            artist navigate the user to another page in which the top albums of the artist are displayed.`,
          repo: 'https://github.com/ShahriarMalik/Artist-search',
        },
        {
          name: 'Weather Application',
          technologies: 'HTML, CSS, JavaScript',
          video: 'https://www.youtube.com/embed/L1DWtew3fGI',
          overview: `Application will ask device location and display weather information accordingly if user gives permission. User can also search and select any location suggested by Google Autocomplete API.`,
          repo: 'https://github.com/ShahriarMalik/weather-app',
          liveDemo: 'https://jsfiddle.net/Malik_Hamburg/1hrmaqkf/99/',
        },
      ],
    },
    {
      title: 'Academic Projects',
      projects: [
        {
          name: 'Development of a Data-Driven Reinforcement Learning Environment for Reducing Brake Squeal in Braking Systems',
          technologies: 'Python, TensorFlow, OpenAI Gym',
          overview:
            'The master thesis develops a data-driven reinforcement learning framework to mitigate brake squeal in automotive braking systems. It combines neural networks (LSTM) with reinforcement learning for temporal modeling of braking dynamics and evaluates its effectiveness.',
          repo: 'https://cloud.tuhh.de/index.php/s/XyJwftRi7SKpRbK',
          report: 'https://cloud.tuhh.de/index.php/s/XyJwftRi7SKpRbK',
        },
        {
          name: 'Conflict-based Path Planning for Multiple Autonomous Agents',
          technologies: 'Python, UPPAAL, Jupyter Notebook',
          overview:
            'The research project "Conflict-based Path Planning for Multiple Autonomous Agents" focuses on enhancing the safety and productivity of autonomous agents, like driverless vehicles, in safety-critical environments. Traditional mission planning methods are limited, so this study combines model checking with Q-learning to improve verification and scalability. By modeling autonomous vehicles in timed automata and integrating reinforcement learning, the project offers a comprehensive approach to managing multiple autonomous agents.',
          repo: 'https://github.com/ShahriarMalik/Research-Project',
          report: 'https://www.sts.tuhh.de/pw-and-m-theses/2023/malik23.pdf',
        },
        {
          name: 'Predicting Brake Squealing Events Using LSTM Models',
          technologies: 'Python, Jupyter Notebook',
          overview:
            'This project aims to predict brake squealing events using Long Short-Term Memory (LSTM) models. It specifically focuses on the role of Trigger2, which indicates when contact is fully established between the brake pad and brake disc.',
          repo: 'https://github.com/ShahriarMalik/BrakeSquealPrediction-LSTM',
        },
        {
          name: 'Network Optimization: Optimal Relay Selection in LTE/4G/5G UAV Networks',
          technologies: 'Python, Gurobi',
          overview: 'Optimization project for relay selection in UAV networks.',
          repo: 'https://github.com/ShahriarMalik/Network-Optimization-Project',
          report:
            'https://github.com/ShahriarMalik/Network-Optimization-Project/blob/master/Project%20Report.pdf',
        },
        {
          name: 'Bachelor Thesis: Blood Components Separation in Microscopic Image Using Fuzzy Inference System',
          technologies: 'MATLAB',
          overview:
            'The conventional method in hematology for detecting blood components is based on human inspection. This thesis proposes an automatic classification and detection system using a fuzzy inference system, which processes histogram peaks and spatial distances in microscopic images for enhanced accuracy and efficiency in hematology labs.',
          repo: 'https://github.com/ShahriarMalik/BLOOD-COMPONENTS-SEPARATION-IN-MICROSCOPIC-IMAGE-USING-FUZZY-INFERENCE-SYSTEM',
          report:
            'https://github.com/ShahriarMalik/BLOOD-COMPONENTS-SEPARATION-IN-MICROSCOPIC-IMAGE-USING-FUZZY-INFERENCE-SYSTEM/blob/43752cef68421004b433f7ed2cb3246f232d4982/Thesis%20Paper.pdf',
        },
      ],
    },
    {
      title: 'Other Projects',
      projects: [
        {
          name: 'Intelligent Email Management System',
          technologies: 'UiPath, Python, JIRA',
          video: 'https://www.youtube.com/embed/YOm9MfYbIzo',
          overview:
            'An RPA project to automate email processing and JIRA task creation.',
          repo: 'https://github.com/ShahriarMalik/EmailAutomationSystem/tree/main',
          liveDemo: 'https://emailmanagement.example.com',
        },
      ],
    },
  ];

  constructor(private commonService: CommonService) {}

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
          mobile: { height: '8.3rem', overflow: 'auto' },
          tablet: { height: '5rem', overflow: 'auto' },
          desktop: {
            height: 'var(--mat-expansion-header-collapsed-state-height)',
          },
        },
      },
    ];

    this.commonService.applyStylesBasedOnWindowSize(styleConfigs);
  }
}
