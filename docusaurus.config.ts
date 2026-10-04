import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DataCROP Docs',
  tagline: 'DataCROP Maize — model, connect, deploy and observe data-processing workflows',
  favicon: 'img/logo-icon.png',

  future: {
    v4: true,
  },

  url: 'https://doc.datacrop.eu',
  baseUrl: '/',

  organizationName: 'datacrop',
  projectName: 'datacrop',

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/datacrop/datacrop/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: "/",
      },
    ],
  ],

  plugins: [
    './plugins/markdown-source.js',
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Old slugs from the pre-2026-10 docs structure keep working.
        redirects: [
          {from: '/home', to: '/intro/'},
          {from: '/intro/whats-new', to: '/reference/changelog/'},
          {from: '/Setup', to: '/deploy/'},
          {from: '/maize-mvp', to: '/deploy/maize-mvp/'},
          {from: '/manual-setup', to: '/deploy/manual/'},
          {from: '/keycloak', to: '/deploy/manual/keycloak/'},
          {from: '/airflow', to: '/deploy/manual/airflow/'},
          {from: '/worker', to: '/deploy/manual/worker/'},
          {from: '/model-repo', to: '/deploy/manual/model-repository/'},
          {from: '/editor', to: '/deploy/manual/editor/'},
          {from: '/overview', to: '/getting-started/quickstart/'},
          {from: '/creating-data-models', to: '/user-guide/warehouse/'},
          {from: '/creating-workflows', to: '/user-guide/workflow-lab/'},
          {from: '/logstash-pipelines', to: '/user-guide/logstash-pipelines/'},
          {from: '/ai-logstash-assistant', to: '/user-guide/logstash-pipelines/ai-assistant/'},
          {from: '/settings', to: '/user-guide/settings/'},
          {from: '/airflow-note', to: '/user-guide/airflow/'},
          {from: '/dev-guide', to: '/developers/'},
          {from: '/integrating-processors', to: '/developers/writing-processors/'},
          {from: '/model-repository', to: '/developers/model-repository/'},
          {from: '/model-repository/api-reference', to: '/developers/model-repository/api-reference/'},
          {from: '/model-repository/code-structure', to: '/developers/model-repository/code-structure/'},
          {from: '/model-repository/domain-model', to: '/developers/model-repository/domain-model/'},
          {from: '/model-repository/operations', to: '/developers/model-repository/operations/'},
        ],
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DataCROP',
      logo: {
        alt: 'DataCROP Logo',
        src: 'img/logo-icon.png',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'getStarted', position: 'left', label: 'Get started'},
        {type: 'docSidebar', sidebarId: 'userGuide', position: 'left', label: 'User guide'},
        {type: 'docSidebar', sidebarId: 'deploy', position: 'left', label: 'Deploy'},
        {type: 'docSidebar', sidebarId: 'developers', position: 'left', label: 'Developers'},
        {type: 'docSidebar', sidebarId: 'reference', position: 'left', label: 'Reference'},
        {to: '/getting-started/quickstart/', label: 'Quickstart', position: 'right', className: 'navbar-cta'},
        {
          href: 'https://github.com/datacrop',
          position: 'right',
          className: 'navbar-github',
          'aria-label': 'DataCROP on GitHub',
          html: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'What is DataCROP Maize?', to: '/intro/'},
            {label: 'Quickstart', to: '/getting-started/quickstart/'},
            {label: 'User guide', to: '/user-guide/'},
            {label: 'Deploy', to: '/deploy/'},
            {label: 'Developers', to: '/developers/'},
            {label: 'Reference', to: '/reference/'},
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'DataCROP Forum',
              href: 'https://groups.google.com/forum/#!forum/datacrop',
            },
            {
              label: 'Contact DataCROP',
              href: 'mailto:datacrop@googlegroups.com',
            },
            {
              label: 'DockerHub',
              href: 'https://hub.docker.com/u/datacrop',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/datacrop',
            },
            {
              label: 'OpenHUB Stats',
              href: 'https://www.openhub.net/p/datacrop',
            },
            {
              label: 'Website',
              href: 'https://www.datacrop.eu/',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} DataCROP`,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    docs: {
      sidebar: {hideable: true, autoCollapseCategories: true},
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'python', 'java', 'go', 'ini'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
