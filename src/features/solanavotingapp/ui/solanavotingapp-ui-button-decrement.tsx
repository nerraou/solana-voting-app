import { SolanavotingappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useSolanavotingappDecrementMutation } from '../data-access/use-solanavotingapp-decrement-mutation'

export function SolanavotingappUiButtonDecrement({ account, solanavotingapp }: { account: UiWalletAccount; solanavotingapp: SolanavotingappAccount }) {
  const decrementMutation = useSolanavotingappDecrementMutation({ account, solanavotingapp })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
