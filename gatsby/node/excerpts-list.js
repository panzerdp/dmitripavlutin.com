const path = require('path');

const { TO_INDEX, TO_PAGE } = require('../../src/routes/path.js');

const POSTS_PER_PAGE = 5;

const pageComponentPath = path.resolve(__dirname, '../../src/components/Pages/ExcerptsList/Fetch/index.tsx');

module.exports = function createExcerptsList(createPage, edges) {
  const pagesSum = Math.ceil(edges.length / POSTS_PER_PAGE);
  for (let currentPage = 1; currentPage <= pagesSum; currentPage++) {
    createPage({
      path: pageToPath(currentPage),
      component: pageComponentPath,
      context: {
        skip: (currentPage - 1) * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE,
        currentPage,
        pagesSum,
      },
    });
  }
};

function pageToPath(currentPage) {
  if (currentPage === 1) {
    return TO_INDEX();
  }
  return TO_PAGE({
    page: currentPage,
  });
}
