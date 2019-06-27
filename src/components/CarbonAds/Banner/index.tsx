import * as React from 'react';

import styles from './index.module.scss';

interface CarbonAdsBannerProps {
  carbonAdsService: CarbonAdsService;
  className?: string;
}

export default class CarbonAdsBanner extends React.Component<CarbonAdsBannerProps> {
  private container: React.RefObject<HTMLDivElement>;

  public constructor(props: CarbonAdsBannerProps) {
    super(props);
    this.container = React.createRef();
  }

  public render() {
    if (!this.props.carbonAdsService.isEnabled) {
      return null;
    }
    const { className = '' } = this.props;
    return <div ref={this.container} className={`${styles.carbonAdsBanner} ${className}`}></div>;
  }

  public componentDidMount(): void {
    const { isEnabled, isProductionMode, scriptSrc } = this.props.carbonAdsService;
    if (!isEnabled) {
      return null;
    }
    if (isProductionMode) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.id = '_carbonads_js';
      this.container.current.appendChild(script);
    } else {
      const div = document.createElement('div');
      div.id = 'carbonads';
      div.innerHTML = 'Carbon Ad (Dev mode) Lorem ipsum dolor sit, amet consectetur adipisicing elit.';
      this.container.current.appendChild(div);
    }
  }
}
