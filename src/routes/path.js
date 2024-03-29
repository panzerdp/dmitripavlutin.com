// Keep CommonJS format
const { compile } = require('path-to-regexp')

const PATH_INDEX = '/'
const TO_INDEX = compile(PATH_INDEX)

const PATH_POST = '/:slug([a-zA-Z0-9-]+)/'
const TO_POST = compile(PATH_POST)

const PATH_ALL_POSTS = '/all-posts/'
const TO_ALL_POSTS = compile('/all-posts/')

const PATH_ABOUT_ME = '/about-me/'
const TO_ABOUT_ME = compile(PATH_ABOUT_ME)

const PATH_TAG = '/tag/:slug([a-zA-Z0-9-]+)/'
const TO_TAG = compile(PATH_TAG)

const PATH_PAGE = '/page/:page([0-9]+)/'
const TO_PAGE = compile(PATH_PAGE)

const PATH_NEWSLETTER = '/newsletter/'
const TO_NEWSLETTER = compile(PATH_NEWSLETTER)

const PATH_SEARCH = '/search/'
const TO_SEARCH = compile(PATH_SEARCH)

const PATH_RSS = '/rss.xml'
const TO_RSS = compile(PATH_RSS)

const PATH_PRIVACY_POLICY = '/privacy-policy/'
const TO_PRIVACY_POLICY = compile(PATH_PRIVACY_POLICY)

const PATH_CONTACT = '/contact/'
const TO_CONTACT = compile(PATH_CONTACT)

const PATH_TERMS = '/terms/'
const TO_TERMS = compile(PATH_TERMS)

module.exports = {
  PATH_INDEX: '/',
  TO_INDEX,

  PATH_POST,
  TO_POST,

  PATH_ALL_POSTS,
  TO_ALL_POSTS,

  PATH_ABOUT_ME,
  TO_ABOUT_ME,

  PATH_TAG,
  TO_TAG,

  PATH_PAGE,
  TO_PAGE,

  PATH_NEWSLETTER,
  TO_NEWSLETTER,

  PATH_SEARCH,
  TO_SEARCH,

  PATH_RSS,
  TO_RSS,

  PATH_PRIVACY_POLICY,
  TO_PRIVACY_POLICY,

  PATH_CONTACT,
  TO_CONTACT,

  PATH_TERMS,
  TO_TERMS
}
