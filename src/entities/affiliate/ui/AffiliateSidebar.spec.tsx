import { AffiliateSidebar } from './AffiliateSidebar'
import { render } from '@testing-library/react'

describe('<AffiliateSidebar>', () => {
  it('should render a div undefined', () => {
    const { queryByText } = render(<AffiliateSidebar />)

    expect(queryByText('Test')).toBeInTheDocument()
  })
})