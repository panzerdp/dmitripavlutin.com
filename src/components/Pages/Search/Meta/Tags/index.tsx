import { Helmet } from 'react-helmet';

import ClientOnly from '../../ClientOnly';

interface SearchMetaTagsProps {
  googleCustomSearchId: string;
}

export default function PostMetaTags({ googleCustomSearchId }: SearchMetaTagsProps) {
  return (
    <>
      <Helmet titleTemplate="%s">
        <title>Search</title>
        <meta name="description" content="Search for a post" />
      </Helmet>
      {/* Render google search only after mounting to prevent removing dynamically injected HTML */}
      <ClientOnly>
        <Helmet>
          <script async src={`https://cse.google.com/cse.js?cx=${googleCustomSearchId}`}></script>
        </Helmet>
      </ClientOnly>
    </>
  );
}
