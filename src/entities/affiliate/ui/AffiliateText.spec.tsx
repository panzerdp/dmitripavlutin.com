import { render } from '@testing-library/react'
import { AffiliateText } from './AffiliateText'
import { affiliateFixtureReact } from '../model/affiliateFixtures'

describe('<AffiliateText />', () => {
  const affiliates = [affiliateFixtureReact]

  const factory = () => {
    const tags = ['react']

    const { queryByTestId } = render(<AffiliateText affiliates={affiliates} tags={tags} />)

    return { queryByTestId }
  }

  it('should render affiliate text as html', () => {
    const { queryByTestId } = factory()

    expect(queryByTestId('affiliate-text')).toHaveTextContent('In text React course')
  })

  it('should replace __LINK__ placeholder with the link', () => {
    const { queryByTestId } = factory()

    expect(queryByTestId('affiliate-text')).toHaveTextContent('In text React course: https://example.com/2/a. Try again: https://example.com/2/a')
  })

  describe('when no affiliate has the searched tags', () => {
    it('should render null', () => {
      const tags = ['missing']

      const { container } = render(<AffiliateText affiliates={affiliates} tags={tags} />)
      expect(container.firstChild).toBeNull()
    })
  })
})