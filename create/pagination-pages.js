const path = require('path');
const R = require('ramda');

const config = require('../gatsby-config');
const pageComponentPath = path.resolve(__dirname, '../src/templates/Page/index.jsx');

const postsPerPage = config.siteMetadata.postsPerPage;

module.exports = function createPaginationPages(createPage, pathPrefix, edges) {
  const pagesSum = Math.ceil(edges.length / postsPerPage);
  const pageToPath = R.ifElse(R.equals(1), R.always('/'), R.pipe(R.toString, R.concat(pathPrefix)));
  R.pipe(
    R.range,
    R.forEach(function(currentPage) {
      createPage({
        path: pageToPath(currentPage),
        component: pageComponentPath,
        context: {
          skip: (currentPage - 1) * postsPerPage,
          limit: postsPerPage,
          currentPage,
          pagesSum,
          pathPrefix
        }
      });
    })
  )(1, pagesSum + 1);
}