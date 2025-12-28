import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useSolanavotingappInitializeMutation } from '@/features/solanavotingapp/data-access/use-solanavotingapp-initialize-mutation'

export function SolanavotingappUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useSolanavotingappInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Solanavotingapp {mutationInitialize.isPending && '...'}
    </Button>
  )
}
