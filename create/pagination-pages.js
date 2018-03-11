const path = require('path');
const R = require('ramda');

const config = require('../gatsby-config');
const pageComponentPath = path.resolve(__dirname, '../src/templates/Page/index.jsx');

const postsPerPage = config.siteMetadata.postsPerPage;

module.exports = function createPaginationPages(createPage, pathPrefix, edges) {
  const pagesSum = Math.ceil(edges.length / postsPerPage);

  for (let page = 1; page <= pagesSum; page++) {
    const path = page === 1 ? '/' : `${pathPrefix}/${page}`;
    createPage({
      path,
      component: pageComponentPath,
      context: {
        skip: (page - 1) * postsPerPage,
        limit: postsPerPage,
        page,
        pagesSum,
        prevPath: page - 1 > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: page + 1 <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      },
    });
  }
}