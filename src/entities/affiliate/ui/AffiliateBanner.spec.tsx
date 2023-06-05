import { render } from '@testing-library/react'
import { AffiliateBanner } from './AffiliateBanner'
import { affiliateFixtureReact } from '../model/affiliateFixtures'

describe('<AffiliateBanner />', () => {
  const affiliates = [affiliateFixtureReact]

  const factory = () => {
    const tags = ['react']

    return render(<AffiliateBanner affiliates={affiliates} tags={tags} />)
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

      const { container } = render(<AffiliateBanner affiliates={affiliates} tags={tags} />)
      expect(container.firstChild).toBeNull()
    })
  })
})