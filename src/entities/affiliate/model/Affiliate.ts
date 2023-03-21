export interface Affiliate {
  enabled: boolean
  message: {
    introInText: string
    introInSidebar: string
    main: string
  }
  applyOn: {
    tags: string[]
  }
}