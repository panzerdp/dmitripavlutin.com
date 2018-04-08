import { compile } from 'path-to-regexp';

export const PATH_INDEX = '/';
export const TO_INDEX = compile(PATH_INDEX);

export const PATH_POST = '/:slug([a-zA-Z0-9-]+)/';
export const TO_POST = compile(PATH_POST);

export const PATH_ALL_POSTS = '/all-posts/';
export const TO_ALL_POSTS = compile('/all-posts/');

export const PATH_ABOUT = '/about/';
export const TO_ABOUT = compile(PATH_ABOUT);

export const PATH_TAG = '/tag/:tag([a-zA-Z0-9-]+)/';
export const TO_TAG = compile(PATH_TAG);

export const PATH_PAGE = '/page/:page([0-9]+)/';
export const TO_PAGE = compile(PATH_PAGE);