import { MDXProvider } from "@mdx-js/react"
import { TableOfContents } from 'features/tableOfContents';
import { AffiliateText } from 'features/affiliate';

interface Props {
  children: JSX.Element,
  tableOfContents: any
}

type ContentProps = Record<string, unknown>

export function MdxPostProvider({ children, tableOfContents }: Props) {
  const components = {
    TableOfContents(props: ContentProps) {
      return <TableOfContents {...props} tableOfContents={tableOfContents} />;
    },
    Affiliate: AffiliateText
  };

  return <MDXProvider components={components}>{children}</MDXProvider>;
}