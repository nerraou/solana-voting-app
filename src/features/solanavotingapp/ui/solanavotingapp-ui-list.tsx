import { SolanavotingappUiCard } from './solanavotingapp-ui-card'
import { useSolanavotingappAccountsQuery } from '@/features/solanavotingapp/data-access/use-solanavotingapp-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function SolanavotingappUiList({ account }: { account: UiWalletAccount }) {
  const solanavotingappAccountsQuery = useSolanavotingappAccountsQuery()

  if (solanavotingappAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!solanavotingappAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {solanavotingappAccountsQuery.data?.map((solanavotingapp) => (
        <SolanavotingappUiCard account={account} key={solanavotingapp.address} solanavotingapp={solanavotingapp} />
      ))}
    </div>
  )
}
