import { useSelectAffiliate } from './useSelectAffiliate'
import { affiliateFixtureJavaScript, affiliateFixtureReact } from './affiliateFixtures'
import { AffiliatePosition } from './Affiliate'

describe('useSelectAffiliate()', () => {
  const affiliates = [affiliateFixtureJavaScript, affiliateFixtureReact]

  describe('when affiliates contain a searched tag', () => {
    it('should return the affiliate', () => {
      const query = {
        tags: ['javascript'],
        position: AffiliatePosition.InText
      }

      expect(useSelectAffiliate(affiliates, query)).toEqual(affiliateFixtureJavaScript)
    })

    it('should return the first matching affiliate', () => {
      const query = {
        tags: ['frontend'],
        position: AffiliatePosition.InText
      }

      expect(useSelectAffiliate(affiliates, query)).toEqual(affiliateFixtureJavaScript)
    })

    describe('when a searched tag is missing', () => {
      it('should return the affiliate', () => {
        const query = {
          tags: ['javascript', 'missing'],
          position: AffiliatePosition.InText
        }

        expect(useSelectAffiliate(affiliates, query)).toEqual(affiliateFixtureJavaScript)
      })
    })
  })

  describe('when affiliates do not contain any searched tag', () => {
    it('should return undefined', () => {
      const query = {
        tags: ['missing'],
        position: AffiliatePosition.InText
      }

      expect(useSelectAffiliate(affiliates, query)).toBeUndefined()
    })
  })

  describe('when an affiliate contains a position', () => {
    it('should return the affiliate', () => {
      const query = {
        tags: ['javascript'],
        position: AffiliatePosition.InText
      }

      expect(useSelectAffiliate(affiliates, query)).toEqual(affiliateFixtureJavaScript)
    })
  })

  describe('when no affiliate contains a position', () => {
    it('should return undefined', () => {
      const query = {
        tags: ['javascript'],
        position: AffiliatePosition.Sidebar
      }

      expect(useSelectAffiliate(affiliates, query)).toBeUndefined()
    })
  })
})