### Intro

It's a plugin a wrote for my single usecase:

> Display number of my newsletter subscribers in my gatsby blog

### Installation

### Usage

`gatsby-config.js`

```javascript
[
  {
    resolve: `gatsby-source-mailerlite-count`,
    options: {
      groupName: '<your-group-name>',
      key: '<MAILERLITE-API-KEY>'
    }
  }
];
```

`index.js`

```javascript
export const pageQuery = graphql`
  query {
    mailerliteStats {
      subscribersCount
    }
  }
`;
```

- You can get `id` in settings of your list.
- You can can your API key in account setting of your mailchimp account.
