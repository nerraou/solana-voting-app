import { SolanavotingappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useSolanavotingappCloseMutation } from '@/features/solanavotingapp/data-access/use-solanavotingapp-close-mutation'

export function SolanavotingappUiButtonClose({ account, solanavotingapp }: { account: UiWalletAccount; solanavotingapp: SolanavotingappAccount }) {
  const closeMutation = useSolanavotingappCloseMutation({ account, solanavotingapp })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
