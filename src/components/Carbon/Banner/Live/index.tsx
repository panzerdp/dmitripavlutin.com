

interface CarbonBannerLiveProps {
  scriptSrc: string;
}

function CarbonBannerLive(props: CarbonBannerLiveProps, ref: React.RefObject<HTMLDivElement>): null {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = props.scriptSrc;
    script.async = true;
    script.id = '_carbonads_js';
    ref.current.appendChild(script);

    return () => { script.parentElement.removeChild(script) }
  }, []);
  return null;
}

export default React.forwardRef(CarbonBannerLive);