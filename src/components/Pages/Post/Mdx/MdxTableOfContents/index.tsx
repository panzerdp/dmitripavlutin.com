import classNames from 'classnames';

interface TableOfContentsItem {
  title: string,
  url: string,
  items?: TableOfContentsItem[]
}

interface Props {
  tableOfContents: { items: TableOfContentsItem[] };
  tableLayout?: boolean;
  maxLevel?: number;
}

import * as styles from './index.module.scss';

export function MdxTableOfContents({ tableOfContents: { items }, tableLayout = false, maxLevel = Infinity }: Props) {
  const className = classNames(styles.toc, { [styles.tableLayout]: tableLayout })

  return (
    <div className={className}>
      <h3>Table of Contents</h3>
      {getFlatList(items, maxLevel)}
    </div>
  );
}

function getFlatList(items: TableOfContentsItem[], maxLevel: number): JSX.Element {
  if (maxLevel === 0) {
    return null
  }
  const elements = items.reduce((acc, item) => {
    acc.push(
      <li key={item.url}>
        <a href={item.url}>
          {item.title}
        </a>
        {item.items ? getFlatList(item.items, maxLevel - 1) : null}
      </li>
    )
    return acc
  }, []);

  return <ul>{elements}</ul>
}