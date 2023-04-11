### Intro

It's a plugin a wrote for my single usecase:

> Display number of my newsletter subscribers in my gatsby blog

### Installation

```
yarn add @rogovdm/gatsby-source-mailchimp
```

### Usage

`gatsby-config.js`

```javascript
[
  {
    resolve: `@rogovdm/gatsby-source-mailchimp`,
    options: {
      id: '<id-of-your-list>',
      key: '<MAILCHIMP-API-KEY>'
    }
  }
];
```

`index.js`

```javascript
export const pageQuery = graphql`
  query {
    allMailchimpList {
      edges {
        node {
          id
          stats {
            member_count
          }
        }
      }
    }
  }
`;
```

- You can get `id` in settings of your list.
- You can can your API key in account setting of your mailchimp account.
