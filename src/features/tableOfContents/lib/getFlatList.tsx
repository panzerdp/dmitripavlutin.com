import { TableOfContentsItem } from '../model/TableOfContentsItem';

export function getFlatList(items: TableOfContentsItem[], maxLevel: number): JSX.Element {
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