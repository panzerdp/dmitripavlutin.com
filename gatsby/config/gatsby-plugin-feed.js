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
              url
            }
            authorInfo {
              name
            }
          }
        }
      }
    `,
    setup: ({ query }) => query.site.siteMetadata.siteInfo,
    feeds: [
      {
        serialize: ({
          query: {
            site: {
              siteMetadata: { siteInfo, authorInfo },
            },
            allMarkdownRemark,
          },
        }) => {
          return allMarkdownRemark.edges.map((edge) => {
            const url = siteInfo.url + '/' + edge.node.frontmatter.slug + '/';
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.frontmatter.description,
              url,
              guid: url,
              categories: edge.node.frontmatter.tags,
              custom_elements: [{ 'content:encoded': edge.node.html }],
              author: authorInfo.name,
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
        output: '/rss/',
      },
    ],
  },
};
