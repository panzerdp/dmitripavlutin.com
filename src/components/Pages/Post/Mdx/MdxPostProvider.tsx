import { MDXProvider } from "@mdx-js/react"
import { MdxTableOfContents } from './MdxTableOfContents';
import { MdxAffiliate } from './MdxAffiliate';

interface Props {
  children: JSX.Element,
  tableOfContents: any
}

type ContentProps = Record<string, unknown>

export function MdxPostProvider({ children, tableOfContents }: Props) {
  const components = {
    TableOfContents(props: ContentProps) {
      return <MdxTableOfContents {...props} tableOfContents={tableOfContents} />;
    },
    Affiliate: MdxAffiliate
  };

  return <MDXProvider components={components}>{children}</MDXProvider>;
}