import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';
import { useEffect, useState } from 'react';
import { PostPlain } from 'typings/post';

interface CommentsCountProps {
  post: PostPlain;
}

export default function CommentsCount({ post }: CommentsCountProps): JSX.Element {
  const { site: { githubCommentsRepository } } = useAuthorAndSiteInfo();
  const [count, setCount] = useState(-1);
  useEffect(() => {
    const loadCommentsCount = async () => {
      const q = `${post.slug}+in:title+is:issue+repo:${githubCommentsRepository}`;
      const respone = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=5`);
      const { items = [] } = await respone.json();
      for (const item of items) {
        const cleanTitle = item.title.replace(/\//g, '');
        if (cleanTitle === post.slug) {
          setCount(item.comments);
          break;
        }
      }
    };
    loadCommentsCount();
  }, []);

  let message = '-- Comments'
  if (count === 0) {
    message = 'Start discussion'
  } else if (count > 0) {
    message = `${count} Comments`
  }
  return <>{message}</>;
}