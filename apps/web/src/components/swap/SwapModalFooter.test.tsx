import {
  LIMIT_ORDER_TRADE,
  PREVIEW_EXACT_IN_TRADE,
  TEST_ALLOWED_SLIPPAGE,
  TEST_TRADE_EXACT_INPUT,
} from 'test-utils/constants'
import { render, screen, within } from 'test-utils/render'

import SwapModalFooter from './SwapModalFooter'

jest.mock('../../featureFlags/flags/useFees', () => ({ useFeesEnabled: () => true }))

describe('SwapModalFooter.tsx', () => {
  it('matches base snapshot, test trade exact input', () => {
    const { asFragment } = render(
      <SwapModalFooter
        isLoading={false}
        trade={TEST_TRADE_EXACT_INPUT}
        allowedSlippage={TEST_ALLOWED_SLIPPAGE}
        swapResult={undefined}
        onConfirm={jest.fn()}
        swapErrorMessage={undefined}
        disabledConfirm={false}
        fiatValueInput={{
          data: undefined,
          isLoading: false,
        }}
        fiatValueOutput={{
          data: undefined,
          isLoading: false,
        }}
        showAcceptChanges={false}
        onAcceptChanges={jest.fn()}
      />
    )
    expect(asFragment()).toMatchSnapshot()

    expect(
      screen.getByText(
        'The minimum amount you are guaranteed to receive. If the price slips any further, your transaction will revert.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('The impact your trade has on the market price of this pool.')).toBeInTheDocument()
  })

  it('shows accept changes section when available', () => {
    const mockAcceptChanges = jest.fn()
    render(
      <SwapModalFooter
        isLoading={false}
        trade={TEST_TRADE_EXACT_INPUT}
        allowedSlippage={TEST_ALLOWED_SLIPPAGE}
        swapResult={undefined}
        onConfirm={jest.fn()}
        swapErrorMessage={undefined}
        disabledConfirm={false}
        fiatValueInput={{
          data: undefined,
          isLoading: false,
        }}
        fiatValueOutput={{
          data: undefined,
          isLoading: false,
        }}
        showAcceptChanges={true}
        onAcceptChanges={mockAcceptChanges}
      />
    )
    const showAcceptChanges = screen.getByTestId('show-accept-changes')
    expect(showAcceptChanges).toBeInTheDocument()
    expect(within(showAcceptChanges).getByText('Price updated')).toBeVisible()
    expect(within(showAcceptChanges).getByText('Accept')).toBeVisible()
  })

  it('renders a preview trade while disabling submission', () => {
    const { asFragment } = render(
      <SwapModalFooter
        isLoading
        trade={PREVIEW_EXACT_IN_TRADE}
        allowedSlippage={TEST_ALLOWED_SLIPPAGE}
        swapResult={undefined}
        onConfirm={jest.fn()}
        swapErrorMessage={undefined}
        disabledConfirm
        fiatValueInput={{
          data: undefined,
          isLoading: false,
        }}
        fiatValueOutput={{
          data: undefined,
          isLoading: false,
        }}
        showAcceptChanges={false}
        onAcceptChanges={jest.fn()}
      />
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByText('Finalizing quote...')).toBeInTheDocument()
  })

  it('renders a limit trade', () => {
    render(
      <SwapModalFooter
        isLoading
        trade={LIMIT_ORDER_TRADE}
        allowedSlippage={TEST_ALLOWED_SLIPPAGE}
        swapResult={undefined}
        onConfirm={jest.fn()}
        swapErrorMessage={undefined}
        disabledConfirm={false}
        fiatValueInput={{
          data: undefined,
          isLoading: false,
        }}
        fiatValueOutput={{
          data: undefined,
          isLoading: false,
        }}
        showAcceptChanges={false}
        onAcceptChanges={jest.fn()}
      />
    )
    expect(screen.getByText('Limit price')).toBeInTheDocument()
    expect(screen.getByText('Expiry')).toBeInTheDocument()
    expect(screen.getByText('Fee')).toBeInTheDocument()
    expect(screen.getByText('Network cost')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Please be aware that the execution for this limit order may vary based on real-time market fluctuations and Ethereum network congestion. Canceling a limit has a network cost.'
      )
    ).toBeInTheDocument()
  })
})
