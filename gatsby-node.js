const Promise = require('bluebird');
const path = require('path');

const createExcerptsList = require('./gatsby/node/excerpts-list');
const createPost = require('./gatsby/node/post');
const createPlainListByTag = require('./gatsby/node/plain-list-by-tag');

const query = `
{
  allMarkdownRemark(
    sort: { 
      fields: [frontmatter___published], 
      order: DESC 
    }, 
    filter: {
      frontmatter: { 
        type: {
          eq: "post"
        }
      }
    },
    limit: 1000
  ) {
    edges {
      node {
        frontmatter {
          title
          slug
          tags
          recommended
        }
      }
    }
  }
}`;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise(function(resolve, reject) {
    const queryResult = graphql(query).then((result) => {
      if (result.errors) {
        // eslint-disable-next-line no-console
        console.log(result.errors);
        reject(result.errors);
        return;
      }
      // Create blog posts pages.
      const edges = result.data.allMarkdownRemark.edges;
      createExcerptsList(createPage, edges);
      createPost(createPage, edges);
      createPlainListByTag(createPage, edges);
    });
    resolve(queryResult);
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
