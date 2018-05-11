import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import slugify from 'voca/slugify';
import R from 'ramda';

import ShareButton from 'components/Share/Button';
import styles from './index.module.scss';
import withWindowOpen from 'components/With/WindowOpen';

const SHARE_TWITTER = 'https://twitter.com/share';
const toTwitterHashtags = R.pipe(
  R.map(slugify),
  R.join(',')
);

export class ShareSocialTwitter extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <ShareButton title="Share on Twitter" onClick={this.handleClick} className={styles.twitter} />;
  }

  handleClick(event) {
    event.preventDefault();
    this.props.windowOpen({
      url: this.getTwitterShareUrl(),
      width: 550,
      height: 300,
      name: 'Twitter share'
    });
  }

  getTwitterShareUrl() {
    const { url, text, tags } = this.props;
    return SHARE_TWITTER + '?' + stringify({
      url,
      text,
      hashtags: toTwitterHashtags(tags)
    });
  }
}

ShareSocialTwitter.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  tags: PropTypes.array,
  windowOpen: PropTypes.func
};

export default withWindowOpen(ShareSocialTwitter);