const R = require('ramda');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const config = require('./gatsby-config');
const postComponentPath = path.resolve('./src/templates/BlogPost/index.jsx');
const pagesComponentPath = path.resolve('./src/pages/index.jsx');
const query = `
{
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
    edges {
      node {
        frontmatter {
          title
          slug
        }
      }
    }
  }
}`;
const forEach = R.addIndex(R.forEach);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise(function(resolve, reject) {
    const queryResult = graphql(query).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
        return;
      }
      // Create blog posts pages.
      const edges = result.data.allMarkdownRemark.edges;
      createPagination(createPage, edges, '/page');
      forEach(R.partial(createPost, [createPage]), edges);
    });
    resolve(queryResult);
  });
};

function createPost(createPage, post, index, edges) {
  const previous = index === edges.length - 1 ? false : edges[index + 1].node;
  const next = index === 0 ? false : edges[index - 1].node;
  const slug = post.node.frontmatter.slug;
  createPage({
    path: slug,
    component: postComponentPath,
    context: {
      slug,
      previous,
      next,
    },
  });
}

/**
 * Create pagination for posts
 */
function createPagination(createPage, edges, pathPrefix) {
  const pagesSum = Math.ceil(edges.length / config.siteMetadata.postsPerPage);

  for (let page = 1; page <= pagesSum; page++) {
    createPage({
      path: `${pathPrefix}/${page}`,
      component: pagesComponentPath,
      context: {
        posts: paginate(edges, config.siteMetadata.postsPerPage, page).map(({ node }) => node),
        page,
        pagesSum,
        prevPath: page - 1 > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: page + 1 <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      },
    });
  }
}

function paginate(array, page_size, page_number) {
  return array.slice(0).slice((page_number - 1) * page_size, page_number * page_size);
}