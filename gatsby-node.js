const Promise = require('bluebird');
const path = require('path');

const createPaginationPages = require('./create/pagination-pages');
const createPosts = require('./create/posts');
const createTags = require('./create/tags');

const query = `
{
  allMarkdownRemark(
    sort: { 
      fields: [frontmatter___published], 
      order: DESC 
    }, 
    filter: {
      frontmatter: { 
        draft: {
          eq: false
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
        }
      }
    }
  }
}`;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise(function(resolve, reject) {
    const queryResult = graphql(query).then(result => {
      if (result.errors) {
        // eslint-disable-next-line no-console
        console.log(result.errors);
        reject(result.errors);
        return;
      }
      // Create blog posts pages.
      const edges = result.data.allMarkdownRemark.edges;
      createPaginationPages(createPage, '/page/', edges);
      createPosts(createPage, edges);
      createTags(createPage, edges);
    });
    resolve(queryResult);
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /intersection-observer/,
            loader: 'null-loader'
          },
        ],
      },
    });
  }
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};