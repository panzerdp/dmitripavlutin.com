import { MDXProvider } from '@mdx-js/react'
import { TableOfContents } from 'features/tableOfContents'
import { AffiliateBannerInPost } from 'features/affiliate'
import { ImgShadow } from 'shared/ui/ImgShadow'

interface Props {
  children: JSX.Element,
  tableOfContents: any,
  tags: string[]
}

type ContentProps = Record<string, unknown>

export function MdxPostProvider({ children, tableOfContents, tags }: Props) {
  const components = {
    TableOfContents(props: ContentProps) {
      return <TableOfContents {...props} tableOfContents={tableOfContents} />
    },
    Affiliate(props: ContentProps) {
      return <AffiliateBannerInPost {...props} tags={tags} />
    },
    ImgShadow
  }

  return <MDXProvider components={components}>{children}</MDXProvider>
}