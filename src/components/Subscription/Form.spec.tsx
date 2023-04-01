import { SubscriptionForm, SUBSCRIBERS_COUNT } from './Form'
import { render, fireEvent } from '@testing-library/react'

describe('<SubscriptionForm>', () => {
  const props = {
    emailSubscriptionService: {
      endpoint: 'http://service.com/email',
    },
    count: 9999
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  const factory = () => {
    const { getByText, getByRole, getByTestId } = render(<SubscriptionForm {...props} />)
    const submit = getByRole('button') as HTMLButtonElement
    const emailInput = getByRole('textbox') as HTMLInputElement
    const form = getByTestId('form') as HTMLFormElement

    return { submit, emailInput, form, getByText }
  }

  it('should render subcription title', () => {
    const { getByText } = factory()

    expect(getByText('Quality posts into your inbox')).toBeInTheDocument()
  })

  it('should render the subscription count', () => {
    const { getByText } = factory()

    expect(getByText(`Join ${SUBSCRIBERS_COUNT} other subscribers.`)).toBeInTheDocument()
  })

  describe('when subscribe button is clicked', () => {
    describe('when the email field is empty', () => {
      it('should make the form invalid', () => {
        const { submit, form } = factory()

        fireEvent.click(submit)

        expect(form.checkValidity()).toBe(false)
      })

      it('should not subscribe user', () => {
        const { submit } = factory()

        fireEvent.click(submit)

        expect(fetch).not.toBeCalled()
      })
    })

    describe('when the email field does not contain an email', () => {
      it('should make the form invalid', () => {
        const { submit, emailInput, form } = factory()

        emailInput.value = 'zzz'
        fireEvent.click(submit)

        expect(form.checkValidity()).toBe(false)
      })

      it('should not subscribe user', () => {
        const { submit } = factory()

        fireEvent.click(submit)

        expect(fetch).not.toBeCalled()
      })
    })

    describe('when the email field contains an email', () => {
      it('should make the form valid', () => {
        const { submit, emailInput, form } = factory()

        emailInput.value = 'user@mail.com'
        fireEvent.click(submit)

        expect(form.checkValidity()).toBe(true)
      })

      it('should subscribe user', () => {
        const { submit, emailInput } = factory()

        emailInput.value = 'user@mail.com'
        fireEvent.click(submit)

        expect(fetch).toHaveBeenCalledWith(props.emailSubscriptionService.endpoint)
      })
    })
  })
})