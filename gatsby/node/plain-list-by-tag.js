const path = require('path');

const { TO_TAG } = require('../../src/routes/path');

const tagComponentPath = path.resolve(__dirname, '../../src/components/Pages/PlainListByTag/Fetch/index.tsx');

module.exports = function createPlainListByTag(createPage, edges) {
  const tags = getTagsFromEdges(edges);
  tags.forEach(function(tag) {
    const slug = tag.split(' ').join('-');
    createPage({
      path: TO_TAG({
        slug,
      }),
      component: tagComponentPath,
      context: {
        tag,
      },
    });
  });
};

function getTagsFromEdges(edges) {
  let tags = edges.reduce(function(acc, edge) {
    return [...acc, ...edge.node.frontmatter.tags];
  }, []);
  tags = [...new Set(tags)];
  tags.sort(function(tag1, tag2) {
    if (tag1 < tag2) {
      return -1;
    }
    if (tag1 > tag2) {
      return 1;
    }
    return 0;
  });
  return tags;
}
