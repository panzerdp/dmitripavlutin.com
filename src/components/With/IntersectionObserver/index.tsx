import React from 'react';
import { canUseDOM } from 'exenv';

import Observer from 'react-intersection-observer';

function withIntersectionObserver(WrappedComponent: React.ComponentType) {
  function EnhancedComponent(props: { onViewChange: (inView: boolean) => void}) {
    const { onViewChange, ...wrappedProps } = props;
    return (
      <Observer onChange={inView => onViewChange(inView)}>
        <WrappedComponent {...wrappedProps} />
      </Observer>
    );
  }

  EnhancedComponent.displayName = `withIntersectionObserver(${WrappedComponent.name})`;

  return EnhancedComponent;
}

export default function(WrappedComponent: React.ComponentType) {
  if (canUseDOM && typeof IntersectionObserver !== 'undefined') {
    return withIntersectionObserver(WrappedComponent);
  }
  return () => WrappedComponent;
}