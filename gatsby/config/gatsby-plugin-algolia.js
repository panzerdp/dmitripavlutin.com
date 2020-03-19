require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// gatsby-config.js
const myQuery = `{
  allSitePage {
    edges {
      node {
        # try to find a unique id for each node
        # if this field is absent, it's going to
        # be inserted by Algolia automatically
        # and will be less simple to update etc.
        objectID: id
        component
        path
        componentChunkName
        jsonName
        internal {
          type
          contentDigest
          owner
        }
      }
    }
  }
}`;

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => data.allSitePage.edges.map(({ node }) => node)
  },
];

module.exports = {
  resolve: `gatsby-plugin-algolia`,
  options: {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
    queries,
    chunkSize: 10000, // default: 1000
  },
};