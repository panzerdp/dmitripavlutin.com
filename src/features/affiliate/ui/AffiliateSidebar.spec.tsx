import { render } from '@testing-library/react'
import { AffiliateSidebar } from './AffiliateSidebar'

describe('<AffiliateSidebar>', () => {
  it('should render text', () => {
    const { queryByText } = render(<AffiliateSidebar />)

    expect(queryByText('text')).toBeInTheDocument()
  })
})