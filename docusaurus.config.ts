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
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Old slugs from the pre-2026-10 docs structure keep working.
        redirects: [
          {from: '/home', to: '/intro/'},
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
        {
          href: 'https://github.com/datacrop',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
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
              href: 'http://www.datacrop.eu/',
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
