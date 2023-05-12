const path = require('path')

const createExcerptsList = require('./gatsby/node/excerpts-list')
const createPost = require('./gatsby/node/post')
const createPlainListByTag = require('./gatsby/node/plain-list-by-tag')


const query = `
# PostThumbnail fragment should be everywhere exactly the same to guarantee the same images generation
fragment PostThumbnail on MdxFrontmatter {
  thumbnail {
    childImageSharp {
      gatsbyImageData(aspectRatio: 1.8, quality: 60, width: 708, formats: [AUTO, WEBP, AVIF], layout: CONSTRAINED, placeholder: NONE)
    }
  }
}

query CreatePages {
  site {
    siteMetadata {
      featured {
        popularPostsByCategory {
          category
          slugs
        }
      }
    }
  }
  allMdx(
    sort: {
      frontmatter: {
        published: DESC
      }
    }
    filter: {
      frontmatter: { 
        type: {
          eq: "post"
        }
      }
    }
    limit: 1000
  ) {
    edges {
      node {
        internal {
          contentFilePath
        }
        frontmatter {
          title
          slug
          tags
          ...PostThumbnail
        }
      }
    }
  }
}`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(query)
  if (result.errors) {
    // eslint-disable-next-line no-console
    console.log(result.errors)
    throw result.errors
  }
  // Create blog posts pages.
  const edges = result.data.allMdx.edges

  const popularPostsByCategory = result.data.site.siteMetadata.featured.popularPostsByCategory
  const popularPostsSlugs = popularPostsByCategory.reduce((acc, postsByCategory) => [...acc, ...postsByCategory.slugs], [])

  createExcerptsList(createPage, edges, popularPostsSlugs)
  createPost({ createPage, edges, popularPostsSlugs }, actions)
  createPlainListByTag(createPage, edges)
  return result
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig  }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })

  // Remove CSS ordering logs
  if (stage === 'build-javascript' || stage === 'develop') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      plugin => {
        return plugin.constructor.name === 'MiniCssExtractPlugin'
      }
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}
