import { SolanavotingappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useSolanavotingappSetMutation } from '@/features/solanavotingapp/data-access/use-solanavotingapp-set-mutation'

export function SolanavotingappUiButtonSet({ account, solanavotingapp }: { account: UiWalletAccount; solanavotingapp: SolanavotingappAccount }) {
  const setMutation = useSolanavotingappSetMutation({ account, solanavotingapp })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', solanavotingapp.data.count.toString() ?? '0')
        if (!value || parseInt(value) === solanavotingapp.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
