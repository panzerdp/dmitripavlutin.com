const path = require('path');
const R = require('ramda');

const config = require('../gatsby-config');
const pageComponentPath = path.resolve(__dirname, '../src/templates/Page/index.jsx');

module.exports = function createPaginationPages(createPage, pathPrefix, edges) {
  const pagesSum = Math.ceil(edges.length / config.siteMetadata.postsPerPage);

  for (let page = 1; page <= pagesSum; page++) {
    const path = page === 1 ? '/' : `${pathPrefix}/${page}`;
    createPage({
      path,
      component: pageComponentPath,
      context: {
        slugs: paginateToSlugs(config.siteMetadata.postsPerPage, page)(edges),
        page,
        pagesSum,
        prevPath: page - 1 > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: page + 1 <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      },
    });
  }
}

function paginateToSlugs(pageSize, pageNumber) {
  return R.pipe(
    R.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    R.map(R.path(['node', 'frontmatter', 'slug']))
  );
}