module.exports = {
  siteMetadata: require('./gatsby-configs/site-metadata'),
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
              linkImagesToOriginal: false,
              sizeByPixelDensity: false
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
              directory: `${__dirname}/posts/`,
              externals: [],
              html: '',
              target: '_blank',
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                size34: "size34", // 3/4 of the image
                size12: "size12"  // 1/2 of the image
              },
            },
          }
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'images',
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
    require('./gatsby-configs/gatsby-plugin-sass'),
    require('./gatsby-configs/gatsby-plugin-feed')
  ],
};