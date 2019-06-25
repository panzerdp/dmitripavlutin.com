const siteUrl = 'https://dmitripavlutin.com';

module.exports = {
  siteUrl, // ensure compatibility with plugins that require `siteUrl`
  siteInfo: {
    title: 'Dmitri Pavlutin Blog',
    description: 'Thoughts on Frontend development',
    url: siteUrl,
    repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
  },
  authorInfo: {
    name: 'Dmitri Pavlutin',
    description: 'Dmitri Pavlutin is a software developer and tech writer specialized in Frontend technologies.',
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
  emailSubscriptionService: {
    endpoint: 'https://dmitripavlutin.us13.list-manage.com/subscribe/post?u=7cedcb1f5ab74eb7c907e768e&id=75f44f92b9',
    hiddenFieldName: 'b_7cedcb1f5ab74eb7c907e768e_75f44f92b9',
  },
  carbonAdsService: {
    scriptSrc: '//cdn.carbonads.com/carbon.js?serve=CE7DT2QI&placement=dmitripavlutincom',
    enabled: true,
  },
};
