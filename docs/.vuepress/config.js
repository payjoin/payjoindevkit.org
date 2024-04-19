const { resolve } = require('path')
const themeConfig = require('@spiralbtc/vuepress-devkit-theme/config')

const title = 'Payjoin Dev Kit Documentation'
const baseUrl = 'https://payjoindevkit.org'
const githubUrl = 'https://github.com/payjoin'
const discordUrl = 'https://discord.gg/6rJD9R684h'
const themeColor = '#ffffff'

const docsSidebar = [
  {
    title: 'Documentation',
    collapsable: false,
    children: [
      {
        title: 'Introduction',
        path: '/introduction/',
        collapsable: true,
        children: [
          ['/introduction/use_cases', 'Use Cases'],
        ]
      },
      '/send-receive-test-payjoins',
      '/examples',
    ]
  },
  {
    title: 'API Reference',
    collapsable: false,
    children: [
      ['https://docs.rs/payjoin/*/payjoin', 'Rust']
    ],
  }
]

const tutorialSidebar = [
  {
    title: 'Tutorials',
    collapsable: false,
    children: [
      '/tutorials/getting-started',
      '/tutorials/send-payjoin-with-pdk',
    ],
  }
]

const blogSidebar = [
  {
    title: 'Blog',
    collapsable: false,
    children: [
      ['/blog/', 'Articles'],
      ['/blog/tags/', 'Tags'],
      ['/blog/author/', 'Authors']
    ]
  }
]

module.exports = {
  title,
  description: 'PDK is a Payjoin implementation with supporting modules.',
  theme: resolve(__dirname, '../../node_modules/@spiralbtc/vuepress-devkit-theme'),
  ...themeConfig({
    baseUrl,
    title,
    themeColor,
    tags: ['Bitcoin', 'Payjoin', 'PDK', 'Payjoin Dev Kit', 'Documentation']
  }),
  themeConfig: {
    domain: baseUrl,
    logo: '/img/logo.svg',
    displayAllHeaders: false,
    repo: 'payjoin/payjoindevkit.org',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    sidebarDepth: 0,
    algolia: {
      indexName: 'payjoindevkit',
      appId: 'BH4D9OD16A',
      apiKey: '17ed8a4e16a1cb7d94da4e96f2ff817f',
      // See https://www.algolia.com/doc/api-reference/api-parameters/
      algoliaOptions: {
        typoTolerance: 'min'
      },
      // See https://community.algolia.com/docsearch/behavior.html#autocompleteoptions
      autocompleteOptions: {
        openOnFocus: true
      }
    },
    nav: [
      {
        text: 'Docs',
        link: '/introduction/'
      },
      {
        text: 'Tutorials',
        link: '/tutorials/getting-started'
      },
      {
        text: 'Case Study',
        link: 'https://bitcoin.design/guide/case-studies/payjoin/'
      },
      {
        text: 'Blog',
        link: '/blog/'
      },
      {
        text: 'Discord',
        link: discordUrl,
        rel: 'noopener noreferrer'
      },
      {
        text: 'GitHub',
        link: githubUrl,
        rel: 'noopener noreferrer'
      }
    ],
    sidebar: {
      '/_blog/': blogSidebar,
      '/blog/': blogSidebar,
      '/tutorials/': tutorialSidebar,
      '/': docsSidebar,
    },
    footer: {
      links: [
        {
          title: 'Docs',
          children: [
            {
              text: 'Introduction',
              link: '/introduction/'
            },
            {
              text: 'Send and Receive Test Payjoins',
              link: '/send-receive-test-payjoins/'
            },
            {
              text: 'Examples',
              link: '/examples/'
            }
          ]
        },
        {
          title: 'Community',
          children: [
            {
              text: 'Discord',
              link: discordUrl,
              rel: 'noopener noreferrer'
            },
            {
              text: 'GitHub',
              link: githubUrl,
              rel: 'noopener noreferrer'
            },
            {
              text: 'PDK Roadmap',
              link: "https://github.com/orgs/payjoin/projects/1",
              rel: 'noopener noreferrer'
            },
          ]
        },
        {
          title: 'More',
          children: [
            {
              text: 'Payjoin.org',
              link: 'https://payjoin.org'
            },
            {
              text: 'Blog',
              link: '/blog/'
            },
          ]
        }
      ],
      copyright: 'Copyright © 2024 PDK Developers'
    }
  }
}
