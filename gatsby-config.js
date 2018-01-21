module.exports = {
  siteMetadata: {
    title: 'Dmitri Pavlutin: JavaScript and React thoughts',
    author: 'Dmitri Pavlutin',
    description: 'Posts by Dmitri Pavlutin about JavaScript and React',
    siteUrl: 'https://dmitripavlutin.com',
  },
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
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
              // Remove the default behavior of adding a link to each
              // image.
              linkImagesToOriginal: true,
              // Analyze images' pixel density to make decisions about
              // target image size. This is what GitHub is doing when
              // embedding images in tickets. This is a useful setting
              // for documentation pages with a lot of screenshots.
              // It can have unintended side effects on high pixel
              // density artworks.
              //
              // Example: A screenshot made on a retina screen with a
              // resolution of 144 (e.g. Macbook) and a width of 100px,
              // will be rendered at 50px.
              //
              // Defaults to false.
              sizeByPixelDensity: false,
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
              // Optional default link text.
              // Defaults to "REPL".
              // eg <a href="...">Click here</a>
              defaultText: 'Click here',
          
              // Optional runtime dependencies to load from NPM.
              // This option only applies to REPLs that support it (eg CodeSandbox).
              // eg ['react', 'react-dom'] or ['react@15', 'react-dom@15']
              dependencies: [],
          
              // Example code links are relative to this dir.
              // eg examples/path/to/file.js
              directory: `${__dirname}/posts/`,
          
              // Optional externals to load from a CDN.
              // This option only applies to REPLs that support it (eg Codepen).
              // eg '//unpkg.com/react/umd/react.development.js'
              externals: [],
          
              // Optional HTML contents to inject into REPL.
              // Defaults to `<div id="root"></div>`.
              // This option only applies to REPLs that support it (eg Codepen, CodeSandbox).
              // eg '<div id="root"></div>'
              html: '',
          
              // Optional path to a custom redirect template.
              // The redirect page is only shown briefly,
              // But you can use this setting to override its CSS styling.
              // redirectTemplate: `${__dirname}/src/redirect-template.js`,
          
              // Optional link target.
              // Note that if a target is specified, "noreferrer" will also be added.
              // eg <a href="..." target="_blank" rel="noreferrer">...</a>
              target: '_blank',
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
    'gatsby-plugin-feed',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-next'
  ],
}