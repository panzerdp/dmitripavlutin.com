import React from 'react';

function windowOpen({ url, name, height = 400, width = 550 }) {
  if (typeof window === 'undefined') {
    return null;
  }
  /* eslint-disable no-mixed-operators */
  const left = (window.outerWidth / 2)
    + (window.screenX || window.screenLeft || 0) - (width / 2);
  const top = (window.outerHeight / 2)
    + (window.screenY || window.screenTop || 0) - (height / 2);
  /* eslint-enable no-mixed-operators */

  const config = {
    height,
    width,
    left,
    top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
  };

  const shareDialog = window.open(
    url,
    name,
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', ')
  );

  return shareDialog;
}

export default function withWindowOpen(WrappedComponent) {
  const EnhancedComponent = props => <WrappedComponent {...props} windowOpen={windowOpen} />;
  EnhancedComponent.displayName = `withWindowOpen(${WrappedComponent.name})`;
  return EnhancedComponent;
}