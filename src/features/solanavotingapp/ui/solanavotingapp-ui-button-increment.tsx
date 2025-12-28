import { SolanavotingappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useSolanavotingappIncrementMutation } from '../data-access/use-solanavotingapp-increment-mutation'

export function SolanavotingappUiButtonIncrement({ account, solanavotingapp }: { account: UiWalletAccount; solanavotingapp: SolanavotingappAccount }) {
  const incrementMutation = useSolanavotingappIncrementMutation({ account, solanavotingapp })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
