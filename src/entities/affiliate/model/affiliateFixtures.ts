import { Affiliate } from './Affiliate'

export const affiliateFixtureJavaScript: Affiliate = {
  text: 'In text <a href="__LINK__">JavaScript course</a>',
  link: 'https://example.com/1/a',
  tags: ['javascript', 'frontend']
}

export const affiliateFixtureReact: Affiliate = {
  text: 'In text React <b>course</b>: __LINK__. Try again: __LINK__',
  link: 'https://example.com/2/a',
  tags: ['react', 'frontend']
}