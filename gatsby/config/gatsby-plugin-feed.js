module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
      {
        site {
          siteMetadata {
            siteInfo {
              metaTitle
              metaDescription
              url
            }
            authorInfo {
              name
            }
          }
        }
      }
    `,
    setup: ({ query }) => {
      const { siteInfo, authorInfo } = query.site.siteMetadata;
      return {
        title: siteInfo.metaTitle,
        description: siteInfo.metaDescription,
        site_url: siteInfo.url,
        image_url: `${siteInfo.url}/favicon256.png`,
        copyright: `2015 ${authorInfo.name}`,
        language: 'en',
        categories: ['JavaScript', 'React', 'Vue', 'CSS', 'Software development', 'Frontend development'],
      };
    },
    feeds: [
      {
        serialize: ({
          query: {
            site: {
              siteMetadata: { siteInfo, authorInfo },
            },
            allMdx,
          },
        }) => {
          return allMdx.edges.map((edge) => {
            const url = siteInfo.url + '/' + edge.node.frontmatter.slug + '/';
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.frontmatter.description,
              url,
              guid: url,
              categories: edge.node.frontmatter.tags,
              // custom_elements: [{ 'content:encoded': edge.node.html }],
              author: authorInfo.name,
            });
          });
        },
        query: `
          {
            allMdx(
              limit: 1000,
              sort: {
                frontmatter: {
                  published: DESC
                }
              }
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
        title: "Dmitri Pavlutin Blog RSS Feed"
      },
    ],
  },
};
