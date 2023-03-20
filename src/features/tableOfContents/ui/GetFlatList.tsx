import { TableOfContentsItem } from '../model/TableOfContentsItem'

interface GetFlatListProps {
  items: TableOfContentsItem[]
  maxLevel: number
}

export function GetFlatList({ items, maxLevel }: GetFlatListProps): JSX.Element {
  if (maxLevel === 0) {
    return null
  }
  const elements = items.reduce((acc, item) => {
    acc.push(
      <li key={item.url}>
        <a href={item.url}>
          {item.title}
        </a>
        {item.items ? <GetFlatList items={item.items} maxLevel={maxLevel - 1} /> : null}
      </li>
    )
    return acc
  }, [])

  return <ul>{elements}</ul>
}