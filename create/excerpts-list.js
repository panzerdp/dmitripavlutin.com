const path = require('path');

const { TO_INDEX, TO_PAGE } = require('../src/routes/path.js');

const POSTS_PER_PAGE = 5;

const pageComponentPath = path.resolve(__dirname, '../src/components/Pages/ExcerptsList/Fetch/index.tsx');

module.exports = function createPaginationPages(createPage, edges) {
  const pagesSum = Math.ceil(edges.length / postsPerPage);
  R.pipe(
    R.range,
    R.forEach(function(currentPage) {
      createPage({
        path: pageToPath(currentPage),
        component: pageComponentPath,
        context: {
          skip: (currentPage - 1) * POSTS_PER_PAGE,
          limit: postsPerPage,
          currentPage,
          pagesSum,
          pathPrefix
        }
      });
    })
  )(1, pagesSum + 1);
};

function pageToPath(currentPage) {
  if (currentPage === 1) {
    return TO_INDEX();
  }
  return TO_PAGE({
    page: currentPage
  });
}