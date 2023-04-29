import { render } from '@testing-library/react'
import { AffiliateText } from './AffiliateText'
import { affiliateFixtureReact } from '../model/affiliateFixtures'

describe('<AffiliateText />', () => {

  const factory = (currentTags = ['react']) => {
    const { queryByTestId } = render(
      <AffiliateText
        affiliate={affiliateFixtureReact}
        currentTags={currentTags}
      />
    )

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

  describe('when the affiliate contains a current tag', () => {
    it('should render the text', () => {
      const { queryByTestId } = factory(['react'])

      expect(queryByTestId('affiliate-text')).toBeInTheDocument()
    })
  })

  describe('when the affiliate does not contains a current tag', () => {
    it('should render the text', () => {
      const { queryByTestId } = factory(['vue'])

      expect(queryByTestId('affiliate-text')).not.toBeInTheDocument()
    })
  })
})