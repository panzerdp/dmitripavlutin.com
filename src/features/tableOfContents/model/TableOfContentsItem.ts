export interface TableOfContentsItem {
  title: string,
  url: string,
  items?: TableOfContentsItem[]
}