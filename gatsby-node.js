const R = require('ramda');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const blogPostComponentPath = path.resolve('./src/templates/BlogPost/index.jsx');
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
      const posts = result.data.allMarkdownRemark.edges;
      R.addIndex(R.forEach)(R.partial(createPost, [createPage]))(posts);
    });
    resolve(queryResult);
  });
};

function createPost(createPage, post, index, posts) {
  const previous = index === posts.length - 1 ? false : posts[index + 1].node;
  const next = index === 0 ? false : posts[index - 1].node;
  createPage({
    path: post.node.frontmatter.slug,
    component: blogPostComponentPath,
    context: {
      slug: post.node.frontmatter.slug,
      previous,
      next,
    },
  });
}

/**
 * Create pagination for posts
 */
function createPagination(createPage, edges, pathPrefix) {
  const pageTemplate = path.resolve(`src/templates/page.js`);

  const pageSize = 5;
  const pagesSum = Math.ceil(edges.length / pageSize);

  for (let page = 1; page <= pagesSum; page++) {
    createPage({
      path: `${pathPrefix}/${page}`,
      component: pageTemplate,
      context: {
        posts: paginate(edges, pageSize, page).map(({ node }) => node),
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