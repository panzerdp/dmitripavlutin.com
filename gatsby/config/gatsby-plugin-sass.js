const path = require('path');

module.exports = {
  resolve: 'gatsby-plugin-sass',
  options: {
    sassOptions: {
      includePaths: [path.resolve(__dirname, '../../src')],
    }
  },
};
