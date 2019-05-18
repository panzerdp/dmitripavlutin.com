// Keep CommonJS format
const { compile } = require('path-to-regexp');

const PATH_INDEX = '/';
const TO_INDEX = compile(PATH_INDEX);

const PATH_POST = '/:slug([a-zA-Z0-9-]+)/';
const TO_POST = compile(PATH_POST);

const PATH_ALL_POSTS = '/all-posts/';
const TO_ALL_POSTS = compile('/all-posts/');

const PATH_ABOUT = '/about/';
const TO_ABOUT = compile(PATH_ABOUT);

const PATH_TAG = '/tag/:slug([a-zA-Z0-9-]+)/';
const TO_TAG = compile(PATH_TAG);

const PATH_PAGE = '/page/:page([0-9]+)/';
const TO_PAGE = compile(PATH_PAGE);

module.exports = {
  PATH_INDEX,
  TO_INDEX,

  PATH_POST,
  TO_POST,

  PATH_ALL_POSTS,
  TO_ALL_POSTS,

  PATH_ABOUT,
  TO_ABOUT,

  PATH_TAG,
  TO_TAG,

  PATH_PAGE,
  TO_PAGE
};