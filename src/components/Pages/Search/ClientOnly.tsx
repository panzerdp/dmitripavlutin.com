import { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: JSX.Element;
}

export default function ClientOnly({ children }: ClientOnlyProps): JSX.Element {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? children : null;
}