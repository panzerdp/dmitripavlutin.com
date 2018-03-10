const path = require('path');
const R = require('ramda');

const postComponentPath = path.resolve('./src/templates/BlogPost/index.jsx');

module.exports = function createPosts(createPage, edges) {
  R.addIndex(R.forEach)(R.partial(createPost, [createPage]), edges);
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