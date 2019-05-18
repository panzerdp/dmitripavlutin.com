const path = require('path');
const R = require('ramda');

const { TO_TAG } = require('../src/routes/path');

const tagComponentPath = path.resolve(__dirname, '../src/components/Pages/PlainListByTag/Fetch/index.tsx');

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

module.exports = function createPlainListByTag(createPage, edges) {
  const tags = getTagsFromEdges(edges);

  R.forEach(function(tag) {
    const slug = tag.split(' ').join('-');
    createPage({
      path: TO_TAG({
        slug
      }),
      component: tagComponentPath,
      context: {
        tag
      }
    });
  })(tags);
};