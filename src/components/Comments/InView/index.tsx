import * as React from 'react';

import useVerticalScroll, { RelativePosition } from 'hooks/useVerticalScroll';

const LOAD_COMMENTS_AFTER_Y = -500;

interface ThreadInViewProps {
  children: React.ReactNode;
}

export default function CommentsInView({ children }: ThreadInViewProps) {
  const [show, setShow] = React.useState(false);
  const relativePosition = useVerticalScroll(LOAD_COMMENTS_AFTER_Y);
  React.useEffect(
    function() {
      if (relativePosition === RelativePosition.Below) {
        setShow(true);
      }
    },
    [relativePosition]
  );
  if (show) {
    return <>{children}</>;
  }
  return null;
}
