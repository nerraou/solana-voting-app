import { SolanavotingappAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { SolanavotingappUiButtonClose } from './solanavotingapp-ui-button-close'
import { SolanavotingappUiButtonDecrement } from './solanavotingapp-ui-button-decrement'
import { SolanavotingappUiButtonIncrement } from './solanavotingapp-ui-button-increment'
import { SolanavotingappUiButtonSet } from './solanavotingapp-ui-button-set'

export function SolanavotingappUiCard({ account, solanavotingapp }: { account: UiWalletAccount; solanavotingapp: SolanavotingappAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solanavotingapp: {solanavotingapp.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={solanavotingapp.address} label={ellipsify(solanavotingapp.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <SolanavotingappUiButtonIncrement account={account} solanavotingapp={solanavotingapp} />
          <SolanavotingappUiButtonSet account={account} solanavotingapp={solanavotingapp} />
          <SolanavotingappUiButtonDecrement account={account} solanavotingapp={solanavotingapp} />
          <SolanavotingappUiButtonClose account={account} solanavotingapp={solanavotingapp} />
        </div>
      </CardContent>
    </Card>
  )
}
