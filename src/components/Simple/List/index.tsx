import * as React from 'react';

import SimplePost from '../Post';

interface SimpleListProps {
  posts: PostPlain[];
  beforeEachPost?(post: PostPlain): React.ReactNode;
}

export default function SimpleList({ posts, beforeEachPost }: SimpleListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <>
          {beforeEachPost ? beforeEachPost(post) : null}
          <SimplePost post={post} key={index} />
        </>
      ))}
    </div>
  );
}
