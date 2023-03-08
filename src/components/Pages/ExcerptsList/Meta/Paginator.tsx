import { Helmet } from 'react-helmet';

import { useSiteMetadata } from 'hooks/useSiteMetadata';
import { TO_PAGE } from 'routes/path';

interface MetaPaginatorProps {
  pagesSum: number;
  currentPage: number;
}

export function ExcerptsListMetaPaginator({ pagesSum, currentPage }: MetaPaginatorProps) {
  const { site } = useSiteMetadata();
  
  function prev() {
    if (currentPage === 1) {
      return null;
    }
    return <link rel="prev" href={pageToUrl(currentPage - 1)} />;
  }

  function next() {
    if (currentPage === pagesSum) {
      return null;
    }
    return <link rel="next" href={pageToUrl(currentPage + 1)} />;
  }

  function pageToUrl(page: number) {
    if (page === 1) {
      return site.url;
    }
    return `${site.url}${TO_PAGE({ page })}`;
  }

  return (
    <Helmet>
      {prev()}
      {next()}
    </Helmet>
  );
}