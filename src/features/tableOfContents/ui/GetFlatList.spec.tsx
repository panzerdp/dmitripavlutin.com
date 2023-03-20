import { GetFlatList } from './GetFlatList'
import { TableOfContentsItem } from '../model/TableOfContentsItem'
import { render } from '@testing-library/react'

describe('<GetFlatList />', () => {
  const items: TableOfContentsItem[] = [
    {
      title: 'Item 1',
      url: '#item1',
      items: [
        {
          title: 'Item 2',
          url: '#item2'
        }
      ]
    }
  ]

  describe('when max level is 0', () => {
    it('should return null', () => {
      const { container } = render(<GetFlatList maxLevel={0} items={items} />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('when max level is 1', () => {
    it('should render the first item', () => {
      const { getAllByRole } = render(<GetFlatList maxLevel={1} items={items} />)

      const links = getAllByRole('link')

      expect(links).toHaveLength(1)
      expect(links[0]).toHaveTextContent('Item 1')
      expect(links[0]).toHaveAttribute('href', '#item1')
    })
  })

  describe('when max level is bigger or equal than 2', () => {
    it('should render two menu items', () => {
      const { getAllByRole } = render(<GetFlatList maxLevel={2} items={items} />)

      const links = getAllByRole('link')

      expect(links).toHaveLength(2)

      expect(links[0]).toHaveTextContent('Item 1')
      expect(links[0]).toHaveAttribute('href', '#item1')

      expect(links[1]).toHaveTextContent('Item 2')
      expect(links[1]).toHaveAttribute('href', '#item2')
    })
  })
})