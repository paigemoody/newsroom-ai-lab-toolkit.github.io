import path from 'path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '[BETA] Newsroom AI Lab Playbook',
  tagline: 'From many observations → one thing worth exploring → many solvable parts',
  favicon: 'img/hackshackers_logomark.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://hackshackers.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/newsroom-ai-lab-toolkit.github.io/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hackshackers', // Usually your GitHub org/user name.
  projectName: 'newsroom-ai-lab-toolkit.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  deploymentBranch: 'main',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        // Single source for all 3 brand fonts. Chakra Petch weights (400/600/700) match the
        // landing page heading/navbar per the brand guide; Fraunces/Geist weights cover actual
        // usage across MethodologyBoard, NewsroomLandingPage, ObservationExamples, SiteFooter, CtaBanner.
        href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400&family=Geist:wght@400;500;600;700&display=swap',
      },
    },
  ],

  plugins: [
    [
      require.resolve('./plugins/load-markdown-data'),
      {
        id: 'problem-statement-examples',
        dataDir: path.join(__dirname, 'src/data/problem-statement-examples'),
      },
    ],
    [
      require.resolve('./plugins/load-markdown-data'),
      {
        id: 'landing-page',
        dataDir: path.join(__dirname, 'src/data/landing-page'),
      },
    ],
    [
      require.resolve('./plugins/load-markdown-data'),
      {
        id: 'problem-statement-benefits',
        dataDir: path.join(__dirname, 'src/data/problem-statement-benefits'),
      },
    ],
    [
      require.resolve('./plugins/load-markdown-data'),
      {
        id: 'iteration-tips',
        dataDir: path.join(__dirname, 'src/data/iteration-tips'),
      },
    ],
    [
      require.resolve('./plugins/load-markdown-data'),
      {
        id: 'waterfall-tricky',
        dataDir: path.join(__dirname, 'src/data/waterfall-tricky'),
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: true,
    },
    navbar: {
      title: '[BETA] Newsroom AI Lab Playbook',
      logo: {
        alt: 'Newsroom AI Lab Playbook Logo',
        // src: 'img/logo.svg',
        src: 'img/hackshackers_logomark.png'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Playbook',
        },
        {
          href: 'https://www.hackshackers.com/tag/newsroom-ai-lab/',
          label: 'Blog',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Playbook',
              to: '/docs/how-this-works',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Hacks / Hackers',
              href: 'https://www.hackshackers.com/',
            },
            {
              label: 'COMMUNITY 2',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hacks/Hackers, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
