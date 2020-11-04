import { graphql } from 'gatsby';

import AboutTemplate from 'components/Pages/About/Template';
import { AboutQuery } from 'typings/graphql';

interface AboutFetchProps {
  data: AboutQuery;
}

export default function AboutFetch({ data }: AboutFetchProps) {
  const edges = data.allMarkdownRemark.edges;
  const { authorInfo, siteInfo } = data.site.siteMetadata;
  if (edges.length === 0) {
    throw new Error('About me page content not found. Create a markdown file which type is "about-me"');
  }
  return (
    <AboutTemplate
      siteInfo={siteInfo}
      authorInfo={authorInfo}
      authorProfilePictureSrc={data.authorProfilePicture.childImageSharp.resize.src}
      html={edges[0].node.html}
    />
  );
}

export const pageQuery = graphql`
  query About {
    site {
      siteMetadata {
        siteInfo {
          ...SiteInfoAll
        }
        authorInfo {
          ...AuthorInfoAll
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "about-me" } } }) {
      edges {
        node {
          html
        }
      }
    }
    authorProfilePicture: file(relativePath: { eq: "profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
  }
`;
