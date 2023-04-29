export enum AffiliatePosition {
  InText = 'InText',
  Sidebar = 'Sidebar'
}

export interface Affiliate {
  text: string
  link: string
  position: AffiliatePosition
  applyOn: {
    tags: string[]
  }
}