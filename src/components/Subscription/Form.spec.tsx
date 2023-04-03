import { SubscriptionForm, SUBSCRIBERS_COUNT } from './Form'
import { render, fireEvent, screen, act } from '@testing-library/react'

describe('<SubscriptionForm>', () => {
  const props = {
    emailSubscriptionService: {
      endpoint: 'http://service.com/email',
    },
    count: 9999
  }

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true })
  })

  afterAll(() => {
    jest.resetAllMocks()
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

        expect(fetch).not.toBeCalled()
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

        expect(fetch).not.toBeCalled()
      })
    })

    describe('when the email field contains an email', () => {
      it('should make the form valid', async () => {
        const { emailInput, form, subscribe } = factory()

        emailInput.value = 'user@mail.com'
        await subscribe()

        expect(form.checkValidity()).toBe(true)
      })

      it('should make a post request with the email address as form data', async () => {
        const { emailInput, subscribe } = factory()
        const email = 'user@mail.com'

        emailInput.value = email
        await subscribe()

        const formData = new FormData()
        formData.set('fields[email]', email)

        expect(fetch).toHaveBeenCalledWith(props.emailSubscriptionService.endpoint, {
          method: 'post',
          body: formData,
          mode: 'cors'
        })
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

        expect(await screen.findByText('Thank you! An email confirmation message has been sent to your inbox.')).toBeInTheDocument()
      })
    })

    describe('when user subscription failed', () => {
      it('should show an error', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: false })

        const { emailInput, subscribe } = factory()
        const email = 'user@mail.com'

        emailInput.value = email
        await subscribe()

        expect(await screen.findByText('Ooops! An error occured. Please try again later...')).toBeInTheDocument()
      })

      it('should show an error', async () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Some network problem'))

        const { emailInput, subscribe } = factory()
        const email = 'user@mail.com'

        emailInput.value = email
        await subscribe()

        expect(await screen.findByText('Ooops! An error occured. Please try again later...')).toBeInTheDocument()
      })
    })


  })
})