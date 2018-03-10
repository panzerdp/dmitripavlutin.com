const path = require('path');
const R = require('ramda');

const postComponentPath = path.resolve('./src/templates/BlogPost/index.jsx');

module.exports = function createPosts(createPage, edges) {
  R.forEach(function (post) {
    const slug = post.node.frontmatter.slug;
    createPage({
      path: slug,
      component: postComponentPath,
      context: {
        slug
      },
    });
  }, edges);
};