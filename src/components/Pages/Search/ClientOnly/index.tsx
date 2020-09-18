import * as React from 'react';

interface ClientOnlyProps {
  children: JSX.Element;
}

export default function ClientOnly({ children }: ClientOnlyProps): JSX.Element {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? children : null;
}