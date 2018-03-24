module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl,
            author
          }
        }
      }
    `,
    feeds: [
      {
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges.map(edge => {
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.frontmatter.description,
              url: site.siteMetadata.siteUrl + '/' + edge.node.frontmatter.slug + '/',
              guid: site.siteMetadata.siteUrl + '/' + edge.node.frontmatter.slug + '/',
              categories: edge.node.frontmatter.tags,
              custom_elements: [{ "content:encoded": edge.node.html }],
            });
          });
        },
        query: `
          {
            allMarkdownRemark(
              limit: 1000,
              sort: { order: DESC, fields: [frontmatter___published] },
              filter: {frontmatter: { draft: { ne: true } }}
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
        output: "/rss.xml"
      },
    ],
  },
};