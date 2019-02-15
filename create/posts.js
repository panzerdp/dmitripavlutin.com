const path = require('path');
const R = require('ramda');

const postComponentPath = path.resolve(__dirname, '../src/templates/Post/index.jsx');

module.exports = function createPosts(createPage, edges) {
  R.forEach(function(post) {
    const slug = post.node.frontmatter.slug;
    const recommended = post.node.frontmatter.recommended;
    createPage({
      path: slug,
      component: postComponentPath,
      context: {
        slug,
        recommended
      },
    });
  }, edges);
};