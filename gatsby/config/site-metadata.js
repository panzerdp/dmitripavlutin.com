const siteUrl = 'https://dmitripavlutin.com';

module.exports = {
  siteUrl, // ensure compatibility with plugins that require `siteUrl`
  siteInfo: {
    title: 'Dmitri Pavlutin',
    description: 'I help developers understand JavaScript and React',
    metaTitle: 'Dmitri Pavlutin Blog',
    metaDescription:
      'Dmitri Pavlutin Blog is a place to learn about JavaScript, CSS, React and more on Frontend development',
    url: siteUrl,
    repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
  },
  authorInfo: {
    name: 'Dmitri Pavlutin',
    description:
      'Software developer, tech writer and coach. My daily routine consists of (but not limited to) drinking coffee, coding, writing, coaching, overcoming boredom 😉.',
    email: 'dmitripavlutin@gmail.com',
    jobTitle: 'Software Developer',
    profiles: {
      stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
      twitter: 'https://twitter.com/panzerdp',
      linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
      github: 'https://github.com/panzerdp',
      facebook: 'https://www.facebook.com/dmitripavlutin.dev',
    },
    nicknames: {
      twitter: 'panzerdp',
    },
  },
  authorStats: {
    twitterFollowersCount: '1.8K',
  },
  emailSubscriptionService: {
    endpoint: 'https://dmitripavlutin.us13.list-manage.com/subscribe/post?u=7cedcb1f5ab74eb7c907e768e&id=75f44f92b9',
    hiddenFieldName: 'b_7cedcb1f5ab74eb7c907e768e_75f44f92b9',
  },
  featured: {
    popularPostsByCategory: [{
      category: 'JavaScript',
      slugs: [
        'simple-explanation-of-javascript-closures',
        'gentle-explanation-of-this-in-javascript',
        'differences-between-arrow-and-regular-functions'
      ]
    }, {
      category: 'React',
      slugs: [
        'react-useeffect-explanation',
        'dont-overuse-react-usecallback',
        'use-react-memo-wisely',
      ]
    }, {
      category: 'Best Practices',
      slugs: [
        'javascript-variables-best-practices',
        'javascript-modules-best-practices',
        'javascript-arrow-functions-best-practices'
      ]
    }]
  },
  googleCustomSearchId: '004443697379288327791:1zr8pgnumxn',
  githubCommentsRepository: 'panzerdp/dmitripavlutin.com-comments'
};
