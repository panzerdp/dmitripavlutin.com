import * as React from 'react';

interface CarbonBannerLiveProps {
  scriptSrc: string;
}

export default React.forwardRef(function(props: CarbonBannerLiveProps, ref: React.RefObject<HTMLDivElement>): null {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = props.scriptSrc;
    script.async = true;
    script.id = '_carbonads_js';
    ref.current.appendChild(script);
  }, []);
  return null;  
});