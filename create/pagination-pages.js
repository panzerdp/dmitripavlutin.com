const path = require('path');

const config = require('../gatsby-config');
const pagesComponentPath = path.resolve('../src/pages/index.jsx');

/**
 * Create pagination for posts
 */
function createPaginationPages(createPage, edges, pathPrefix) {
  const pagesSum = Math.ceil(edges.length / config.siteMetadata.postsPerPage);

  for (let page = 1; page <= pagesSum; page++) {
    createPage({
      path: `${pathPrefix}/${page}`,
      component: pagesComponentPath,
      context: {
        posts: paginate(edges, config.siteMetadata.postsPerPage, page).map(({ node }) => node),
        page,
        pagesSum,
        prevPath: page - 1 > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: page + 1 <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      },
    });
  }
}

function paginate(array, page_size, page_number) {
  return array.slice(0).slice((page_number - 1) * page_size, page_number * page_size);
}