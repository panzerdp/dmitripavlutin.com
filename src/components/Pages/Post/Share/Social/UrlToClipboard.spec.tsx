import { UrlToClipboard, ANIMATION_TIME } from './UrlToClipboard'
import { render, fireEvent, act } from '@testing-library/react'

interface MutableNavigator extends Navigator {
  clipboard: Clipboard
}

describe('UrlToClipboard', () => {
  const postUrl = 'https://dmitripavlutin.com/some-post/'
  const navigator: MutableNavigator = global.navigator

  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
      ...navigator.clipboard
    }
    jest.useFakeTimers()
  })

  afterEach(() => {
    delete navigator.clipboard
    jest.useRealTimers()
  })

  interface FactoryProps {
    tooltipPosition?: 'left' | 'right' | 'bottom' | 'top'
  }

  const factory = ({ tooltipPosition }: FactoryProps = {}) => {
    const { getByRole } = render(<UrlToClipboard url={postUrl} tooltipPosition={tooltipPosition} />)
    const button = getByRole('button')
    const click = () => fireEvent.click(getByRole('button'))

    return { button, click }
  }

  it('should render a button', () => {
    const { button } = factory()

    expect(button).toBeInTheDocument()
  })

  describe('when renderer', () => {
    it('should insert nothing into the clipboard', () => {
      factory()

      expect(global.navigator.clipboard.writeText).not.toHaveBeenCalled()
    })
  })

  describe('tooltip', () => {
    it('should render tooltip on the left side by default', () => {
      const { button } = factory()

      expect(button).toHaveAttribute('tooltip-position', 'left')
    })

    it('should render tooltip on the right side', () => {
      const { button } = factory({ tooltipPosition: 'right' })

      expect(button).toHaveAttribute('tooltip-position', 'right')
    })
  })

  describe('when the button is clicked', () => {
    it('should insert post URL into clipboard', async () => {
      const { click } = factory()

      await act(() => click())

      expect(global.navigator.clipboard.writeText).toHaveBeenCalled()
    })

    it('should show the tooltip', async () => {
      const { click, button } = factory()

      await act(() => click())

      expect(button).toHaveClass('show')
    })

    it('should hide the tooltip after animation time', async () => {
      const { click, button } = factory()

      await act(() => click())
      await act(() => jest.advanceTimersByTime(ANIMATION_TIME))

      expect(button).not.toHaveClass('show')
    })
  })
})