import classNames from 'classnames';

import { TableOfContentsItem } from '../model/TableOfContentsItem';
import { getFlatList } from '../lib/getFlatList';

interface Props {
  tableOfContents: { items: TableOfContentsItem[] };
  tableLayout?: boolean;
  maxLevel?: number;
}

import * as styles from './TableOfContents.module.scss';

export function TableOfContents({ tableOfContents: { items }, tableLayout = false, maxLevel = Infinity }: Props) {
  const className = classNames(styles.toc, { [styles.tableLayout]: tableLayout });

  return (
    <div className={className}>
      <h3>Table of Contents</h3>
      {getFlatList(items, maxLevel)}
    </div>
  );
}