# Dmitri Pavlutin Blog

[![Build Status](https://travis-ci.com/panzerdp/dmitripavlutin.com.svg?branch=master)](https://travis-ci.com/panzerdp/dmitripavlutin.com) [![codecov](https://codecov.io/gh/panzerdp/dmitripavlutin.com/branch/master/graph/badge.svg)](https://codecov.io/gh/panzerdp/dmitripavlutin.com) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

This repository contains posts and source code of my blog https://dmitripavlutin.com.  
The blog is powered by [GatsbyJS](https://www.gatsbyjs.org/).  

## Contributing

You are welcome to contribute to posts (fix typos, add clarifications, increase readability, etc) using pull requests.  
Posts markdown files are located in [./content/posts](/content/posts) folder.  

## Development

To compile the blog to HTML content, follow these steps.

Install the dependencies within the project root directory:

```bash
npm install
```

Then run the gatsby develop command:

```bash
npm run dev
```

The blog is now available at http://localhost:8000/.

You can also generate TypeScript types from GraphQL queries:

```
npm run type:dev
```

## Author

| ![Dmitri Pavlutin](https://s.gravatar.com/avatar/7be6b604e5d3c6a82ed933dd90ed68dc?s=100) |
| :-: |
| [@panzerdp](https://twitter.com/panzerdp) |

## License

Licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)