module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
      {
        site {
          siteMetadata {
            siteInfo {
              title
              description
              site_url: url
            }
          }
        }
      }
    `,
    setup: ({ query }) => query.site.siteMetadata.siteInfo,
    feeds: [
      {
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges.map((edge) => {
            const url = site.siteMetadata.siteInfo.url + '/' + edge.node.frontmatter.slug + '/';
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.frontmatter.description,
              url,
              guid: url,
              categories: edge.node.frontmatter.tags,
              custom_elements: [{ 'content:encoded': edge.node.html }],
            });
          });
        },
        query: `
          {
            allMarkdownRemark(
              limit: 1000,
              sort: { 
                order: DESC,
                fields: [frontmatter___published]
              },
              filter: {
                frontmatter: {
                  type: {
                    eq: "post"
                  }
                }
              }
            ) {
              edges {
                node {
                  excerpt
                  html
                  frontmatter {
                    title
                    date: published
                    slug
                    tags
                    description
                  }
                }
              }
            }
          }
        `,
        output: '/rss.xml',
      },
    ],
  },
};
