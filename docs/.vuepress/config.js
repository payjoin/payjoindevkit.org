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
  plugins: [
    [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'blog',
            dirname: '_blog',
            path: '/blog/',
          },
        ],
        frontmatters: [
          {
            id: 'tag',
            keys: ['tag', 'tags'],
            path: '/blog/tags/',
          },
          {
            id: 'author',
            keys: ['author', 'authors'],
            path: '/blog/author/',
          }
        ]
      },
    ],
    // Updated SEO plugin configuration
    [
      'vuepress-plugin-seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => 'Payjoin Dev Kit',
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page => {
          if ($page.regularPath.includes('/blog/') || $page.regularPath.includes('/_blog/')) {
            return 'article'
          }
          return 'website'
        },
        url: (_, $site, path) => 'https://payjoindevkit.org' + path,
        image: ($page, $site) => {
          // If page has custom image in frontmatter
          if ($page.frontmatter.image) {
            // Handle both absolute URLs and relative paths
            if ($page.frontmatter.image.startsWith('http')) {
              return $page.frontmatter.image
            }
            return 'https://payjoindevkit.org' + $page.frontmatter.image
          }
          // Default fallback image
          return 'https://payjoindevkit.org/card.png'
        },
        publishedAt: $page => $page.frontmatter.date ? new Date($page.frontmatter.date) : null,
        modifiedAt: $page => $page.lastUpdated ? new Date($page.lastUpdated) : null,
      }
    ]
  ],
  // Add head meta tags as fallback
  head: [
    // Default Open Graph tags
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Payjoin Dev Kit Documentation' }],
    ['meta', { property: 'og:image', content: 'https://payjoindevkit.org/card.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    // Twitter Card tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://payjoindevkit.org/card.png' }],
  ],
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
      copyright: `Copyright © ${(new Date()).getUTCFullYear()} PDK Developers`,
    }
  }
}
