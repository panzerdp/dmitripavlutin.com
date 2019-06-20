module.exports = {
  siteMetadata: require('./gatsby/config/site-metadata'),
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false,
              quality: 90,
              wrapperStyle({ aspectRatio }) {
                if (aspectRatio <= 0.8) {
                  return 'max-width: 560px !important;';
                }
                return '';
              },
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-code-repls',
            options: {
              defaultText: 'Click here',
              dependencies: [],
              directory: `${__dirname}/content/posts/`,
              externals: [],
              html: '',
              target: '_blank',
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-plugin-typescript',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'src',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        //trackingId: 'ADD YOUR TRACKING ID HERE',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'rainsoft',
      },
    },
    require('./gatsby/config/gatsby-plugin-sass'),
    require('./gatsby/config/gatsby-plugin-feed'),
  ],
};
