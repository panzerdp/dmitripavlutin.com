const path = require('path');
const R = require('ramda');

const tagComponentPath = path.resolve(__dirname, '../src/components/Pages/Tag/Fetch/index.tsx');

const getTagsFromEdges = R.pipe(
  R.reduce(function(acc, edge) {
    return [...acc, ...edge.node.frontmatter.tags];
  }, []),
  R.uniq,
  R.sort(function(tag1, tag2) {
    if (tag1 < tag2) {
      return -1;
    }
    if (tag1 > tag2) {
      return 1;
    }
    return 0;
  })
);

module.exports = function createTags(createPage, edges) {
  const tags = getTagsFromEdges(edges);

  R.forEach(function(tag) {
    const tagSlug = tag.split(' ').join('-');
    createPage({
      path: `/tag/${tagSlug}`,
      component: tagComponentPath,
      context: {
        tag
      }
    });
  })(tags);
};