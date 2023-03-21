import { useGetAffiliateByTags } from './useGetAffiliateByTags'
import { affiliateFixtureJavaScript, affiliateFixtureReact } from './affiliateFixtures'

describe('useGetAffiliateByTags()', () => {
  const affiliates = [affiliateFixtureJavaScript, affiliateFixtureReact]
  describe('when affiliates contain a searched tag', () => {
    it('should return the affiliate', () => {
      expect(useGetAffiliateByTags(affiliates, ['javascript'])).toEqual(affiliateFixtureJavaScript)
    })

    it('should return the first matching affiliate', () => {
      expect(useGetAffiliateByTags(affiliates, ['frontend'])).toEqual(affiliateFixtureJavaScript)
    })

    describe('when a searched tag is missing', () => {
      it('should return the affiliate', () => {
        expect(useGetAffiliateByTags(affiliates, ['javascript', 'missing'])).toEqual(affiliateFixtureJavaScript)
      })
    })
  })

  describe('when affiliates do not contain any searched tag', () => {
    it('should return undefined', () => {
      expect(useGetAffiliateByTags(affiliates, ['missing'])).toBeUndefined()
    })
  })


  describe('when an affiliate is disabled', () => {
    it('should return only an enabled affiliate', () => {
      const affiliates = [{ ...affiliateFixtureJavaScript, enabled: false }, affiliateFixtureReact]

      expect(useGetAffiliateByTags(affiliates, ['frontend'])).toEqual(affiliateFixtureReact)
    })
  })
})