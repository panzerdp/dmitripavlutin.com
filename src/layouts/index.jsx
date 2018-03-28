import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';

export default function Template({ children, data }) {
  const { site: { siteMetadata } } = data;
  return (
    <div className={styles.container}>
      <Helmet>
        <link href="//fonts.googleapis.com/css?family=Open+Sans:700|EB+Garamond:400,400i,600,700|Roboto+Mono:400" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="HandheldFriendly" content="True" />
      </Helmet>
      <Header
        pictureResolutions={data.file.childImageSharp.resolutions}
        speciality={siteMetadata.speciality}
      />
      <main className={styles.main}>
        {children()}
      </main>
      <Footer profiles={siteMetadata.profiles} author={siteMetadata.author} />
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
};

export const query = graphql`
  query GatsbyImageSampleQuery {
    file(relativePath: { eq: "layouts/profile-picture.jpg" }) {
      childImageSharp {
        # Specify the image processing steps right in the query
        # Makes it trivial to update as your page's design changes.
        resolutions(width: 64, height: 64, quality: 100) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
    site {
      siteMetadata {
        author
        speciality
        profiles {
          stackoverflow
          twitter 
          github
          linkedin
        }
      }
    }
  }
`;