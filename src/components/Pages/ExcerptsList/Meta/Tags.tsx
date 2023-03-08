import { Helmet } from 'react-helmet';

import { useSiteMetadata } from 'hooks/useSiteMetadata';

interface MetaTagsProps {
  currentPage: number;
}

export function ExcerptsListMetaTags({ currentPage }: MetaTagsProps) {
  const { author, site } = useSiteMetadata();

  let metaTitle = site.metaTitle;
  let metaDescription = site.metaDescription;
  if (currentPage > 1) {
    metaTitle = `${metaTitle}, page ${currentPage}`;
    metaDescription = `${metaDescription}, page ${currentPage}`;
  }
  const imageUrl = `${site.url}${author.profilePictureSrc}`;
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:site_name" content={site.metaTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={site.metaTitle} />
      <meta property="og:description" content={site.metaDescription} />
      <meta property="og:url" content={site.url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={site.metaTitle} />
      <meta name="twitter:description" content={site.metaDescription} />
      <meta name="twitter:url" content={site.url} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
