import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { slugify } from 'utils/string';

import styles from './index.module.scss';
import { TO_TAG } from 'routes/path';

export default function Tag({ name }) {
  return <Link to={TO_TAG({ slug: slugify(name) })} className={styles.tag}><span>{name}</span></Link>;
}

Tag.propTypes = {
  name: PropTypes.string
};