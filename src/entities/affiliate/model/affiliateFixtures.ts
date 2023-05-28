import { Affiliate } from './Affiliate'

export const affiliateFixtureJavaScript: Affiliate = {
  text: 'In text <a href="__URL__">JavaScript course</a>',
  url: 'https://example.com/1/a',
  tags: ['javascript', 'frontend']
}

export const affiliateFixtureReact: Affiliate = {
  text: 'In text React <b>course</b>: __URL__. Try again: __URL__',
  url: 'https://example.com/2/a',
  tags: ['react', 'frontend']
}