import { App } from 'app'
import SimpleList from 'components/Simple/List'
import PlainListByTagMetaTags from '../Meta/Tags'

import { PostPlain } from 'typings/post'

interface PlainListByTagTemplateProps {
  tag: string;
  posts: PostPlain[];
}

export default function PlainListByTagTemplate({ tag, posts }: PlainListByTagTemplateProps) {
  return (
    <App>
      <PlainListByTagMetaTags tag={tag} />
      <h1>&quot;{tag}&quot; posts</h1>
      <SimpleList posts={posts} />
    </App>
  )
}
