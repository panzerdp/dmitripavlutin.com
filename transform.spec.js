const transform = require('./transform')

describe('transform()', () => {
  it('should return the source code', () => {
    const fileInfo = {
      path: './src/test.md',
      source: 'console.log("Hi!")'
    }

    expect(transform(fileInfo)).toBe(fileInfo.source)
  })

  describe('when the file is markdown', () => {
    it('should transform the code snippets', () => {
      const fileInfo = {
        path: './src/test.md',
        source: '```vue {6}'
      }

      expect(transform(fileInfo)).toBe('```vue mark=7')
    })

    it('should transform the code snippets', () => {
      const fileInfo = {
        path: './src/test.md',
        source: '```vue{6}'
      }

      expect(transform(fileInfo)).toBe('```vue mark=7')
    })

    it('should transform the code snippet', () => {
      const fileInfo = {
        path: './src/test.md',
        source: '```vue {6-7}'
      }

      expect(transform(fileInfo)).toBe('```vue mark=7:8')
    })

    it('should transform the code snippet', () => {
      const fileInfo = {
        path: './src/test.md',
        source: '```vue {6-7,10-14}'
      }

      expect(transform(fileInfo)).toBe('```vue mark=7:8,11:15')
    })

    it('should transform the code snippet', () => {
      const fileInfo = {
        path: './src/test.md',
        source: '```vue {6-7,10-14}' + '\n' + '```vue{8,10-14,15}'
      }

      expect(transform(fileInfo)).toBe('```vue mark=7:8,11:15' + '\n' + '```vue mark=9,11:15,16')
    })
  })

  describe('when the file is not markdown', () => {
    it('should not change the code snippet', () => {
      const fileInfo = {
        path: './src/test.svg',
        source: '```vue {6}'
      }

      expect(transform(fileInfo)).toBe('```vue {6}')
    })
  })
})