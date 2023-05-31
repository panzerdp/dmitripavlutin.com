import { useEffect } from 'react'
import { GrowthBook, GrowthBookProvider as Provider } from '@growthbook/growthbook-react'

const growthbook = new GrowthBook({
  apiHost: 'https://cdn.growthbook.io',
  clientKey: 'sdk-fTmCC3E7JLBmqBOH',
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    // TODO: Use your real analytics tracking system
    console.log('Viewed Experiment', {
      experimentId: experiment.key,
      variationId: result.key
    })
  }
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function GrowthBookProvider({ children }: Props) {
  useEffect(() => {
    growthbook.loadFeatures()
  }, [])

  return (
    <Provider growthbook={growthbook}>
      {children}
    </Provider>
  )
}