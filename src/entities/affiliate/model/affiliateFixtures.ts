import { Affiliate, AffiliatePosition } from './Affiliate'

export const affiliateFixtureJavaScript: Affiliate = {
  position: AffiliatePosition.InText,
  text: 'In text <a href="__LINK__">JavaScript course</a>',
  link: 'https://example.com/1/a',
  applyOn: { tags: ['javascript', 'frontend'] }
}

export const affiliateFixtureReact: Affiliate = {
  position: AffiliatePosition.InText,
  text: 'In text React <b>course</b>: __LINK__. Try again: __LINK__',
  link: 'https://example.com/2/a',
  applyOn: { tags: ['react', 'frontend'] }
}