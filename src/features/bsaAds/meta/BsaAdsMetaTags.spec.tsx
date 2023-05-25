import { render } from '@testing-library/react'
import { BsaAdsMetaTags, BSA_ADS_SCRIPT_URL, BSA_ADS_PREBID_SCRIPT_URL, GOOGLE_ADS_PRECONNECT } from './BsaAdsMetaTags'

describe('<BsaAdsMetaTags /', () => {
  describe('bsa', () => {
    it('should load bsa script tag', () => {
      const { getByTestId } = render(<BsaAdsMetaTags />)

      const script = getByTestId('bsa-script')
      expect(script).toHaveAttribute('src', BSA_ADS_SCRIPT_URL)
    })

    const cases = [
      ['bsa-preload', BSA_ADS_SCRIPT_URL],
      ['bsa-prebid', BSA_ADS_PREBID_SCRIPT_URL]
    ]

    it('should preload bsa script', () => {
      const { getByTestId } = render(<BsaAdsMetaTags />)

      const preload = getByTestId('bsa-preload')
      expect(preload).toHaveAttribute('href', BSA_ADS_SCRIPT_URL)
      expect(preload).toHaveAttribute('rel', 'preload')
    })

    it('should preload prebid script', () => {
      const { getByTestId } = render(<BsaAdsMetaTags />)

      const preload = getByTestId('bsa-prebid')
      expect(preload).toHaveAttribute('href', BSA_ADS_PREBID_SCRIPT_URL)
      expect(preload).toHaveAttribute('rel', 'preload')
    })
  })

  describe('google ads', () => {
    it.each(GOOGLE_ADS_PRECONNECT)('should preconnect to %s', (testId, url) => {
      const { getByTestId } = render(<BsaAdsMetaTags />)

      const preconnect = getByTestId(testId)
      expect(preconnect).toHaveAttribute('href', url)
      expect(preconnect).toHaveAttribute('rel', 'preconnect')
    })
  })
})