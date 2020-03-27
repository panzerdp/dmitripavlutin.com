import * as React from 'react';

export default function CarbonBannerDemo() {
  return (
    <div id="carbonads">
      <span>
        <span className="carbon-wrap">
          <a href="#" className="carbon-img" target="_blank" rel="noopener">
            <img src="/slack-carbon.png" alt="ads via Carbon" height={100} width={130} style={{ maxWidth: '130px' }} />
          </a>
          <a href="#" className="carbon-text" target="_blank" rel="noopener">
            Bring your team together with Slack, the collaboration hub for work.
          </a>
        </span>
        <a href="#" className="carbon-poweredby" target="_blank" rel="noopener">
          ads via Carbon (DEV)
        </a>
        <img src="#" height={1} width={1} alt="ads via Carbon" style={{ display: 'none' }} />
      </span>
    </div>
  );
}