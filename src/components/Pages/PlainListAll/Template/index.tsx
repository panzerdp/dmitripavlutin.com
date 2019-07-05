import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import SimpleList from 'components/Simple/List';
import MetaTags from '../Meta/Tags';
import { formatDateToMonth } from 'utils/date';

import styles from './index.module.scss';

interface PlainListAllTemplateProps {
  posts: PostPlain[];
}

export default function PlainListAllTemplate({ posts }: PlainListAllTemplateProps) {
  return (
    <Layout>
      <MetaTags />
      <div className={styles.plainListAllTemplate}>
        <h1>All posts</h1>
        <SimpleList posts={posts} beforeEachPost={beforeEachPost.bind(undefined, [])} />
      </div>
    </Layout>
  );
}

export function beforeEachPost(displayedMonths: string[], post: Post) {
  const month = formatDateToMonth(post.published);
  const alreadyDisplayed = displayedMonths.includes(month);
  if (alreadyDisplayed) {
    return null;
  }
  displayedMonths.push(month);
  return <h2>{month}</h2>;
}
