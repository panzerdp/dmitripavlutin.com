const siteUrl = 'https://dmitripavlutin.com';

module.exports = {
  siteUrl, // ensure compatibility with plugins that require `siteUrl`
  siteInfo: {
    title: 'Dmitri Pavlutin',
    description: 'Thoughts on Frontend development',
    metaTitle: 'Dmitri Pavlutin Blog',
    metaDescription:
      'Dmitri Pavlutin Blog is a place to learn about JavaScript, CSS, React and more on Frontend development',
    url: siteUrl,
    repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
  },
  authorInfo: {
    name: 'Dmitri Pavlutin',
    description:
      'I\'m a passionate software developer, tech writer and coach. My daily routine consists of (but not limited to) drinking coffee, coding, writing, coaching, fighting boredom 😉.',
    email: 'dmitripavlutin@gmail.com',
    jobTitle: 'Software Developer',
    profiles: {
      stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
      twitter: 'https://twitter.com/panzerdp',
      linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
      github: 'https://github.com/panzerdp',
      facebook: 'https://www.facebook.com/dmitri.pavlutin',
    },
    nicknames: {
      twitter: 'panzerdp',
    },
  },
  authorStats: {
    twitterFollowersCount: '1.4K',
  },
  emailSubscriptionService: {
    endpoint: 'https://dmitripavlutin.us13.list-manage.com/subscribe/post?u=7cedcb1f5ab74eb7c907e768e&id=75f44f92b9',
    hiddenFieldName: 'b_7cedcb1f5ab74eb7c907e768e_75f44f92b9',
  },
  carbonAdsService: {
    scriptSrc: '//cdn.carbonads.com/carbon.js?serve=CE7DT2QI&placement=dmitripavlutincom',
    isEnabled: true,
    isProductionMode: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod',
  },
  featured: {
    popular: [
      'javascript-arrow-functions-best-practices',
      '7-tips-to-handle-undefined-in-javascript',
      '6-ways-to-declare-javascript-functions',
      '5-interesting-uses-javascript-destructuring',
      'simple-but-tricky-javascript-interview-questions',
    ],
  },
  googleCustomSearchId: '004443697379288327791:1zr8pgnumxn'
};
