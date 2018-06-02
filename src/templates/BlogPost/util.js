import R from 'ramda';

const POSTS_DIRECTORY_DEPTH = 2;

export const postRelativePath = R.pipe(
  R.split('/'),
  R.takeLast(POSTS_DIRECTORY_DEPTH + 1),
  R.join('/')
);