require('dotenv').config({
  path: '.env',
})

module.exports = {
  siteMetadata: require('./gatsby/config/site-metadata'),
  pathPrefix: '/',
  flags: {
    DEV_SSR: false
  },
  plugins: [
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-plugin-image',
            options: {
              defaults: {
                formats: ['webp'],
                quality: 60
              }
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: true,
              quality: 60,
              maxWidth: 560,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-shiki-twoslash',
            options: {
              theme: 'one-dark-pro',
            }
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
            }
          }, {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }
        ],
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static`,
        name: 'static',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './node_modules/gatsby-*/**/*.js',
          './node_modules/gatsby-transformer-sharp/**/*.js',
        ],
        codegenConfig: {
          avoidOptionals: true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-P51KQJDK5T'],
      },
    },
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    require('./gatsby/config/gatsby-plugin-sass'),
    require('./gatsby/config/gatsby-plugin-feed'),
    {
      resolve: 'gatsby-source-mailerlite-count',
      options: {
        groupName: 'Dmitri Pavlutin Blog Newsletter Group',
        key: process.env.MAILERLITE_KEY
      }
    }
  ],
}
