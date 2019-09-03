import { useState, useEffect } from 'react';

export enum RelativePosition {
  Above = 1,
  Below,
}

export default function useVerticalScroll(relativeToScrollY: number): RelativePosition {
  const [position, setPosition] = useState(RelativePosition.Above);
  if (typeof window === 'undefined') {
    return position;
  }

  function listener() {
    const newPosition = window.scrollY < relativeToScrollY ? RelativePosition.Above : RelativePosition.Below;
    if (newPosition !== position) {
      setPosition(newPosition);
    }
  }

  useEffect(function() {
    listener();
    window.addEventListener('scroll', listener);
    return function() {
      window.removeEventListener('scroll', listener);
    };
  });

  return position;
}
