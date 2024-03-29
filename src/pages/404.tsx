import { App } from 'app'
import { Helmet } from 'react-helmet'

export default function Page404() {
  return (
    <App>
      <Helmet>
        <title>Page not found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <h1> Page not found</h1>
      Oops, sorry! The post you are looking for has been removed or relocated.
      <a href="/">Go to home page</a>
    </App>
  )
}
