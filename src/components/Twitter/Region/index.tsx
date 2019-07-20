import * as React from 'react';

import TwitterFetch from 'components/Twitter/Fetch';
import TwitterFollowButton from 'components/Twitter/FolowButton';

export default function TwitterRegion() {
  return (
    <TwitterFetch
      render={({ authorStats, authorInfo }) => {
        return (
          <TwitterFollowButton
            authorName={authorInfo.name}
            twitterFollowersCount={authorStats.twitterFollowersCount}
            username={authorInfo.nicknames.twitter}
          />
        );
      }}
    />
  );
}
