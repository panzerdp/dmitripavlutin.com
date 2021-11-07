const path = require('path');

const { TO_POST } = require('../../src/routes/path');

const postComponentPath = path.resolve(__dirname, '../../src/components/Pages/Post/Fetch.tsx');

module.exports = function createPost(createPage, edges, popularPostsSlugs) {
  edges.forEach(post => {
    const slug = post.node.frontmatter.slug;
    const recommended = post.node.frontmatter.recommended;
    createPage({
      path: TO_POST({
        slug,
      }),
      component: postComponentPath,
      context: {
        slug,
        recommended,
        popularPostsSlugs,
      },
    });
  });
};
