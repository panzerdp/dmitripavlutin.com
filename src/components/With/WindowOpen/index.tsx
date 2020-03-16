import * as React from 'react';

export interface WindowOpenOptions {
  url: string;
  name: string;
  height?: number;
  width?: number;
}

export interface WithWindowOpenProps {
  windowOpen(options: WindowOpenOptions): void;
}

export function windowOpen({ url, name, height = 400, width = 550 }: WindowOpenOptions) {
  /* eslint-disable no-mixed-operators */
  const left = window.outerWidth / 2 + window.screenX - width / 2;
  const top = window.outerHeight / 2 + window.screenY - height / 2;
  /* eslint-enable no-mixed-operators */

  const config: { [index: string]: string | number } = {
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

  const shareDialog = open(
    url,
    name,
    Object.keys(config)
      .map((key) => `${key}=${config[key]}`)
      .join(', ')
  );

  return shareDialog;
}

export default function withWindowOpen<P extends object>(WrappedComponent: React.ComponentType<P>) {
  function EnhancedComponent(props: P) {
    return <WrappedComponent {...(props as P)} windowOpen={windowOpen} />;
  }
  EnhancedComponent.displayName = `withWindowOpen(${WrappedComponent.name})`;
  return EnhancedComponent;
}
