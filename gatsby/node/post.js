const path = require('path');
const gatsbyPluginImage = require('gatsby-plugin-image')

const { TO_POST } = require('../../src/routes/path');

const postComponentPath = path.resolve(__dirname, '../../src/components/Pages/Post/Fetch.tsx');

module.exports = function createPost({ createPage, edges, popularPostsSlugs }, { createRedirect }) {
  edges.forEach(post => {
    createPostImagePermalinkWithRedirection(post, createRedirect)
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

function createPostImagePermalinkWithRedirection(post, createRedirect) {
  const dynamicThumbnailSrc = gatsbyPluginImage.getSrc(post.node.frontmatter.thumbnail)
  const permalinkThumbnailSrc = `/${post.node.frontmatter.slug}/cover.png`

  createRedirect({ fromPath: permalinkThumbnailSrc, toPath: dynamicThumbnailSrc, isPermanent: false })
}