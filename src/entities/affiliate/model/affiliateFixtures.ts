import { Affiliate } from './Affiliate'

export const affiliateFixtureJavaScript: Affiliate = {
  enabled: true,
  message: {
    introInSidebar: 'Sidebar JavaScript course',
    introInText: 'In text JavaScript course',
    main: 'JavaScript course'
  },
  applyOn: { tags: ['javascript', 'frontend'] }
}

export const affiliateFixtureReact: Affiliate = {
  enabled: true,
  message: {
    introInSidebar: 'Sidebar React course',
    introInText: 'In text React course',
    main: 'React course'
  },
  applyOn: { tags: ['react', 'frontend'] }
}