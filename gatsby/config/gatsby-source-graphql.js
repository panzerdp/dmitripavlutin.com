module.exports = {
  resolve: "gatsby-source-graphql",
  options: {
    typeName: "GitHub",
    fieldName: "github",
    url: "https://api.github.com/graphql",
    // HTTP headers
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
    },
    fetchOptions: {},
    batch: true
  },
};