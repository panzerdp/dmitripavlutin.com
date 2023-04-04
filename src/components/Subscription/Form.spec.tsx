import { SubscriptionForm, SUBSCRIBERS_COUNT } from './Form'
import { render, fireEvent, screen, act } from '@testing-library/react'
import fetchJsonp from 'fetch-jsonp'

jest.mock('fetch-jsonp')

describe('<SubscriptionForm>', () => {
  const props = {
    emailSubscriptionService: {
      endpoint: 'http://service.com/email',
    },
    count: 9999
  }

  beforeEach(() => {
    jest.mocked(fetchJsonp).mockResolvedValue({
      ok: true,
      async json(): Promise<null> {
        return null
      }}
    )
  })

  const factory = () => {
    render(<SubscriptionForm {...props} />)
    const emailInput = screen.getByRole('textbox') as HTMLInputElement
    const form = screen.getByTestId('form') as HTMLFormElement

    const subscribe = () => {
      return act(async () => await fireEvent.click(screen.getByRole('button')))
    }

    return { emailInput, form, subscribe }
  }

  it('should render subcription title', () => {
    factory()

    expect(screen.queryByText('Quality posts into your inbox')).toBeInTheDocument()
  })

  it('should render the subscription count', () => {
    factory()

    expect(screen.queryByText(`Join ${SUBSCRIBERS_COUNT} other subscribers.`)).toBeInTheDocument()
  })

  it('should render the subscribe button as enabled', () => {
    factory()

    expect(screen.queryByRole('button')).not.toBeDisabled()
  })

  describe('when subscribe button is clicked', () => {
    describe('when the email field is empty', () => {
      it('should make the form invalid', async () => {
        const { form, subscribe } = factory()

        await subscribe()

        expect(form.checkValidity()).toBe(false)
      })

      it('should not subscribe user', async () => {
        const { subscribe } = factory()

        await subscribe()

        expect(fetchJsonp).not.toBeCalled()
      })
    })

    describe('when the email field does not contain an email', () => {
      it('should make the form invalid', async () => {
        const { emailInput, form, subscribe } = factory()

        emailInput.value = 'zzz'
        await subscribe()

        expect(form.checkValidity()).toBe(false)
      })

      it('should not subscribe user', async () => {
        const { subscribe } = factory()

        await subscribe()

        expect(fetchJsonp).not.toBeCalled()
      })
    })

    describe('when the email field contains an email', () => {
      it('should make the form valid', async () => {
        const { emailInput, form, subscribe } = factory()

        emailInput.value = 'user@mail.com'
        await subscribe()

        expect(form.checkValidity()).toBe(true)
      })

      it('should make a request with the email address', async () => {
        const { emailInput, subscribe } = factory()
        const email = 'user@mail.com'

        emailInput.value = email
        await subscribe()

        const formData = new FormData()
        formData.set('fields[email]', email)

        const url = props.emailSubscriptionService.endpoint + '?fields%5Bemail%5D=user%40mail.com&ajax=1&ml-submit=1'
        expect(fetchJsonp).toHaveBeenCalledWith(url)
      })
    })
  })

  describe('successful subscription message', () => {
    describe('when initially rendered', () => {
      it('should not show successfull subscription message', () => {
        factory()

        expect(screen.queryByText('Success!')).not.toBeInTheDocument()
      })
    })

    describe('when user subscribed successfully', () => {
      it('should show a success message', async () => {
        const { emailInput, subscribe } = factory()
        const email = 'user@mail.com'

        emailInput.value = email
        await subscribe()

        expect(await screen.findByText('Subscribed! Check your inbox to confirm the email address.')).toBeInTheDocument()
      })
    })

    describe('when user subscription failed', () => {
      it('should show an error', async () => {
        jest.mocked(fetchJsonp).mockResolvedValue({
          ok: false,
          async json(): Promise<null> {
            return null
          }}
        )

        const { emailInput, subscribe } = factory()
        const email = 'user@mail.com'

        emailInput.value = email
        await subscribe()

        expect(await screen.findByText('Ooops! An error occured. Please try again later...')).toBeInTheDocument()
      })

      it('should show an error', async () => {
        jest.mocked(fetchJsonp).mockRejectedValue(new Error())

        const { emailInput, subscribe } = factory()
        const email = 'user@mail.com'

        emailInput.value = email
        await subscribe()

        expect(await screen.findByText('Ooops! An error occured. Please try again later...')).toBeInTheDocument()
      })
    })


  })
})