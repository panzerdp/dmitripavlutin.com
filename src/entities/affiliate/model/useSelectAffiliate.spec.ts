import { useSelectAffiliate } from './useSelectAffiliate'
import { affiliateFixtureJavaScript, affiliateFixtureReact } from './affiliateFixtures'

describe('useSelectAffiliate()', () => {
  const affiliates = [affiliateFixtureJavaScript, affiliateFixtureReact]

  describe('when affiliates contain the searched tag', () => {
    it('should return the affiliate', () => {
      const query = {
        tags: ['javascript'],
      }

      expect(useSelectAffiliate(affiliates, query)).toEqual(affiliateFixtureJavaScript)
    })

    it('should return the first matching affiliate', () => {
      const query = {
        tags: ['frontend'],
      }

      expect(useSelectAffiliate(affiliates, query)).toEqual(affiliateFixtureJavaScript)
    })

    describe('when a searched tag is missing', () => {
      it('should return the affiliate', () => {
        const query = {
          tags: ['javascript', 'missing'],
        }

        expect(useSelectAffiliate(affiliates, query)).toEqual(affiliateFixtureJavaScript)
      })
    })
  })

  describe('when affiliates do not contain the searched tag', () => {
    it('should return undefined', () => {
      const query = {
        tags: ['missing'],
      }

      expect(useSelectAffiliate(affiliates, query)).toBeUndefined()
    })
  })
})