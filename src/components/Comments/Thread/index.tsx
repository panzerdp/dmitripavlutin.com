import { useRef, useEffect, memo } from 'react';

export function CommentsThread(): JSX.Element {
  const commentBox = useRef<HTMLDivElement>();

  useEffect(() => {
    const scriptEl = document.createElement('script')
    scriptEl.async = true
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.setAttribute('repo', 'panzerdp/dmitripavlutin.com-comments');
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('id', 'utterances');
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(scriptEl);
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, []);

  return <div ref={commentBox}></div>;
}

export default memo(CommentsThread);
