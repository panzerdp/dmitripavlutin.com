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
      div.innerHTML = `
      <span>
        <span class="carbon-wrap">
          <a href="#" class="carbon-img" target="_blank" rel="noopener">
            <img src="/slack-blue_2x.png" alt="ads via Carbon" border="0" height="100" width="130" style="max-width: 130px;">
          </a>
          <a href="#" class="carbon-text" target="_blank" rel="noopener">
            Bring your team together with Slack, the collaboration hub for work.
          </a>
        </span>
        <a href="#" class="carbon-poweredby" target="_blank" rel="noopener">
          ads via Carbon (DEV)
        </a>
        <img src="#" border="0" height="1" width="1" alt="ads via Carbon" style="display: none;">
      </span>`;
      this.container.current.appendChild(div);
    }
  }
}
