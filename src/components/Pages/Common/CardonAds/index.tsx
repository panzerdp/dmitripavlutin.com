import * as React from 'react';

import styles from './index.module.scss';

interface CarbonAdsProps {
  carbonAdsService: CarbonAdsService;
  className?: string;
}

export default class CarbonAds extends React.Component<CarbonAdsProps> {
  private container: React.RefObject<HTMLDivElement>;

  public constructor(props: CarbonAdsProps) {
    super(props);
    this.container = React.createRef();
  }

  public render() {
    if (!this.props.carbonAdsService.enabled) {
      return null;
    }
    const { className = '' } = this.props;
    return <div ref={this.container} className={`${styles.carbonAdsContainer} ${className}`}></div>;
  }

  public componentDidMount(): void {
    if (!this.props.carbonAdsService.enabled) {
      return null;
    }
    const script = document.createElement('script');
    script.src = this.props.carbonAdsService.scriptSrc;
    script.async = true;
    script.id = '_carbonads_js';
    this.container.current.appendChild(script);
  }
}
