const path = require('path');

module.exports = {
  resolve: 'gatsby-plugin-sass',
  options: {
    includePaths: [
      path.resolve(__dirname, '../src')
    ]
  }
};