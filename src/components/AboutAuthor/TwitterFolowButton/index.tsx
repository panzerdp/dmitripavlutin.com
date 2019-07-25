import * as React from 'react';

import './index.module.scss';
import withWindowOpen, { WindowOpenOptions } from 'components/With/WindowOpen';

const TWITTER_FOLLOW_URL = 'https://twitter.com/intent/user?screen_name=';

interface TwitterFollowButtonProps {
  twitterFollowersCount: string;
  username: string;
  authorName: string;
  windowOpen?(props: WindowOpenOptions): void;
}

export function TwitterFollowButton({
  twitterFollowersCount,
  username,
  authorName,
  windowOpen,
}: TwitterFollowButtonProps) {
  const url = TWITTER_FOLLOW_URL + username;
  function openFollowWindow(event: React.MouseEvent) {
    event.preventDefault();
    windowOpen({
      name: `${authorName} (${username}) on Twitter`,
      url,
      width: 550,
      height: 500,
    });
  }
  return (
    <div className="hcount">
      <div id="widget">
        <div className="btn-o">
          <a
            id="follow-button"
            className="btn"
            title={`Follow ${authorName} (${username}) on Twitter`}
            href={url}
            onClick={openFollowWindow}
          >
            <i></i>
            <span className="label" id="l">
              Follow <b>@{username}</b>
            </span>
          </a>
        </div>
        <div className="count-o" id="c" data-scribe="component:count">
          <i></i>
          <u></u>
          <a id="count" className="note" href={url} onClick={openFollowWindow}>
            {twitterFollowersCount} followers
          </a>
        </div>
      </div>
    </div>
  );
}

export default withWindowOpen(TwitterFollowButton);
