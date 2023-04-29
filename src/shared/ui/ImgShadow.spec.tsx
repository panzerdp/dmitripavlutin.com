import { ImgShadow } from './ImgShadow'
import { render } from '@testing-library/react'

describe('<ImgShadow />', () => {
  it('should renders its children', () => {
    const { getByTestId } = render(<ImgShadow><div data-testid="child" /></ImgShadow>)

    expect(getByTestId('child')).toBeInTheDocument()
  })
})