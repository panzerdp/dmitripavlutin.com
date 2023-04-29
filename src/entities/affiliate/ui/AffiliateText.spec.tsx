import { render } from '@testing-library/react'
import { AffiliateText } from './AffiliateText'
import { affiliateFixtureReact } from '../model/affiliateFixtures'

describe('<AffiliateText />', () => {
  const factory = () => {
    const { queryByTestId } = render(<AffiliateText affiliate={affiliateFixtureReact} />)

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
})