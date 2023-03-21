import * as React from 'react'

function CarbonBannerDemo(_: unknown, ref: React.RefObject<HTMLDivElement>): null {
  React.useEffect(() => {
    const div = document.createElement('div')
    div.id = 'carbonads'
    div.innerHTML = `
    <span>
      <span class="carbon-wrap">
        <a href="#" class="carbon-img" target="_blank" rel="noopener">
          <img src="/slack-carbon.png" alt="ads via Carbon" border="0" height="100" width="130" style="max-width: 130px;">
        </a>
        <a href="#" class="carbon-text" target="_blank" rel="noopener">
          Bring your team together with Slack, the collaboration hub for work.
        </a>
      </span>
      <a href="#" class="carbon-poweredby" target="_blank" rel="noopener">
        ads via Carbon (DEV)
      </a>
      <img src="#" border="0" height="1" width="1" alt="ads via Carbon" style="display: none;">
    </span>`
    setTimeout(() => {
      ref.current.appendChild(div)
    }, 500)
    return () => {
      div.parentElement.removeChild(div)
    }
  }, [])
  return null
}

export default React.forwardRef(CarbonBannerDemo)
