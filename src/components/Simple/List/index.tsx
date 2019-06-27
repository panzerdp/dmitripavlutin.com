import * as React from 'react';

import SimplePost from '../Post';

interface SimpleListProps {
  posts: PostExcerpt[];
}

export default function SimpleList({ posts }: SimpleListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <SimplePost post={post} key={index} />
      ))}
    </div>
  );
}
