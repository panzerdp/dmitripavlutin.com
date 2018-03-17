const path = require('path');

console.log( path.resolve(__dirname, '../src'));

module.exports = {
  resolve: 'gatsby-plugin-sass',
  options: {
    includePaths: [
      path.resolve(__dirname, '../src')
    ]
  } 
};