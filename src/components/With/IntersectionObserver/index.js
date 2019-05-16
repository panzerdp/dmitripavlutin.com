import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { canUseDOM } from 'exenv';

import 'intersection-observer';
import Observer from 'react-intersection-observer';

function withIntersectionObserver(WrappedComponent) {
  function EnhancedComponent(props) {
    const { onViewChange, ...wrappedProps } = props;
    return (
      <Observer onChange={inView => onViewChange(inView)}>
        <WrappedComponent {...wrappedProps} />
      </Observer>
    );
  }

  EnhancedComponent.displayName = `withIntersectionObserver(${WrappedComponent.name})`;

  EnhancedComponent.propTypes = {
    onViewChange: PropTypes.func
  };

  return EnhancedComponent;
}

export default R.ifElse(
  R.always(canUseDOM),
  withIntersectionObserver,
  R.identity
);