interface FluidImage {
  aspectRatio: number
  src: string
  srcSet: string
  sizes: string
  base64?: string
  tracedSVG?: string
  srcWebp?: string
  srcSetWebp?: string
}

interface FixedImage {
  width: number
  height: number
  src: string
  srcSet: string
  base64?: string
  tracedSVG?: string
  srcWebp?: string
  srcSetWebp?: string
}