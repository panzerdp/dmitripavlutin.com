import { useEffect, useState } from 'react';

interface CommentsCountProps {
  postUrl: string;
  githubCommentsRepository: string;
}

export default function CommentsCount({ postUrl, githubCommentsRepository }: CommentsCountProps): JSX.Element {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const loadCommentsCount = async () => {
      const q = `${postUrl}+in:title+is:issue+repo:${githubCommentsRepository}`;
      const respone = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=5`);
      const { items = [] } = await respone.json();
      for (const item of items) {
        const cleanTitle = item.title.replace(/\//g, '');
        if (cleanTitle === postUrl) {
          setCount(item.comments);
          break;
        }
      }
    };
    loadCommentsCount();
  }, []);
  return <>{ count === 0 ? 'Start discussion' : `${count} Comments` }</>;
}