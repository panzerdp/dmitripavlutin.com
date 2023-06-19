import { useEffect } from 'react'
import { useLocation } from '@reach/router'

declare let _bsa: any

export function BsaAdsStickyBanner(): JSX.Element {
  return null
  const { pathname } = useLocation()

  useEffect(() => {
    const isBannerDisplayed = document.querySelectorAll('#sticky-js').length > 0

    if (typeof _bsa !== 'undefined' && _bsa && !isBannerDisplayed) {
      _bsa.init('custom', 'CWYDK53Y', 'placement:dmitripavlutincom-stickybar', {
        target: '.sticky-js',
        id: 'sticky-js',
        template: `
        <a class="sticky-bar" style="background-color: ##backgroundColor##; color: ##textColor##" href="##link##" rel="sponsored noopener" target="_blank" title="##company## — ##tagline##">
        <div class="native-main">
          <img class="native-img" src="##logo##">
          <div class="native-details" style="color: ##textColor##">
            <span class="native-tagline">Sponsored by ##company##</span>
            <span class="native-desc">##description##</span>
          </div>
          <span class="native-cta" style="color: ##ctaTextColor##; background-color: ##ctaBackgroundColor##;">##callToAction##</span>
        </div>
      </a>
      <div class="native-hide" style="background-color: ##textColor##; color: ##backgroundColor##; border: solid 1px ##backgroundColor##;" onclick="_bsa.close('sticky-js')">✕</div>`,
      })

      return
    }

    if (isBannerDisplayed) {
      _bsa.reload('#sticky-js')
    }
  }, [pathname])

  return <div className="sticky-js"></div>
}