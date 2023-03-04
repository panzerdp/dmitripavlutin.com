import Layout from 'components/Layout/Fetch';
import Post404MetaTags from 'components/Pages/404/Meta/Tags';

export default function Page404Template() {
  return (
    <Layout>
      <Post404MetaTags />
      <h1> Page not found</h1>
      Oops, sorry! The post you are looking for has been removed or relocated.
      <a href="/">Go to home page</a>
    </Layout>
  );
}
