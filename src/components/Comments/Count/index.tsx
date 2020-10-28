import * as React from 'react';
import { useEffect, useState } from 'react';

interface CommentsCountProps {
  postUrl: string;
}

export default function CommentsCount({ postUrl }: CommentsCountProps): JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCommentsCount = async () => {
      const q = `${postUrl}+in:title+is:issue+repo:panzerdp/dmitripavlutin.com-comments`;
      const respone = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=1`);
      const { items = [] } = await respone.json();
      if (items.length > 0) {
        const issue = items[0];
        setCount(issue.comments);
      }
    };
    loadCommentsCount();
  }, []);
  return <>{ count === 0 ? 'Start discussion' : `${count} Comments` }</>;
}