import * as React from 'react';
import { PostPlain } from 'typings/post';
import SimplePost from '../Post';


interface SimpleListProps {
  posts: PostPlain[];
  beforeEachPost?(post: PostPlain): React.ReactNode;
}

export default function SimpleList({ posts, beforeEachPost }: SimpleListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <React.Fragment key={index}>
          {beforeEachPost ? beforeEachPost(post) : null}
          <SimplePost post={post} />
        </React.Fragment>
      ))}
    </div>
  );
}
